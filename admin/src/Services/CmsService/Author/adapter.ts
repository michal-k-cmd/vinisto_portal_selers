import { AbstractAdapter } from 'Services/ApiService/Adapters/Adapter';
import { VinistoCmsDllModelsApiCmsArticleAuthorCmsArticleAuthor } from 'vinisto_api_client/src/api-types/cms-api/';

import { Author } from '../interfaces';

class AuthorAdapter extends AbstractAdapter<
	Author,
	VinistoCmsDllModelsApiCmsArticleAuthorCmsArticleAuthor
> {
	fromApi(
		apiData: VinistoCmsDllModelsApiCmsArticleAuthorCmsArticleAuthor
	): Author {
		return {
			id: apiData.id ?? '',
			name: apiData.name ?? '',
		};
	}

	/**
	 * Not implemented
	 */
	toApi(
		domainData: Author
	): VinistoCmsDllModelsApiCmsArticleAuthorCmsArticleAuthor {
		return domainData as VinistoCmsDllModelsApiCmsArticleAuthorCmsArticleAuthor;
	}

	isValid(
		item: unknown
	): item is VinistoCmsDllModelsApiCmsArticleAuthorCmsArticleAuthor {
		return (
			typeof item === 'object' &&
			item !== null &&
			typeof (item as VinistoCmsDllModelsApiCmsArticleAuthorCmsArticleAuthor)
				.id === 'string'
		);
	}
}

export default AuthorAdapter;
