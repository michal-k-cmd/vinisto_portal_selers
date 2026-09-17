import { dayjsInstance as dayjs } from 'Services/Date';
import {
	ArticlesGetArticleByUrlListParams,
	ArticlesListParams,
	CmsApi,
	VinistoCmsDllModelsApiCmsArticleCmsArticle,
	VinistoCmsDllModelsApiCmsArticleCmsArticlePreview,
	VinistoCmsDllModelsApiReturnCmsArticlesReturn,
	VinistoHelperDllBaseAuthorizationParameters,
	VinistoHelperDllBaseBaseReturn,
	VinistoHelperDllBaseError,
	VinistoProductDllModelsApiCommonBundlesCountReturn,
} from 'vinisto_api_client/src/api-types/cms-api';
import { SpecificationDetail } from 'Services/Specification/interfaces';
import { SpecificationType } from 'Services/Specification/constants';
import { DEFAULT_CURRENCY } from 'vinisto_api_client/src/shared';
import api from 'vinisto_api_client/src/api';

import { BLOG_ARTICLES_PUBLISHED_URI, BLOG_URI } from '../constants';
import PostTagAdapter from '../PostTag/adapter';
import AuthorAdapter from '../Author/adapter';

import {
	BlogArticle,
	BlogArticlePreview,
	BlogArticleSpecificationApi,
} from './interfaces';
import { BUNDLE_COUNT_API_ENDPOINT } from './constants';
import { getProductType, getState } from './helpers';

const postTagAdapter = new PostTagAdapter();
const authorAdapter = new AuthorAdapter();

const mapApiToDomain = (
	blogArticle: VinistoCmsDllModelsApiCmsArticleCmsArticle
): BlogArticle => {
	return {
		id: blogArticle.id ?? '',
		language: blogArticle.language ?? '',
		specificationDetails:
			blogArticle.specificationDetails as SpecificationDetail[],
		title: blogArticle.title ?? '',
		leadParagraph: blogArticle.perex ?? '',
		meta: blogArticle.metaDescription ?? '',
		metaTitle: blogArticle.metaTitle ?? '',
		perex: blogArticle.perex ?? '',
		url: blogArticle.url ?? '',
		lastEditDate: dayjs.unix(blogArticle.updatedAt ?? 0).toDate(),
		image: blogArticle.titleImageDetail ?? null,
		content: blogArticle.body ?? '',
		productType: getProductType(blogArticle),
		productListTitle: blogArticle.carouselListingTitle ?? '',
		state: getState(blogArticle),
		authors: blogArticle.authors ?? [],
		readingTime: blogArticle.readingTime ?? 0,
		publishDate: dayjs.unix(blogArticle.publishDate ?? 0).toDate(),
		tags:
			blogArticle.tagDetails
				?.map((tag) => tag.id)
				.filter((tag): tag is string => !!tag) ??
			blogArticle.tags ??
			[],
		tagDetails:
			blogArticle.tagDetails?.map((tag) => postTagAdapter.fromApi(tag)) ?? [],
		//@ts-expect-error fix interface a stejně to používá api :)
		bundles: blogArticle.bundles ?? [],
		bundleDetails: blogArticle.bundleDetails ?? [],
		authorDetails:
			blogArticle.authorDetails?.map((author) =>
				authorAdapter.fromApi(author)
			) ?? [],
	};
};

const mapSpecificationValuesByType = (specification: SpecificationDetail) => {
	if (
		specification.definition.specificationType ===
			SpecificationType.DECIMAL_NUMBER ||
		specification.definition.specificationType ===
			SpecificationType.DECIMAL_NUMBER_IMPERIAL ||
		specification.definition.specificationType === SpecificationType.NUMBER ||
		specification.definition.specificationType ===
			SpecificationType.NUMBER_IMPERIAL
	) {
		return specification.value.allowedValues?.map(Number);
	}
	return specification.value.allowedValues;
};

const mapSpecificationsToApi = (
	specification: SpecificationDetail
): BlogArticleSpecificationApi => {
	return {
		specificationType: specification.definition.specificationType,
		specificationDefinitionId: specification.definition.id,
		allowedValues: mapSpecificationValuesByType(specification) ?? [],
	};
};

const getArticle = async (
	slug: string,
	params: Omit<ArticlesGetArticleByUrlListParams, 'articleUrl'>
) =>
	api
		.get<
			CmsApi.ArticlesGetArticleByUrlList.ResponseBody,
			CmsApi.ArticlesGetArticleByUrlList.RequestQuery
		>(`${BLOG_URI}/${slug}/get-article-by-url`, {
			countryOfSale: params.countryOfSale,
			currency: params.currency ?? DEFAULT_CURRENCY,
		})
		.then((payload) => {
			return payload.article ? mapApiToDomain(payload.article) : null;
		});

const getBundlesCount = (
	specifications: SpecificationDetail[],
	userLoginHash: string
) =>
	api
		.post<VinistoProductDllModelsApiCommonBundlesCountReturn>(
			BUNDLE_COUNT_API_ENDPOINT,
			undefined,
			{
				userLoginHash,
				specifications: specifications.map(mapSpecificationsToApi),
			}
		)
		.then((payload) => payload?.bundlesCount ?? 0)
		.catch(() => 0);

const publishArticle = async (
	id: string,
	req: VinistoHelperDllBaseAuthorizationParameters
) =>
	api.put<VinistoHelperDllBaseBaseReturn>(
		`${BLOG_URI}/${id}/PublishArticle`,
		undefined,
		req
	);

const draftArticle = async (
	id: string,
	req: VinistoHelperDllBaseAuthorizationParameters
) =>
	api.put<VinistoHelperDllBaseBaseReturn>(
		`${BLOG_URI}/${id}/DraftArticle`,
		undefined,
		req
	);

const getList = async (req: ArticlesListParams) =>
	api
		.get<VinistoCmsDllModelsApiReturnCmsArticlesReturn>(BLOG_URI, req)
		.then((payload) => {
			const articles = payload?.articles ?? null;
			return {
				...payload,
				articles:
					payload && payload?.count && payload?.count > 0
						? articles !== null
							? articles.map(mapApiToDomain)
							: null
						: null,
			};
		});

const getPreviewList = async (
	requestQuery: CmsApi.ArticlesArticlesPublishedList.RequestQuery
): Promise<GetPreviewListSuccess> => {
	const { articlePreviews, count, error, isError } = await api.get<
		CmsApi.ArticlesArticlesPublishedList.ResponseBody,
		CmsApi.ArticlesArticlesPublishedList.RequestQuery
	>(BLOG_ARTICLES_PUBLISHED_URI, requestQuery);

	if (isError || count === undefined || !articlePreviews) {
		throw {
			isError: true,
			error: error || [],
		};
	}

	return {
		isError: false,
		count: count,
		articles: articlePreviews?.map(mapPreviewApiToDomain),
	};
};

type GetPreviewListSuccess = {
	isError: false;
	count: number;
	articles: BlogArticlePreview[];
};

type GetPreviewListError = {
	isError: true;
	error: VinistoHelperDllBaseError[];
};

const mapPreviewApiToDomain = (
	data: VinistoCmsDllModelsApiCmsArticleCmsArticlePreview
): BlogArticlePreview => {
	return {
		id: data.id ?? '',
		publishDate: dayjs.unix(data.publishDate ?? 0).toDate(),
		perex: data.perex ?? '',
		title: data.title ?? '',
		titleImageId: data.titleImageId ?? '',
		url: data.url ?? '',
		authorDetails:
			data.authorDetails?.map((author) => authorAdapter.fromApi(author)) ?? [],
		readingTime: data.readingTime ?? 0,
	};
};

const BlogService = {
	getArticle,
	mapApiToDomain,
	getBundlesCount,
	publishArticle,
	draftArticle,
	getList,
	getPreviewList,
};

export type { GetPreviewListSuccess, GetPreviewListError };

export default BlogService;
