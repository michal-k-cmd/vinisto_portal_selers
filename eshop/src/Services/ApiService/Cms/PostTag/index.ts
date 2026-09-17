import {
	TagsDetailParams,
	TagsListParams,
	VinistoCmsDllModelsApiReturnCmsTagReturn,
	VinistoCmsDllModelsApiReturnCmsTagsReturn,
	VinistoHelperDllEnumsLanguage,
} from 'vinisto_api_client/src/api-types/cms-api';
import api from 'vinisto_api_client/src/api';

import { PostTagData } from '../interfaces';
import { BLOG_TAG_URI } from '../constants';

import PostTagAdapter from './adapter';
import { mapApiToEntity } from './helpers';

const adapter = new PostTagAdapter();

const getList = async (requestParams: TagsListParams) => {
	const res = await api.get<VinistoCmsDllModelsApiReturnCmsTagsReturn>(
		BLOG_TAG_URI,
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
	const res = await api.get<VinistoCmsDllModelsApiReturnCmsTagReturn>(
		`${BLOG_TAG_URI}/${request.tagId}`,
		{ userLoginHash: request.UserLoginHash }
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

const PostTagService = {
	getList,
	getById,
};

export default PostTagService;
