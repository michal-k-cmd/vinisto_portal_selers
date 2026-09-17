export const BATCH_COLUMN = 'batch';
export const ID_COLUMN = 'id';
export const NAME_COLUMN = 'name';
export const CATEGORY_COLUMN = 'categories';
export const IN_STOCK_COLUMN = 'availableCount';
export const B2C_PRICE_COLUMN = 'price';
export const B2B_PRICE_COLUMN = 'price_b2b';
export const STATE_COLUMN = 'state';

export const IS_ACTIVE_PARAM = 'isActive';

export const SORTING_COLUMN_MAP = {
	[ID_COLUMN]: 'ID',
	[NAME_COLUMN]: 'NAME',
};

export const LIST_API_ENDPOINT = 'product-api/bundles/get-bundles';

export const CATEGORY_API_ENDPOINT = 'product-api/categories';
export const CATEGORY_API_LIMIT = 'Limit';

export enum BUNDLE_STATE {
	AVAILABLE = 'AVAILABLE',
	DISABLED = 'DISABLED',
	OUT_OF_STOCK = 'OUT_OF_STOCK',
	PENDING = 'PENDING',
}

export const bundleStateCssClass = {
	[BUNDLE_STATE.AVAILABLE]: 'bundle-state--available',
	[BUNDLE_STATE.DISABLED]: 'bundle-state--disabled',
	[BUNDLE_STATE.OUT_OF_STOCK]: 'bundle-state--oos',
	[BUNDLE_STATE.PENDING]: 'bundle-state--pending',
};

export const bundleStateLabel = {
	[BUNDLE_STATE.AVAILABLE]: 'bundleState.available',
	[BUNDLE_STATE.DISABLED]: 'bundleState.disabled',
	[BUNDLE_STATE.OUT_OF_STOCK]: 'bundleState.outOfStock',
	[BUNDLE_STATE.PENDING]: 'bundleState.pending',
};

export const BundleListTabs = [
	{
		id: 1,
		heading: 'bundleList.heading.all',
		tabName: 'bundleList.tabs.all',
		isActive: undefined,
		isDefault: false,
	},
	{
		id: 2,
		heading: 'bundleList.heading.active',
		tabName: 'bundleList.tabs.active',
		isActive: true,
		isDefault: true,
	},
	{
		id: 3,
		heading: 'bundleList.heading.inactive',
		tabName: 'bundleList.tabs.inactive',
		isActive: false,
		isDefault: false,
	},
];
