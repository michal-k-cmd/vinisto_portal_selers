import { VinistoHelperDllEnumsLanguage } from 'vinisto_api_client/src/api-types/product-api/';

export interface TagTranslation {
	name: string;
	url: string;
	description: string;
	metaDescription: string;
	metaTitle?: string;
}

export interface TagData {
	id: string;
	color: string;
	isInHomePage: boolean;
	isEnabled: boolean;
	isDisplayBundles: boolean;
	isShownInFilters: boolean;
	orderInFilters?: number;
	translations: Record<VinistoHelperDllEnumsLanguage, TagTranslation>;
}

export interface TagTranslationApiRequestData extends TagTranslation {
	userLoginHash: string;
	language: VinistoHelperDllEnumsLanguage;
	color: string;
}
