import {
	VinistoHelperDllEnumsActionLogApplicationLogType,
	VinistoHelperDllEnumsPriceDiscountType,
	VinistoHelperDllEnumsPriceLevel,
} from 'vinisto_api_client/src/api-types/product-api/';

const logListTableKeys = {
	TIME: 'time',
	BUNDLE_NAME: 'bundleName',
	ACTION: 'action',
	USER: 'user',
	PRICE_LEVEL: 'priceLevel',
	PRICE_DISCOUNT_TYPE: 'priceDiscountType',
	NEW_PRICE: 'newPriceValue',
	NEW_PRICE_VAT: 'newPriceVat',
};

const COLUMN_PROPERTIES = {
	[logListTableKeys.TIME]: {
		filter: '',
		sorting: 'TIME',
	},
	[logListTableKeys.BUNDLE_NAME]: {
		filter: 'BundleId',
		sorting: '',
	},
	[logListTableKeys.ACTION]: {
		filter: 'ApplicationLogType',
		sorting: '',
	},
	[logListTableKeys.USER]: {
		filter: 'ExecutorUserId',
		sorting: '',
	},
	[logListTableKeys.PRICE_LEVEL]: {
		filter: '',
		sorting: '',
	},
	[logListTableKeys.PRICE_DISCOUNT_TYPE]: {
		filter: '',
		sorting: '',
	},
	[logListTableKeys.NEW_PRICE]: {
		filter: '',
		sorting: '',
	},
	[logListTableKeys.NEW_PRICE_VAT]: {
		filter: '',
		sorting: '',
	},
};

const FILTER_COLUMN_MAP = Object.fromEntries(
	Object.entries(COLUMN_PROPERTIES).map(([key, value]) => [key, value.filter])
);

const SORTING_COLUMN_MAP = Object.fromEntries(
	Object.entries(COLUMN_PROPERTIES).map(([key, value]) => [key, value.sorting])
);

export type BundleActionType =
	| VinistoHelperDllEnumsActionLogApplicationLogType.BUNDLE_PRICE_ADDED
	| VinistoHelperDllEnumsActionLogApplicationLogType.BUNDLE_PRICE_REMOVED
	| string; // BUNDLE_PRICE_CHANGED_BY_IMPORT will be added to API types

export const ACTION_TRANSLATIONS_MAP: Record<string, string> = {
	[VinistoHelperDllEnumsActionLogApplicationLogType.BUNDLE_PRICE_ADDED]:
		'admin.logType.bundlePriceAdded',
	[VinistoHelperDllEnumsActionLogApplicationLogType.BUNDLE_PRICE_REMOVED]:
		'admin.logType.bundlePriceRemoved',
	BUNDLE_PRICE_CHANGED_BY_IMPORT: 'admin.logType.bundlePriceChangedByImport',
};

export const PRICE_LEVEL_TRANSLATIONS_MAP = {
	[VinistoHelperDllEnumsPriceLevel.Level1]: 'Level1',
	[VinistoHelperDllEnumsPriceLevel.Level2]: 'Level2',
	[VinistoHelperDllEnumsPriceLevel.Level3]: 'Level3',
	[VinistoHelperDllEnumsPriceLevel.Level4]: 'Level4',
	[VinistoHelperDllEnumsPriceLevel.Level5]: 'Level5',
	[VinistoHelperDllEnumsPriceLevel.Level6]: 'Level6',
	[VinistoHelperDllEnumsPriceLevel.Level7]: 'Level7',
	[VinistoHelperDllEnumsPriceLevel.Level8]: 'Level8',
	[VinistoHelperDllEnumsPriceLevel.Level9]: 'Level9',
	[VinistoHelperDllEnumsPriceLevel.Level10]: 'Level10',
	[VinistoHelperDllEnumsPriceLevel.VinistoPlus]: 'VinistoPlus',
};

export const DISCOUNT_TYPE_TRANSLATIONS_MAP = {
	[VinistoHelperDllEnumsPriceDiscountType.VinistoDiscount]:
		'admin.priceType.vinistoDiscount',
	[VinistoHelperDllEnumsPriceDiscountType.SupplierDiscount]:
		'admin.priceType.supplierDiscount',
};

export { logListTableKeys, FILTER_COLUMN_MAP, SORTING_COLUMN_MAP };
