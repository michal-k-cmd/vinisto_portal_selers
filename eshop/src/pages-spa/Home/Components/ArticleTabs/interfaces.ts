import { IPostPreview } from 'pages-spa/Blog/Components/Post/PostPreview';

export interface IArticleData {
	id: number;
	name: string;
	date: string;
	text: string;
	img: string;
	slug?: string;
}

export interface IArticleTabsProps {
	data: IPostPreview[];
	isLoading?: boolean;
}
