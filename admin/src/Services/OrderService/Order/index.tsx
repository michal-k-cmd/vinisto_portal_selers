import {
	ApplicationLogDetailParams,
	InvoicesOrderGetPdfDocumentListParams,
	OrdersDetailParams,
	OrdersListParams,
	VinistoApplicationLogDllModelsApiApplicationLogApplicationLogReturn,
	VinistoHelperDllBaseAuthorizationParameters,
	VinistoHelperDllBaseBaseReturn,
	VinistoOrderDllModelsApiOrderOrderChangeParameters,
	VinistoOrderDllModelsApiOrderOrderEditAddressesParameters,
	VinistoOrderDllModelsApiOrderOrderEditInternalNoteParameters,
	VinistoOrderDllModelsApiReturnDataOrderReturn,
	VinistoOrderDllModelsApiReturnDataOrdersReturn,
	VinistoOrderDllModelsApiReturnDataPdfReturn,
} from 'vinisto_api_client/src/api-types/order-api';
import { apiServiceInstance } from 'Services/ApiService';
import transformParamsToQueryArgs from 'Helpers/transform-params-to-query-args';

import { APPLICATION_LOG_URI, ORDER_URI } from '../constants';

const getList = async (params: OrdersListParams) => {
	const queryArgs = transformParamsToQueryArgs(params);

	const res =
		await apiServiceInstance.getCollection<VinistoOrderDllModelsApiReturnDataOrdersReturn>(
			ORDER_URI,
			queryArgs
		);

	return res;
};

const getById = async (params: OrdersDetailParams) => {
	const queryArgs = transformParamsToQueryArgs(params);

	const res =
		await apiServiceInstance.get<VinistoOrderDllModelsApiReturnDataOrderReturn>(
			`${ORDER_URI}/${params.orderId}`,
			undefined,
			undefined,
			queryArgs
		);

	return res;
};

const removeDiscountCoupon = async (
	orderId: string,
	request: VinistoHelperDllBaseAuthorizationParameters
) => {
	const res =
		await apiServiceInstance.put<VinistoOrderDllModelsApiReturnDataOrderReturn>(
			`${ORDER_URI}/${orderId}/RemoveDiscountCoupon`,
			request
		);

	return res;
};
const getPdfDocument = async (
	params: InvoicesOrderGetPdfDocumentListParams
) => {
	const queryArgs = transformParamsToQueryArgs(params);

	const res =
		await apiServiceInstance.get<VinistoOrderDllModelsApiReturnDataPdfReturn>(
			`order-api/invoices/order/${params.orderId}/get-pdf-document`,
			undefined,
			undefined,
			queryArgs
		);

	return res;
};
const stornoOrder = async (
	orderId: string,
	request: VinistoHelperDllBaseAuthorizationParameters
) => {
	const res =
		await apiServiceInstance.put<VinistoOrderDllModelsApiReturnDataOrderReturn>(
			`${ORDER_URI}/${orderId}/StornoOrder`,
			request
		);

	return res;
};

const refundOrder = async (
	orderId: string,
	request: VinistoHelperDllBaseAuthorizationParameters
) => {
	const res =
		await apiServiceInstance.put<VinistoOrderDllModelsApiReturnDataOrderReturn>(
			`${ORDER_URI}/${orderId}/refund`,
			request
		);

	return res;
};

const sendOrderToFlexi = async (
	orderId: string,
	request: VinistoHelperDllBaseAuthorizationParameters
) => {
	const res = await apiServiceInstance.put<VinistoHelperDllBaseBaseReturn>(
		`${ORDER_URI}/${orderId}/SendOrderToFlexi`,
		request
	);

	return res;
};
const changeOrderState = async (
	orderId: string,
	request: VinistoOrderDllModelsApiOrderOrderChangeParameters
) => {
	const res =
		await apiServiceInstance.put<VinistoOrderDllModelsApiReturnDataOrderReturn>(
			`${ORDER_URI}/${orderId}/OrderChangeState`,
			request
		);

	return res;
};
const editInternalOrderNote = async (
	orderId: string,
	request: VinistoOrderDllModelsApiOrderOrderEditInternalNoteParameters
) => {
	const res =
		await apiServiceInstance.put<VinistoOrderDllModelsApiReturnDataOrderReturn>(
			`${ORDER_URI}/${orderId}/edit-internal-order-note`,
			request
		);

	return res;
};

const getOrderLog = async (query: ApplicationLogDetailParams) => {
	const queryArgs = transformParamsToQueryArgs(query);

	const res =
		await apiServiceInstance.get<VinistoApplicationLogDllModelsApiApplicationLogApplicationLogReturn>(
			`${APPLICATION_LOG_URI}/${query.orderId}`,
			undefined,
			undefined,
			queryArgs
		);

	return res;
};

const editAddressesInOrder = async (
	orderId: string,
	request: VinistoOrderDllModelsApiOrderOrderEditAddressesParameters
) => {
	const res =
		await apiServiceInstance.put<VinistoOrderDllModelsApiOrderOrderEditAddressesParameters>(
			`${ORDER_URI}/${orderId}/EditAddressesInOrder`,
			request
		);

	return res;
};

export const OrderService = {
	getList,
	getById,
	removeDiscountCoupon,
	getPdfDocument,
	stornoOrder,
	refundOrder,
	sendOrderToFlexi,
	changeOrderState,
	editInternalOrderNote,
	getOrderLog,
	editAddressesInOrder,
};
