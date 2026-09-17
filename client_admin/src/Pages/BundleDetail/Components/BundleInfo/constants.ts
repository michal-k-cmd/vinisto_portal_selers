import { BundleSorting } from './interfaces';

export const URL_PARAM_PAGE = 'page';
export const URL_PARAM_LIMIT = 'limit';
export const URL_PARAM_LIMIT_DEFAULT_VALUE = 30;
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

export const SORTING_DEFAULT: BundleSorting = {
	title: 'category.sorting.tip',
	sortingColumn: 'ID',
	isSortingDescending: false,
};

export const SORTING: BundleSorting[] = [
	SORTING_DEFAULT,
	{
		title: 'category.sorting.evaluation',
		sortingColumn: 'EVALUATION',
		isSortingDescending: true,
	},
	{
		title: 'category.sorting.price.asc',
		sortingColumn: 'PRICE',
		isSortingDescending: false,
	},
	{
		title: 'category.sorting.price.desc',
		sortingColumn: 'PRICE',
		isSortingDescending: true,
	},
];
