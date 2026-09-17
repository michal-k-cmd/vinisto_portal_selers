import { LangValuePair } from 'Hooks/useLocalizedValue/interfaces';
import {
	VinistoCommonDllModelsApiPricesPrice,
	VinistoImageDllModelsApiImageImage,
} from 'vinisto_api_client/src/api-types/product-api';

export interface BundleType {
	id: string;
	name: LangValuePair[];
	description: LangValuePair[];
	images: VinistoImageDllModelsApiImageImage[];
	prices: VinistoCommonDllModelsApiPricesPrice[];
}
