import { VinistoHelperDllEnumsPriceDiscountType } from '@/api-types/product-api';

export const LIST_API_ENDPOINT = 'product-api/bundles/get-bundles';

export const SUPPLIER_API_ENDPOINT = 'supplier-api/suppliers';
export const SUPPLIER_API_LIMIT = 'Limit';
export const SUPPLIER_API_USER_LOGIN_HASH = 'UserLoginHash';
export const SUPPLIER_FILTER_NAME_MAX_LENGTH = 30;
export const DISCOUNT_TAG_ID = '636120fd9f513ca7b69ae599';

const DiscountedBundleListTableKeys = {
	NAME: 'name',
	SUPPLIER: 'suppliers',
	PRICE: 'price_standard',
	DISCOUNT_TYPE: 'discount_type',
	PRICE_DISCOUNT_EXPIRATION_DATE: 'discount_expiration_date',
};

const COLUMN_PROPERTIES = {
	[DiscountedBundleListTableKeys.NAME]: {
		filter: 'SearchName',
		sorting: 'NAME',
	},
	[DiscountedBundleListTableKeys.SUPPLIER]: {
		filter: 'supplierIds',
		sorting: 'SUPPLIER',
	},
	[DiscountedBundleListTableKeys.PRICE]: {
		filter: 'PRICE',
		sorting: 'PRICE',
	},
	[DiscountedBundleListTableKeys.DISCOUNT_TYPE]: {
		filter: 'priceType',
		sorting: '',
	},
	[DiscountedBundleListTableKeys.PRICE_DISCOUNT_EXPIRATION_DATE]: {
		filter: '',
		sorting: 'PRICE_DISCOUNT_EXPIRATION_DATE',
	},
};

const FILTER_COLUMN_MAP = Object.fromEntries(
	Object.entries(COLUMN_PROPERTIES).map(([key, value]) => [key, value.filter])
);

const SORTING_COLUMN_MAP = Object.fromEntries(
	Object.entries(COLUMN_PROPERTIES).map(([key, value]) => [key, value.sorting])
);

const DEFAULT_SORT = [
	{
		id: DiscountedBundleListTableKeys.PRICE_DISCOUNT_EXPIRATION_DATE,
		desc: false,
	},
];

const DISCOUNT_TYPE_TRANSLATIONS_MAP = {
	[VinistoHelperDllEnumsPriceDiscountType.VinistoDiscount]: 'vinisto',
	[VinistoHelperDllEnumsPriceDiscountType.SupplierDiscount]: 'supplier',
	[VinistoHelperDllEnumsPriceDiscountType.VolumeDiscount]: 'volume',
	[VinistoHelperDllEnumsPriceDiscountType.SetDiscount]: 'set',
	[VinistoHelperDllEnumsPriceDiscountType.GroupDiscount]: 'group',
};

export {
	DiscountedBundleListTableKeys,
	DISCOUNT_TYPE_TRANSLATIONS_MAP,
	DEFAULT_SORT,
	FILTER_COLUMN_MAP,
	SORTING_COLUMN_MAP,
};
