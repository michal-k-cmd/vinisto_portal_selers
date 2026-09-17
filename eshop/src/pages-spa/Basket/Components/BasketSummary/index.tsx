import { useCallback, useContext, useEffect, useRef, useState } from 'react';
import cx from 'classnames';
import FreeDeliveryProgressBar from 'Components/FreeDeliveryProgressBar';
import { OrderContext } from 'Services/OrderService/context';
import {
	useGetAllowedPayments,
	useGetDeliveriesByBasket,
} from 'Hooks/useGetDeliveries';
import { AuthenticationContext } from 'Services/AuthenticationService/context';
import { LocalizationContext } from 'Services/LocalizationService';
import { BasketContext } from 'Services/BasketService';
import { getLocalizedValue } from 'Hooks/useLocalizedValue';
import { getLocalizedPrice } from 'vinisto_shared/src/price/get-localized-price';
import { DeviceServiceContext } from 'Services/DeviceService';
import { UseQueryResult } from '@tanstack/react-query';
import NewsletterCheckbox from 'pages-spa/CartShippingData/Components/NewsletterCheckbox';
import TermsAndConditionsMessage from 'pages-spa/CartShippingData/Components/TermsAndConditionsMessage';
import { usePlatformContext } from 'Services/PlatformService';

import BasketTimer from '../BasketTimer';
import B2bCustomerInfo from '../B2bCustomerInfo';
import FeeInfo from '../FeeInfo';

import BasketItems from './BasketItems';
import styles from './styles.module.css';
import {
	INTERSECTION_OBSERVER_ROOT_MARGIN,
	INTERSECTION_OBSERVER_THRESHOLD,
} from './constants';
import OrderItems from './OrderItems';
import SummaryCTAButton from './SummaryCTAButton';

import { Order } from '@/domain/order';
import { DiscountCouponType } from '@/api-types/basket-api';
import { VinistoHelperDllEnumsAddonAddonType } from '@/api-types/order-api';

interface BasketSummaryProps {
	withBasketItems?: boolean;
	orderQuery?: UseQueryResult<void | Order | null, unknown>;
	showButton?: boolean;
	buttonProps?: {
		text?: string;
		href?: string;
		disabled?: boolean;
		onClick?: () => void;
		buttonType?: 'submit' | 'button';
		shippingDataButton?: boolean;
	};
	showFreeDeliveryProgressBar?: boolean;
	showNewsletterCheckbox?: boolean;
	showAgreementCheckbox?: boolean;
	isCheckout?: boolean;
	isBasketPriceZeroOrNegative?: boolean;
}

const BasketSummary = ({
	withBasketItems,
	orderQuery,
	showButton = true,
	buttonProps,
	showFreeDeliveryProgressBar = false,
	showNewsletterCheckbox = false,
	showAgreementCheckbox = false,
	isCheckout = false,
	isBasketPriceZeroOrNegative,
}: BasketSummaryProps) => {
	const { isB2b, getIsInAdminIframe } = usePlatformContext();
	const { isDesktop } = useContext(DeviceServiceContext);
	const {
		basketState,
		effectiveSelectedPackaging,
		effectivePackagingSelection,
		basketTotalsWithEffectivePackaging,
	} = useContext(BasketContext);
	const t = useContext(LocalizationContext).useFormatMessage();
	const { basketId, vinistoUser } = useContext(AuthenticationContext);
	const {
		activeCurrency: { currency },
		countryOfSale,
	} = useContext(LocalizationContext);

	const { deliveryMethod, paymentMethod } = useContext(OrderContext);

	const basketItemsQuantity = basketState?.items?.length ?? 0;

	const deliveriesByBasketQuery = useGetDeliveriesByBasket(
		{
			currency,
			allowedCountry: countryOfSale,
			basketId,
		},
		{
			enabled: Boolean(basketId),
		}
	);

	const activeDeliveryMethodDetail = deliveriesByBasketQuery?.data?.find(
		(delivery) => delivery.id === deliveryMethod?.id
	);

	const selectedDeliveryPrice =
		activeDeliveryMethodDetail?.prices?.[0]?.value ?? 0;
	const selectedDeliveryPriceWithVat =
		activeDeliveryMethodDetail?.prices?.[0]?.valueWithVat ?? 0;

	const allowedPaymentsQuery = useGetAllowedPayments(
		{
			BasketId: basketState?.id ?? '',
			DeliveryId: deliveryMethod?.id,
			Currency: currency,
			AllowedCountry: countryOfSale,
		},
		{
			enabled: !!deliveryMethod?.id && !!basketState?.id,
		}
	);
	const allowedPayments = allowedPaymentsQuery?.data;
	const activePaymentMethodDetail = allowedPayments?.find(
		(payment) => payment.id === paymentMethod?.id
	);

	const selectedPaymentPrice =
		activePaymentMethodDetail?.prices?.[0]?.value ?? 0;
	const selectedPaymentPriceWithVat =
		activePaymentMethodDetail?.prices?.[0]?.valueWithVat ?? 0;

	// Allow a small margin for floating point precision issues
	const isBasketDiscounted =
		basketTotalsWithEffectivePackaging.totalStandardPriceWithVat -
			basketTotalsWithEffectivePackaging.totalDiscountedPriceWithVat >
		0.01;

	const giftVouchersInBasket = basketState?.coupons?.filter(
		(coupon) => coupon.type === DiscountCouponType.GIFT
	);

	const totalGiftVouchersInBasketValueWithVat =
		giftVouchersInBasket?.reduce(
			(acc, voucher) => acc + (voucher.discountPriceWithVat ?? 0),
			0
		) ?? 0;

	const totalCouponsAndGiftVouchersInBasketValueWithVat =
		basketState?.coupons?.reduce(
			(acc, voucher) => acc + (voucher.discountPriceWithVat ?? 0),
			0
		) ?? 0;

	const onlyGiftVouchersInBasket =
		totalGiftVouchersInBasketValueWithVat ===
		totalCouponsAndGiftVouchersInBasketValueWithVat;

	const isOrderDiscounted =
		orderQuery !== undefined &&
		typeof orderQuery.data?.orderTotalDiscount === 'number' &&
		orderQuery.data.orderTotalDiscount > 0.4;

	const totalBasketPriceIncludingDeliveryPaymentAndPackaging =
		(isBasketDiscounted
			? basketTotalsWithEffectivePackaging.totalDiscountedPriceWithGiftCoupons
			: basketTotalsWithEffectivePackaging.totalPrice) +
		selectedDeliveryPrice +
		selectedPaymentPrice;

	const totalBasketPriceIncludingDeliveryPaymentAndPackagingWithVat =
		(isBasketDiscounted
			? basketTotalsWithEffectivePackaging.totalDiscountedPriceWithVatWithGiftCoupons
			: basketTotalsWithEffectivePackaging.totalPriceWithVat) +
		selectedDeliveryPriceWithVat +
		selectedPaymentPriceWithVat;

	const orderCurrency = orderQuery?.data?.orderCurrency ?? currency;
	const orderDeliveryPriceWithVat =
		orderQuery?.data?.delivery?.price?.valueWithVat ?? 0;

	const getInitialFloatingSummaryState = (
		isDesktop: boolean
	): boolean | undefined => {
		return isDesktop ? undefined : true;
	};

	const [isFloatingSummary, setIsFloatingSummary] = useState<
		boolean | undefined
	>(getInitialFloatingSummaryState(isDesktop));

	const summaryAnchorRef = useRef<HTMLDivElement>(null);

	const handleIntersectionObserver = useCallback(
		(entries: IntersectionObserverEntry[]) => {
			const [observedEntry] = entries;

			if (!observedEntry) {
				return;
			}

			if (
				!observedEntry.isIntersecting &&
				observedEntry.boundingClientRect.top > 50
			) {
				setIsFloatingSummary(true);
			} else {
				setIsFloatingSummary(false);
			}
		},
		[]
	);

	useEffect(() => {
		const currentAnchorRef = summaryAnchorRef.current;

		if (!currentAnchorRef || isDesktop) return;

		const observer = new IntersectionObserver(handleIntersectionObserver, {
			rootMargin: INTERSECTION_OBSERVER_ROOT_MARGIN,
			threshold: INTERSECTION_OBSERVER_THRESHOLD,
		});

		observer.observe(currentAnchorRef);

		return () => {
			observer.disconnect();
		};
	}, [isDesktop, handleIntersectionObserver]);

	const nicePackagingAddonInOrder =
		orderQuery === undefined
			? undefined
			: orderQuery?.data?.addons?.find(
					(addon) =>
						addon.addon?.type === VinistoHelperDllEnumsAddonAddonType.Service
			  );

	const isUserSupportRole =
		vinistoUser.canCreateOrderAsSupport &&
		!vinistoUser.canCreateOrderAsMerchant;

	const isAdminIframe = getIsInAdminIframe();

	return (
		<>
			{withBasketItems && !isDesktop && <BasketItems />}
			{orderQuery && !isDesktop && <OrderItems orderQuery={orderQuery} />}
			<div ref={summaryAnchorRef} />
			<div
				className={cx(styles.summaryWrap, {
					[styles.floatingSimpleVersion]: isFloatingSummary,
					[styles.isCheckout]: isCheckout,
				})}
			>
				<p className={styles.heading}>{t({ id: 'basket.summary' })}</p>
				{withBasketItems && isDesktop && <BasketItems />}
				{orderQuery && isDesktop && <OrderItems orderQuery={orderQuery} />}
				<div
					className={cx(styles.summaryWrapMobile, {
						[styles.floating]: isFloatingSummary,
						[styles.isCheckout]: isCheckout,
					})}
				>
					{isAdminIframe && (
						<>
							<B2bCustomerInfo />
							{!isUserSupportRole && <FeeInfo />}
						</>
					)}
					{isDesktop && showFreeDeliveryProgressBar && (
						<FreeDeliveryProgressBar variant={'basket-horizontal'} />
					)}
					<div className={styles.content}>
						<div className={styles.items}>
							<div className={styles.item}>
								<div className={styles.label}>
									{t({ id: 'basket.packaging' })}:{' '}
									<span className={styles.value}>
										{orderQuery === undefined &&
											(effectivePackagingSelection.id !== '0' &&
											effectiveSelectedPackaging
												? getLocalizedValue(effectiveSelectedPackaging.name)
												: t({ id: 'basket.packaging.eco.title' }))}
										{orderQuery &&
											(nicePackagingAddonInOrder
												? nicePackagingAddonInOrder.addon?.name
												: t({ id: 'basket.packaging.eco.title' }))}
									</span>
								</div>
								<div className={styles.price}>
									{orderQuery === undefined &&
										(effectivePackagingSelection.id !== '0' &&
										effectiveSelectedPackaging
											? getLocalizedPrice({
													price:
														effectiveSelectedPackaging.bundlePrices?.basePrice
															?.valueWithVat ?? 0,
													currency: basketState?.currency ?? currency,
											  })
											: t({ id: 'basket.summary.free' }))}
									{orderQuery &&
										(nicePackagingAddonInOrder
											? getLocalizedPrice({
													price:
														nicePackagingAddonInOrder.addon?.actions?.[0]?.price
															?.valueWithVat ?? 0,
													currency: orderCurrency,
											  })
											: t({ id: 'basket.summary.free' }))}
								</div>
							</div>
							<div className={styles.item}>
								<div className={styles.label}>
									{t({ id: 'basket.delivery' })}:{' '}
									<span className={styles.value}>
										{orderQuery === undefined &&
											(activeDeliveryMethodDetail
												? getLocalizedValue(activeDeliveryMethodDetail?.name)
												: t({ id: 'basket.orderOverview.notSelected' }))}
										{orderQuery &&
											getLocalizedValue(orderQuery.data?.delivery?.name)}
									</span>
								</div>
								<div className={styles.price}>
									{orderQuery === undefined &&
										(activeDeliveryMethodDetail
											? selectedDeliveryPriceWithVat > 0.4
												? getLocalizedPrice({
														price: selectedDeliveryPriceWithVat,
														currency: basketState?.currency ?? currency,
												  })
												: t({ id: 'basket.summary.free' })
											: '–')}
									{orderQuery &&
										(orderDeliveryPriceWithVat > 0.4
											? getLocalizedPrice({
													price: orderDeliveryPriceWithVat,
													currency: orderCurrency,
											  })
											: t({ id: 'basket.summary.free' }))}
								</div>
							</div>
							<div className={styles.item}>
								<div className={styles.label}>
									{t({ id: 'basket.payment' })}:{' '}
									<span className={styles.value}>
										{orderQuery === undefined &&
											(activePaymentMethodDetail
												? getLocalizedValue(activePaymentMethodDetail?.name)
												: isBasketPriceZeroOrNegative
												? t({ id: 'basket.discountCoupon.paidByVoucher' })
												: t({ id: 'basket.orderOverview.notSelected' }))}
										{orderQuery &&
											(orderQuery.data?.payment?.name
												? getLocalizedValue(orderQuery.data?.payment?.name)
												: t({ id: 'basket.discountCoupon.paidByVoucher' }))}
									</span>
								</div>
								<div className={styles.price}>
									{orderQuery === undefined &&
										(activePaymentMethodDetail
											? selectedPaymentPriceWithVat > 0.4
												? getLocalizedPrice({
														price: selectedPaymentPriceWithVat,
														currency: basketState?.currency ?? currency,
												  })
												: t({ id: 'basket.summary.free' })
											: '–')}
									{orderQuery &&
										((orderQuery.data?.payment?.price?.valueWithVat ?? 0) > 0.4
											? getLocalizedPrice({
													price:
														orderQuery.data?.payment?.price?.valueWithVat ?? 0,
													currency: orderCurrency,
											  })
											: t({ id: 'basket.summary.free' }))}
								</div>
							</div>

							<hr className={styles.separator} />

							{!!(
								(isBasketDiscounted || totalGiftVouchersInBasketValueWithVat) &&
								orderQuery === undefined
							) && (
								<div className={cx(styles.item, styles.totalSavings)}>
									<div className={styles.label}>
										{totalGiftVouchersInBasketValueWithVat
											? t({
													id: totalGiftVouchersInBasketValueWithVat
														? onlyGiftVouchersInBasket
															? 'basket.giftVouchersDiscount'
															: 'basket.couponsAndGiftVouchersDiscount'
														: 'basket.saved',
											  })
											: t({ id: isB2b ? 'basket.savedB2b' : 'basket.saved' })}
									</div>
									<div className={styles.totalSavingsPrice}>
										−
										{totalGiftVouchersInBasketValueWithVat
											? getLocalizedPrice({
													price: totalGiftVouchersInBasketValueWithVat,
													currency: basketState?.currency ?? currency,
											  })
											: getLocalizedPrice({
													price: isB2b
														? basketTotalsWithEffectivePackaging.totalStandardPrice -
														  basketTotalsWithEffectivePackaging.totalDiscountedPrice
														: basketTotalsWithEffectivePackaging.totalStandardPriceWithVat -
														  basketTotalsWithEffectivePackaging.totalDiscountedPriceWithVat,
													currency: basketState?.currency ?? currency,
											  })}
									</div>
								</div>
							)}

							{isOrderDiscounted && (
								<div className={cx(styles.item, styles.totalSavings)}>
									<div className={styles.label}>
										{orderQuery.data?.giftCouponPaymentWithVat
											? t({
													// Order data differs significantly from Basket data. Coupon discount except gift voucher
													// discounts are included in discount price, so one can't tell if other than gift coupons were applied
													id: 'basket.couponsAndGiftVouchersDiscount',
											  })
											: t({ id: isB2b ? 'basket.savedB2b' : 'basket.saved' })}
									</div>
									<div className={styles.totalSavingsPrice}>
										−
										{getLocalizedPrice({
											price:
												(orderQuery.data?.orderTotalDiscount ?? 0) +
												(orderQuery.data?.giftCouponPaymentWithVat ?? 0),
											currency: orderCurrency,
										})}
									</div>
								</div>
							)}
							<div className={cx(styles.item, styles.totalPriceWithVat)}>
								<div className={styles.label}>
									{t({
										id: isB2b
											? 'basket.totalPriceVerbose'
											: 'basket.totalPriceWithVATVerbose',
									})}
								</div>
								<div className={styles.totalPriceWithVatPrice}>
									{orderQuery === undefined &&
										getLocalizedPrice({
											price: isB2b
												? totalBasketPriceIncludingDeliveryPaymentAndPackaging
												: Math.max(
														totalBasketPriceIncludingDeliveryPaymentAndPackagingWithVat,
														0
												  ),
											currency: basketState?.currency ?? currency,
										})}
									{orderQuery &&
										getLocalizedPrice({
											price: isB2b
												? orderQuery.data?.orderPrice ?? 0
												: Math.max(
														(orderQuery.data?.orderPriceWithVat ?? 0) -
															(orderQuery.data?.giftCouponPaymentWithVat ?? 0),
														0
												  ),
											currency: orderCurrency,
										})}
								</div>
							</div>
							<div
								className={cx(
									styles.item,
									styles.totalPriceWithoutVat,
									basketItemsQuantity === 0 && styles.emptyBasket
								)}
							>
								<div className={styles.label}>
									{t({
										id: isB2b
											? 'basket.totalPriceWithVAT'
											: 'basket.totalPriceWithoutVAT',
									})}
								</div>
								<div className={styles.price}>
									{orderQuery === undefined &&
										getLocalizedPrice({
											price: isB2b
												? totalBasketPriceIncludingDeliveryPaymentAndPackagingWithVat
												: Math.max(
														totalBasketPriceIncludingDeliveryPaymentAndPackaging,
														0
												  ),
											currency: basketState?.currency ?? currency,
										})}
									{orderQuery &&
										getLocalizedPrice({
											price: isB2b
												? orderQuery.data?.orderPriceWithVat ?? 0
												: Math.max(
														(orderQuery.data?.orderPrice ?? 0) -
															(orderQuery.data?.giftCouponPayment ?? 0),
														0
												  ),

											currency: orderCurrency,
										})}
								</div>
							</div>
						</div>

						{showNewsletterCheckbox && !isB2b && (
							<NewsletterCheckbox id="newsletterBasket" />
						)}

						{showAgreementCheckbox && <TermsAndConditionsMessage />}
						{!isB2b && <BasketTimer />}
						<SummaryCTAButton
							basketItemsQuantity={basketItemsQuantity}
							showButton={showButton}
							buttonProps={buttonProps}
						/>
					</div>
				</div>
			</div>
		</>
	);
};
export default BasketSummary;
