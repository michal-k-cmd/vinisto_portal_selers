import { PageListTableRow } from 'Hooks/useAdminTable/interfaces';
import {
	VinistoProductDllModelsApiBundleBundle,
	VinistoProductDllModelsApiCategoryCategory,
} from 'vinisto_api_client/src/api-types/product-api';

export interface BundleListRouteLoader {
	categories?: VinistoProductDllModelsApiCategoryCategory[];
}

export interface BundleListTableRow
	extends PageListTableRow,
		VinistoProductDllModelsApiBundleBundle {}
