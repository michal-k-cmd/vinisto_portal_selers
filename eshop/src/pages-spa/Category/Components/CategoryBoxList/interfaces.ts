import { VinistoProductDllModelsApiCategoryCategory } from 'vinisto_api_client/src/api-types/product-api';

interface VinistoProductDllModelsApiCategoryCategoryWithLoading
	extends VinistoProductDllModelsApiCategoryCategory {
	isLoading?: boolean;
}

export type TCategoryBoxListProps =
	| {
			categories: VinistoProductDllModelsApiCategoryCategoryWithLoading[];
	  }
	| {
			categories: { isLoading: boolean }[];
	  };
