import { VinistoProductDllModelsApiBundleBundle } from 'vinisto_api_client/src/api-types/product-api/';
import { CategoryType } from 'Services/Category/interfaces';

export interface CategoryDetailLoader {
	category?: CategoryType;
	bundlesCount?: number;
	bundles?: VinistoProductDllModelsApiBundleBundle[];
}
