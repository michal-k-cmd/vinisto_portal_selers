import { OrderState } from './constants';

export interface IAPIOrdersBundle {
	bundle: {
		id?: string;
		orderNumber: string;
		name: string;
		price: {
			valueWithVat: number;
		};
	};
	quantity: number;
}

export interface IAPIOrder {
	id?: string;
	state: OrderState;
	stateChangeRecords: { state: string; changeTime?: number }[];
	orderItems?: IAPIOrdersBundle[];
	orderNumber?: string;
	orderPriceWithVat: number;
}

export interface IAPIDefaultResponse {
	isError: boolean;
	error: string[];
	count: number;
}
export interface IAPIOrdersListResponse extends IAPIDefaultResponse {
	orders: IAPIOrder[];
}

export interface IAPIOrderDetailResponse extends IAPIDefaultResponse {
	order: IAPIOrder;
}

export enum QueryParamsKeys {
	TimeFrom = 'TimeFrom',
	TimeTo = 'TimeTo',
	SupplierId = 'SupplierId',
	Limit = 'Limit',
	Offset = 'Offset',
	UserLoginHash = 'UserLoginHash',
	SortingColumn = 'SortingColumn',
	IsSortingDescending = 'IsSortingDescending',
}

interface QueryParamsArray {
	key: QueryParamsKeys;
	value: string | number;
}

export type IAIPRequestQueryOptions = QueryParamsArray[];

// Internal types for View
export interface OrderListItem {
	id: string;
	date: string | Date;
	state: OrderState;
	orderPriceWithVat: number;
	orderNumber: string;
}

export interface OrderDetailBundle {
	id: string;
	name?: string;
	orderNumber: string;
	quantity: number;
	price: number;
}

export interface OrderDetailItem extends OrderListItem {
	id: string;
	orderItems: OrderDetailBundle[];
}
