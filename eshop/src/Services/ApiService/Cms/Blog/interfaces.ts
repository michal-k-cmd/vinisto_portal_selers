import {
	VinistoCmsDllModelsApiCmsArticleBundleItem,
	VinistoCmsDllModelsApiCmsImageCmsImage,
	VinistoHelperDllEnumsCmsArticleCarouselListingType,
	VinistoHelperDllEnumsLanguage,
	VinistoProductDllModelsApiBundleBundle,
} from 'vinisto_api_client/src/api-types/cms-api';
import { SpecificationDetail } from 'Services/Specification/interfaces';
import { SpecificationType } from 'Services/Specification/constants';

import { Author, PostTag } from '../interfaces';

import { ARTICLE_PRODUCT_TYPE, ARTICLE_STATE } from './constants';

export interface BlogArticleSpecificationApi {
	specificationDefinitionId: string;
	specificationType: SpecificationType;
	allowedValues: string[] | number[] | boolean[];
}

export interface BlogArticleBundle {
	bundleId: string;
	order: number;
}

export interface BlogArticleApi {
	language: VinistoHelperDllEnumsLanguage;
	title: string;
	publishDate?: number;
	perex?: string;
	metaDescription?: string;
	metaTitle?: string;
	authors?: string[];
	readingTime?: number;
	tags?: string[];
	url: string;
	titleImageUrl?: string;
	body?: string;
	specifications?: BlogArticleSpecificationApi[];
	carouselListing?: VinistoHelperDllEnumsCmsArticleCarouselListingType;
	carouselListingTitle?: string;
	bundles?: VinistoCmsDllModelsApiCmsArticleBundleItem[];
}

export interface BlogArticle {
	id: string;
	language: string;
	specificationDetails: SpecificationDetail[];
	title: string;
	leadParagraph: string;
	meta: string;
	metaTitle: string;
	perex: string;
	url: string;
	lastEditDate: Date;
	image: VinistoCmsDllModelsApiCmsImageCmsImage | null;
	content: string;
	productType: ARTICLE_PRODUCT_TYPE;
	productListTitle?: string;
	bundles: VinistoProductDllModelsApiBundleBundle[];
	state: ARTICLE_STATE;
	authors: string[];
	readingTime: number;
	tags: string[];
	tagDetails: PostTag[];
	publishDate: Date;
	bundleDetails: VinistoProductDllModelsApiBundleBundle[];
	authorDetails?: Author[];
}

export interface BlogArticlePreview {
	id: string;
	publishDate: Date;
	title: string;
	perex: string;
	url: string;
	titleImageId: string;
	authorDetails: Author[];
	readingTime: number;
}
