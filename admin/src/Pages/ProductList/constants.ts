import { createColumnMaps } from 'Components/AdminTable/helpers';

const ProductListTableKeys = {
	ID_COLUMN: 'id',
	WAREHOUSE_ID_COLUMN: 'warehouseId',
	EAN_COLUMN: 'ean',
	URL_COLUMN: 'url',
	NAME_COLUMN: 'name',
	LAST_VIEWED_COLUMN: 'lastViewed',
	AVAILABLE_COUNT: 'availableCount',
	IS_ENABLED_COLUMN: 'isEnabled',
	IS_DELETED_COLUMN: 'isDeleted',
	TAGS_COLUMN: 'tags',
	PRICE_COLUMN: 'price',
};

const COLUMN_PROPERTIES = {
	[ProductListTableKeys.ID_COLUMN]: {
		filter: 'SearchId',
		sorting: 'ID',
	},
	[ProductListTableKeys.WAREHOUSE_ID_COLUMN]: {
		filter: 'SearchWarehouseId',
		sorting: 'WAREHOUSE_ID',
	},
	[ProductListTableKeys.EAN_COLUMN]: {
		filter: 'SearchEan',
		sorting: 'EAN',
	},
	[ProductListTableKeys.URL_COLUMN]: {
		filter: 'SearchUrl',
		sorting: 'URL',
	},
	[ProductListTableKeys.NAME_COLUMN]: {
		filter: 'SearchName',
		sorting: 'NAME',
	},
	[ProductListTableKeys.LAST_VIEWED_COLUMN]: {
		filter: 'SearchLastViewed',
		sorting: 'LAST_VIEWED',
	},
	[ProductListTableKeys.AVAILABLE_COUNT]: {
		filter: 'SearchWarehouseQty',
		sorting: 'WAREHOUSE_QTY',
	},
	[ProductListTableKeys.IS_ENABLED_COLUMN]: {
		filter: 'IsEnabled',
		sorting: 'IS_ENABLED',
	},
	[ProductListTableKeys.IS_DELETED_COLUMN]: {
		filter: 'IsDeleted',
		sorting: 'IS_DELETED',
	},
	[ProductListTableKeys.IS_ENABLED_COLUMN]: {
		filter: 'IsEnabled',
		sorting: 'IS_ENABLED',
	},
};

const {
	filterColumnMap: FILTER_COLUMN_MAP,
	sortingColumnMap: SORTING_COLUMN_MAP,
} = createColumnMaps(COLUMN_PROPERTIES);

export { ProductListTableKeys, FILTER_COLUMN_MAP, SORTING_COLUMN_MAP };
