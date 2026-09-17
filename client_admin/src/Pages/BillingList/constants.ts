export const BILLING_NUMBER = 'billingNumber';
export const BILLING_PERIOD = 'billing_period';
export const CREATION_DATE = 'createdAt';
export const TOTAL_PRICE = 'total_price';
export const STATE = 'state';

export const SORTING_COLUMN_MAP = {
	[BILLING_NUMBER]: 'BILLING_NUMBER',
	[BILLING_PERIOD]: 'BILLING_PERIOD',
	[CREATION_DATE]: 'CREATION_DATE',
	[TOTAL_PRICE]: 'TOTAL_PRICE',
	[STATE]: 'STATE',
};

export const LIST_API_ENDPOINT = 'order-api/billings';

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
