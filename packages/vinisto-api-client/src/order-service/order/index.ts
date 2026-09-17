import api, { BaseResponse } from '@/api';
import {
	DiscountCouponsGetOrdersListParams,
	VinistoOrderDllModelsApiReturnDataOrderInternalDocumentsReturn,
} from '@/api-types/order-api';
import {
	OrderDocumentsListParams,
	OrderDocumentsCreateParams,
	OrderDocumentsCreatePayload,
	OrderDocumentsDeleteParams,
	OrderDocumentsDetailParams,
	OrdersListParams,
	VinistoHelperDllBaseBaseReturn,
	VinistoOrderDllModelsApiReturnDataOrderReturn,
	VinistoOrderDllModelsApiReturnDataOrdersReturn,
} from '@/api-types/order-api';

import { ORDER_API_BASE_URI } from '../constants';

//TODO: finish and use domain model
const getOrderById = async (id: string, userLoginHash?: string) => {
	const res = await api.get<VinistoOrderDllModelsApiReturnDataOrderReturn>(
		`${ORDER_API_BASE_URI}/orders/${id}`,
		userLoginHash ? { UserLoginHash: userLoginHash } : undefined
	);

	if (res.order === null || res.order === undefined) {
		throw new Error('No order data in response');
	}

	return res.order;
};

const getOrderList = async (params: OrdersListParams) => {
	const res = await api.get<VinistoOrderDllModelsApiReturnDataOrdersReturn>(
		`${ORDER_API_BASE_URI}/orders`,
		params
	);

	if (res.orders === null || res.orders === undefined) {
		throw new Error('No orders data in response');
	}

	return res.orders;
};

const getOrderDocuments = async (params: OrderDocumentsListParams) => {
	//TODO: extend this type I guess.. ?? It should contain urls of the documents
	const res =
		await api.get<VinistoOrderDllModelsApiReturnDataOrderInternalDocumentsReturn>(
			`${ORDER_API_BASE_URI}/order/${params.orderId}/documents`,
			params
		);

	return res;
};

const getOrderDocument = async (
	params: OrderDocumentsDetailParams,
	fileName: string
) => {
	const { orderId, documentId, UserLoginHash } = params;

	try {
		const response = await api.get<Blob & BaseResponse>(
			`${ORDER_API_BASE_URI}/order/${orderId}/documents/${documentId}`,
			{ UserLoginHash },
			{
				headers: {
					Accept: 'application/octet-stream',
				},
				responseType: 'blob',
			}
		);

		const file = new File([response], fileName, { type: response.type });
		return file;
	} catch (error) {
		console.error('Failed to fetch document:', error);
		throw error;
	}
};

const uploadOrderDocuments = async (
	params: OrderDocumentsCreateParams,
	payload: OrderDocumentsCreatePayload
) => {
	const formData = new FormData();
	payload.documents?.forEach((file) => {
		formData.append('documents', file);
	});

	const res = await api.post<VinistoHelperDllBaseBaseReturn>(
		`${ORDER_API_BASE_URI}/order/${params.orderId}/documents`,
		params,
		formData,
		{
			headers: {
				accept: 'text/plain',
			},
		}
	);

	return res;
};

const deleteOrderDocument = async (params: OrderDocumentsDeleteParams) => {
	const { orderId, documentId, UserLoginHash } = params;

	const res = await api.delete<VinistoHelperDllBaseBaseReturn>(
		`${ORDER_API_BASE_URI}/order/${orderId}/documents/${documentId}`,
		{ UserLoginHash }
	);

	return res;
};

const getOrdersWithDiscountCode = async (
	discountCouponId: string,
	params: Omit<DiscountCouponsGetOrdersListParams, 'discountCouponId'>
) => {
	const res = await api.get<VinistoOrderDllModelsApiReturnDataOrdersReturn>(
		`${ORDER_API_BASE_URI}/discount-coupons/${discountCouponId}/GetOrders`,
		params
	);

	return res.orders;
};

const OrderService = {
	getOrderById,
	getOrderList,
	getOrderDocuments,
	getOrderDocument,
	uploadOrderDocuments,
	deleteOrderDocument,
	getOrdersWithDiscountCode,
};

export default OrderService;
