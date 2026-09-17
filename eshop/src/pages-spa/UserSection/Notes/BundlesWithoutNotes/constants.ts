import { VinistoHelperDllEnumsUserBundleSortableColumns } from 'vinisto_api_client/src/api-types/order-api';

export const DEFAULT_LIMIT_PER_PAGE = 10;

export const BUNDLES_WITHOUT_NOTES_SORTING_COLUMNS = [
	{
		label: 'userSection.boughtProduct.sorting.dateAscending',
		column: VinistoHelperDllEnumsUserBundleSortableColumns.ORDER_DELIVERY_TIME,
		isDescending: true,
	},
	{
		label: 'userSection.boughtProduct.sorting.dateDescending',
		column: VinistoHelperDllEnumsUserBundleSortableColumns.ORDER_DELIVERY_TIME,
		isDescending: false,
	},
	{
		label: 'userSection.boughtProduct.sorting.alphabetical',
		column: VinistoHelperDllEnumsUserBundleSortableColumns.BUNDLE_NAME,
		isDescending: false,
	},
];
