import {
	BillingsDetailParams,
	OrdersBillingOrdersListParams,
	VinistoOrderDllModelsApiBillingBilling,
	VinistoOrderDllModelsApiOrderOrder,
	VinistoOrderDllModelsApiReturnDataBillingReturn,
} from 'vinisto_api_client/src/api-types/order-api';
import { dayjsInstance as dayjs } from 'Services/Date';
import transformParamsToQueryArgs from 'Helpers/transform-params-to-query-args';
import {
	BILLING_ORDERS_URI,
	BILLING_URI,
} from 'Services/OrderService/constants';
import { apiServiceInstance } from 'Services/ApiService';

import {
	Billing,
	BillingOrder,
	VinistoOrderDllModelsApiReturnDataBillingOrdersReturn,
} from '../interfaces';

const mapApiToEntity = (
	apiData: VinistoOrderDllModelsApiBillingBilling
): Billing => {
	return {
		id: apiData.id ?? '',
		billingNumber: apiData.billingNumber,
		invoiceNumber: apiData.invoiceNumber,
		timeFrom: dayjs.unix(apiData.timeFrom ?? 0).toDate(),
		timeTo: dayjs.unix(apiData.timeTo ?? 0).toDate(),
		createdAt: dayjs.unix(apiData.createdAt ?? 0).toDate(),
		supplierId: apiData.supplierId,
		state: apiData.state,
		totalSum: apiData.totalSum ?? 0,
		feeRecords: apiData.feeRecords,
		billingPdf: apiData.billingPdf,
		invoicePdf: apiData.invoicePdf,
		bundles: apiData.bundles,
		supplierName: apiData.supplierName ?? '',
	};
};

const mapApiToOrdersEntity = (
	apiData: VinistoOrderDllModelsApiOrderOrder
): BillingOrder => {
	return {
		id: apiData.id ?? '',
		stateChangeRecords: apiData.stateChangeRecords,
		orderItems: apiData.orderItems,
		orderNumber: apiData.orderNumber ?? '',
		sumOrderFee: apiData.sumOrderFee ?? 0,
		sumOrderFeeWithVat: apiData.sumOrderFeeWithVat ?? 0,
		//@ts-expect-error TS error - badly generated API
		sumOrderSaleFee: apiData.sumOrderSaleFee ?? 0,
		//@ts-expect-error TS error - badly generated API
		sumOrderSaleFeeWithVat: apiData.sumOrderSaleFeeWithVat ?? 0,
		//@ts-expect-error TS error - badly generated API
		sumOrderLogisticFee: apiData.sumOrderLogisticFee ?? 0,
		//@ts-expect-error TS error - badly generated API
		sumOrderLogisticFeeWithVat: apiData.sumOrderLogisticFeeWithVat ?? 0,
	};
};

const getBillingById = (params: BillingsDetailParams) => {
	const queryArgs = transformParamsToQueryArgs(params);
	const res = apiServiceInstance
		.get<VinistoOrderDllModelsApiReturnDataBillingReturn>(
			`${BILLING_URI}/${params.billingId}`,
			undefined,
			undefined,
			queryArgs
		)
		.then((payload) => payload.billing && mapApiToEntity(payload.billing));
	return res;
};

const getOrdersByBillingId = async (params: OrdersBillingOrdersListParams) => {
	const queryArgs = transformParamsToQueryArgs(params);

	const res =
		await apiServiceInstance.getCollection<VinistoOrderDllModelsApiReturnDataBillingOrdersReturn>(
			BILLING_ORDERS_URI,
			queryArgs
		);
	if (res.ordersBilling) {
		return res.ordersBilling.map((order: VinistoOrderDllModelsApiOrderOrder) =>
			mapApiToOrdersEntity(order)
		);
	} else {
		return [];
	}
};

const BillingService = {
	mapApiToEntity,
	getBillingById,
	getOrdersByBillingId,
};

export default BillingService;
