import { VinistoProductDllModelsApiBundleBundle } from 'vinisto_api_client/src/api-types/product-api';
export interface LowestPriceProps {
	bundle: VinistoProductDllModelsApiBundleBundle | null;
	identicalBundles?: VinistoProductDllModelsApiBundleBundle[];
}
