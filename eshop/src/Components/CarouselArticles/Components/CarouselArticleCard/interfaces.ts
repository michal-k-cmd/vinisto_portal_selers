import { BlogArticlePreview } from 'Services/ApiService/Cms/Blog/interfaces';

export interface IArticleInfoProps {
	data: BlogArticlePreview | undefined;
	isLoading?: boolean;
}
