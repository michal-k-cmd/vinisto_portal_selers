export const ID_DB_COLUMN = 'id';
export const BUNDLE_ID_DB_COLUMN = 'warehouseID';
export const NAME_DB_COLUMN = 'name';
export const URL_DB_COLUMN = 'url';
export const QUANTITY_DB_COLUMN = 'quantity';
export const SUPPLIER_DB_COLUMN = 'supplier';
export const STOCKING_ON_WAY_DB_COLUMN = 'stockingOnWay';
export const STOCKING_WAITING_DB_COLUMN = 'stockingWaiting';
export const FLAGS = 'flags';
export const PLATFORM = 'platform';
export const QUANTITY_FILTER = {
	MIN: 0,
	MAX: 1000,
};

export const SORTING_COLUMN_MAP = {
	[ID_DB_COLUMN]: 'ID',
	[NAME_DB_COLUMN]: 'BUNDLE_NAME',
	[URL_DB_COLUMN]: 'BUNDLE_URL',
	[QUANTITY_DB_COLUMN]: 'QUANTITY',
	[SUPPLIER_DB_COLUMN]: 'SUPPLIER_NAME',
	[BUNDLE_ID_DB_COLUMN]: 'BUNDLE_ID',
	[PLATFORM]: 'PLATFORM',
};

export const LIST_API_ENDPOINT =
	'warehouse-api/warehouse/bundles/GetWarehouseItems';
