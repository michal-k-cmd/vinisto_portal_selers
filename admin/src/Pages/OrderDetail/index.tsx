import { useContext, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { confirmAlert } from 'react-confirm-alert';
import { VinistoOrderDllModelsApiOrderOrderEditAddressesParameters } from 'vinisto_api_client/src/api-types/order-api/';
import { AuthenticationContext } from 'Services/AuthenticationService/context';
import { NotificationsContext } from 'Services/NotificationService';
import { LocalizationContext } from 'Services/LocalizationService';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { OrderService } from 'Services/OrderService/Order';
import DetailView from 'Components/Detail/View';
import { VinistoHelperDllEnumsOrderOrderState } from 'vinisto_api_client/src/api-types/order-api';
import useExponentialBackoffQuery from 'Hooks/useExpBackoffQuery';

import { getOrderLogData, handleCreateDownloadPdf } from './helpers';
import { OrderHeader } from './Components/Header';
import OrderCustomer from './Components/Customer';
import OrderDeliveryPayment from './Components/DeliveryPayment';
import OrderItems from './Components/Items';
import OrderMoreInfo from './Components/MoreInfo';
import OrderStates from './Components/States';
import OrderTechnicalDetails from './Components/TechnicalDetails';

const OrderDetailPage = () => {
	const { id: orderId } = useParams();
	if (!orderId) throw new Error('Missing orderId');

	const { handleShowErrorNotification, handleShowSuccessNotification } =
		useContext(NotificationsContext);
	const { loginHash: userLoginHash } = useContext(
		AuthenticationContext
	).vinistoUser;
	const t = useContext(LocalizationContext).useFormatMessage();
	const queryClient = useQueryClient();
	const [resetRefetchTrigger, setResetRefetchTrigger] = useState(0);

	const {
		getById,
		getPdfDocument,
		stornoOrder,
		refundOrder,
		changeOrderState,
		editInternalOrderNote,
		getOrderLog,
		editAddressesInOrder,
	} = OrderService;

	const orderQueryKey = ['order', orderId];
	const orderLogQueryKey = ['orderLog', orderId];
	const orderInvoicesQueryKey = ['orderInvoices', orderId];

	const { data: orderData } = useQuery(orderQueryKey, () =>
		getById({
			orderId,
			UserLoginHash: userLoginHash,
		})
	);

	const { data: logData } = useExponentialBackoffQuery(
		['orderLog', orderId],
		() =>
			getOrderLog({
				orderId,
				UserLoginHash: userLoginHash,
				Limit: 0,
			}),
		{
			maxRefetches: 3,
			baseInterval: 1000,
			refetchMultiplier: [1, 2, 5],
			resetTrigger: resetRefetchTrigger,
		}
	);

	const getPdfMutation = useMutation(
		(documentUrl: string) =>
			getPdfDocument({
				orderId: orderId ?? '',
				UserLoginHash: userLoginHash,
				DocumentUrl: documentUrl,
			}),
		{
			onSuccess: (payload, documentUrl) => {
				if (payload?.pdfData) {
					handleCreateDownloadPdf(payload?.pdfData, documentUrl);
				}
			},
			onError: () => {
				handleShowErrorNotification('admin.orderDetail.loadingDocumentsFailed');
			},
		}
	);

	const cancelOrderMutation = useMutation(
		() =>
			stornoOrder(orderId, {
				userLoginHash,
			}),
		{
			onSuccess: () => {
				handleShowSuccessNotification('admin.cancelOrder.success');

				queryClient.invalidateQueries(orderQueryKey);
				queryClient.invalidateQueries(orderLogQueryKey);
				queryClient.invalidateQueries(orderInvoicesQueryKey);
				setResetRefetchTrigger((prev) => prev + 1);
			},
			onError: () => {
				handleShowErrorNotification('admin.cancelOrder.error');
			},
		}
	);

	const refundOrderMutation = useMutation(
		() =>
			refundOrder(orderId, {
				userLoginHash,
			}),
		{
			onSuccess: () => {
				handleShowSuccessNotification('admin.refundOrder.success');

				queryClient.invalidateQueries(orderQueryKey);
				queryClient.invalidateQueries(orderLogQueryKey);
				queryClient.invalidateQueries(orderInvoicesQueryKey);
				setResetRefetchTrigger((prev) => prev + 1);
			},
			onError: () => {
				handleShowErrorNotification('admin.refundOrder.error');
			},
		}
	);

	const changeOrderStateMutation = useMutation({
		mutationFn: (args: {
			orderState: VinistoHelperDllEnumsOrderOrderState;
			isNotificationEmailSent: boolean;
		}) => {
			const { orderState, isNotificationEmailSent } = args;
			return changeOrderState(orderId, {
				userLoginHash,
				orderState,
				isNotificationEmailSent,
			});
		},
		onSuccess: () => {
			handleShowSuccessNotification('admin.changeOrderState.success');

			queryClient.invalidateQueries(orderQueryKey);
			queryClient.invalidateQueries(orderLogQueryKey);
			queryClient.invalidateQueries(orderInvoicesQueryKey);
			setResetRefetchTrigger((prev) => prev + 1);
		},
		onError: () => {
			handleShowErrorNotification('admin.changeOrderState.error');
		},
	});

	const editInternalNoteMutation = useMutation(
		(note: string) =>
			editInternalOrderNote(orderId, {
				userLoginHash,
				internalOrderNote: note,
			}),
		{
			onSuccess: () => {
				handleShowSuccessNotification('admin.editInternalNote.success');
				queryClient.invalidateQueries(orderQueryKey);
				queryClient.invalidateQueries(orderInvoicesQueryKey);
			},
			onError: () => {
				handleShowErrorNotification('admin.editInternalNote.error');
			},
		}
	);

	const editAddressesInOrderMutation = useMutation(
		(addressData: VinistoOrderDllModelsApiOrderOrderEditAddressesParameters) =>
			editAddressesInOrder(orderId, addressData),
		{
			onSuccess: () => {
				handleShowSuccessNotification('admin.editOrderAddresses.success');
				queryClient.invalidateQueries(orderQueryKey);
				queryClient.invalidateQueries(orderLogQueryKey);
				queryClient.invalidateQueries(orderInvoicesQueryKey);
			},
			onError: () => {
				handleShowErrorNotification('admin.editOrderAddresses.error');
			},
		}
	);

	const handleEditInternalNote = (note: string) =>
		editInternalNoteMutation.mutate(note);

	const handleEditAddressesInOrder = (
		addressData: VinistoOrderDllModelsApiOrderOrderEditAddressesParameters
	) => editAddressesInOrderMutation.mutate(addressData);

	const handleChangeOrderState = (
		orderState: VinistoHelperDllEnumsOrderOrderState,
		isNotificationEmailSent: boolean
	) => changeOrderStateMutation.mutate({ orderState, isNotificationEmailSent });

	const handleGetPdf = (documentUrl: string) =>
		getPdfMutation.mutate(documentUrl);

	const handleConfirmCancelOrder = () => cancelOrderMutation.mutate();

	const handleConfirmRefundOrder = () => refundOrderMutation.mutate();

	const handleCancelOrder = () => {
		confirmAlert({
			title: t({ id: 'admin.btn.cancelOrder' })?.toString(),
			message: t({ id: 'admin.confirm.cancelOrder.message' })?.toString(),
			buttons: [
				{
					label: t({ id: 'admin.no' })?.toString() ?? '',
				},
				{
					label: t({ id: 'admin.yes' })?.toString() ?? '',
					onClick: handleConfirmCancelOrder,
				},
			],
		});
	};

	const handleRefundOrder = () => {
		confirmAlert({
			title: t({ id: 'admin.btn.refundOrder' })?.toString(),
			message: t({ id: 'admin.confirm.refundOrder.message' })?.toString(),
			buttons: [
				{
					label: t({ id: 'admin.no' })?.toString() ?? '',
				},
				{
					label: t({ id: 'admin.yes' })?.toString() ?? '',
					onClick: handleConfirmRefundOrder,
				},
			],
		});
	};

	const createdAt = orderData?.order?.stateChangeRecords?.find(
		(changeRecord) =>
			changeRecord.state === VinistoHelperDllEnumsOrderOrderState.CREATED
	)?.changeTime;

	const orderLogData = useMemo(() => {
		return logData ? getOrderLogData(logData) : [];
	}, [logData]);

	const isOrderCancelled =
		orderData?.order?.states?.includes(
			VinistoHelperDllEnumsOrderOrderState.CANCELLED
		) ?? false;

	return (
		<DetailView>
			<OrderHeader
				createdAt={createdAt ?? null}
				orderNumber={orderData?.order?.orderNumber ?? null}
				orderState={orderData?.order?.state ?? null}
				orderCountryOfSale={orderData?.order?.countryOfSale ?? 'CZ'}
			/>
			<OrderCustomer
				orderId={orderData?.order?.id ?? undefined}
				isStateCreated={orderData?.order?.state === 'CREATED'}
				billingAddress={orderData?.order?.billingAddress}
				deliveryAddress={
					orderData?.order?.delivery?.deliveryAddress ?? undefined
				}
				handleEditAddressesInOrder={handleEditAddressesInOrder}
			/>
			<OrderDeliveryPayment
				delivery={orderData?.order?.delivery}
				payment={orderData?.order?.payment}
			/>
			<OrderItems
				items={orderData?.order?.orderItems}
				addons={orderData?.order?.addons}
				delivery={orderData?.order?.delivery}
				payment={orderData?.order?.payment}
				discountCoupons={orderData?.order?.discountCoupons ?? undefined}
				orderPrice={orderData?.order?.orderPrice}
				orderPriceWithVat={orderData?.order?.orderPriceWithVat}
				orderPlatform={orderData?.order?.platformId}
				orderCurrency={orderData?.order?.orderCurrency}
			/>
			<OrderMoreInfo
				orderId={orderId}
				note={orderData?.order?.internalOrderNote}
				handleEditInternalNote={handleEditInternalNote}
				utmParameters={orderData?.order?.utm ?? undefined}
				discountCoupons={orderData?.order?.discountCoupons ?? undefined}
				handleGetPdf={handleGetPdf}
			/>
			<OrderStates
				orderId={orderId}
				states={orderLogData}
				orderState={
					orderData?.order?.state ?? VinistoHelperDllEnumsOrderOrderState.NONE
				}
				isOrderCancelled={isOrderCancelled}
				handleChangeOrderState={handleChangeOrderState}
				handleStornoOrder={handleCancelOrder}
				handleRefundOrder={handleRefundOrder}
			/>
			<OrderTechnicalDetails
				orderId={orderId}
				orderNumber={orderData?.order?.orderNumber ?? null}
				delivery={orderData?.order?.delivery}
				payment={orderData?.order?.payment}
			/>
		</DetailView>
	);
};

export default OrderDetailPage;
