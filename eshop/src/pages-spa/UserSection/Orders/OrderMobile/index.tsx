import { useContext } from 'react';
import { get } from 'lodash-es';
import Skeleton from 'react-loading-skeleton';
import getBundleImage, { IMAGE_SIZE_THUMB_64x80 } from 'Helpers/getBundleImage';
import { LocalizationContext } from 'Services/LocalizationService';
import Link from 'next/link';
import useAddItemsToBasket, {
	showBuyAgainButton,
} from 'Hooks/use-add-items-to-basket';
import { BundleIdAndQuantity } from 'Services/BasketService/interfaces';
import { getLocalizedPrice } from 'vinisto_shared/src/price/get-localized-price';

import { SKELETONS_NUM_BUNDLES } from '../constants';
import { getCreationDate, getLocalizedOrderState } from '../helpers';

import styles from './styles.module.css';

import {
	VinistoOrderDllModelsApiOrderOrder,
	VinistoOrderDllModelsApiOrderOrderItem,
	VinistoOrderDllModelsApiOrderOrderWithInvoice,
} from '@/api-types/order-api';
import { B2B_NUMERIC_CODE } from '@/shared';

export interface OrderProps {
	order?:
		| VinistoOrderDllModelsApiOrderOrder
		| (VinistoOrderDllModelsApiOrderOrderWithInvoice & {
				orderItems: VinistoOrderDllModelsApiOrderOrderItem[] | undefined;
				delivery: null;
		  });
	isLoading?: boolean;
}

const OrderMobile = ({ order, isLoading = false }: OrderProps) => {
	const localizationContext = useContext(LocalizationContext);

	const t = localizationContext.useFormatMessage();

	const orderId = order?.id;
	const orderDate = getCreationDate(order?.stateChangeRecords ?? []);
	const orderCurrency = order?.orderCurrency;
	const orderState = getLocalizedOrderState(order?.state ?? '');
	const orderNumber = order?.orderNumber || orderId;
	const orderTotalPrice = order?.orderPrice ?? 0;
	const orderTotalPriceWithVAT = order?.orderPriceWithVat ?? 0;
	const orderItems = order?.orderItems;
	const isB2bOrder = order?.platformId === B2B_NUMERIC_CODE;
	const trackingLink = order?.delivery?.trackingUrl ?? '';

	const { addItemsToBasket, isAddingItemsToBasket } = useAddItemsToBasket();

	const itemsToAdd: BundleIdAndQuantity[] =
		(orderItems ?? []).map((orderItem) => {
			const id = orderItem?.bundle?.id ?? '';

			return {
				bundleId: id,
				quantity: orderItem.quantity ?? 1,
				// TODO Add proper meta
				bundleMetaForAnalytics: {
					item_name: orderItem.bundle.name,
					item_brand: '',
					price:
						// @ts-expect-error possibly no valueWithVat
						orderItem.bundle.discountPrice?.valueWithVat ??
						orderItem.bundle.price?.valueWithVat ??
						0,
				},
			};
		}) ?? [];

	return (
		<div className={styles.order}>
			<div className={styles.spaceBetween}>
				<div className={styles.orderNumber}>
					{isLoading ? (
						<Skeleton width="180px" />
					) : (
						t({ id: 'userSection.order.title' }, { value: orderNumber })
					)}
				</div>
				<div
					className={styles.orderStatus}
					style={{
						color: orderState?.color ?? '',
					}}
				>
					{isLoading ? (
						<Skeleton width="120px" />
					) : (
						t({ id: orderState?.text ?? 'userSection.order.state.unknown' })
					)}
				</div>
			</div>
			<div className={styles.spaceBetween}>
				<div>
					<span className={styles.priceInfo}>
						{`${t({
							id: 'userSection.order.price.total.mobile',
						})} `}
					</span>
					<span className={styles.totalPrice}>
						{isLoading ? (
							<Skeleton width="160px" />
						) : (
							getLocalizedPrice({
								price: isB2bOrder ? orderTotalPrice : orderTotalPriceWithVAT,
								currency: orderCurrency,
							})
						)}
					</span>
				</div>
				<div className={styles.date}>
					{isLoading ? <Skeleton width="85px" /> : orderDate}
				</div>
			</div>
			<div className={styles.productsPreview}>
				{isLoading
					? Array(SKELETONS_NUM_BUNDLES).map((index: number) => (
							<div key={`order-item-mobile-bundle-${index}-skeleton`}>
								<Skeleton
									width="28px"
									height="3.125rem"
								/>
							</div>
					  ))
					: orderItems?.map((orderItem, index: number) => (
							<div
								className={styles.productPreview}
								key={`order-item-mobile-bundle-${get(
									orderItem,
									'bundle.id',
									index
								)}-closed`}
							>
								<div className={styles.productPreviewCount}>
									{orderItem.quantity ?? 0}
								</div>
								<img
									src={getBundleImage(
										[get(orderItem, 'bundle.mainImage', {})],
										IMAGE_SIZE_THUMB_64x80
									)}
									alt={`${t({ id: 'alt.bundleImage' })}`}
								/>
							</div>
					  ))}
			</div>
			<div className={styles.buttons}>
				{!showBuyAgainButton(order) && trackingLink && (
					<a
						href={trackingLink}
						className={styles.detailsButton}
					>
						Sledovat zásilku
					</a>
				)}
				{showBuyAgainButton(order) && (
					<button
						className={styles.buyAgainButton}
						disabled={isLoading || isAddingItemsToBasket}
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
				<Link
					className={styles.detailsButton}
					href={`/${t({ id: 'routes.user-section.route' })}/${t({
						id: 'routes.user-section.orders.route',
					})}?id=${orderId}`}
				>
					{t({ id: 'userSection.order.btn.details' })}
				</Link>
			</div>
		</div>
	);
};

export default OrderMobile;
