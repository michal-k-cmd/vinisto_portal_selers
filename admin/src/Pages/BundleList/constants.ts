export const LIST_API_ENDPOINT = 'product-api/bundles/get-bundles';

export const SUPPLIER_API_ENDPOINT = 'supplier-api/suppliers';
export const SUPPLIER_API_LIMIT = 'Limit';
export const SUPPLIER_API_USER_LOGIN_HASH = 'UserLoginHash';
export const SUPPLIER_FILTER_NAME_MAX_LENGTH = 30;

const BundleListTableKeys = {
	ID: 'id',
	NAME: 'name',
	URL: 'url',
	LAST_VIEWED: 'lastViewed',
	PRICE: 'price',
	EVALUATION: 'evaluation',
	SUPPLIER: 'suppliers',
	CATEGORY: 'category',
	TAG: 'tag',
	SCORING: 'scoring',
	FLAGS: 'flags',
	IS_SET: 'isSet',
	STATES: 'bundleStates',
	WAREHOUSE_ID: 'warehouseId',
	PLATFORM: 'platform',
	SPECIFICATIONS: 'specifications',
};

const COLUMN_PROPERTIES = {
	[BundleListTableKeys.ID]: {
		filter: 'SearchId',
		sorting: 'ID',
	},
	[BundleListTableKeys.NAME]: {
		filter: 'SearchName',
		sorting: 'NAME',
	},
	[BundleListTableKeys.URL]: {
		filter: 'SearchUrl',
		sorting: 'URL',
	},
	[BundleListTableKeys.LAST_VIEWED]: {
		filter: 'SearchLastViewed',
		sorting: 'LAST_VIEWED',
	},
	[BundleListTableKeys.PRICE]: {
		filter: 'SearchPrice',
		sorting: 'PRICE',
	},
	[BundleListTableKeys.EVALUATION]: {
		filter: 'SearchEvaluation',
		sorting: 'EVALUATION',
	},
	[BundleListTableKeys.SUPPLIER]: {
		filter: 'supplierIds',
		sorting: 'SUPPLIER_NAME',
	},
	[BundleListTableKeys.SCORING]: {
		filter: 'SearchScoring',
		sorting: 'SCORING',
	},
	[BundleListTableKeys.IS_SET]: {
		filter: 'isSet',
		sorting: '',
	},
	[BundleListTableKeys.PLATFORM]: {
		filter: 'platform',
	},
};

const FILTER_COLUMN_MAP = Object.fromEntries(
	Object.entries(COLUMN_PROPERTIES).map(([key, value]) => [key, value.filter])
);

const SORTING_COLUMN_MAP = Object.fromEntries(
	Object.entries(COLUMN_PROPERTIES).map(([key, value]) => [key, value.sorting])
);

export { BundleListTableKeys, FILTER_COLUMN_MAP, SORTING_COLUMN_MAP };
