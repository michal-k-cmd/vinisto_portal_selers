import { AbstractAdapter } from 'Services/ApiService/Adapters/Adapter';
import { VinistoCmsDllModelsApiCmsTagCmsTag } from 'vinisto_api_client/src/api-types/cms-api/';

import { PostTag } from '../interfaces';

class PostTagAdapter extends AbstractAdapter<
	PostTag,
	VinistoCmsDllModelsApiCmsTagCmsTag
> {
	fromApi(apiData: VinistoCmsDllModelsApiCmsTagCmsTag): PostTag {
		return {
			id: apiData.id ?? '',
			name: this.convertMultiLangValue(apiData.name ?? undefined),
			description: this.convertMultiLangValue(apiData.description ?? undefined),
			metaDescription: this.convertMultiLangValue(
				apiData.metaDescription ?? undefined
			),
			metaTitle: this.convertMultiLangValue(apiData.metaTitle ?? undefined),
			createTime: apiData.createdAt ?? 0,
			articleNumber: apiData.articleNumber ?? 0,
			url: this.convertMultiLangValue(apiData.url ?? undefined),
		};
	}

	toApi(_domainData: PostTag): VinistoCmsDllModelsApiCmsTagCmsTag {
		throw new Error('PostTagAdapter.toApi is not implemented');
	}

	isValid(item: unknown): item is VinistoCmsDllModelsApiCmsTagCmsTag {
		return (
			typeof item === 'object' &&
			item !== null &&
			typeof (item as VinistoCmsDllModelsApiCmsTagCmsTag).id === 'string'
		);
	}
}

export default PostTagAdapter;
