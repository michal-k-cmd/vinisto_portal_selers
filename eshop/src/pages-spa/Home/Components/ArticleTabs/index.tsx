import { useContext } from 'react';
import CarouselArticles from 'Components/CarouselArticles';
import { HOME_PAGE_ARTICLES_CAROUSEL } from 'Components/CarouselArticles/constants';
import { DeviceServiceContext } from 'Services/DeviceService';
import BlogService from 'Services/ApiService/Cms/Blog';
import { useQuery } from '@tanstack/react-query';
import {
	CmsApi,
	VinistoHelperDllEnumsCmsArticleSortableColumns,
} from 'vinisto_api_client/src/api-types/cms-api';
import { CMS_QUERY_TYPES } from 'Services/ApiService/Cms/constants';
import { LocalizationContext } from 'Services/LocalizationService';
import useArticleTitleImages from 'Hooks/Queries/useArticleTitleImages';
import NextLink from 'next/link';
import { DEFAULT_ARTICLE_LIMIT } from 'app/(eshop)/helpers';
import { BlogArticlePreview } from 'Services/ApiService/Cms/Blog/interfaces';

import ArticleInfo from './ArticleInfo';
import styles from './styles.module.css';
import ArticleGrid from './ArticleGrid';

const ArticleTabs = () => {
	const { useFormatMessage } = useContext(LocalizationContext);
	const t = useFormatMessage();

	const articleParams: CmsApi.ArticlesArticlesPublishedList.RequestQuery = {
		Limit: DEFAULT_ARTICLE_LIMIT,
		IsSortingDescending: true,
		SortingColumn: VinistoHelperDllEnumsCmsArticleSortableColumns.PUBLISH_DATE,
	};

	const articleQueryKey = [CMS_QUERY_TYPES.POSTS_PREVIEW, articleParams];

	const { isLoading, data: articles } = useQuery<BlogArticlePreview[]>(
		articleQueryKey,
		async () => {
			const response = await BlogService.getPreviewList(articleParams);
			if (response.isError) {
				return [];
			}
			return response.articles ?? [];
		},
		{
			staleTime: 10 * 60 * 1000,
		}
	);
	const { isMobile } = useContext(DeviceServiceContext);

	const { isLoading: isImagesLoading, data: images } = useArticleTitleImages(
		articles?.map((article) => article?.titleImageId) ?? []
	);

	return isMobile ? (
		<div className="col">
			<div className={styles.newsHeading}>
				{t({ id: 'productDetail.news.heading' })}
			</div>
			<div className="vinisto-card overflow-hidden vinisto-articles pb-0">
				<CarouselArticles
					carouselType={HOME_PAGE_ARTICLES_CAROUSEL}
					data={articles}
					isLoading={isLoading}
				/>
			</div>
			<div className="text-center mb-3">
				<NextLink
					href="/blog/tag/blog"
					className={styles.blogLink}
				>
					{t({ id: 'productDetail.news.link' })}
				</NextLink>
			</div>
		</div>
	) : (
		<div className="col">
			<div className={styles.newsHeading}>
				{t({ id: 'productDetail.news.heading' })}

				<NextLink
					href="/blog/tag/blog"
					className={styles.blogLink}
				>
					{t({ id: 'productDetail.news.link' })}
				</NextLink>
			</div>
			<ArticleGrid isLoading={isLoading}>
				{articles?.map((article, index) => (
					<ArticleInfo
						data={article}
						key={'artitab' + index}
						isImageLoading={isImagesLoading}
						imageData={images?.[index] ?? null}
					/>
				))}
			</ArticleGrid>
		</div>
	);
};

export default ArticleTabs;
