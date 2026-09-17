import {
	VinistoHelperDllEnumsCountryCode,
	VinistoHelperDllEnumsCurrency,
} from 'vinisto_api_client/src/api-types/product-api';

export interface IFetchBundlePageProps {
	page: number;
	limit: number;
	tagId: string;
	sortingColumn: string;
	isSortingDescending?: boolean;
	countryOfSale: VinistoHelperDllEnumsCountryCode;
	currency: VinistoHelperDllEnumsCurrency;
	filters: Record<any, any>[];
}
