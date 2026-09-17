const BillingListTableKeys = {
	BILLING_NUMBER: 'billingNumber',
	SUPPLIER_NAME: 'supplierName',
	CREATED_AT: 'createdAt',
	TOTAL_PRICE: 'totalSum',
	STATE: 'state',
	INVOICE: 'invoiceColumn',
	BILLING: 'billingColumn',
	BUTTON: 'buttonColumn',
};

const COLUMN_PROPERTIES = {
	[BillingListTableKeys.BILLING_NUMBER]: {
		sorting: 'BILLING_NUMBER',
	},
	[BillingListTableKeys.SUPPLIER_NAME]: {
		sorting: 'SUPPLIER_NAME',
		filter: 'supplierName',
	},
	[BillingListTableKeys.CREATED_AT]: {
		sorting: 'CREATION_DATE',
		filter: 'createdAt',
	},
	[BillingListTableKeys.TOTAL_PRICE]: {
		sorting: 'TOTAL_PRICE',
	},
	[BillingListTableKeys.STATE]: {
		sorting: 'STATE',
	},
};

const SORTING_COLUMN_MAP = Object.fromEntries(
	Object.entries(COLUMN_PROPERTIES).map(([key, value]) => [key, value.sorting])
);

const DEFAULT_SORT = [
	{
		id: BillingListTableKeys.CREATED_AT,
		desc: true,
	},
];

export { BillingListTableKeys, SORTING_COLUMN_MAP, DEFAULT_SORT };
