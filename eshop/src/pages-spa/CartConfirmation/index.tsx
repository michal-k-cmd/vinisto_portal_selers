'use client';

import {
	useCallback,
	useContext,
	useEffect,
	useMemo,
	useRef,
	useState,
} from 'react';
import Config from 'Config';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { get, indexOf, invoke, map } from 'lodash-es';
import { useRouter } from 'next/navigation';
import { useQueryState } from 'nuqs';
import { GA_EVENT } from 'Hooks/useAnalytics/constants';
import useAnalytics from 'Hooks/useAnalytics';
import { AuthenticationContext } from 'Services/AuthenticationService/context';
import { BasketContext } from 'Services/BasketService';
import { LocalizationContext } from 'Services/LocalizationService';
import { StorageContext } from 'Services/StorageService/context';
import { ModalContext } from 'Components/Modal/context';
import { TrackEvent } from 'Services/FacebookPixel';
import { LOGIN_MODAL } from 'Components/Modal/constants';
import {
	VinistoHelperDllEnumsOrderPaymentType,
	VinistoOrderDllModelsApiOrderOrder,
	VinistoOrderDllModelsApiReturnDataOrderReturn,
} from 'vinisto_api_client/src/api-types/order-api';
import { VinistoGopayDllModelsApiPaymentReturn } from 'vinisto_api_client/src/api-types/services-api';
import api from 'vinisto_api_client/src/api';
import { ApiError } from 'vinisto_api_client/src/domain/error';
import { VinistoHelperDllEnumsOrderOrderState } from 'vinisto_api_client/src/api-types/product-api';
import { orderAdapter } from 'vinisto_api_client/src/index';
import { ObjectId } from 'bson';
import { OrderContext } from 'Services/OrderService/context';
import { trackHeurekaOrder } from 'Services/Heureka';
import { usePlatformContext } from 'Services/PlatformService';
import { LocalStorageKeys } from 'Services/StorageService/constants';

import {
	GOPAY_PAYMENT_STATUS_ERROR,
	NO_INVOICE_IN_ORDER,
	NOT_FOUND,
	OBJECT_PERMISSION_ERROR,
	ORDER_DOES_NOT_EXIST,
	ORDER_QUERY_RETRY_BASETIME,
	ORDER_QUERY_RETRY_LIMIT,
} from './constants';
import Loading from './Loading';
import Paid from './Paid';
import Created from './Created';
import NotPaidError from './Errors/NotPaid';
import Layout from './Layout';
import NotCreatedError from './Errors/NotCreated';
import TimeoutExpiredError from './Errors/TimeoutExpired';

const CartConfirmation = () => {
	const { isB2b, customerId } = usePlatformContext();
	const queryClient = useQueryClient();
	const { handleOnClearBasket } = useContext(BasketContext);
	const { useFormatMessage } = useContext(LocalizationContext);
	const { isLoggedIn, anonymousUID, vinistoUser } = useContext(
		AuthenticationContext
	);
	const storageContext = useContext(StorageContext);
	const { setOrderId, clearDeliveryPayment, orderErrorsFromWs } =
		useContext(OrderContext);
	const { handleOpenModal } = useContext(ModalContext);

	const router = useRouter();
	const { pushToDataLayer } = useAnalytics();
	const t = useFormatMessage();

	const anonymousUserId = anonymousUID?.anonymousUserId || '';
	const userLoginHash = vinistoUser.loginHash;

	const [goPayPaymentId] = useQueryState('id');
	const [apiOrderId, setApiOrderId] = useQueryState('oid');

	const goPayPaymentQuery = useQuery(
		['goPayPaymentQuery', apiOrderId],
		() =>
			api
				.get<VinistoGopayDllModelsApiPaymentReturn>(
					`services-api/gopay/${goPayPaymentId}`
				)
				.then((response) => {
					setApiOrderId(response?.payment?.orderId || null);
					return response.payment;
				})
				.catch((responseError: ApiError) => {
					if (
						responseError.message === ORDER_DOES_NOT_EXIST ||
						responseError.message === GOPAY_PAYMENT_STATUS_ERROR
					) {
						router.push('/');
					}
				}),
		{
			enabled: Boolean(goPayPaymentId),
		}
	);

	useEffect(() => {
		setOrderId(new ObjectId().toString());
		if (isB2b) {
			queryClient.invalidateQueries(['verifyCompanyCreditPayment', customerId]);
		}
		clearDeliveryPayment();
		/* eslint-disable-next-line react-hooks/exhaustive-deps */
	}, []);

	const retryOrderQueryTimeoutRef = useRef<ReturnType<
		typeof setTimeout
	> | null>(null);

	const retryOrderQueryCounterRef = useRef<Record<string, number>>({});

	const orderQuery = useQuery(
		['orderQuery', vinistoUser?.id, anonymousUID?.anonymousUserId, apiOrderId],
		() => {
			const retryOrderQueryCounter = retryOrderQueryCounterRef.current;

			const apiPath = isLoggedIn
				? `order-api/orders/${apiOrderId}`
				: `order-api/orders/${apiOrderId}/anonymous/${anonymousUserId}`;

			return api
				.get<VinistoOrderDllModelsApiReturnDataOrderReturn>(
					apiPath,
					isLoggedIn ? { UserLoginHash: userLoginHash } : undefined
				)
				.then(async (response) => {
					// TODO: Probably clear timeout on onBeforeUnload as well
					if (retryOrderQueryTimeoutRef.current) {
						clearTimeout(retryOrderQueryTimeoutRef.current);
					}
					handleOnClearBasket();
					sendAnalyticsEvent(response.order);
					return response.order ? orderAdapter.fromApi(response.order) : null;
				})
				.catch((responseError: ApiError) => {
					if (responseError.message === NO_INVOICE_IN_ORDER) {
						throw responseError;
					}
					if (
						// @ts-expect-error the error types are currently broken
						(responseError.error ?? []).some(
							(error: any = {}) =>
								error.generalError === OBJECT_PERMISSION_ERROR
						)
					) {
						handleOpenModal(LOGIN_MODAL, {
							showForgottenPasswordLink: true,
							showRegisterCta: false,
							showCloseButton: false,
						});
					}
					if (
						responseError.message === ORDER_DOES_NOT_EXIST ||
						// @ts-expect-error the error types are currently broken
						(responseError.error ?? []).some(
							(error: any = {}) => error.generalError === ORDER_DOES_NOT_EXIST
						)
					) {
						retryOrderQueryTimeoutRef.current = setTimeout(() => {
							// This should result in error, check if it does
							if (
								apiOrderId &&
								retryOrderQueryCounterRef.current[apiOrderId] &&
								retryOrderQueryCounterRef.current[apiOrderId] >
									ORDER_QUERY_RETRY_LIMIT
							) {
								throw new Error('ORDER DOES NOT EXIST');
							}
							if (apiOrderId) {
								typeof retryOrderQueryCounter[apiOrderId] === 'number'
									? (retryOrderQueryCounter[apiOrderId] += 1)
									: (retryOrderQueryCounter[apiOrderId] = 1);
							}
							orderQuery.refetch();
						}, ORDER_QUERY_RETRY_BASETIME * (apiOrderId ? retryOrderQueryCounter[apiOrderId] ?? 1 : 1));
					}
				});
		},
		{
			enabled: Boolean(apiOrderId || goPayPaymentQuery.data?.orderId),
			retry: (failureCount, error: ApiError) => {
				return error.message === NO_INVOICE_IN_ORDER && failureCount < 5;
			},
		}
	);

	const paymentType =
		(goPayPaymentId
			? goPayPaymentQuery.data?.paymentType
			: orderQuery.data?.payment?.paymentType) ?? null;

	const handleOnNavigateToOrders = useCallback(() => {
		router.push(
			`/${t({ id: 'routes.user-section.route' })}/${t({
				id: 'routes.user-section.orders.route',
			})}?id=${orderQuery.data?.id}`
		);
	}, [router, orderQuery.data?.id, t]);

	const storedAnalyticsSent = useMemo(() => {
		const storedAnalytics = storageContext.StorageService.getStorageItem(
			LocalStorageKeys.ANALYTICS_SENT
		);
		return Array.isArray(storedAnalytics) ? storedAnalytics : [storedAnalytics];
	}, []);

	const [isAnalyticsSent, setIsAnalyticsSent] = useState<boolean>(
		!!apiOrderId && storedAnalyticsSent.includes(apiOrderId)
	);

	const sendAnalyticsEvent = useCallback(
		(data: VinistoOrderDllModelsApiOrderOrder | null | undefined) => {
			if (!data || isAnalyticsSent) return;

			const orderData = data;
			const orderDataId = data.id;

			if (apiOrderId !== orderDataId) {
				const isAlreadySent =
					indexOf(storedAnalyticsSent, orderDataId) !== NOT_FOUND;
				setIsAnalyticsSent(isAlreadySent);
				if (isAlreadySent) {
					return;
				}
			}

			const itemsGaData = map(
				get(orderData, 'orderItems', []),
				(item: Record<string, any>) => {
					return {
						item_id: get(item, 'bundle.id', ''),
						item_name: get(item, 'bundle.name', ''),
						price: get(item, 'bundle.price.value', 0),
						quantity: get(item, 'quantity', 0),
						currency: get(orderData, 'orderCurrency') ?? '',
					};
				}
			);
			const itemsFbData = map(
				get(orderData, 'orderItems', []),
				(item: Record<string, any>) => {
					return {
						id: get(item, 'bundle.id', ''),
						quantity: get(item, 'quantity', 0),
					};
				}
			);

			const purchaseData = {
				email: get(orderData, 'billingAddress.email') ?? '',
				telephone: get(orderData, 'billingAddress.phone') ?? '',
				currency: get(orderData, 'orderCurrency') ?? '',
				transaction_id: get(orderData, 'orderNumber', ''),
				value:
					get(orderData, 'orderPrice', 0) -
					get(orderData, 'delivery.price.value', 0) -
					get(orderData, 'payment.price.value', 0),
				coupon: get(orderData, 'discountCoupon.description', ''),
				items: itemsGaData,
			};
			TrackEvent('track', 'Purchase', {
				content_type: 'product',
				contents: itemsFbData,
				value:
					Math.round((purchaseData.value + Number.EPSILON) * 100) / 100 || 0,
				currency: purchaseData.currency,
			});

			pushToDataLayer({
				event: GA_EVENT.PURCHASE,
				email: purchaseData.email,
				phone_number: purchaseData.telephone,
				ecommerce: {
					transaction_id: purchaseData.transaction_id,
					affiliation: get(Config, 'domainName', ''),
					value: purchaseData.value,
					shipping: get(orderData, 'delivery.price.value', 0),
					currency: purchaseData.currency,
					coupon: purchaseData.coupon,
					items: purchaseData.items,
				},
			});
			trackHeurekaOrder(orderData);
			setIsAnalyticsSent(true);
			invoke(
				storageContext,
				'StorageService.setItem',
				LocalStorageKeys.ANALYTICS_SENT,
				[...storedAnalyticsSent, get(orderData, 'id')]
			);
		},
		[
			isAnalyticsSent,
			apiOrderId,
			pushToDataLayer,
			storageContext,
			storedAnalyticsSent,
		]
	);

	if (
		apiOrderId &&
		orderErrorsFromWs[apiOrderId] &&
		orderErrorsFromWs[apiOrderId]?.length
	) {
		return <NotCreatedError />;
	}

	if (
		apiOrderId &&
		retryOrderQueryCounterRef.current[apiOrderId] > ORDER_QUERY_RETRY_LIMIT
	) {
		return <TimeoutExpiredError />;
	}

	if (
		// Important: `isLoading` would not work here: https://github.com/TanStack/query/issues/3584
		goPayPaymentQuery.isFetching ||
		orderQuery.isLoading ||
		orderQuery.data?.orderNumber == null
	) {
		return <Loading />;
	}

	if (
		orderQuery.data?.states?.includes(
			VinistoHelperDllEnumsOrderOrderState.PAID
		) ||
		goPayPaymentQuery.data?.state?.includes(
			VinistoHelperDllEnumsOrderOrderState.PAID
		) ||
		// This is a temporary solution for orders by entirely with gift vouchers
		// If they somehow get sent with payment method, they wouldn't have PAID state (needs to be fixed on BE)
		orderQuery.data.orderPriceWithVat <= 0
	) {
		return (
			<Layout orderQuery={orderQuery}>
				<Paid
					orderQuery={orderQuery}
					handleOnNavigateToOrders={handleOnNavigateToOrders}
				/>
			</Layout>
		);
	}

	if (
		orderQuery.data?.states?.includes(
			VinistoHelperDllEnumsOrderOrderState.CREATED
		) &&
		(paymentType === VinistoHelperDllEnumsOrderPaymentType.BY_HANDOVER ||
			paymentType === VinistoHelperDllEnumsOrderPaymentType.CASH ||
			paymentType === VinistoHelperDllEnumsOrderPaymentType.BANK_TRANSFER ||
			paymentType === VinistoHelperDllEnumsOrderPaymentType.CREDIT)
	) {
		return (
			<Layout orderQuery={orderQuery}>
				<Created
					apiOrderId={apiOrderId}
					orderQuery={orderQuery}
					goPayPaymentQuery={goPayPaymentQuery}
					handleOnNavigateToOrders={handleOnNavigateToOrders}
				/>
			</Layout>
		);
	}

	return (
		<Layout orderQuery={orderQuery}>
			<NotPaidError orderQuery={orderQuery} />
		</Layout>
	);
};

export default CartConfirmation;
