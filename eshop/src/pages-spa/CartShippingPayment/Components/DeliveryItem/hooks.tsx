import { useContext } from 'react';
import useFormatMessage from 'Hooks/useFormatMessage';
import { PPLSelectDetail } from 'Vendor/PPL/interfaces';
import { DPDPickupPointData } from 'Vendor/DPD/interfaces';
import { ExtendedPoint } from 'Vendor/Zasilkovna/interfaces';
import {
	VinistoHelperDllEnumsCountryCode,
	VinistoHelperDllEnumsOrderDeliveryType,
	VinistoHelperDllEnumsOrderPickupPointType,
	VinistoOrderDllModelsApiDeliveryDelivery,
} from 'vinisto_api_client/src/api-types/order-api';
import { ShippingItemProps } from 'pages-spa/CartShippingPayment/Components/ShippingItem/interfaces';
import {
	DPD_MODAL,
	PPL_MODAL,
	ZASILKOVNA_MODAL,
} from 'Components/Modal/constants';
import useTodayTomorrowDate from 'Hooks/useTodayTomorrowDate/useTodayTomorrowDate';
import { ModalContext } from 'Components/Modal/context';
import useLocalizedValue from 'Hooks/useLocalizedValue';
import { OrderContext } from 'Services/OrderService/context';
import { AuthenticationContext } from 'Services/AuthenticationService/context';
import { getLocalizedPrice } from 'vinisto_shared/src/price/get-localized-price';
import { DPDWidgetCountryCodes } from 'Vendor/DPD/constants';

import {
	getLocationNumbersFromDPDHouseNumber,
	getLocationNumbersFromStreet,
} from './helpers';

export const useDeliveryItem = (
	delivery?: VinistoOrderDllModelsApiDeliveryDelivery,
	selectable?: boolean,
	monthName?: boolean
) => {
	const { email } = useContext(AuthenticationContext).vinistoUser;
	const { deliveryMethod, setDeliveryMethod } = useContext(OrderContext);
	const { handleOpenModal } = useContext(ModalContext);
	const getLocalizedValue = useLocalizedValue();
	const formatDate = useTodayTomorrowDate(delivery);
	const t = useFormatMessage();
	const price = delivery?.prices?.[0];

	if (!price || !price.currency) return null;

	const deliveryName = getLocalizedValue(delivery?.name ?? []);

	const deliveryNote = getLocalizedValue(delivery?.note ?? []);

	const handleOnClick = () => {
		if (!delivery?.id) return;

		if (
			delivery?.deliveryType ===
				VinistoHelperDllEnumsOrderDeliveryType.PICKUP_POINT &&
			delivery?.pickupPointType ===
				VinistoHelperDllEnumsOrderPickupPointType.ZASILKOVNA
		) {
			handleOpenModal(ZASILKOVNA_MODAL, {
				onPick: (result: null | ExtendedPoint) => {
					if (result === null) return;

					const { street, landRegistryNumber, houseNumber } =
						getLocationNumbersFromStreet(result?.street, result?.city);

					setDeliveryMethod({
						id: delivery?.id as string,
						pickupPoint: {
							code: result?.id,
							title: `${result?.city ? `${result.city}, ` : ''}${
								result?.street ? `${result.street}, ` : ''
							}
							${result?.place ? `${result.place}` : ''}`,
							type: VinistoHelperDllEnumsOrderPickupPointType.ZASILKOVNA,
							city: result?.city,
							street,
							landRegistryNumber: landRegistryNumber ?? '0',
							houseNumber,
							zip: result?.zip,
							countryCode:
								result?.country?.toUpperCase() ??
								VinistoHelperDllEnumsCountryCode.CZ,
							email: email ?? '',
						},
					});
				},
			});
		} else if (
			delivery?.deliveryType ===
				VinistoHelperDllEnumsOrderDeliveryType.PICKUP_POINT &&
			delivery?.pickupPointType ===
				VinistoHelperDllEnumsOrderPickupPointType.PPL
		) {
			handleOpenModal(PPL_MODAL, {
				onPick: (result: PPLSelectDetail) => {
					const { street, landRegistryNumber, houseNumber } =
						getLocationNumbersFromStreet(result?.street, result?.city);

					setDeliveryMethod({
						id: delivery?.id as string,
						pickupPoint: {
							code: result?.code,
							title: `${result?.city ? `${result.city}, ` : ''}${
								result?.street ? `${result.street}, ` : ''
							}
							${result?.name ? `${result.name}` : ''}`,
							type: VinistoHelperDllEnumsOrderPickupPointType.PPL,
							city: result?.city,
							landRegistryNumber,
							houseNumber,
							street,
							zip: result?.zipCode,
							countryCode:
								result?.country?.toUpperCase() ??
								VinistoHelperDllEnumsCountryCode.CZ,
							email: email ?? '',
						},
					});
				},
			});
		} else if (
			delivery?.deliveryType ===
				VinistoHelperDllEnumsOrderDeliveryType.PICKUP_POINT &&
			delivery?.pickupPointType ===
				VinistoHelperDllEnumsOrderPickupPointType.DPD
		) {
			handleOpenModal(DPD_MODAL, {
				onPick: (result: DPDPickupPointData) => {
					const { landRegistryNumber, houseNumber } =
						getLocationNumbersFromDPDHouseNumber(result?.house_number);
					setDeliveryMethod({
						id: delivery?.id as string,
						pickupPoint: {
							code: result?.id || '',
							title: `${result.city ? `${result.city}, ` : ''}${
								result.street ? `${result.street}, ` : ''
							}${result.company ? `${result.company}` : ''}`,
							type: VinistoHelperDllEnumsOrderPickupPointType.PPL,
							city: result.city || '',
							landRegistryNumber,
							houseNumber,
							street: result.street || '',
							zip: result.postcode || '',
							countryCode:
								DPDWidgetCountryCodes.find(
									(country) => country.id === result.country_id
								)?.countryCode || VinistoHelperDllEnumsCountryCode.CZ,
							email: email ?? '',
						},
					});
				},
			});
		} else {
			setDeliveryMethod({ id: delivery?.id });
		}
	};

	// TODO: Refactor to better solution
	const titleContent = (
		<>
			<div
				className={
					deliveryMethod?.pickupPoint && deliveryMethod?.id === delivery?.id
						? 'fw-bolder'
						: undefined
				}
			>
				{deliveryName}
			</div>
			{deliveryMethod?.pickupPoint && deliveryMethod?.id === delivery?.id && (
				<>
					<div>({deliveryMethod?.pickupPoint?.title})</div>
					<button
						className="vinisto-btn vinisto-clear-btn fw-bolder vinisto-color-success mb-0"
						onClick={handleOnClick}
					>
						{t({ id: 'cartShippingPayment.deliveryItem.chooseAnotherBranch' })}
					</button>
				</>
			)}
		</>
	);

	const priceText =
		// The price can be something like 0.00127, so we need to round it for the check. Beware of Euros though.
		Math.round(price?.valueWithVat ?? 0) === 0
			? t({ id: 'basket.price.free' })
			: !price?.valueWithVat
			? ''
			: getLocalizedPrice({
					price: price.valueWithVat,
					currency: price.currency,
			  });

	const formattedDate = formatDate(
		(delivery?.deliveryTimeRange?.deliveryDate as string) ?? '',
		monthName
	);

	const isPickup =
		delivery.deliveryType === VinistoHelperDllEnumsOrderDeliveryType.PICKUP;

	const dateContent = selectable
		? t(
				{
					id: isPickup
						? 'bundleAvailability.availablePickupDate'
						: 'bundleAvailability.availableDeliveryDate',
				},
				{ day: `${formattedDate}` }
		  )
		: formattedDate;

	const isForSubscribersOnly = delivery.isSubscriber ?? false;

	const value: ShippingItemProps = {
		onClick: handleOnClick,
		isLoading: delivery === undefined,
		isSelected:
			!!deliveryMethod?.id &&
			!!delivery?.id &&
			deliveryMethod?.id === delivery?.id,
		titleContent,
		priceContent: priceText,
		dateContent,
		selectable: true,
		title: deliveryName,
		note: deliveryNote,
		isForSubscribersOnly,
	};

	return value;
};
