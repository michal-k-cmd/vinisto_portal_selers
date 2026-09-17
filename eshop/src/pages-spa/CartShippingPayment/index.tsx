'use client';

import {
	useCallback,
	useContext,
	useEffect,
	useLayoutEffect,
	useMemo,
	useRef,
	useState,
} from 'react';
import { filter, isEmpty, isEqual, orderBy } from 'lodash-es';
import { useInViewport } from 'react-in-viewport';
import { useRouter } from 'next/navigation';
import {
	VinistoOrderDllModelsApiDeliveryDelivery,
	VinistoOrderDllModelsApiPaymentPayment,
} from 'vinisto_api_client/src/api-types/order-api';
import BasketSummary from 'pages-spa/Basket/Components/BasketSummary';
import { GA_EVENT } from 'Hooks/useAnalytics/constants';
import { CTA_VISIBILITY_THRESHOLD } from 'pages-spa/CartShippingData/constants';
import useAnalytics from 'Hooks/useAnalytics';
import usePrevious from 'Hooks/usePrevious';
import { BasketContext } from 'Services/BasketService';
import { DeviceServiceContext } from 'Services/DeviceService';
import { LocalizationContext } from 'Services/LocalizationService';
import { OrderContext } from 'Services/OrderService/context';
import { TrackEvent } from 'Services/FacebookPixel';
import { TEST_IDS } from 'Constants/test-ids';
import { ErrorBoundary } from '@sentry/react';
import {
	useGetAllowedPayments,
	useGetDeliveriesByBasket,
} from 'Hooks/useGetDeliveries';
import { AuthenticationContext } from 'Services/AuthenticationService/context';
import basketStyles from 'pages-spa/Basket/styles.module.css';
import Container from 'Components/View/Container';
import AvailabilityUpdateModal from 'pages-spa/Basket/Components/AvailabilityUpdateModal';
import BasketHeader from 'pages-spa/Basket/Components/BasketHeader';
import FilterDropdownArrowIcon from 'Components/Icons/FilterDropdownArrow';
import { usePlatformContext } from 'Services/PlatformService';
import useGetCompany from 'Hooks/useGetB2bCustomer';
import useVerifyCompanyCreditPaymentQuery from 'Hooks/useVerifyCompanyCreditPaymentQuery';

import { SKELETONS_NUM_PAYMENTS } from './constants';
import PaymentItem from './Components/PaymentItem';
import DeliveryList from './Components/DeliveryList';
//import ChangeDeliveryDay from './Components/ChangeDeliveryDay';
import styles from './styles.module.css';
import DeliveryIssue from './Components/DeliveryIssue';
import VinistoPlusBanner from './Components/VinistoPlusBanner';

import { VinistoHelperDllEnumsOrderPaymentType } from '@/api-types/order-api';

export type DeliveryData = VinistoOrderDllModelsApiDeliveryDelivery & {
	isLoading?: boolean;
};

const CartShippingPayment = () => {
	const { isB2b, customerId, withB2bQueryParams, getIsInAdminIframe } =
		usePlatformContext();
	const { basketId, basketErrorMessages } = useContext(AuthenticationContext);
	const isAdminIframe = getIsInAdminIframe();

	const basketContext = useContext(BasketContext);
	const localizationContext = useContext(LocalizationContext);
	const { deliveryMethod, setDeliveryMethod, paymentMethod, setPaymentMethod } =
		useContext(OrderContext);

	const { isMobile, isTablet, isDesktop, headerHeight, footerHeight } =
		useContext(DeviceServiceContext);

	const router = useRouter();
	const { sendEvent: sendAnalyticsEvent } = useAnalytics();

	const t = localizationContext.useFormatMessage();
	const currency = localizationContext.activeCurrency.currency;
	const countryOfSale = localizationContext.countryOfSale;

	const basketState = basketContext.basketState;
	const basketItems = basketState?.items;
	const isBasketLoading = !basketItems;
	const basketTotalsWithEffectivePackaging =
		basketContext.basketTotalsWithEffectivePackaging;

	const [_isShowFloatingFooter, setIsShowFloatingFooter] = useState(false);
	const [topDistance, setTopDistance] = useState(0);
	const [_maxOrderOverviewHeight, setMaxOrderOverviewHeight] =
		useState('460px');
	const [isAnalyticsSent, setIsAnalyticsSent] = useState(false);

	const ctaRef = useRef<HTMLDivElement>(null);
	const parentRef = useRef<HTMLDivElement>(null);

	const { inViewport: isCtaInViewport } = useInViewport(ctaRef, {
		// consider CTA button hidden behind header and footer
		rootMargin: `${headerHeight * -1}px 0px ${footerHeight * -1}px 0px`,
		threshold: CTA_VISIBILITY_THRESHOLD,
	});

	const deliveryId = deliveryMethod?.id || null;
	const paymentId = paymentMethod?.id || null;

	const basketItemsGoogleAnalyticsData =
		basketContext.basketItemsGoogleAnalyticsData;
	const previousBasketGaData = usePrevious(basketItemsGoogleAnalyticsData);

	useEffect(() => {
		if (!basketId) {
			router.push(withB2bQueryParams(`/${t({ id: 'routes.cart.route' })}`));
		}
	}, [basketId, router, t, withB2bQueryParams]);

	useEffect(() => {
		if (
			isAnalyticsSent ||
			isBasketLoading ||
			isEqual(previousBasketGaData, basketItemsGoogleAnalyticsData)
		)
			return;

		TrackEvent('track', 'InitiateCheckout', {
			content_type: 'product',
			content_ids: basketState?.items?.map((item) => item.itemId ?? '') ?? [],
			value: basketState?.totalPrice ?? 0,
			currency,
		});

		sendAnalyticsEvent(GA_EVENT.BEGIN_CHECKOUT, {
			currency: String(basketState?.currency),
			value: basketState?.totalPrice ?? 0,
			items: basketItemsGoogleAnalyticsData,
		});

		setIsAnalyticsSent(true);
	}, [
		isBasketLoading,
		basketState,
		previousBasketGaData,
		basketItemsGoogleAnalyticsData,
		sendAnalyticsEvent,
		currency,
		isAnalyticsSent,
	]);

	useEffect(() => {
		if (!isEmpty(basketState) && isEmpty(basketItems)) {
			router.push(withB2bQueryParams(`/${t({ id: 'routes.cart.route' })}`));
		}
	}, [basketState, basketItems, router, t, withB2bQueryParams]);

	useEffect(() => {
		if (ctaRef.current && getComputedStyle(ctaRef.current).display !== 'none') {
			setIsShowFloatingFooter(!isCtaInViewport);
		}
	}, [
		setIsShowFloatingFooter,
		isCtaInViewport,
		isMobile, // Trigger on mobile/tablet viewport status changes
		isTablet,
	]);

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

	const vinistoPlusDeliveriesCodes = new Set(
		deliveriesByBasketQuery.data
			?.filter((delivery) => delivery.isSubscriber === true)
			.map((delivery) => `${delivery.deliveryCode}|${delivery.deliveryType}`)
	);

	const deliveries = useMemo(() => {
		if (!deliveriesByBasketQuery.isFetched || !deliveriesByBasketQuery.data) {
			return [];
		}

		const activeDeliveries = orderBy<DeliveryData>(
			filter(deliveriesByBasketQuery.data, 'isActive'),
			['isSubscriber', 'order'],
			['desc', 'asc']
		).filter((delivery) =>
			// Do not offer base delivery if matching subscriber delivery exists
			delivery.isSubscriber === false
				? !vinistoPlusDeliveriesCodes.has(
						`${delivery.deliveryCode}|${delivery.deliveryType}`
				  )
				: true
		);

		return activeDeliveries;
	}, [deliveriesByBasketQuery.isFetched, deliveriesByBasketQuery.data]);

	const allowedPaymentsQuery = useGetAllowedPayments(
		{
			BasketId: basketState?.id ?? '',
			DeliveryId: String(deliveryId),
			Currency: currency,
			AllowedCountry: countryOfSale,
		},
		{
			enabled: Boolean(basketState?.id && deliveryId),
			cacheTime: 0,
			staleTime: 0,
			keepPreviousData: true,
		}
	);

	const selectedDeliveryPriceWithVat =
		deliveriesByBasketQuery?.data?.find(
			(delivery) => delivery.id === deliveryMethod?.id
		)?.prices?.[0]?.valueWithVat ?? 0;

	const isBasketPriceZeroOrNegative = !!(
		basketItems?.length &&
		basketContext.basketTotalsWithEffectivePackaging
			.totalDiscountedPriceWithVatWithGiftCoupons +
			selectedDeliveryPriceWithVat <=
			0
	);

	// @ts-expect-error misuse of react-query, types won't work correctly
	const payments: VinistoOrderDllModelsApiPaymentPayment[] = useMemo(() => {
		if (!deliveryId) {
			return [];
		}

		if (!allowedPaymentsQuery.isFetched) {
			return Array.from(
				{ length: paymentId ? 1 : SKELETONS_NUM_PAYMENTS },
				() => null
			);
		}

		const activePayments = orderBy<VinistoOrderDllModelsApiPaymentPayment>(
			filter(allowedPaymentsQuery.data ?? [], 'isActive'),
			'order',
			'asc'
		);

		return activePayments;
	}, [
		allowedPaymentsQuery.data,
		allowedPaymentsQuery.isFetched,
		deliveryId,
		paymentId,
	]);

	useEffect(() => {
		deliveriesByBasketQuery.isFetched && deliveriesByBasketQuery.refetch();
		allowedPaymentsQuery.isFetched && allowedPaymentsQuery.refetch();
	}, [basketContext.basketState]);

	const handleGoBack = useCallback(() => {
		router.push(withB2bQueryParams(`/${t({ id: 'routes.cart.route' })}`));
	}, [router, t, withB2bQueryParams]);

	useLayoutEffect(() => {
		setMaxOrderOverviewHeight(`${window.innerHeight - topDistance - 16}px`);
	}, [isDesktop, topDistance]);

	useLayoutEffect(() => {
		if (parentRef.current) {
			setTopDistance(
				window.pageYOffset + parentRef.current?.getBoundingClientRect()?.top
			);
		}
	}, []);

	// Unselect payment method if basket price is 0 or negative (gift vouchers used)
	// Preselect the first payment method if there is only one available
	useEffect(() => {
		if (isBasketPriceZeroOrNegative && paymentMethod) {
			setPaymentMethod(null);
			return;
		}
		if (
			deliveryId &&
			!paymentId &&
			allowedPaymentsQuery.isFetched &&
			payments?.length === 1 &&
			!isBasketPriceZeroOrNegative
		) {
			setPaymentMethod({
				id: payments?.[0]?.id,
				paymentType: payments?.[0]?.paymentType,
			});

			return;
		}
	}, [
		payments,
		allowedPaymentsQuery.isFetched,
		paymentId,
		deliveryId,
		countryOfSale,
		currency,
		paymentMethod,
		setPaymentMethod,
		isBasketPriceZeroOrNegative,
	]);

	// If the selected delivery method or payment method is not available, reset it
	useEffect(() => {
		if (
			deliveryId &&
			!deliveries.some((delivery) => delivery.id === deliveryId)
		) {
			setDeliveryMethod(null);
			setPaymentMethod(null);
		}

		if (
			paymentId &&
			!payments.some((payment) => payment.id === paymentId) &&
			!isBasketPriceZeroOrNegative
		) {
			setPaymentMethod(null);
		}
	}, [
		deliveries,
		payments,
		deliveryId,
		paymentId,
		setDeliveryMethod,
		setPaymentMethod,
		isBasketPriceZeroOrNegative,
	]);

	const customerQuery = useGetCompany({ customerId });
	const verifyCompanyCreditPaymentQuery = useVerifyCompanyCreditPaymentQuery();

	const isWaitingForB2bCustomerData =
		isB2b &&
		customerId &&
		!(customerQuery.isFetched || !verifyCompanyCreditPaymentQuery.isFetched);

	const actualB2bCustomerCredit = isWaitingForB2bCustomerData
		? 0
		: Math.max(
				(customerQuery.data?.credit ?? 0) -
					(verifyCompanyCreditPaymentQuery.data?.result
						?.totalAmountNonPaidInvoices ?? Infinity),
				0
		  ) ?? 0;

	const activeDeliveryMethodDetail = deliveriesByBasketQuery?.data?.find(
		(delivery) => delivery.id === deliveryMethod?.id
	);

	const activePaymentMethodDetail = allowedPaymentsQuery.data?.find(
		(payment) => payment.id === paymentMethod?.id
	);

	const selectedDeliveryPrice =
		activeDeliveryMethodDetail?.prices?.[0]?.value ?? 0;
	const selectedPaymentPrice =
		activePaymentMethodDetail?.prices?.[0]?.valueWithVat ?? 0;

	// Allow a small margin for floating point precision issues
	const isBasketDiscounted =
		basketTotalsWithEffectivePackaging.totalStandardPriceWithVat -
			basketTotalsWithEffectivePackaging.totalDiscountedPriceWithVat >
		0.01;

	const totalBasketPriceIncludingDeliveryPaymentAndPackaging =
		(isBasketDiscounted
			? basketTotalsWithEffectivePackaging.totalDiscountedPrice
			: basketTotalsWithEffectivePackaging.totalPrice) +
		selectedDeliveryPrice +
		selectedPaymentPrice;

	const isUnsufficientCreditForCreditPayment =
		isB2b &&
		(!verifyCompanyCreditPaymentQuery.data?.result?.canPayByCredit ||
			actualB2bCustomerCredit <
				totalBasketPriceIncludingDeliveryPaymentAndPackaging);

	const isNextStepDisabledForUnsufficientCredit =
		paymentMethod?.paymentType ===
			VinistoHelperDllEnumsOrderPaymentType.CREDIT &&
		isUnsufficientCreditForCreditPayment;

	const disabledConditionsB2c =
		(!deliveryId || !paymentId) && !isBasketPriceZeroOrNegative;
	const disabledConditionsB2b =
		disabledConditionsB2c ||
		isWaitingForB2bCustomerData ||
		isNextStepDisabledForUnsufficientCredit;

	return (
		<section id="content-wrapper">
			<Container className={basketStyles.basketContainer}>
				{/* <BasketShare /> */}
				<div className={basketStyles.mainBasketArea}>
					<div className={basketStyles.headerContainer}>
						{!isAdminIframe && (
							<BasketHeader
								step="shippingAndPayment"
								basketItemsQuantity={basketItems?.length ?? 0}
							/>
						)}
					</div>

					<ErrorBoundary>
						<DeliveryIssue />
						<div className={styles.items}>
							<div className={styles.deliveriesListWrapper}>
								{!isB2b && <VinistoPlusBanner />}
								<h1 className={styles.heading}>
									{t({
										id: 'cartShippingPayment.deliveryList.title',
									})}
								</h1>
								<div>
									{deliveriesByBasketQuery.isFetched &&
										deliveries?.length === 0 && (
											<div className={styles.emptyDeliveryList}>
												{t({
													id: 'cartShippingPayment.deliveryList.empty',
												})}
											</div>
										)}
									<DeliveryList
										deliveries={deliveries}
										isDeliveriesLoading={deliveriesByBasketQuery.isLoading}
									/>

									{deliveryId && (
										<button
											className={styles.changeDeliveryButton}
											onClick={() => setDeliveryMethod(null)}
											type="button"
										>
											{t({
												id: 'cartShippingPayment.paymentList.button.changeDeliveryMethod',
											})}
											<FilterDropdownArrowIcon />
										</button>
									)}
								</div>
							</div>

							{/* {payments?.length > 0 && deliveries?.length === 0 && (
								<div className={styles.changeDeliveryDayWrapper}>
									<ChangeDeliveryDay />
								</div>
							)} */}

							{deliveryId && !isBasketPriceZeroOrNegative && (
								<div>
									<h1 className={styles.heading}>
										{t({
											id: 'cartShippingPayment.paymentList.title',
										})}
									</h1>

									<div>
										{allowedPaymentsQuery.isFetched &&
											payments?.length === 0 &&
											t({
												id: 'cartShippingPayment.paymentList.empty',
											})}
										{payments?.length > 0 &&
											payments?.map((payment, index) => {
												return (
													<PaymentItem
														key={payment?.id ?? index}
														payment={payment}
														isLoading={!allowedPaymentsQuery.isFetched}
														className={
															paymentId
																? payment?.id === paymentId
																	? styles.singlePayment
																	: styles.hiddenPayment
																: undefined
														}
														dataTestid={
															TEST_IDS.BASKET_PAYMENT_TYPE + '_' + payment?.id
														}
														disabled={
															payment?.paymentType ===
																VinistoHelperDllEnumsOrderPaymentType.CREDIT &&
															isUnsufficientCreditForCreditPayment
														}
													/>
												);
											})}
									</div>

									{paymentId && (
										<button
											className={styles.changeDeliveryButton}
											onClick={() => setPaymentMethod(null)}
										>
											{t({
												id: 'cartShippingPayment.paymentList.button.changePaymentMethod',
											})}
											<FilterDropdownArrowIcon />
										</button>
									)}
								</div>
							)}

							{/* {deliveryId && <SplittedDelivery />} */}
						</div>

						<button
							type="button"
							className={basketStyles.backButton}
							onClick={handleGoBack}
						>
							&lt; {t({ id: 'alt.back' })}
						</button>
					</ErrorBoundary>
				</div>

				<BasketSummary
					isCheckout={true}
					withBasketItems={isDesktop}
					isBasketPriceZeroOrNegative={isBasketPriceZeroOrNegative}
					buttonProps={{
						href: withB2bQueryParams('/dodaci-udaje'),
						text: `${t({
							id: 'basket.orderContinueToShippingData',
						})}`,
						disabled: isB2b ? disabledConditionsB2b : disabledConditionsB2c,
					}}
				/>
			</Container>
			{basketErrorMessages.Bundle.length > 0 && <AvailabilityUpdateModal />}
		</section>
	);
};

export default CartShippingPayment;
