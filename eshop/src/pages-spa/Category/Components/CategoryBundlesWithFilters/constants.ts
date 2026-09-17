import { BundleSorting } from './interfaces';

import { VinistoHelperDllEnumsBundleSortableColumns } from '@/api-types/product-api';

export const URL_PARAM_PAGE = 'page';
export const URL_PARAM_LIMIT = 'limit';
export const URL_PARAM_LIMIT_DEFAULT_VALUE = 30;
export const URL_PARAM_LIMIT_UNLIMITED_VALUE = 999;
export const SPECIFICATION_TYPE_TEXT = 'TEXT';
export const SPECIFICATION_TYPE_MULTI_COMBO_BOX = 'MULTI_COMBO_BOX';
export const SPECIFICATION_TYPE_COMBO_BOX = 'COMBO_BOX';
export const SPECIFICATION_TYPE_CHECK_BOX = 'CHECK_BOX';
export const SPECIFICATION_TYPE_NUMBER = 'NUMBER';
export const SPECIFICATION_TYPE_NUMBER_IMPERIAL = 'NUMBER_IMPERIAL';
export const SPECIFICATION_TYPE_DECIMAL_NUMBER = 'DECIMAL_NUMBER';
export const SPECIFICATION_TYPE_DECIMAL_NUMBER_IMPERIAL =
	'DECIMAL_NUMBER_IMPERIAL';
export const SPECIFICATION_TYPE_PRICE = 'PRICE';
export const BANNER_OBJECT = 'BANNER_OBJECT';
export const SALE_TAG_ID = '636120fd9f513ca7b69ae599';
export const PRICE_SPECIFICATION_ID = '63877aaf6d136d20d10520cd';

export const SORTING_DEFAULT: BundleSorting = {
	title: 'category.sorting.tip',
	sortingColumn: VinistoHelperDllEnumsBundleSortableColumns.SCORING_PRICE,
	isSortingDescending: true,
};

export const SORTING: BundleSorting[] = [
	SORTING_DEFAULT,
	{
		title: 'category.sorting.evaluation',
		sortingColumn: VinistoHelperDllEnumsBundleSortableColumns.EVALUATION,
		isSortingDescending: true,
	},
	{
		title: 'category.sorting.price.asc',
		sortingColumn: VinistoHelperDllEnumsBundleSortableColumns.PRICE,
		isSortingDescending: false,
	},
	{
		title: 'category.sorting.price.desc',
		sortingColumn: VinistoHelperDllEnumsBundleSortableColumns.PRICE,
		isSortingDescending: true,
	},
];

const TAG = 'TAG';
const STOCK = 'STOCK';
const SUPPLIER = 'SUPPLIER';
const DISCOUNT = 'DISCOUNT';

export const FILTER_CODE = {
	[TAG]: 1,
	[STOCK]: 2,
	[SUPPLIER]: 3,
	[DISCOUNT]: 4,
} as const;

export const FILTER_TYPE = {
	[TAG]: 'TAG',
	[STOCK]: 'STOCK',
	[SUPPLIER]: 'SUPPLIER',
	[DISCOUNT]: 'DISCOUNT',
} as const;
