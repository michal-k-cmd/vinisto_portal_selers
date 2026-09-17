import { Dispatch } from 'react';
import {
	VinistoCmsDllModelsApiCmsArticleBundleItem,
	VinistoHelperDllEnumsLanguage,
} from 'vinisto_api_client/src/api-types/cms-api/';
import {
	BlogArticle,
	BlogArticleBundle,
} from 'Services/CmsService/Blog/interfaces';
import { SpecificationDetail } from 'Services/Specification/interfaces';
import { Author, CmsImageTag, PostTag } from 'Services/CmsService/interfaces';
import { OmitConstrained } from 'types';
import { VinistoProductDllModelsApiBundleBundle } from 'vinisto_api_client/src/api-types/product-api/';

import { BlogArticleDetailAction } from './constants';

export interface BlogArticleDetailState {
	article: BlogArticle | null;
	specifications: SpecificationDetail[] | null;
	bundles: VinistoCmsDllModelsApiCmsArticleBundleItem[] | null;
	bundleDetails: VinistoProductDllModelsApiBundleBundle[] | null;
	cmsImageTags: CmsImageTag[] | null;
	postTags: PostTag[] | null;
	articleAuthors: Author[] | null;
	selectedImageId: string;
	selectedImageUrl: string;
	selectedImageDescription: string;
	selectedImageAltText: string;
}

export type SetBlogArticleDataAction = [
	BlogArticleDetailAction.setArticleData,
	BlogArticleDetailState['article']
];

export type AddBlogArticleSpecificationAction = [
	BlogArticleDetailAction.addSpecification,
	NonNullable<BlogArticleDetailState['specifications']>[number]
];

export type UpdateBlogArticleSpecificationAction = [
	BlogArticleDetailAction.updateSpecification,
	NonNullable<BlogArticleDetailState['specifications']>[number]
];

export type RemoveBlogArticleSpecificationAction = [
	BlogArticleDetailAction.removeSpecification,
	NonNullable<
		BlogArticleDetailState['specifications']
	>[number]['definition']['id']
];

export type ReloadAction = [BlogArticleDetailAction.reload];

export type SetImageAction = [
	BlogArticleDetailAction.setImage,
	{
		url: NonNullable<BlogArticleDetailState['selectedImageUrl']>;
		description: NonNullable<
			BlogArticleDetailState['selectedImageDescription']
		>;
		altText: NonNullable<BlogArticleDetailState['selectedImageAltText']>;
		id: NonNullable<BlogArticleDetailState['selectedImageId']>;
	}
];

export type AddBundleAction = [
	BlogArticleDetailAction.addBundle,
	{
		bundle: NonNullable<BlogArticleDetailState['bundles']>[number];
		bundleDetail: NonNullable<BlogArticleDetailState['bundleDetails']>[number];
	}
];

export type RemoveBundleAction = [
	BlogArticleDetailAction.removeBundle,
	NonNullable<BlogArticleDetailState['bundles']>[number]['bundleId']
];

export type SetInitialBundlesAction = [
	BlogArticleDetailAction.setInitialBundles,
	NonNullable<BlogArticleDetailState['bundles']>
];

export type SetInitialBundleDetailsAction = [
	BlogArticleDetailAction.setInitialBundleDetails,
	NonNullable<BlogArticleDetailState['bundleDetails']>
];

export type SetInitialSpecificationsAction = [
	BlogArticleDetailAction.setInitialSpecifications,
	NonNullable<BlogArticleDetailState['specifications']>
];

export type BlogArticleDetailReducerAction =
	| SetBlogArticleDataAction
	| AddBlogArticleSpecificationAction
	| UpdateBlogArticleSpecificationAction
	| RemoveBlogArticleSpecificationAction
	| ReloadAction
	| SetImageAction
	| AddBundleAction
	| RemoveBundleAction
	| SetInitialBundlesAction
	| SetInitialBundleDetailsAction
	| SetInitialSpecificationsAction;

export interface BlogArticleDetailLoaderReturnValue
	extends Record<string, any> {
	articlePromise: Promise<BlogArticleDetailState['article']>;
	cmsImageTagsPromise: Promise<BlogArticleDetailState['cmsImageTags']>;
	articleAuthorsPromise: Promise<BlogArticleDetailState['articleAuthors']>;
	postTagsPromise: Promise<BlogArticleDetailState['postTags']>;
}

export interface BlogArticleDetailContextValue extends BlogArticleDetailState {
	dispatch: Dispatch<BlogArticleDetailReducerAction>;
}

export interface BlogArticleFormValues
	extends OmitConstrained<Partial<BlogArticle>, 'tags' | 'bundles'> {
	title: string;
	url: string;
	language: VinistoHelperDllEnumsLanguage;
	tags: string[];
	bundles: BlogArticleBundle[];
}
