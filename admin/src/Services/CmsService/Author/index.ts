import { apiServiceInstance } from 'Services/ApiService';
import { IQueryArgument } from 'Services/ApiService/interfaces';
import {
	VinistoCmsDllModelsApiCmsArticleAuthorArticleAuthorManipulationParameters,
	VinistoCmsDllModelsApiReturnCmsArticleAuthorReturn,
	VinistoCmsDllModelsApiReturnCmsArticlesAuthorsReturn,
} from 'vinisto_api_client/src/api-types/cms-api/';

import { AUTHOR_URI } from '../constants';
import { Author } from '../interfaces';

import AuthorAdapter from './adapter';

const adapter = new AuthorAdapter();

const getList = async (requestParams: IQueryArgument[]): Promise<Author[]> => {
	const res =
		await apiServiceInstance.get<VinistoCmsDllModelsApiReturnCmsArticlesAuthorsReturn>(
			AUTHOR_URI,
			true,
			undefined,
			requestParams
		);

	if (res.authors) {
		return res.authors.map((author) => adapter.fromApi(author));
	} else {
		return [];
	}
};

const create = async (
	request: VinistoCmsDllModelsApiCmsArticleAuthorArticleAuthorManipulationParameters
) => {
	const res =
		await apiServiceInstance.post<VinistoCmsDllModelsApiReturnCmsArticleAuthorReturn>(
			AUTHOR_URI,
			request,
			true
		);

	return {
		...res,
		author: res.author && adapter.fromApi(res.author),
	};
};

const AuthorService = {
	getList,
	create,
};

export default AuthorService;
