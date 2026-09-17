import {
	VinistoHelperDllEnumsStockingRequestDeliveryType,
	VinistoProductDllModelsApiBundleBundle,
	VinistoStockingRequestDllModelsApiStockingRequestBundleStockingRequest,
	VinistoStockingRequestDllModelsApiStockingRequestStockingRequest,
	VinistoStockingRequestDllModelsApiStockingRequestStockingRequestReturn,
} from 'vinisto_api_client/src/api-types/supplier-api';
import { SpecificationDetail } from 'Services/Specification/interfaces';
import { apiServiceInstance } from 'Services/ApiService';

import { StockRequestBundle, StockRequestType } from './interfaces';
import {
	CONFIRM_STOCK_REQUEST_API,
	STOCK_REQUEST_API,
	STOCK_REQUEST_ID_PLACEHOLDER,
	STOCK_REQUEST_STATE,
	STOCK_REQUEST_STATE_API_MAP,
	TimeSlot,
} from './constants';
import { mapLangValuePairs } from './helpers';

const MILISECONDS = 1000; // API wants seconds

export const mapApiBundles = (
	bundleRequests: VinistoStockingRequestDllModelsApiStockingRequestBundleStockingRequest[],
	bundleDetails: VinistoProductDllModelsApiBundleBundle[]
): StockRequestBundle[] =>
	bundleRequests
		.map((bundleRequest): StockRequestBundle | undefined => {
			const matchingDetail = bundleDetails.find(
				(bundleDetail) => bundleDetail.id === bundleRequest.bundleId
			);
			if (!matchingDetail) return undefined;
			return {
				id: matchingDetail.id ?? '',
				name: mapLangValuePairs(matchingDetail.name),
				specificationDetails:
					(matchingDetail.specificationDetails as SpecificationDetail[]) ?? [],
				requestedCount: bundleRequest.requestedCount ?? 0,
				deliveredCount: bundleRequest.deliveredCount ?? 0,
				countDifference: bundleRequest.countDifference ?? 0,
				note: bundleRequest.note ?? '',
				warehouseId: Array.isArray(matchingDetail.productsDetail)
					? matchingDetail.productsDetail
							.map((product) => product.warehouseId)
							.join(', ')
					: '',
			};
		})
		.filter((bundle): bundle is StockRequestBundle => bundle !== undefined);

const StockRequestService = {
	getDetail: async (stockRequestId: string, userLoginHash: string) => {
		const requestParams = [
			{
				key: 'UserLoginHash',
				value: userLoginHash,
			},
		];
		return apiServiceInstance
			.get<VinistoStockingRequestDllModelsApiStockingRequestStockingRequestReturn>(
				STOCK_REQUEST_API,
				true,
				stockRequestId,
				requestParams
			)
			.then(
				(response) =>
					response.stockingRequest &&
					StockRequestService.mapApiToModel(response.stockingRequest)
			);
	},
	mapApiToModel: (
		data: VinistoStockingRequestDllModelsApiStockingRequestStockingRequest
	): StockRequestType => ({
		id: data.id ?? '',
		requestNumber: data.requestNumber ?? '',
		dateIssued: new Date((data.createdAt ?? 0) * MILISECONDS),
		dateDelivery: data.deliveryDate
			? new Date((data.deliveryDate ?? 0) * MILISECONDS)
			: undefined,
		timeDelivery: data.deliveryTime || undefined,
		dateStocked: data.stockingDate
			? new Date(data.stockingDate * MILISECONDS)
			: undefined,
		isSelfDelivered:
			data.deliveryType ===
			VinistoHelperDllEnumsStockingRequestDeliveryType.SUPPLIER_DELIVERY,
		state: data.stockingState
			? STOCK_REQUEST_STATE_API_MAP[data.stockingState]
			: STOCK_REQUEST_STATE.CANCELLED,
		trackingId: data.trackingNumber ?? '',
		trackingUrl: data.delivery?.trackingUrl ?? '',
		transporterName: data.delivery?.name
			? mapLangValuePairs(data.delivery.name)
			: undefined,
		bundles: mapApiBundles(data.bundles ?? [], data.bundleDetails ?? []),
	}),
	confirmDelivery: async (
		stockRequestId: string,
		userLoginHash: string,
		deliveryDate: Date,
		deliveryTime: TimeSlot
	) => {
		const requestData = {
			userLoginHash,
			deliveryDate: Math.floor(deliveryDate.getTime() / MILISECONDS),
			deliveryTime,
		};
		return apiServiceInstance.put(
			CONFIRM_STOCK_REQUEST_API.replace(
				STOCK_REQUEST_ID_PLACEHOLDER,
				stockRequestId
			),
			requestData,
			true
		);
	},
};

export default StockRequestService;
