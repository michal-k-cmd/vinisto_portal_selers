import Skeleton from 'react-loading-skeleton';
import { useContext } from 'react';
import cx from 'classnames';
import { LocalizationContext } from 'Services/LocalizationService';
const fallbackImage = '/assets/images/blog-fallback.webp';
import getSrcSet from 'Helpers/getSrcSet';
import transformImage from 'Helpers/transformImage';
import NextLink from 'next/link';

import { IArticleInfoProps } from './interfaces';
import styles from './styles.module.css';

const ArticleInfo = ({
	data,
	isLoading,
	isImageLoading,
	imageData,
}: IArticleInfoProps) => {
	const localizationContext = useContext(LocalizationContext);
	const t = localizationContext.useFormatMessage();

	const articleContentNoStyles = data?.perex.substring(0, 140);

	const srcSet = getSrcSet(imageData?.image?.urls);

	const altText = imageData?.image?.alternativeText || '';

	return (
		<NextLink
			href={
				isLoading ? '' : `/${t({ id: 'routes.community.route' })}/${data?.url}`
			}
			className={cx(styles.blogArticle)}
		>
			<div className={styles.blogArticleThumbnail}>
				{isLoading || isImageLoading ? (
					<Skeleton style={{ aspectRatio: '159 / 95', width: '100%' }} />
				) : (
					<img
						className={styles.blogArticleImage}
						srcSet={srcSet ?? ''}
						sizes={`300px`}
						src={transformImage(
							imageData?.image?.urls.original_png ?? fallbackImage,
							320
						)}
						alt={altText}
						loading="lazy"
					/>
				)}
			</div>
			{isLoading ? (
				<Skeleton
					width="100%"
					className={styles.blogAritcleHeading}
				/>
			) : (
				<p
					className={styles.blogAritcleHeading}
					dangerouslySetInnerHTML={{
						__html: data?.title ?? '',
					}}
				/>
			)}
			{isLoading ? (
				<Skeleton
					width="100%"
					className={styles.blogArticleInfo}
				/>
			) : (
				<div className={styles.blogArticleInfo}>
					<div className={styles.blogArticleDate}>
						{data?.publishDate
							? new Date(data.publishDate).toLocaleDateString('cs-CZ')
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
			<div>
				{isLoading ? (
					<Skeleton count={3.6} />
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
		</NextLink>
	);
};

export default ArticleInfo;
