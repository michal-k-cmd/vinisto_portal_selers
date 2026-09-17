import { VinistoHelperDllEnumsLanguage } from 'vinisto_api_client/src/api-types/cms-api/';
import { PostTagTranslation } from 'Services/CmsService/interfaces';

export interface CmsBlogTagFormValues extends PostTagTranslation {
	language: VinistoHelperDllEnumsLanguage;
}

export interface CmsBlogTagModalTranslationData extends PostTagTranslation {
	language: VinistoHelperDllEnumsLanguage;
}

export interface CmsBlogTagModalData {
	blogTagId?: string;
	createTime: number;
	translationData?: CmsBlogTagModalTranslationData;
	existingTranslations?: string[];
	submitButtonLabel?: string;
}
