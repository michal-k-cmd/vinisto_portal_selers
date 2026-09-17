import { OmitConstrained } from 'types';
import { LangValuePair } from 'Hooks/useLocalizedValue/interfaces';
import {
	StockingRequestsListParams,
	VinistoHelperDllEnumsStockingRequestDeliveryTime,
} from 'vinisto_api_client/src/api-types/supplier-api';
import { SpecificationDetail } from 'Services/Specification/interfaces';

import { STOCK_REQUEST_STATE } from './constants';

interface ApiListParamBase {
	key: keyof StockingRequestsListParams;
}

type AllowedValue<T, K extends keyof T> = T[K] extends undefined ? never : T[K];

type ApiParam<T> = {
	[K in keyof T]: { key: K; value: NonNullable<AllowedValue<T, K>> };
}[keyof T];

interface ApiListStateParam extends ApiListParamBase {
	key: 'SearchStockingState';
	value: NonNullable<StockingRequestsListParams['SearchStockingState']>[number];
}

export type ApiListParam =
	| NonNullable<
			ApiParam<
				OmitConstrained<StockingRequestsListParams, 'SearchStockingState'>
			>
	  >
	| ApiListStateParam;

export type StockRequestBundle = {
	id: string;
	name: LangValuePair[];
	specificationDetails: SpecificationDetail[];
	requestedCount: number;
	deliveredCount: number;
	countDifference: number;
	note: string;
	warehouseId: string;
};

export type StockRequestType = {
	id: string;
	requestNumber?: string;
	dateIssued: Date;
	dateDelivery?: Date;
	timeDelivery?: VinistoHelperDllEnumsStockingRequestDeliveryTime;
	isSelfDelivered: boolean;
	dateStocked?: Date;
	state: STOCK_REQUEST_STATE;
	trackingId: string;
	transporterName?: LangValuePair[];
	trackingUrl: string;
	bundles: StockRequestBundle[];
};
