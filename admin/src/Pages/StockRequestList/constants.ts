import {
	VinistoHelperDllEnumsStockingRequestDeliveryType,
	VinistoHelperDllEnumsStockingRequestStockingState,
} from 'vinisto_api_client/src/api-types/supplier-api/';

const StockRequestListTableKeys = {
	REQUEST_NUMBER: 'requestNumber',
	CREATED_AT: 'createdAt',
	SUPPLIER: 'supplier',
	DELIVERY_TYPE: 'deliveryType',
	STATE: 'stockingState',
	CARRIER: 'carrier',
	DATE_STOCKING: 'stockingDate',
	DATE_DELIVERY: 'deliveryDate',
	PRINT: 'print',
};

const COLUMN_PROPERTIES = {
	[StockRequestListTableKeys.REQUEST_NUMBER]: {
		filter: 'SearchRequestNumber',
		sorting: 'REQUEST_NUMBER',
	},
	[StockRequestListTableKeys.CREATED_AT]: {
		filter: '',
		sorting: 'CREATE_DATE',
	},
	[StockRequestListTableKeys.SUPPLIER]: {
		filter: 'SearchSupplierId',
		sorting: '',
	},
	[StockRequestListTableKeys.STATE]: {
		filter: 'SearchStockingState',
		sorting: '',
	},
	[StockRequestListTableKeys.DATE_DELIVERY]: {
		filter: '',
		sorting: 'DELIVERY_DATE',
	},
	[StockRequestListTableKeys.DATE_STOCKING]: {
		filter: '',
		sorting: 'STOCKING_DATE',
	},
};

const STOCK_REQUEST_FILTER_COLUMN_MAP = Object.fromEntries(
	Object.entries(COLUMN_PROPERTIES).map(([key, value]) => [key, value.filter])
);

const STOCK_REQUEST_SORTING_COLUMN_MAP = Object.fromEntries(
	Object.entries(COLUMN_PROPERTIES).map(([key, value]) => [key, value.sorting])
);

const transportMethodTranslationKeys = {
	[VinistoHelperDllEnumsStockingRequestDeliveryType.VINISTO_DELIVERY]:
		'admin.stockRequestList.transportMethod.vinisto',
	[VinistoHelperDllEnumsStockingRequestDeliveryType.SUPPLIER_DELIVERY]:
		'admin.stockRequestList.transportMethod.supplier',
};

const stateTranslationKeys = {
	[VinistoHelperDllEnumsStockingRequestStockingState.CANCELLED]:
		'admin.stockRequestList.state.cancelled',
	[VinistoHelperDllEnumsStockingRequestStockingState.CONFIRMED]:
		'admin.stockRequestList.state.confirmed',
	[VinistoHelperDllEnumsStockingRequestStockingState.CREATED]:
		'admin.stockRequestList.state.created',
	[VinistoHelperDllEnumsStockingRequestStockingState.DELIVERY_ORDERED]:
		'admin.stockRequestList.state.deliveryOrdered',
	[VinistoHelperDllEnumsStockingRequestStockingState.SENT]:
		'admin.stockRequestList.state.sent',
	[VinistoHelperDllEnumsStockingRequestStockingState.SENT_WMS]:
		'admin.stockRequestList.state.sentWms',
	[VinistoHelperDllEnumsStockingRequestStockingState.WMS_DELIVERED]:
		'admin.stockRequestList.state.wmsDelivered',
	[VinistoHelperDllEnumsStockingRequestStockingState.WMS_STOCKED]:
		'admin.stockRequestList.state.wmsStocked',
};

const DATE_RANGE_COLUMNS = [
	StockRequestListTableKeys.CREATED_AT,
	StockRequestListTableKeys.DATE_DELIVERY,
	StockRequestListTableKeys.DATE_STOCKING,
];

const MAP_DATE_RANGES_TO_API_PARAMS = {
	[StockRequestListTableKeys.CREATED_AT]: {
		FROM: 'SearchCreateDateFrom',
		TO: 'SearchCreateDateTo',
	},
	[StockRequestListTableKeys.DATE_DELIVERY]: {
		FROM: 'SearchDeliveryDateFrom',
		TO: 'SearchDeliveryDateTo',
	},
	[StockRequestListTableKeys.DATE_STOCKING]: {
		FROM: 'SearchStockingDateFrom',
		TO: 'SearchStockingDateTo',
	},
};

export {
	StockRequestListTableKeys,
	STOCK_REQUEST_FILTER_COLUMN_MAP,
	STOCK_REQUEST_SORTING_COLUMN_MAP,
	transportMethodTranslationKeys,
	stateTranslationKeys,
	DATE_RANGE_COLUMNS,
	MAP_DATE_RANGES_TO_API_PARAMS,
};
