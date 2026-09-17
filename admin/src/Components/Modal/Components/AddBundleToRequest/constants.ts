import { createColumnMaps } from 'Components/AdminTable/helpers';

const BundleStockingTableKeys = {
	ID: 'id',
	WAREHOUSE_ID: 'warehouseId',
	NAME: 'name',
	YEAR: 'year',
	BATCHES: 'batches',
	KIND: 'kind',
	TYPE: 'type',
	CATEGORIZATION: 'catgorization',
	STOCK: 'availableCount',
	STOCK_UP: 'stockUp',
};

const COLUMN_PROPERTIES = {
	[BundleStockingTableKeys.ID]: {
		filter: '',
		sorting: '',
	},
	[BundleStockingTableKeys.WAREHOUSE_ID]: {
		filter: 'SearchWarehouseId',
		sorting: 'WAREHOUSE_ID',
	},
	[BundleStockingTableKeys.NAME]: {
		filter: 'SearchName',
		sorting: 'NAME',
	},
	[BundleStockingTableKeys.YEAR]: {
		filter: 'SearchYear',
		sorting: '',
	},
	[BundleStockingTableKeys.BATCHES]: {
		filter: 'SearchBatches',
		sorting: '',
	},
	[BundleStockingTableKeys.KIND]: {
		filter: 'SearchKind',
		sorting: '',
	},
	[BundleStockingTableKeys.TYPE]: {
		filter: 'SearchType',
		sorting: '',
	},
	[BundleStockingTableKeys.CATEGORIZATION]: {
		filter: 'SearchCategorization',
		sorting: '',
	},
	[BundleStockingTableKeys.STOCK_UP]: {
		filter: '',
		sorting: '',
	},
};

const {
	filterColumnMap: BUNDLE_STOCKING_FILTER_COLUMN_MAP,
	sortingColumnMap: BUNDLE_STOCKING_SORTING_COLUMN_MAP,
} = createColumnMaps(COLUMN_PROPERTIES);

export {
	BundleStockingTableKeys,
	BUNDLE_STOCKING_FILTER_COLUMN_MAP,
	BUNDLE_STOCKING_SORTING_COLUMN_MAP,
};
