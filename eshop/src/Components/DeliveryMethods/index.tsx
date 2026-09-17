import { VinistoOrderDllModelsApiDeliveryDelivery } from 'vinisto_api_client/src/api-types/order-api';
import { LocalizationContext } from 'Services/LocalizationService';
import { useContext } from 'react';
import DeliveryItem from 'pages-spa/CartShippingPayment/Components/DeliveryItem';
import cx from 'classnames';
import useGetFastestAndCheapestDelivery from 'Hooks/use-get-fastest-and-cheapest-delivery';
import ShippingItem from 'pages-spa/CartShippingPayment/Components/ShippingItem';
import { VinistoHelperDllEnumsOrderDeliveryType } from 'vinisto_api_client/src/api-types/warehouse-api';

import styles from './styles.module.css';
import { DeliveryMethodsPlacement } from './types';

interface DeliveryMethodsProps {
	deliveries: VinistoOrderDllModelsApiDeliveryDelivery[];
	isLoading?: boolean;
	selectable?: boolean;
	monthName?: boolean;
	placement?: DeliveryMethodsPlacement;
	showIcons?: boolean;
}

const DeliveryMethods = ({
	deliveries,
	isLoading = false,
	selectable = false,
	monthName = true,
	placement = DeliveryMethodsPlacement.PRODUCT_DETAIL,
	showIcons = true,
}: DeliveryMethodsProps) => {
	const t = useContext(LocalizationContext).useFormatMessage();

	// in order to not spend half a day on refactoring, we just overwrite the name property with alternativeName
	// this ensures that the correct name is rendered for this non-checkout delivery list
	const filteredDeliveries = deliveries
		?.filter((delivery) => delivery.isOnProductDetail)
		.map((delivery) => ({
			...delivery,
			name: delivery.alternativeName ?? [],
		}));

	// Ensure there's only one unique object with each deliveryCode
	const uniqueDeliveries = filteredDeliveries.reduce((acc, current) => {
		const existingDeliveryIndex = acc.findIndex(
			(item) => item.deliveryCode === current.deliveryCode
		);

		if (existingDeliveryIndex === -1) {
			// If no delivery with this code exists yet, add it
			acc.push(current);
		}

		return acc;
	}, [] as VinistoOrderDllModelsApiDeliveryDelivery[]);

	const pickups = uniqueDeliveries.filter(
		(delivery) =>
			delivery.deliveryType === VinistoHelperDllEnumsOrderDeliveryType.PICKUP
	);

	const otherDeliveries = uniqueDeliveries.filter(
		(delivery) =>
			delivery.deliveryType !== VinistoHelperDllEnumsOrderDeliveryType.PICKUP
	);

	const { soonestPickupDateAsString, cheapestPickupPriceAsString } =
		useGetFastestAndCheapestDelivery({ deliveries: pickups });

	return (
		<>
			<p
				className={cx(styles.title, {
					[styles.cartTitleHeading]:
						placement === DeliveryMethodsPlacement.CART ||
						placement === DeliveryMethodsPlacement.CHECKOUT,
					[styles.productDetailTitleHeading]:
						placement === DeliveryMethodsPlacement.PRODUCT_DETAIL,
				})}
			>
				{t({ id: 'productDetail.deliveryMethods' })}
			</p>
			<div
				className={cx(styles.list, {
					[styles.cartTitle]:
						placement === DeliveryMethodsPlacement.CART ||
						placement === DeliveryMethodsPlacement.CHECKOUT,
					[styles.productDetailTitle]:
						placement === DeliveryMethodsPlacement.PRODUCT_DETAIL,
				})}
			>
				{otherDeliveries?.map(
					(delivery: VinistoOrderDllModelsApiDeliveryDelivery) => (
						<div key={delivery?.id || 'dv'}>
							<DeliveryItem
								key={delivery?.id || 'dv'}
								delivery={delivery}
								isLoading={isLoading}
								selectable={selectable}
								monthName={monthName}
								placement={placement}
								showIcons={showIcons}
							/>
						</div>
					)
				)}
				{pickups.length > 0 && (
					// TODO: In the future, it might be desirable to abstract this to a <DeliveryItemGroup /> component
					<ShippingItem
						isLoading={false}
						title={`${t({ id: 'deliveryOptions.personal.parentTitle' })}`}
						titleContent={
							<div>{t({ id: 'deliveryOptions.personal.parentTitle' })}</div>
						}
						priceContent={`cena od: ${cheapestPickupPriceAsString}`}
						dateContent={t(
							{ id: 'bundleAvailability.availablePickupDateFrom' },
							{ day: `${soonestPickupDateAsString}` }
						)}
						selectable={false}
						placement={placement}
						showIcons={false}
					/>
				)}
			</div>
		</>
	);
};

export default DeliveryMethods;
