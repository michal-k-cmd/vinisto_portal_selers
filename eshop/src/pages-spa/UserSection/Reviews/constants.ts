import { VinistoHelperDllEnumsUserBundleSortableColumns } from 'vinisto_api_client/src/api-types/order-api';

export const EVALUATED_DEFAULT_LIMIT_PER_PAGE = 10;
export const NOT_EVALUATED_DEFAULT_LIMIT_PER_PAGE = 5;

export const EVALUATED = 'EVALUATED';
export const NOT_EVALUATED = 'NOT_EVALUATED';

export const LIMITS_PER_PAGE = {
	[EVALUATED]: EVALUATED_DEFAULT_LIMIT_PER_PAGE,
	[NOT_EVALUATED]: NOT_EVALUATED_DEFAULT_LIMIT_PER_PAGE,
} as const;

export const NOT_EVALUATED_PRODUCTS_SORTING_COLUMNS = [
	{
		label: 'userSection.boughtProduct.sorting.dateOfPurchase',
		column: VinistoHelperDllEnumsUserBundleSortableColumns.ORDER_DELIVERY_TIME,
		isDescending: true,
	},
	{
		label: 'userSection.boughtProduct.sorting.alphabetical',
		column: VinistoHelperDllEnumsUserBundleSortableColumns.BUNDLE_NAME,
		isDescending: false,
	},
];

export const EVALUATED_PRODUCTS_SORTING_COLUMNS = [
	{
		label: 'userSection.boughtProduct.sorting.alphabetical',
		column: VinistoHelperDllEnumsUserBundleSortableColumns.BUNDLE_NAME,
		isDescending: false,
	},
	{
		label: 'userSection.boughtProduct.sorting.dateAscending',
		column:
			VinistoHelperDllEnumsUserBundleSortableColumns.EVALUATION_CREATED_AT,
		isDescending: true,
	},
	{
		label: 'userSection.boughtProduct.sorting.dateDescending',
		column:
			VinistoHelperDllEnumsUserBundleSortableColumns.EVALUATION_CREATED_AT,
		isDescending: false,
	},
];
