'use client';

import PaginationNav from 'Components/Pagination';
import useGetBlogPosts from 'Hooks/useGetBlogPosts';
import { POST_LIMIT } from 'Hooks/useGetBlogPosts/constants';
import PostTagService from 'Services/ApiService/Cms/PostTag';
import { CMS_QUERY_TYPES } from 'Services/ApiService/Cms/constants';
import { useCallback } from 'react';
import { useQuery } from '@tanstack/react-query';
import { parseAsInteger, useQueryState } from 'nuqs';
import { BlogArticle } from 'Services/ApiService/Cms/Blog/interfaces';

import BlogBreadcrumb from './Components/Breadcrumb';
import BlogMainPost from './Components/MainPost';
import BlogPostDetail from './Components/PostDetail';
import BlogPostList from './Components/PostList';
import BlogTagDescription from './Components/TagDescription';
import BlogTagList from './Components/TagList';
import { BlogContext } from './context';
import styles from './styles.module.css';

import { VinistoHelperDllEnumsCmsTagSortableColumns } from '@/api-types/cms-api';

type BlogViewProps = {
	activePostSlug: string;
	activeTagSlug: string;
	initialPost: BlogArticle | null;
};

const BlogView = ({
	activePostSlug,
	activeTagSlug,
	initialPost,
}: BlogViewProps) => {
	const [page, setPage] = useQueryState('page', parseAsInteger.withDefault(1));

	const postsQuery = useGetBlogPosts({
		activeTag: activeTagSlug,
		page,
	});

	const tagsQuery = useQuery([CMS_QUERY_TYPES.TAGS], () =>
		PostTagService.getList({
			Limit: 100,
			SearchPublishedArticles: true,
			SortingColumn: VinistoHelperDllEnumsCmsTagSortableColumns.TIME,
			IsSortingDescending: false,
		})
	);

	const postCount = postsQuery?.data?.count ?? 0;
	const totalPaginationPages =
		postCount <= POST_LIMIT ? 0 : Math.ceil(postCount / POST_LIMIT);

	const handleOnSelectNextPage = useCallback(
		() => setPage((p) => p + 1),
		[setPage]
	);

	const handleOnSelectPreviousPage = useCallback(() => {
		if (page > 1) setPage((p) => p - 1);
	}, [page, setPage]);

	const handleOnSelectPage = useCallback(
		(newPage: number) => setPage(newPage),
		[setPage]
	);

	return (
		<BlogContext.Provider
			value={{
				tags: tagsQuery.data,
				isTagsLoading: tagsQuery.isLoading,
				activeTagUrl: activeTagSlug,
				posts: postsQuery.data?.articles ?? [],
				activePostUrl: activePostSlug,
				isPostsLoading: postsQuery.isLoading,
			}}
		>
			<section
				id="content-wrapper"
				className={styles.blog}
			>
				{(!activePostSlug || postsQuery.data?.articles?.length === 0) && (
					<>
						<BlogBreadcrumb />
						<BlogTagList />
					</>
				)}

				<BlogTagDescription key={'blgact' + activeTagSlug} />

				{activePostSlug ? (
					<BlogPostDetail initialPost={initialPost} />
				) : (
					<>
						<BlogMainPost />
						<BlogPostList />
						<div className="container">
							<PaginationNav
								className="noLoadmore"
								currentPage={page}
								totalPaginationPages={totalPaginationPages}
								itemsToLoadMoreCount={0}
								handleOnLoadMore={() => null}
								showLoadMore={false}
								handleOnSelectPreviousPage={handleOnSelectPreviousPage}
								handleOnSelectNextPage={handleOnSelectNextPage}
								handleOnSelectPage={handleOnSelectPage}
							/>
						</div>
					</>
				)}
			</section>
		</BlogContext.Provider>
	);
};

export default BlogView;
