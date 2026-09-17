'use client';

import { useContext } from 'react';
import NextLink from 'next/link';
import { LocalizationContext } from 'Services/LocalizationService';
import { DeviceServiceContext } from 'Services/DeviceService';
import type { BlogArticlePreview } from 'Services/ApiService/Cms/Blog/interfaces';
import type { VinistoCmsDllModelsApiReturnCmsImageReturn } from 'vinisto_api_client/src/api-types/cms-api';
import CarouselArticles from 'Components/CarouselArticles';
import { HOME_PAGE_ARTICLES_CAROUSEL } from 'Components/CarouselArticles/constants';
import ArticleGrid from 'pages-spa/Home/Components/ArticleTabs/ArticleGrid';
import ArticleInfo from 'pages-spa/Home/Components/ArticleTabs/ArticleInfo';
import styles from 'pages-spa/Home/Components/ArticleTabs/styles.module.css';

import HomeSectionDivider from './HomeSectionDivider';

interface ArticleWithImage extends BlogArticlePreview {
	imageData: VinistoCmsDllModelsApiReturnCmsImageReturn | null;
}

interface ArticleTabsClientProps {
	initialData: ArticleWithImage[];
	isNext?: boolean;
}

const ArticleTabsClient = ({ initialData, isNext }: ArticleTabsClientProps) => {
	const { useFormatMessage } = useContext(LocalizationContext);
	const { isMobile } = useContext(DeviceServiceContext);
	const t = useFormatMessage();

	if (initialData.length === 0) {
		return null;
	}

	if (isMobile) {
		return (
			<>
				<HomeSectionDivider />
				<div className="container">
					<div className="row">
						<div className="col">
							<div className={styles.newsHeading}>
								{t({ id: 'productDetail.news.heading' })}
							</div>
							<div className="vinisto-card overflow-hidden vinisto-articles pb-0">
								<CarouselArticles
									carouselType={HOME_PAGE_ARTICLES_CAROUSEL}
									data={initialData}
								/>
							</div>
							<div className="text-center">
								<NextLink
									href="/blog/tag/blog"
									className={styles.blogLink}
								>
									{t({ id: 'productDetail.news.link' })}
								</NextLink>
							</div>
						</div>
					</div>
				</div>
			</>
		);
	}

	return (
		<>
			<HomeSectionDivider />
			<div className="container">
				<div className="row">
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
						<ArticleGrid>
							{initialData.map((article) => (
								<ArticleInfo
									data={article}
									key={article.id}
									isImageLoading={false}
									imageData={article.imageData}
									isNext={isNext}
								/>
							))}
						</ArticleGrid>
					</div>
				</div>
			</div>
		</>
	);
};

export default ArticleTabsClient;
