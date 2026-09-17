import { mapApiToEntity } from 'Services/CmsService/PostTag/helpers';
import {
	TagsDeleteParams,
	TagsDetailParams,
	VinistoCmsDllModelsApiCmsTagCmsTag,
	VinistoCmsDllModelsApiCmsTagCmsTagRemoveLanguageVersionParameters,
	VinistoCmsDllModelsApiReturnCmsTagReturn,
	VinistoCmsDllModelsApiReturnCmsTagsReturn,
	VinistoHelperDllEnumsLanguage,
} from 'vinisto_api_client/src/api-types/cms-api/';
import { apiServiceInstance } from 'Services/ApiService';

import {
	CmsPostTagListQueryArgument,
	CmsPostTagsCreateApiRequestData,
	CmsPostTagTranslationApiRequestData,
	PostTag,
	PostTagData,
} from '../interfaces';
import { BLOG_TAG_URI } from '../constants';

import PostTagAdapter from './adapter';

const adapter = new PostTagAdapter();

const getList = async (
	requestParams: CmsPostTagListQueryArgument[]
): Promise<PostTag[]> => {
	const res =
		await apiServiceInstance.get<VinistoCmsDllModelsApiReturnCmsTagsReturn>(
			BLOG_TAG_URI,
			true,
			undefined,
			requestParams
		);

	if (res.tags) {
		return res.tags.map((tag) => adapter.fromApi(tag));
	} else {
		return [];
	}
};

const getById = async (
	request: TagsDetailParams,
	activeLanguage?: VinistoHelperDllEnumsLanguage
): Promise<PostTagData | undefined> => {
	const tagParams = new URLSearchParams([
		['userLoginHash', request.UserLoginHash ?? ''],
	]);

	const res =
		await apiServiceInstance.get<VinistoCmsDllModelsApiReturnCmsTagReturn>(
			`${BLOG_TAG_URI}/${request.tagId}?${tagParams}`,
			true,
			undefined
		);

	if (res.tag) {
		return mapApiToEntity(
			res.tag,
			activeLanguage ?? VinistoHelperDllEnumsLanguage.CZECH
		);
	} else {
		return;
	}
};

const create = async (request: CmsPostTagsCreateApiRequestData) => {
	const tagParams = new URLSearchParams([
		['UserLoginHash', request.userLoginHash],
		['Name', request.name],
		['Description', request.description],
		['Language', request.language],
	]);

	if (request.metaDescription) {
		tagParams.append('metaDescription', request.metaDescription);
	}
	if (request.metaTitle) {
		tagParams.append('MetaTitle', request.metaTitle);
	}
	if (request.url) {
		tagParams.append('url', request.url);
	}

	await apiServiceInstance.post<VinistoCmsDllModelsApiCmsTagCmsTag>(
		`${BLOG_TAG_URI}?${tagParams}`,
		{},
		true
	);
};

const update = async (
	postTagId: string,
	postTag: CmsPostTagTranslationApiRequestData
) => {
	const tagParams = new URLSearchParams([
		['userLoginHash', postTag.userLoginHash],
		['name', postTag.name],
		['description', postTag.description],
		['language', postTag.language],
		['url', postTag.url],
	]);

	if (postTag.metaDescription) {
		tagParams.append('metaDescritpion', postTag.metaDescription);
	}
	if (postTag.metaTitle) {
		tagParams.append('MetaTitle', postTag.metaTitle);
	}

	await apiServiceInstance.put<VinistoCmsDllModelsApiCmsTagCmsTag>(
		`${BLOG_TAG_URI}/${postTagId}/AddLanguageVersion?${tagParams}`,
		{},
		true
	);
};

const remove = async (postTagId: string, userLoginHash: string) => {
	const tagParams = new URLSearchParams([['userLoginHash', userLoginHash]]);

	await apiServiceInstance.delete<TagsDeleteParams>(
		`${BLOG_TAG_URI}/${postTagId}?${tagParams}`,
		undefined,
		true
	);
};

const removeLanguage = async (
	postTagId: string,
	language: VinistoHelperDllEnumsLanguage,
	userLoginHash: string
) => {
	await apiServiceInstance.put<VinistoCmsDllModelsApiCmsTagCmsTagRemoveLanguageVersionParameters>(
		`${BLOG_TAG_URI}/${postTagId}/RemoveLanguageValues`,
		{
			language,
			userLoginHash,
		},
		true
	);
};

const PostTagService = {
	getList,
	getById,
	create,
	update,
	remove,
	removeLanguage,
};

export default PostTagService;
