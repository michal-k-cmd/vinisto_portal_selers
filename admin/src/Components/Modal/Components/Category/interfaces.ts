import { VinistoHelperDllEnumsLanguage } from 'vinisto_api_client/src/api-types/product-api';
import {
	CategoryBundleDiscountFilter,
	CategoryTranslation,
} from 'Services/Category/interfaces';
import { ProductSelectionType } from 'Services/Category/constants';

export interface CategoryFormValues extends CategoryTranslation {
	language: VinistoHelperDllEnumsLanguage;
	type: ProductSelectionType;
	bundleDiscountFilter?: (typeof CategoryBundleDiscountFilter)[keyof typeof CategoryBundleDiscountFilter];
}

export interface CategoryModalTranslationData extends CategoryTranslation {
	language: VinistoHelperDllEnumsLanguage;
}

export interface CategoryModalData {
	categoryId?: string;
	translationData?: CategoryModalTranslationData;
	existingTranslations?: string[];
	submitButtonLabel?: string;
	keywords?: string[];
}
