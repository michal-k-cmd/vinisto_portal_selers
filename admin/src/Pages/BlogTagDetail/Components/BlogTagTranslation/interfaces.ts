import { VinistoHelperDllEnumsLanguage } from 'vinisto_api_client/src/api-types/product-api/';
import { PostTagTranslation } from 'Services/CmsService/interfaces';

export interface PostTagTranslationProps {
	language: VinistoHelperDllEnumsLanguage;
	translation: PostTagTranslation;
	blogTagId: string;
	isOnlyTranslation: boolean;
}
