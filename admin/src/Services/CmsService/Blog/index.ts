import { dayjsInstance as dayjs } from 'Services/Date';
import { BlogArticleFormValues } from 'Pages/BlogArticleDetail/interfaces';
import {
	VinistoCmsDllModelsApiCmsArticleCmsArticle,
	VinistoCmsDllModelsApiReturnCmsArticleReturn,
	VinistoHelperDllBaseAuthorizationParameters,
	VinistoHelperDllBaseBaseReturn,
	VinistoHelperDllEnumsLanguage,
	VinistoProductDllModelsApiCommonBundlesCountReturn,
} from 'vinisto_api_client/src/api-types/cms-api/';
import { SpecificationDetail } from 'Services/Specification/interfaces';
import { apiServiceInstance } from 'Services/ApiService';
import { SpecificationType } from 'Services/Specification/constants';

import { BLOG_URI } from '../constants';
import PostTagAdapter from '../PostTag/adapter';
import AuthorAdapter from '../Author/adapter';

import { getProductType, getState } from './helpers';
import {
	ARTICLE_PRODUCT_TYPE_VALUES_MAP,
	BUNDLE_COUNT_API_ENDPOINT,
} from './constants';
import {
	BlogArticle,
	BlogArticleApi,
	BlogArticleSpecificationApi,
} from './interfaces';

const postTagAdapter = new PostTagAdapter();
const postAuthorAdapter = new AuthorAdapter();

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
		url: blogArticle.url ?? '',
		lastEditDate: dayjs.unix(blogArticle.updatedAt ?? 0).toDate(),
		image: blogArticle.titleImageDetail?.urls?.thumb_1000 ?? '',
		imageId: blogArticle.titleImageId ?? '',
		content: blogArticle.body ?? '',
		productType: getProductType(blogArticle),
		productListTitle: blogArticle.carouselListingTitle ?? '',
		state: getState(blogArticle),
		authors: blogArticle.authors ?? [],
		authorDetails:
			blogArticle?.authorDetails?.map((author) => {
				return postAuthorAdapter.fromApi(author);
			}) ?? [],
		readingTime: blogArticle.readingTime ?? 0,
		publishDate: dayjs.unix(blogArticle.publishDate ?? 0).toDate(),
		tags:
			blogArticle.tagDetails
				?.map((tag) => tag.id)
				.filter((tag): tag is string => !!tag) ?? [],
		tagDetails:
			blogArticle.tagDetails?.map((tag) => postTagAdapter.fromApi(tag)) ?? [],
		//@ts-expect-error fix interface a stejně to používá api :)
		bundles: blogArticle.bundles ?? [],
		bundleDetails: blogArticle.bundleDetails ?? [],
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

const mapFormDataToApi = (
	blogArticle: BlogArticleFormValues
): BlogArticleApi => ({
	language: blogArticle.language,
	title: blogArticle.title,
	publishDate: dayjs(blogArticle.publishDate).unix(),
	perex: blogArticle.leadParagraph,
	metaDescription: blogArticle.meta,
	metaTitle: blogArticle.metaTitle,
	authors: blogArticle.authors,
	readingTime:
		blogArticle.readingTime !== undefined
			? Number(blogArticle.readingTime)
			: undefined,
	tags: blogArticle.tags,
	url: blogArticle.url,
	titleImageId: blogArticle.image,
	body: blogArticle.content,
	specifications: blogArticle.specificationDetails?.map(mapSpecificationsToApi),
	carouselListing: blogArticle.productType
		? ARTICLE_PRODUCT_TYPE_VALUES_MAP[blogArticle.productType]
		: undefined,
	carouselListingTitle: blogArticle.productListTitle,
	bundles: blogArticle.bundles,
	state: blogArticle.state,
});

const create = async (data: BlogArticleFormValues, userLoginHash: string) => {
	if (!Object.hasOwn(VinistoHelperDllEnumsLanguage, data.language)) {
		throw new Error(
			'Invalid language - supported languages are: ' +
				VinistoHelperDllEnumsLanguage
		);
	}
	return apiServiceInstance
		.post<VinistoCmsDllModelsApiReturnCmsArticleReturn>(
			BLOG_URI,
			{
				...mapFormDataToApi(data),
				userLoginHash,
				language: data.language,
			},
			true
		)
		.then((response) => {
			const article = response.article;
			if (article?.id === undefined) {
				throw new Error('Blog article was not created');
			}
		});
};

const update = async (
	article: BlogArticle,
	data: BlogArticleFormValues,
	userLoginHash: string
) => {
	if (!Object.hasOwn(VinistoHelperDllEnumsLanguage, data.language)) {
		throw new Error(
			'Invalid language - supported languages are: ' +
				VinistoHelperDllEnumsLanguage
		);
	}
	return apiServiceInstance
		.patch<VinistoCmsDllModelsApiReturnCmsArticleReturn>(
			BLOG_URI,
			{
				...mapFormDataToApi(data),
				userLoginHash,
			},
			true,
			article.id
		)
		.then((response) => {
			const updatedArticle = response.article;
			if (updatedArticle?.id === undefined) {
				throw new Error('Blog article was not updated');
			}
		});
};

const getArticle = async (id: string, userLoginHash: string) =>
	apiServiceInstance
		.get<VinistoCmsDllModelsApiReturnCmsArticleReturn>(BLOG_URI, true, id, [
			{
				key: 'UserLoginHash',
				value: userLoginHash,
			},
		])
		.then((payload) => {
			if (!payload.article) {
				throw new Error('Article not found');
			}

			return mapApiToDomain(payload.article);
		});

const getBundlesCount = (
	specifications: SpecificationDetail[],
	userLoginHash: string
) =>
	apiServiceInstance
		.post(
			BUNDLE_COUNT_API_ENDPOINT,
			{
				userLoginHash,
				specifications: specifications.map(mapSpecificationsToApi),
			},
			true
		)
		.then(
			(payload) =>
				(payload as VinistoProductDllModelsApiCommonBundlesCountReturn)
					?.bundlesCount ?? 0
		)
		.catch(() => 0);

const publishArticle = async (
	id: string,
	req: VinistoHelperDllBaseAuthorizationParameters
) =>
	apiServiceInstance.put<VinistoHelperDllBaseBaseReturn>(
		`${BLOG_URI}/${id}/PublishArticle`,
		req
	);

const draftArticle = async (
	id: string,
	req: VinistoHelperDllBaseAuthorizationParameters
) =>
	apiServiceInstance.put<VinistoHelperDllBaseBaseReturn>(
		`${BLOG_URI}/${id}/DraftArticle`,
		req
	);

const BlogService = {
	getArticle,
	mapApiToDomain,
	create,
	update,
	getBundlesCount,
	publishArticle,
	draftArticle,
};

export default BlogService;
