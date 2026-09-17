import { useQuery } from '@tanstack/react-query';
import { useRef } from 'react';
import { CMS_QUERY_TYPES } from 'Services/ApiService/Cms/constants';

import { POST_LIMIT } from './constants';
import { fetchBlogPosts } from './helpers';

const useGetBlogPosts = (
	params: {
		activeTag?: string;
		page?: number;
		Limit?: number;
	} = {
		Limit: POST_LIMIT,
	}
) => {
	const page = params.page || 1;
	const activeTag = params.activeTag || '';
	const previousTagRef = useRef<string>('');

	const tagToUse = activeTag || previousTagRef.current;

	if (activeTag) {
		previousTagRef.current = activeTag;
	}

	const postsQuery = useQuery(
		[
			`${CMS_QUERY_TYPES.POSTS}, ${page}, ${activeTag}
	`,
		],
		() => fetchBlogPosts({ page, tagToUse }),
		{
			enabled: true,
			staleTime: 10 * 60 * 1000,
		}
	);

	return postsQuery;
};

export default useGetBlogPosts;
