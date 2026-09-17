// TODO remove this file - manual types are bad practice (sorry Zdendo), use generated types instead
// Yes, it's annoying to search for them manually, but it's the only way to keep them up-to-date
import { LangValuePair } from 'Hooks/useLocalizedValue/interfaces';
import { VinistoHelperDllEnumsLanguage } from 'vinisto_api_client/src/api-types/cms-api';
import { IQueryArgument } from 'Services/ApiService/interfaces';

interface CmsImage {
	id: string;
	name: string;
	alternativeText: string;
	description: string;
	tags: string[];
	urls: {
		thumb_300: string;
		original_png: string;
		thumb_330x260: string;
		thumb_1000: string;
	};
}

interface CmsImageTag {
	id: string;
	name: string;
}

interface CmsImageTagCreateParams {
	userLoginHash: string;
	name: string;
}

interface Author {
	id: string;
	name: string;
}

interface PostTag {
	id: string;
	name?: LangValuePair[];
	description?: LangValuePair[];
	metaDescription?: LangValuePair[];
	metaTitle?: LangValuePair[];
	createdAt: number;
	articleNumber: number;
	url: LangValuePair[];
}

export interface PostTagTranslation {
	name: string;
	url: string;
	description: string;
	metaDescription: string;
	metaTitle: string;
}

export interface PostTagData {
	id: string;
	createTime: number;
	articleNumber: number;
	translations: Record<VinistoHelperDllEnumsLanguage, PostTagTranslation>;
}

export interface CmsPostTagTranslationApiRequestData
	extends PostTagTranslation {
	userLoginHash: string;
	language: VinistoHelperDllEnumsLanguage;
}

export interface CmsPostTagsCreateApiRequestData {
	language: VinistoHelperDllEnumsLanguage;
	name: string;
	description: string;
	metaDescription?: string;
	metaTitle?: string;
	url?: string;
	userLoginHash: string;
}

interface CmsPostPublishedListQueryArgument extends IQueryArgument {
	key: 'SortingColumn' | 'IsSortingDescending' | 'Limit' | 'Offset';
}

export type {
	CmsImage,
	CmsImageTag,
	CmsImageTagCreateParams,
	Author,
	PostTag,
	CmsPostPublishedListQueryArgument,
};
