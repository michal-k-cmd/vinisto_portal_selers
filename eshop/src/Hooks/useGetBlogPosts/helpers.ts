import {
	ARTICLE_STATE,
	ARTICLE_STATE_VALUES_MAP,
	COLUMN,
	SORTING_COLUMN_MAP,
} from 'Services/ApiService/Cms/Blog/constants';
import BlogService from 'Services/ApiService/Cms/Blog';

import { POST_LIMIT } from './constants';

export const fetchBlogPosts = ({
	page,
	tagToUse,
}: {
	page: number;
	tagToUse: string;
}) => {
	return BlogService.getList({
		Offset: (page - 1) * POST_LIMIT,
		Limit: POST_LIMIT,
		SearchState: ARTICLE_STATE_VALUES_MAP[ARTICLE_STATE.PUBLISHED],
		SearchPublishDateTo: Math.floor(Date.now() / 1000),
		SortingColumn: SORTING_COLUMN_MAP[COLUMN.PUBLISH_DATE],
		IsSortingDescending: true,
		...(tagToUse && { SearchTagsURL: tagToUse }),
	});
};
