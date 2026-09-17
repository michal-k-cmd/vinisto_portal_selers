'use client';
import Skeleton from 'react-loading-skeleton';
import NextLink from 'next/link';
import { useContext } from 'react';
import cx from 'classnames';
import { LocalizationContext } from 'Services/LocalizationService';
import useArticleImage from 'Hooks/Queries/useArticleTitleImage';
import transformImage from 'Helpers/transformImage';
import { DeviceServiceContext } from 'Services/DeviceService';
const fallbackImage = '/assets/images/blog-fallback.webp';

import { IArticleInfoProps } from './interfaces';
import styles from './styles.module.css';

const ArticleInfo = ({ data, isLoading }: IArticleInfoProps) => {
	const { useFormatMessage } = useContext(LocalizationContext);
	const { isMobile } = useContext(DeviceServiceContext);
	const t = useFormatMessage();

	const articleContentNoStyles = data?.perex.substring(0, 150);

	const titleImageId = data?.titleImageId ?? '';

	const imageData = useArticleImage(titleImageId);

	const imageUrl =
		(isMobile
			? imageData?.image?.urls?.thumb_300
			: imageData?.image?.urls?.thumb_1000) || fallbackImage;
	const altText = imageData?.image?.alternativeText || '';

	const articleUrl = isLoading
		? '' // "#" causes https://github.com/vercel/next.js/discussions/75995
		: `/${t({ id: 'routes.community.route' })}/${data?.url}`;

	return (
		<NextLink
			href={articleUrl}
			className="vinisto-articles-wrap"
		>
			<div>
				{isLoading ? (
					<Skeleton height="250px" />
				) : (
					<img
						className={styles.image}
						src={transformImage(imageUrl, 320)}
						alt={altText}
						loading="lazy"
						width="100%"
						height="auto"
					/>
				)}
			</div>
			<div className={styles.blogArticle}>
				{isLoading ? (
					<Skeleton width="100%" />
				) : (
					<p
						className={cx(styles.blogAritcleHeading)}
						dangerouslySetInnerHTML={{
							__html: data?.title ?? '',
						}}
					/>
				)}
				{isLoading ? (
					<Skeleton width="100%" />
				) : (
					<div className={styles.blogArticleInfo}>
						<div className={styles.blogArticleDate}>
							{data?.publishDate
								? new Date(data?.publishDate).toLocaleDateString()
								: ''}
						</div>
						<div className={styles.blogArticleInfoSeparator}>-</div>
						<div className={styles.blogArticleAuthor}>
							{data?.authorDetails?.map((author) => author.name).join(', ')}
						</div>
						<div className={styles.blogArticleInfoSeparator}>-</div>
						<div className={styles.blogArticleReadingTime}>
							{t(
								{ id: 'blog.readingTime' },
								{
									time: data?.readingTime.toString(),
								}
							)}
						</div>
					</div>
				)}
				<div className="vinisto-articles__text vinisto-font-18 max-lines--8">
					{isLoading ? (
						<Skeleton count={5.4} />
					) : (
						<>
							<span
								className={styles.blogArticleContent}
								dangerouslySetInnerHTML={{
									__html: `${articleContentNoStyles ?? ''} ${'...'}`,
								}}
							/>
							<span className={styles.articleblogArticleLink}>
								{t({ id: 'articleTabs.link.continueReading' })}
							</span>
						</>
					)}
				</div>
			</div>
		</NextLink>
	);
};

export default ArticleInfo;
