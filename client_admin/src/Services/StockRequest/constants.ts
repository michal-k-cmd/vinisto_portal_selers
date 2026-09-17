import {
	VinistoHelperDllEnumsStockingRequestSortableColumns as SortableColumns,
	VinistoHelperDllEnumsErrorSpecificError as SpecificError,
	VinistoHelperDllEnumsStockingRequestDeliveryTime as StockingRequestDeliveryTime,
	VinistoHelperDllEnumsStockingRequestDeliveryType as StockingRequestDeliveryType,
	VinistoHelperDllEnumsStockingRequestStockingState as StockingState,
} from 'vinisto_api_client/src/api-types/supplier-api';

export const STOCK_REQUEST_ID_PLACEHOLDER = '{stockingRequestId}';
export const STOCK_REQUEST_API = 'supplier-api/stocking-requests';
export const CONFIRM_STOCK_REQUEST_API = `supplier-api/stocking-requests/${STOCK_REQUEST_ID_PLACEHOLDER}/states/ConfirmStockingRequest`;

export const STOCKING_REQUEST_DELIVERY_DATE_NOT_FUTURE =
	SpecificError.STOCKING_REQUEST_DELIVERY_DATE_NOT_FUTURE;
export const STOCKING_REQUEST_ALREADY_CONFIRMED =
	SpecificError.STOCKING_REQUEST_ALREADY_CONFIRMED;

export enum STOCK_REQUEST_STATE {
	SENT = StockingState.SENT,
	CANCELLED = StockingState.CANCELLED,
	CONFIRMED = StockingState.CONFIRMED,
	WMS_STOCKED = StockingState.WMS_STOCKED,
}

export const STOCK_REQUEST_STATE_API_MAP = {
	[StockingState.CREATED]: STOCK_REQUEST_STATE.SENT,
	[StockingState.SENT]: STOCK_REQUEST_STATE.SENT,
	[StockingState.CANCELLED]: STOCK_REQUEST_STATE.CANCELLED,
	[StockingState.CONFIRMED]: STOCK_REQUEST_STATE.CONFIRMED,
	[StockingState.SENT_WMS]: STOCK_REQUEST_STATE.CONFIRMED,
	[StockingState.DELIVERY_ORDERED]: STOCK_REQUEST_STATE.CONFIRMED,
	[StockingState.WMS_DELIVERED]: STOCK_REQUEST_STATE.CONFIRMED,
	[StockingState.WMS_STOCKED]: STOCK_REQUEST_STATE.WMS_STOCKED,
};

export enum STOCK_REQUEST_DELIVERY_TYPE {
	SUPPLIER_DELIVERY = StockingRequestDeliveryType.SUPPLIER_DELIVERY,
	VINISTO_DELIVERY = StockingRequestDeliveryType.VINISTO_DELIVERY,
}

export enum TimeSlot {
	D_8_10 = StockingRequestDeliveryTime.D_8_10,
	D_10_12 = StockingRequestDeliveryTime.D_10_12,
	D_12_14 = StockingRequestDeliveryTime.D_12_14,
	D_14_16 = StockingRequestDeliveryTime.D_14_16,
}

export enum STOCK_REQUEST_COLUMN {
	REQUEST_NUMBER = 'requestNumber',
	DATE_ISSUED = 'dateIssued',
	DELIVERY_TYPE = 'isSelfDelivered',
	DATE_STOCKED = 'dateStocked',
	STATE = 'state',
}

export const SORTING_COLUMN_MAP: { [key: string]: SortableColumns } = {
	[STOCK_REQUEST_COLUMN.REQUEST_NUMBER]: SortableColumns.REQUEST_NUMBER,
	[STOCK_REQUEST_COLUMN.DATE_ISSUED]: SortableColumns.CREATE_DATE,
	[STOCK_REQUEST_COLUMN.DELIVERY_TYPE]: SortableColumns.DELIVERY_TYPE,
	[STOCK_REQUEST_COLUMN.DATE_STOCKED]: SortableColumns.STOCKING_DATE,
	[STOCK_REQUEST_COLUMN.STATE]: SortableColumns.STATE,
};

export const FILTER_COLUMN_MAP = {
	[STOCK_REQUEST_COLUMN.REQUEST_NUMBER]: 'SearchRequestNumber',
	[STOCK_REQUEST_COLUMN.DATE_ISSUED]: 'SearchCreateDate',
	[STOCK_REQUEST_COLUMN.DELIVERY_TYPE]: 'SearchDeliveryType',
	[STOCK_REQUEST_COLUMN.DATE_STOCKED]: 'SearchStockingDate',
	[STOCK_REQUEST_COLUMN.STATE]: 'SearchStockingState',
} as const;

export const STOCK_REQUEST_STATE_FILTER_MAP = {
	[STOCK_REQUEST_STATE.SENT]: [StockingState.SENT],
	[STOCK_REQUEST_STATE.CANCELLED]: [StockingState.CANCELLED],
	[STOCK_REQUEST_STATE.CONFIRMED]: [
		StockingState.CONFIRMED,
		StockingState.SENT_WMS,
		StockingState.DELIVERY_ORDERED,
		StockingState.WMS_DELIVERED,
	],
	[STOCK_REQUEST_STATE.WMS_STOCKED]: [StockingState.WMS_STOCKED],
};
