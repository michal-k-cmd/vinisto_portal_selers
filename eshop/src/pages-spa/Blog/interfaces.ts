/* eslint-disable no-unused-vars */
import { BlogArticle } from 'Services/ApiService/Cms/Blog/interfaces';
import { PostTag } from 'Services/ApiService/Cms/interfaces';

type BlogContextProps = {
	tags: PostTag[] | undefined;
	isTagsLoading: boolean;
	activeTagUrl: string | null;
	posts: BlogArticle[] | undefined;
	activePostUrl: string | null;
	isPostsLoading: boolean;
};

export type { BlogContextProps };
