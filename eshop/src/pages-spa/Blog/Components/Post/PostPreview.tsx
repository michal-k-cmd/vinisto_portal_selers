import { VinistoCmsDllModelsApiCmsImageCmsImage } from 'vinisto_api_client/src/api-types/cms-api';

/**
 *	@Deprecated - delete - use BlogArticlePreview or new api type instead.
 */
export type IPostPreview = {
	postId: number;
	title: string;
	date: string;
	content?: string;
	excerpt: string;
	tag: number;
	image?: VinistoCmsDllModelsApiCmsImageCmsImage;
	additionalClassName?: string;
	slug?: string;
	url?: string;
};
