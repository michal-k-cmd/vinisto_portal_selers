import { BillingState } from './constants';

// TODO: Import auto-generated interfaces from Swagger once backend is merged.
export interface IAPIBillingsBundle {
	bundleLot: string;
	id?: string;
	name: { language: string; value?: string }[];
	soldPcs: number;
	sumPrice: number;
	sumFee: number;
	percentFee: number;
	totalProfit: number;
}

export interface IAPIBilling {
	id?: string;
	billingNumber?: string;
	timeFrom: number;
	timeTo: number;
	createdAt: number;
	supplierId?: string;
	state: BillingState;
	totalSum: number;
	billingPdf: string;
	invoicePdf: string;
	bundles?: IAPIBillingsBundle[];
}

export interface IAPIDefaultResponse {
	isError: boolean;
	error: string[];
	count: number;
}
export interface IAPIBillingsListResponse extends IAPIDefaultResponse {
	billings: IAPIBilling[];
}

export interface IAPIBillingsDetailResponse extends IAPIDefaultResponse {
	billing: IAPIBilling;
}

export enum QueryParamsKeys {
	TimeFrom = 'TimeFrom',
	TimeTo = 'TimeTo',
	SupplierId = 'SupplierId',
	Limit = 'Limit',
	Offset = 'Offset',
	UserLoginHash = 'UserLoginHash',
}

interface QueryParamsArray {
	key: QueryParamsKeys;
	value: string | number;
}

/*
  TODO: FIX: QueryOptions should be object
  Reason: Cannot properly type which key/value pair is required
*/
export type IAIPRequestQueryOptions = QueryParamsArray[];

// Internal types for View
export interface BillingListItem {
	id: string;
	billingNumber: string;
	timeFrom: string | Date;
	timeTo: string | Date;
	date: string | Date;
	totalSum: number;
	state: BillingState;
	pdf: string;
	invoice: string;
}

export interface BillingDetailBundle {
	id?: string;
	name?: string;
	soldPcs: number;
	sumPrice: number;
	sumFee: number;
	percentFee: number;
	totalProfit: number;
}

export interface BillingDetailItem extends BillingListItem {
	bundles: BillingDetailBundle[];
}
