import { VinistoHelperDllEnumsLanguage } from 'vinisto_api_client/src/api-types/product-api/';
import {
	CategoryTranslation,
	CategoryType,
} from 'Services/Category/interfaces';

export interface CategoryTranslationProps {
	language: VinistoHelperDllEnumsLanguage;
	translation: CategoryTranslation;
	categoryId: CategoryType['id'];
	isOnlyTranslation: boolean;
	keywords: (string | null)[];
}
