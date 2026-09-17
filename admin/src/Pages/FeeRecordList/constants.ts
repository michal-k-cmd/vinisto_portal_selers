const FeeRecordListTableKeys = {
	ID: 'id',
	SUPPLIER_ID: 'supplierId',
	ORDER_ID: 'orderId',
	BUNDLE_ID: 'bundleId',
	CREATED_AT: 'createdAt',
	TYPE: 'type',
	PRICE: 'price',
	IS_PAID_OUT: 'isPaidOut',
};

const COLUMN_PROPERTIES = {
	[FeeRecordListTableKeys.BUNDLE_ID]: {
		filter: 'BundleId',
		sorting: 'BUNDLE_ID',
	},
	[FeeRecordListTableKeys.ID]: {
		filter: '',
		sorting: 'ID',
	},
	[FeeRecordListTableKeys.ORDER_ID]: {
		filter: 'OrderId',
		sorting: 'ORDER_ID',
	},
	[FeeRecordListTableKeys.SUPPLIER_ID]: {
		filter: 'SupplierId',
		sorting: 'SUPPLIER_ID',
	},
	[FeeRecordListTableKeys.CREATED_AT]: {
		filter: '',
		sorting: 'TIME',
	},
	[FeeRecordListTableKeys.TYPE]: {
		filter: 'FeeRecordType',
		sorting: 'FEE_RECORD_TYPE',
	},
	[FeeRecordListTableKeys.PRICE]: {
		filter: '',
		sorting: 'PRICE',
	},
	[FeeRecordListTableKeys.IS_PAID_OUT]: {
		filter: 'IsPaidOut',
		sorting: 'IS_PAID_OUT',
	},
};

const FILTER_COLUMN_MAP = Object.fromEntries(
	Object.entries(COLUMN_PROPERTIES).map(([key, value]) => [key, value.filter])
);

const SORTING_COLUMN_MAP = Object.fromEntries(
	Object.entries(COLUMN_PROPERTIES).map(([key, value]) => [key, value.sorting])
);

const EMPTY_OID = '000000000000000000000000';

export {
	FeeRecordListTableKeys,
	COLUMN_PROPERTIES,
	FILTER_COLUMN_MAP,
	SORTING_COLUMN_MAP,
	EMPTY_OID,
};
