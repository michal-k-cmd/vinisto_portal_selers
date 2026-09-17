import { LangValuePair } from 'Hooks/useLocalizedValue/interfaces';
import { BlogArticle } from 'Services/ApiService/Cms/Blog/interfaces';
import { PostTag } from 'Services/ApiService/Cms/interfaces';

export const getPrettyPostName = (
	posts: BlogArticle[] | undefined,
	activeUrl: string
) => {
	const needle = posts?.find((post) => post.url === activeUrl);
	return needle ? needle.title : '';
};

export const getPrettyTagName = (
	tags: PostTag[] | undefined,
	activeUrl: string | null,
	getLocalizedValue: (list?: LangValuePair[], language?: string) => string
) => {
	const needle = tags?.find((tag) =>
		tag.url.find((translation) => translation.value === activeUrl)
	);

	const tagName = getLocalizedValue(needle?.name);

	return tagName;
};

export const getMetaDescription = (
	tags: PostTag[] | undefined,
	activeUrl: string | null,
	getLocalizedValue: (list?: LangValuePair[], language?: string) => string
) => {
	const needle = tags?.find((tag) =>
		tag.url.find((translation) => translation.value === activeUrl)
	);

	const metaDescription = getLocalizedValue(needle?.metaDescription);

	return metaDescription;
};

export const getMetaTitle = (
	tags: PostTag[] | undefined,
	activeUrl: string | null,
	getLocalizedValue: (list?: LangValuePair[], language?: string) => string
) => {
	const needle = tags?.find((tag) =>
		tag.url.find((translation) => translation.value === activeUrl)
	);

	return getLocalizedValue(needle?.metaTitle);
};
