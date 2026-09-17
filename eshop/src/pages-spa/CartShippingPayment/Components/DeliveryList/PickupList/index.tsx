import { useContext } from 'react';
import { LocalizationContext } from 'Services/LocalizationService';
import useGetFastestAndCheapestDelivery from 'Hooks/use-get-fastest-and-cheapest-delivery';
import { DeliveryMethod } from 'Services/OrderService/interfaces';
import { DeliveryMethodsPlacement } from 'Components/DeliveryMethods/types';
import { TEST_IDS } from 'Constants/test-ids';

import ShippingItem from '../../ShippingItem';
import DeliveryItem from '../../DeliveryItem';

import { VinistoOrderDllModelsApiDeliveryDelivery } from '@/api-types/order-api';

interface PickupListProps {
	pickups: VinistoOrderDllModelsApiDeliveryDelivery[];
	deliveryMethod: DeliveryMethod | null;
	setDeliveryMethod: (delivery: DeliveryMethod | null) => void;
	shouldShowPickupGroup: boolean;
	setShouldShowPickupGroup: (show: boolean) => void;
	showVinistoPlusLogo?: boolean;
}

const PickupList = ({
	pickups,
	deliveryMethod,
	setDeliveryMethod,
	shouldShowPickupGroup,
	setShouldShowPickupGroup,
	showVinistoPlusLogo = false,
}: PickupListProps) => {
	const t = useContext(LocalizationContext).useFormatMessage();

	const handleReset = () => setDeliveryMethod(null);

	const { soonestPickupDateAsString, cheapestPickupPriceAsString } =
		useGetFastestAndCheapestDelivery({ deliveries: pickups, monthName: false });

	const isChildItemSelected = pickups.some(
		(pickup) => pickup.id === deliveryMethod?.id
	);

	const selectPickupGroup = () => {
		setDeliveryMethod(null);
		setShouldShowPickupGroup(!shouldShowPickupGroup);
	};

	const isSomePickupsVinistoPlus = pickups.some(
		(pickup) => pickup?.isSubscriber === true
	);

	return (
		<>
			{pickups.length > 0 && !(!isChildItemSelected && deliveryMethod?.id) && (
				<ShippingItem
					onClick={selectPickupGroup}
					isLoading={false}
					isSelected={isChildItemSelected || shouldShowPickupGroup}
					title={`${t({ id: 'deliveryOptions.personal.parentTitle' })}`}
					titleContent={
						<div>{t({ id: 'deliveryOptions.personal.parentTitle' })}</div>
					}
					priceContent={
						isChildItemSelected
							? null
							: isSomePickupsVinistoPlus
							? cheapestPickupPriceAsString
							: `cena od: ${cheapestPickupPriceAsString}`
					}
					dateContent={
						isChildItemSelected
							? null
							: t(
									{ id: 'bundleAvailability.availablePickupDate' },
									{ day: `${soonestPickupDateAsString}` }
							  )
					}
					selectable={true}
					handleReset={() => {
						setShouldShowPickupGroup(false);
						handleReset();
					}}
					placement={DeliveryMethodsPlacement.CHECKOUT}
					isForSubscribersOnly={showVinistoPlusLogo}
				/>
			)}
			{(isChildItemSelected || shouldShowPickupGroup) &&
				pickups?.map((delivery, index) => (
					<DeliveryItem
						key={delivery?.id ?? 'cartshippaydelli3' + index}
						delivery={delivery}
						dataTestid={TEST_IDS.BASKET_SHIPPING_TYPE + '_' + delivery?.id}
						placement={DeliveryMethodsPlacement.CHECKOUT}
						showIcons={false}
						className={'ms-4'}
						selectedDelivery={deliveryMethod?.id}
					/>
				))}
		</>
	);
};

export default PickupList;
