import { MouseEvent, useContext, useRef } from 'react';
import cx from 'classnames';
import { get } from 'lodash-es';
import Link from 'next/link';
import Config from 'Config';
import getBundleImage, { IMAGE_SIZE_THUMB_64x80 } from 'Helpers/getBundleImage';
import useLocalizedValue from 'Hooks/useLocalizedValue';
import useLocalizedStreetAndNumber from 'Hooks/useLocalizedStreetAndNumber';
import { LocalizationContext } from 'Services/LocalizationService';
import { GoPayServiceContext } from 'Services/GoPayService';
import {
	VinistoHelperDllEnumsAddonAddonType,
	VinistoHelperDllEnumsCurrency,
	VinistoHelperDllEnumsOrderOrderState,
	VinistoHelperDllEnumsOrderPaymentType,
	VinistoOrderDllModelsApiOrderAddonItem,
	VinistoOrderDllModelsApiOrderOrder,
	VinistoOrderDllModelsApiReturnDataInvoicesReturn,
} from 'vinisto_api_client/src/api-types/order-api';
import BundleProducer from 'Components/ProductBox/Components/BundleProducer';
import DiscountCoupon from 'Components/DiscountCoupon/index';
import { DiscountCouponPageType } from 'Components/DiscountCoupon/interfaces';
import useBundleData from 'pages-spa/UserSection/Orders/Hooks/useBundleData';
import useAddItemsToBasket, {
	showBuyAgainButton,
} from 'Hooks/use-add-items-to-basket';
import userSectionStyles from 'pages-spa/UserSection/styles.module.css';
import useOrders from 'pages-spa/UserSection/Orders/Hooks/useOrders';
import { DeviceServiceContext } from 'Services/DeviceService';
import PaymentDetails from 'Components/PaymentDetails';
import Skeleton from 'react-loading-skeleton';
import { BundleIdAndQuantity } from 'Services/BasketService/interfaces';
import { getDiscountPriceValues } from 'vinisto_shared/src/price/get-discount-prices';
import { getLocalizedPrice } from 'vinisto_shared/src/price/get-localized-price';
import { usePlatformContext } from 'Services/PlatformService';
import { useQuery } from '@tanstack/react-query';
import { AuthenticationContext } from 'Services/AuthenticationService/context';
import OrderItemB2b from 'Components/OrderItem/OrderItemB2b';
import OrderItemB2c from 'Components/OrderItem/OrderItemB2c';
import {
	getCreationDate,
	getLocalizedOrderState,
} from 'pages-spa/UserSection/Orders/helpers';

import { getFilenameFromPath } from './helpers';
import styles from './styles.module.css';
import ProductMobile from './ProductMobile';
import ProductDesktop from './ProductDesktop';
import AddonDesktop from './AddonDesktop';
import Subscription from './Subscription';
import ContractWithdrawLink from './ContractWithdrawLink';

import api from '@/api';
import { B2B_NUMERIC_CODE } from '@/shared';

export interface OrderProps {
	isLoading?: boolean;
	order?: VinistoOrderDllModelsApiOrderOrder | null;
	handleOnClickInvoice?: (orderId: string, documentUrl: string) => () => void;
}

const Order = ({
	isLoading = false,
	order,
	handleOnClickInvoice,
}: OrderProps) => {
	const { withB2bQueryParams } = usePlatformContext();
	const goPayContext = useContext(GoPayServiceContext);
	const t = useContext(LocalizationContext).useFormatMessage();
	const { isMobile, isTablet } = useContext(DeviceServiceContext);
	const { loginHash: userLoginHash } = useContext(
		AuthenticationContext
	).vinistoUser;

	const getLocalizedValue = useLocalizedValue();
	const getStreetAndNumber = useLocalizedStreetAndNumber();
	const getBundleData = useBundleData();
	const paymentInfoRef = useRef<HTMLDivElement>(null);
	const { addItemsToBasket, isAddingItemsToBasket } = useAddItemsToBasket();

	const states = order?.state
		?.split(',')
		?.map((state: string) => state?.trim());
	const lastState = states?.[states?.length - 1];

	const { showCancelOrderBtn, handleOnClickCancelOrder } = useOrders(
		lastState,
		isLoading,
		order
	);

	const orderInvoicesQuery = useQuery({
		queryKey: ['orderInvoices', order?.id],
		queryFn: () =>
			api.get<VinistoOrderDllModelsApiReturnDataInvoicesReturn>(
				`order-api/invoices/order/${orderId}/get-invoices`,
				{
					UserLoginHash: userLoginHash,
				}
			),
		enabled: !!order?.id,
	});

	if (!order || !order.orderCurrency) return null;

	const orderId = order.id;
	const orderCurrency = order.orderCurrency;
	const orderNumber = order.orderNumber || orderId;
	const orderPlatform = order.platformId;
	const orderTotalPrice = order.orderPrice ?? 0;
	const orderTotalPriceWithVAT = order.orderPriceWithVat ?? 0;
	const discountCoupons = order.discountCoupons;
	const hasDocumentsAttached = !!orderInvoicesQuery.data?.count;
	const createdAtDate = getCreationDate(order.stateChangeRecords ?? []);
	const localizedState = getLocalizedOrderState(order?.state ?? '');

	const showPayOnlineBtn =
		lastState === VinistoHelperDllEnumsOrderOrderState.CREATED &&
		order?.payment?.goPayId &&
		!isLoading;

	const showPaymentInfo =
		lastState === VinistoHelperDllEnumsOrderOrderState.CREATED &&
		order?.payment?.paymentType ===
			VinistoHelperDllEnumsOrderPaymentType.BANK_TRANSFER &&
		!isLoading;

	const trackingLink = order.delivery?.trackingUrl ?? '';

	const isOrderCancelled = states?.includes(
		VinistoHelperDllEnumsOrderOrderState.CANCELLED
	);

	const handleOnClickPayOnline = (e: MouseEvent) => {
		e.stopPropagation();
		goPayContext.handleOnPayOnline({
			order,
			notificationUrl: `${process.env.NEXT_PUBLIC_API_URI}services-api/gopay/notify`,
			returnUrl: withB2bQueryParams(
				`${window.location.origin}/${t({
					id: 'routes.cart.confirmation.route',
				})}?oid=${order?.id}`
			),
		});
	};

	const handleOnClickScrollToPaymentInfo = (e: MouseEvent) => {
		e.stopPropagation();
		setTimeout(() => paymentInfoRef?.current?.scrollIntoView(), 1);
	};

	const itemsToAdd: BundleIdAndQuantity[] = order?.orderItems.map(
		(orderItem) => {
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
		}
	);

	const isB2bOrder = orderPlatform === B2B_NUMERIC_CODE;

	return (
		<div className={styles.order}>
			{isMobile || isTablet ? (
				<>
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
								color: localizedState?.color ?? '',
							}}
						>
							{isLoading ? (
								<Skeleton width="120px" />
							) : (
								t({ id: localizedState.text })
							)}
						</div>
					</div>
					<div className={cx(styles.spaceBetween, styles.delimiter)}>
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
										price: isB2bOrder
											? orderTotalPrice
											: orderTotalPriceWithVAT,
										currency: orderCurrency,
									})
								)}
							</span>
						</div>
						<div className={styles.date}>
							{isLoading ? <Skeleton width="85px" /> : createdAtDate}
						</div>
					</div>
				</>
			) : isB2bOrder ? (
				<OrderItemB2b
					isLoading={isLoading}
					order={order}
					handleOnClickPayOnline={handleOnClickPayOnline}
					showDetailButton={false}
					orderNumberAsLink={false}
					className="mb-3"
				/>
			) : (
				<OrderItemB2c
					isLoading={isLoading}
					order={order}
					handleOnClickPayOnline={handleOnClickPayOnline}
					showDetailButton={false}
					orderNumberAsLink={false}
				/>
			)}
			{(isMobile || isTablet) && (
				<div className={styles.buttons}>
					{showPayOnlineBtn && (
						<button
							className={styles.primaryButton}
							onClick={handleOnClickPayOnline}
						>
							{t({ id: 'userSection.order.btn.payOnline' })}
						</button>
					)}
					{showPaymentInfo && (
						<button
							className={styles.primaryButton}
							onClick={handleOnClickScrollToPaymentInfo}
						>
							{t({ id: 'userSection.order.btn.paymentInfo' })}
						</button>
					)}
					{!showBuyAgainButton(order) && trackingLink && (
						<a
							href={trackingLink}
							className={styles.linkButton}
						>
							Sledovat zásilku
						</a>
					)}
					{showBuyAgainButton(order) && (
						<button
							className={styles.primaryButton}
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
				</div>
			)}
			{hasDocumentsAttached && !isOrderCancelled && (
				<>
					<h2 className={userSectionStyles.userSectionHeader}>
						{t({ id: 'userSection.documents' })}
					</h2>
					<div className={styles.documentsContainer}>
						<div className={styles.documents}>
							{orderInvoicesQuery.data?.invoices?.map((invoice) => (
								<button
									key={invoice.id}
									onClick={
										handleOnClickInvoice &&
										handleOnClickInvoice(orderId, `${invoice.path}`)
									}
									className={styles.documentLink}
								>
									{getFilenameFromPath(`${invoice.path}`)}
								</button>
							))}
						</div>
						<ContractWithdrawLink order={order} />
					</div>
				</>
			)}
			{showPaymentInfo && isB2bOrder && (
				<div ref={paymentInfoRef}>
					<h2 className={userSectionStyles.userSectionHeader}>
						{t({
							id: 'cartShippingPayment.paymentInfo',
						})}
					</h2>
					<PaymentDetails
						orderId={orderId}
						orderNumber={orderNumber}
						orderPrice={orderTotalPriceWithVAT}
						orderCurrency={orderCurrency}
					/>
				</div>
			)}
			<h2 className={userSectionStyles.userSectionHeader}>
				{t({ id: 'orderConfirmation.orderSummary.title' })}
			</h2>
			<div>
				{order?.orderItems?.map((orderItem, index: number) => {
					const { flagComponent, url, quantity, producerSpecification } =
						getBundleData(orderItem);

					const basePrice = orderItem.bundle?.price;
					const discountedPrice = orderItem.bundle?.discountPrice;

					const bundleQuantity = orderItem.quantity ?? 1;

					const { discountedPriceWithoutVat, discountedPriceWithVat } =
						getDiscountPriceValues({
							quantityInBasket: bundleQuantity,
							basePrice,
							discountedPrice,
						});

					const priceWithVat =
						discountedPriceWithVat ?? basePrice?.valueWithVat;

					const priceWithoutVat = discountedPriceWithoutVat ?? basePrice?.value;

					const totalPriceWithVAT = (priceWithVat ?? 0) * quantity;

					const totalPriceWithoutVAT = (priceWithoutVat ?? 0) * quantity;

					return isMobile || isTablet ? (
						<ProductMobile
							key={`order-item-mobile-bundle-${orderItem.bundle.id}-${index}`}
							isLoading={isLoading}
							orderItem={orderItem}
							index={index}
							url={url}
							flagComponent={flagComponent}
							producerSpecification={producerSpecification}
							quantity={quantity}
							totalPriceWithVAT={totalPriceWithVAT}
							orderCurrency={orderCurrency}
							totalPriceWithoutVAT={totalPriceWithoutVAT}
							isB2bOrder={order.platformId === B2B_NUMERIC_CODE}
						/>
					) : (
						<ProductDesktop
							key={`order-item-mobile-bundle-${orderItem.bundle.id}-${index}`}
							isLoading={isLoading}
							orderItem={orderItem}
							index={index}
							url={url}
							flagComponent={flagComponent}
							producerSpecification={producerSpecification}
							quantity={quantity}
							totalPriceWithVAT={totalPriceWithVAT}
							totalPriceWithoutVAT={totalPriceWithoutVAT}
							orderCurrency={orderCurrency}
							itemPriceWithVAT={priceWithVat ?? 0}
							itemPriceWithoutVAT={priceWithoutVat ?? 0}
							isB2bOrder={order.platformId === B2B_NUMERIC_CODE}
						/>
					);
				})}
			</div>
			<div>
				{order?.addons?.map((addonItem, index: number) => {
					const addon = addonItem.addon;
					const quantity = addonItem.quantity ?? 1;

					if (
						!addon ||
						addon.type === VinistoHelperDllEnumsAddonAddonType.Service
					)
						return;

					if (
						addon.type ===
							VinistoHelperDllEnumsAddonAddonType.SubscriptionMonth ||
						addon.type === VinistoHelperDllEnumsAddonAddonType.SubscriptionYear
					) {
						return (
							<Subscription
								addonItem={addonItem}
								key={`subscription-item-${addon?.id}-${index}`}
							/>
						);
					}

					const actions = addon?.actions?.[0];
					// @ts-expect-error TS error: Property 'bundle' does not exist on type 'VinistoOrderDllModelsApiOrderAddonItem'.
					const bundle = actions?.bundle ?? null;

					const { flagComponent, url, producerSpecification } = getBundleData(
						actions ?? {}
					);

					return isMobile || isTablet ? (
						<div
							className={styles.product}
							key={`order-item-mobile-${addon?.id}-${index}`}
						>
							{!isLoading && (
								<Link
									className={styles.overlay}
									href={`/${t({
										id: 'routes.product.route',
									})}/${url}`}
								/>
							)}
							<div className={styles.productImg}>
								<img
									src={getBundleImage(
										[bundle?.mainImage ?? {}],
										IMAGE_SIZE_THUMB_64x80
									)}
									alt={`${t({
										id: 'alt.bundleImage',
									})}`}
								/>
							</div>
							<div className={styles.productName}>{bundle?.name ?? ''}</div>
							<div className={styles.productProducer}>
								<BundleProducer
									flag={flagComponent}
									name={producerSpecification}
								/>
							</div>
							<div className={styles.productCount}>
								{t(
									{ id: 'order.pcs' },
									{
										count: quantity,
									}
								)}
							</div>
							<div className={styles.productPrice}>
								{t({ id: 'giftInfo.price.freeSmall' })}
							</div>
						</div>
					) : (
						<AddonDesktop
							key={`addon-item-${addon.id}-${index}`}
							isLoading={isLoading}
							addonItem={addon}
							index={index}
							url={url}
							quantity={quantity}
						/>
					);
				})}
			</div>
			{discountCoupons &&
				discountCoupons?.map((discountCoupon, index: number) => {
					return (
						<DiscountCoupon
							key={'usodeto' + index}
							discountCoupon={discountCoupon}
							discountCouponPage={DiscountCouponPageType.USER_SECTION}
							className={styles.discountCoupon}
							orderCurrency={orderCurrency}
						/>
					);
				})}
			<ShippingPackagingItem
				addons={order?.addons}
				currency={orderCurrency}
			/>
			<div className={styles.shipping}>
				<span>
					{t(
						{ id: 'userSection.order.delivery.title' },
						{
							value: getLocalizedValue(order?.delivery?.name ?? []),
						}
					)}
				</span>
				<span>
					{get(order, 'delivery.price.value') === 0
						? t({ id: 'basket.price.free' })
						: getLocalizedPrice({
								price: get(order, 'delivery.price.valueWithVat') ?? 0,
								currency: orderCurrency,
						  })}
				</span>
			</div>
			<div className={styles.payment}>
				<span>
					{t(
						{ id: 'userSection.order.payment.title' },
						{
							value: getLocalizedValue(get(order, 'payment.name', [])),
						}
					)}
				</span>
				<span>
					{get(order, 'payment.price.value') === 0
						? t({ id: 'basket.price.free' })
						: getLocalizedPrice({
								price: get(order, 'payment.price.valueWithVat') ?? 0,
								currency: orderCurrency,
						  })}
				</span>
			</div>
			{showPaymentInfo && !isB2bOrder && (
				<div className="vinisto-user-orders__orders__order-body__item flex-column">
					<div
						className="vinisto-user-orders__orders__order-body__item-payment-info"
						ref={paymentInfoRef}
					>
						<div className="vinisto-user-orders__orders__order-body__item__info d-flex flex-column align-items-start">
							<div className="mb-2">
								<strong>
									{t({
										id: 'cartShippingPayment.paymentInfo',
									})}
								</strong>
							</div>
							<dl className={styles.paymentDetails}>
								<dt>
									{t({
										id: 'cartShippingPayment.accountNumber',
									})}
									/
									{t({
										id: 'cartShippingPayment.bankAccount.code',
									})}
								</dt>
								<dd>
									{orderCurrency === VinistoHelperDllEnumsCurrency.EUR
										? Config.market.bankAccountEUR
										: Config.market.bankAccount}
								</dd>
								<dt>
									{t({
										id: 'cartShippingPayment.varSymbol',
									})}
								</dt>
								<dd>
									<strong>{orderNumber}</strong>
								</dd>
								<dt>
									{t({
										id: 'cartShippingPayment.payment',
									})}
								</dt>
								<dd>
									<strong>
										{getLocalizedPrice({
											price: orderTotalPriceWithVAT,
											currency: orderCurrency,
										})}
									</strong>
								</dd>
							</dl>
						</div>

						<div className="vinisto-user-orders__orders__order-body__item__prices">
							<div className="vinisto-user-orders__orders__order-body__item__prices__shipping">
								<img
									src={`${Config.baseUrl}order-api/orders/${orderId}/GetQrCode/img.png`}
									alt="qr"
									className={styles.qrCode}
								/>
							</div>
						</div>

						<div className="vinisto-user-orders__orders__order__spacer"></div>
					</div>
				</div>
			)}
			<h2 className={userSectionStyles.userSectionHeader}>
				{t({
					id: 'orderConfirmation.orderSummary.address.deliveryShipping.title',
				})}
			</h2>
			<div>
				{order?.delivery?.pickupPoint && (
					<div className={styles.address}>
						<div className={styles.addressTitle}>
							{t({
								id: 'userSection.order.shippingDetails.title',
							})}
						</div>
						<div>{order?.delivery?.pickupPoint?.addressee}</div>
						<div>{order?.delivery?.pickupPoint?.email}</div>
						<div>{order?.delivery?.pickupPoint?.phone}</div>
						<div>{getStreetAndNumber(order.delivery.pickupPoint ?? {})}</div>
						{/* @ts-expect-error  city does not exist on the interface */}
						<div>{order?.delivery?.pickupPoint?.city}</div>
						{/* @ts-expect-error  zip does not exist on the interface */}
						<div>{order?.delivery?.pickupPoint?.zip}</div>
						<div>{order?.delivery?.pickupPoint?.code}</div>
					</div>
				)}
				{order?.delivery?.deliveryAddress && (
					<div className={styles.address}>
						<div className={styles.addressTitle}>
							{t({
								id: 'userSection.order.shippingDetails.title',
							})}
						</div>
						<div>
							{`${order?.delivery?.deliveryAddress?.name} ${order?.delivery?.deliveryAddress?.surname}`}
						</div>
						<div>{order?.delivery?.deliveryAddress?.email}</div>
						<div>{order?.delivery?.deliveryAddress?.phone}</div>
						<div>
							{getStreetAndNumber(order.delivery.deliveryAddress ?? {})}
						</div>
						<div>{order?.delivery?.deliveryAddress?.city}</div>
						<div>{order?.delivery?.deliveryAddress?.zip}</div>
						<div>{order?.delivery?.deliveryAddress?.countryCode}</div>
					</div>
				)}
				<div className={styles.address}>
					<div className={styles.addressTitle}>
						{t({
							id: 'userSection.order.billingInfo.title',
						})}
					</div>
					<div>
						{`${order?.billingAddress?.name} ${order?.billingAddress?.surname}`}
					</div>
					<div>{order?.billingAddress?.email}</div>
					<div>{order?.billingAddress?.phone}</div>
					<div>{getStreetAndNumber(order.billingAddress ?? {})}</div>
					<div>{order?.billingAddress?.city}</div>
					<div>{order?.billingAddress?.zip}</div>
					<div>{order?.billingAddress?.countryCode}</div>
				</div>
			</div>
			{showCancelOrderBtn && (
				<div>
					<button
						className={cx(
							'underline-effect underline-effect--vinisto fw-bolder',
							styles.cancelOrderBtn
						)}
						onClick={handleOnClickCancelOrder}
					>
						<span className="underline-item">
							{t({ id: 'userSection.order.btn.cancel' })}
						</span>
					</button>
				</div>
			)}
		</div>
	);
};

export default Order;

interface ShippingPackagingItemProps {
	addons?: VinistoOrderDllModelsApiOrderAddonItem[] | null;
	currency: VinistoHelperDllEnumsCurrency;
}
const ShippingPackagingItem = ({
	addons,
	currency,
}: ShippingPackagingItemProps) => {
	const t = useContext(LocalizationContext).useFormatMessage();

	const shippingPackaging = addons?.find(
		(addon) => addon.addon?.type === 'Service'
	);
	const shippingPackagingName = shippingPackaging?.addon?.name ?? '';
	const shippingPackagingPrice =
		shippingPackaging?.addon?.actions?.[0]?.price?.valueWithVat ?? 0;

	if (!shippingPackaging) return null;

	return (
		<div className={styles.shipping}>
			<span>
				{t(
					{ id: 'basket.packaging.title.value' },
					{
						value: shippingPackagingName,
					}
				)}
			</span>
			<span>
				{shippingPackagingPrice === 0
					? t({ id: 'basket.price.free' })
					: getLocalizedPrice({
							price: shippingPackagingPrice ?? 0,
							currency,
					  })}
			</span>
		</div>
	);
};
