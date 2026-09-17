import { UseQueryResult } from '@tanstack/react-query';
import { LocalizationContext } from 'Services/LocalizationService';
import { useContext } from 'react';
import { useIsB2b } from 'Services/PlatformService';

import styles from '../BasketItems/styles.module.css';
import BasketSubscription from '../BasketItems/BasketSubscription';

import OrderCoupons from './OrderCoupons';
import OrderItem from './OrderItem';
import OrderAddon from './OrderAddon';

import { Order } from '@/domain/order';
import {
	VinistoHelperDllEnumsAddonAddonType,
	VinistoOrderDllModelsApiOrderAddon,
} from '@/api-types/order-api';
import { VinistoHelperDllEnumsCurrency } from '@/api-types/product-api';
import { Currency } from '@/api-types/addons-api';

interface OrderItemsProps {
	orderQuery: UseQueryResult<void | Order | null, unknown>;
}

const OrderItems = ({ orderQuery }: OrderItemsProps) => {
	const t = useContext(LocalizationContext).useFormatMessage();
	const isB2b = useIsB2b();
	const orderNumber = orderQuery.data?.orderNumber;

	const isSubscriptionAddon = (
		addon: VinistoOrderDllModelsApiOrderAddon | null | undefined
	) =>
		addon &&
		(addon?.type === VinistoHelperDllEnumsAddonAddonType.SubscriptionMonth ||
			addon?.type === VinistoHelperDllEnumsAddonAddonType.SubscriptionYear);

	const subscriptionAddons = orderQuery.data?.addons?.filter((item) =>
		isSubscriptionAddon(item?.addon)
	);
	// TO CONSIDER: are those really only Gift type addons?
	const giftAddons = orderQuery.data?.addons?.filter(
		(item) => item.addon?.type === VinistoHelperDllEnumsAddonAddonType.Gift
	);

	return (
		<div className={styles.basketItems}>
			<p className={styles.mobileHeading}>
				{t({ id: 'basket.summaryMobile' })}
				{isB2b && orderNumber && (
					<span className={styles.printOrderNumber}>
						{' '}
						{t({ id: 'basket.summary.orderNumber' }, { orderNumber })}
					</span>
				)}
			</p>
			{subscriptionAddons?.map((item) => {
				const subscriptionPrice = item.addon?.actions?.find(
					(action) => action.price
				)?.price;

				const addon = item.addon;

				if (!addon) return null;

				return (
					<BasketSubscription
						key={addon.id}
						item={{
							...addon,
							addonId: addon.id ?? '',
							type: addon.type ?? '',
							price: subscriptionPrice?.value,
							priceWithVat: subscriptionPrice?.valueWithVat,
							currency: addon.currency
								? Currency[addon.currency]
								: Currency.CZK,
						}}
						currency={addon.currency || VinistoHelperDllEnumsCurrency.CZK}
					/>
				);
			})}
			{orderQuery.data?.orderItems?.map((item) => (
				<OrderItem
					key={item.bundle.id}
					item={item}
				/>
			))}
			{giftAddons?.map((item) => (
				<OrderAddon
					key={item.addon?.id}
					item={item}
				/>
			))}
			<OrderCoupons orderQuery={orderQuery} />
		</div>
	);
};

export default OrderItems;
