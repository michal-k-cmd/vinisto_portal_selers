import cx from 'classnames';
import Link from 'next/link';
import { getLocalizedPrice } from 'vinisto_shared/src/price/get-localized-price';
import { LocalizationContext } from 'Services/LocalizationService';
import { useContext } from 'react';
import { GoPayServiceContext } from 'Services/GoPayService';
import Loading from 'Components/OrderItem/OrderItemB2c/loading';
import { DeviceServiceContext } from 'Services/DeviceService';
import {
	getCreationDate,
	getLocalizedOrderState,
} from 'pages-spa/UserSection/Orders/helpers';
import useAddItemsToBasket, {
	showBuyAgainButton as shouldShowBuyAgainButton,
} from 'Hooks/use-add-items-to-basket';
import { BundleIdAndQuantity } from 'Services/BasketService/interfaces';

import styles from './styles.module.css';

import {
	VinistoHelperDllEnumsAddonAddonType,
	VinistoOrderDllModelsApiOrderAddonItem,
	VinistoOrderDllModelsApiOrderOrder,
	VinistoOrderDllModelsApiOrderOrderItem,
	VinistoOrderDllModelsApiOrderOrderWithInvoice,
} from '@/api-types/order-api';
import { VinistoHelperDllEnumsOrderOrderState } from '@/api-types/product-api';

export interface OrderItemProps {
	order:
		| VinistoOrderDllModelsApiOrderOrder
		| (VinistoOrderDllModelsApiOrderOrderWithInvoice & {
				orderItems?: VinistoOrderDllModelsApiOrderOrderItem[] | null;
				addons?: VinistoOrderDllModelsApiOrderAddonItem[] | null;
				delivery: null;
		  });
	isLoading: boolean;
	orderNumberAsLink?: boolean;
	handleOnClickPayOnline?: (e: React.MouseEvent<HTMLButtonElement>) => void;
	showDetailButton?: boolean;
	className?: string;
}

// TODO handle loading (error) state better
const OrderItemB2c = ({
	order,
	isLoading,
	orderNumberAsLink = true,
	handleOnClickPayOnline,
	showDetailButton = true,
	className,
}: OrderItemProps) => {
	const t = useContext(LocalizationContext).useFormatMessage();
	const goPayContext = useContext(GoPayServiceContext);
	const { isDesktop } = useContext(DeviceServiceContext);

	const { addItemsToBasket, isAddingItemsToBasket } = useAddItemsToBasket();

	const itemsToAdd: BundleIdAndQuantity[] =
		order.orderItems?.map((orderItem) => {
			const id = orderItem?.bundle?.id ?? '';

			return {
				bundleId: id,
				quantity: orderItem.quantity ?? 1,
				bundleMetaForAnalytics: {
					// TODO - Find a way to get the correct price of the item
					price: 0,
					item_name: orderItem.bundle.name,
					item_brand: orderItem.bundle.producerSpecification?.value ?? '',
				},
			};
		}) ?? [];

	const handleOnRetryPayment = () =>
		goPayContext.handleOnPayOnline({
			order: order,
			notificationUrl: `${process.env.NEXT_PUBLIC_API_URI}services-api/gopay/notify`,
			returnUrl: `${window.location.origin}/${t({
				id: 'routes.user-section.route',
			})}/${t({ id: 'routes.user-section.vinistoplus.route' })}?oid=${
				order.id
			}`,
		});

	const isSubscriptionOrder =
		order.orderItems &&
		order.orderItems.length === 0 &&
		order.addons?.every((addonItem) =>
			[
				VinistoHelperDllEnumsAddonAddonType.SubscriptionMonth,
				VinistoHelperDllEnumsAddonAddonType.SubscriptionYear,
			].includes(addonItem.addon?.type as VinistoHelperDllEnumsAddonAddonType)
		);

	const showBuyAgainButton = shouldShowBuyAgainButton(order);

	const createdAtDate = getCreationDate(order.stateChangeRecords ?? []);
	const localizedState = getLocalizedOrderState(order.state ?? '');
	const trackingLink =
		order && 'delivery' in order ? order.delivery?.trackingUrl ?? '' : '';
	const lastState = (order.stateChangeRecords ?? [])[
		(order.stateChangeRecords ?? []).length - 1
	];

	const showPayOnlineBtn = Boolean(
		!isLoading &&
			lastState &&
			lastState.state === VinistoHelperDllEnumsOrderOrderState.CREATED &&
			order.payment?.goPayId
	);

	if (isLoading) return <Loading isDesktop />;

	if (isDesktop)
		return (
			<div className={cx(styles.orderDesktop, className)}>
				<div className={styles.orderNumber}>
					{orderNumberAsLink ? (
						<Link
							href={`/uzivatelska-sekce/objednavky?id=${order.id}`}
							className={styles.orderNumberLink}
						>
							Objednávka č. {order.orderNumber}
						</Link>
					) : (
						<>Objednávka č. {order.orderNumber}</>
					)}
				</div>
				<div
					className={styles.orderState}
					style={{
						color: localizedState.color ?? '',
					}}
				>
					{t({ id: localizedState.text })}
				</div>
				<div className={styles.orderCreatedAtDate}>{createdAtDate}</div>
				<div className={styles.orderPriceWrapper}>
					Celková cena{' '}
					<span className={styles.orderPrice}>
						{getLocalizedPrice({
							price: order.orderPriceWithVat,
							currency: order.orderCurrency,
						})}
					</span>
				</div>
				<div className={styles.buttons}>
					{showPayOnlineBtn && handleOnClickPayOnline && (
						<button
							className={styles.buyAgainButton}
							onClick={
								isSubscriptionOrder
									? handleOnRetryPayment
									: handleOnClickPayOnline
							}
						>
							Zaplatit online
						</button>
					)}
					{!showBuyAgainButton && trackingLink && (
						<a
							href={trackingLink}
							className={styles.button}
						>
							Sledovat zásilku
						</a>
					)}
					{showBuyAgainButton && itemsToAdd.length > 0 && (
						<button
							className={styles.buyAgainButton}
							disabled={isAddingItemsToBasket}
							aria-busy={isAddingItemsToBasket}
							onClick={async () => await addItemsToBasket(itemsToAdd)}
						>
							{t({
								id: isAddingItemsToBasket
									? 'userSection.order.btn.orderAgainLoading'
									: 'userSection.order.btn.orderAgain',
							})}
						</button>
					)}
					{showDetailButton && (
						<Link
							href={`/uzivatelska-sekce/objednavky?id=${order.id}`}
							className={styles.linkButton}
						>
							Podrobnosti
						</Link>
					)}
				</div>
			</div>
		);

	return (
		<>
			<div className={styles.orderGrid}>
				<div>
					<div className={styles.orderNumber}>
						Objednávka č. {order.orderNumber}
					</div>
					<div className={styles.orderPriceWrapper}>
						Celková cena{' '}
						<span className={styles.orderPrice}>
							{getLocalizedPrice({
								price: order.orderPriceWithVat,
								currency: order.orderCurrency,
							})}
						</span>
					</div>
				</div>
				<div>
					<div
						className={styles.orderState}
						style={{
							color: localizedState.color ?? '',
						}}
					>
						{t({ id: localizedState.text })}
					</div>
					<div className={styles.orderCreatedAtDate}>{createdAtDate}</div>
				</div>
			</div>

			<div className={styles.buttons}>
				{!showBuyAgainButton && trackingLink && (
					<a
						href={trackingLink}
						className={styles.button}
					>
						Sledovat zásilku
					</a>
				)}
				{showBuyAgainButton && itemsToAdd.length > 0 && (
					<button
						className={styles.buyAgainButton}
						disabled={isAddingItemsToBasket}
						aria-busy={isAddingItemsToBasket}
						onClick={async () => await addItemsToBasket(itemsToAdd)}
					>
						{t({
							id: isAddingItemsToBasket
								? 'userSection.order.btn.orderAgainLoading'
								: 'userSection.order.btn.orderAgain',
						})}
					</button>
				)}
				{showDetailButton && (
					<Link
						href={`/uzivatelska-sekce/objednavky?id=${order.id}`}
						className={styles.linkButton}
					>
						Podrobnosti
					</Link>
				)}
			</div>
		</>
	);
};
export default OrderItemB2c;
