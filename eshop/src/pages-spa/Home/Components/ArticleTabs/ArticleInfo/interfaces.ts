import {
	BlogArticle,
	BlogArticlePreview,
} from 'Services/ApiService/Cms/Blog/interfaces';
import { VinistoCmsDllModelsApiReturnCmsImageReturn } from 'vinisto_api_client/src/api-types/cms-api';

export interface IArticleInfoProps {
	data: BlogArticlePreview | BlogArticle | null;
	isLoading?: boolean;
	isImageLoading?: boolean;
	imageData?: VinistoCmsDllModelsApiReturnCmsImageReturn | null;
	isNext?: boolean;
}
