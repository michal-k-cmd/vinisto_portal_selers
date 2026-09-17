import { Link } from 'react-router-dom';
import LinkNext from 'next/link';
import cx from 'classnames';
import { VinistoCmsDllModelsApiCmsArticleCmsArticle } from 'vinisto_api_client/src/api-types/cms-api';
import getSrcSet from 'vinisto_shared/src/image/get-srcset';
import { ReactNode } from 'react';

import { ColumnCount } from '..';

import styles from './styles.module.css';

interface BlogCardProps {
	article: VinistoCmsDllModelsApiCmsArticleCmsArticle;
	baseBlogUrl: string;
	columnsClassName: ColumnCount;
	readMore?: ReactNode;
}

const BlogCard = ({
	article,
	baseBlogUrl,
	columnsClassName,
	readMore,
}: BlogCardProps) => {
	const { title, perex, url, titleImageDetail } = article;

	const srcSet = getSrcSet(titleImageDetail?.urls) ?? '';

	const sizesMap = {
		[ColumnCount.columns_0]: '100vw',
		[ColumnCount.columns_1]: '332px',
		[ColumnCount.columns_2]: '397px',
		[ColumnCount.columns_3]: '257px',
		[ColumnCount.columns_4]: '187px',
	};

	return (
		<article className={cx(styles.component, styles[columnsClassName])}>
			<Link to={`/${baseBlogUrl}/${url}`}>
				<img
					className={styles.image}
					srcSet={srcSet}
					sizes={`(max-width: 768px) ${
						columnsClassName === ColumnCount.columns_1 ? '100vw' : '50vw'
					} ${sizesMap[columnsClassName]}`}
					src={titleImageDetail?.urls?.original_png}
					alt=""
					loading="lazy"
				/>
			</Link>
			<div>
				<Link to={`/${baseBlogUrl}/${url}`}>
					<h3 className={styles.title}>{title}</h3>
				</Link>
				{columnsClassName === 'columns_1' && (
					<>
						<p className={styles.perex}>{perex}</p>

						<Link
							to={`/${baseBlogUrl}/${url}`}
							className={styles.link}
						>
							{readMore}
						</Link>
					</>
				)}
			</div>
		</article>
	);
};

export const BlogCardNext = ({
	article,
	baseBlogUrl,
	columnsClassName,
	readMore,
}: BlogCardProps) => {
	const { title, perex, url, titleImageDetail } = article;

	const srcSet = getSrcSet(titleImageDetail?.urls) ?? '';

	const sizesMap = {
		[ColumnCount.columns_0]: '100vw',
		[ColumnCount.columns_1]: '332px',
		[ColumnCount.columns_2]: '397px',
		[ColumnCount.columns_3]: '257px',
		[ColumnCount.columns_4]: '187px',
	};

	return (
		<article className={cx(styles.component, styles[columnsClassName])}>
			<LinkNext href={`/${baseBlogUrl}/${url}`}>
				<img
					className={styles.image}
					srcSet={srcSet}
					sizes={`(max-width: 768px) ${
						columnsClassName === ColumnCount.columns_1 ? '100vw' : '50vw'
					} ${sizesMap[columnsClassName]}`}
					src={titleImageDetail?.urls?.original_png}
					alt=""
					loading="lazy"
				/>
			</LinkNext>
			<div>
				<LinkNext href={`/${baseBlogUrl}/${url}`}>
					<h3 className={styles.title}>{title}</h3>
				</LinkNext>
				{columnsClassName === 'columns_1' && (
					<>
						<p className={styles.perex}>{perex}</p>

						<LinkNext
							href={`/${baseBlogUrl}/${url}`}
							className={styles.link}
						>
							{readMore}
						</LinkNext>
					</>
				)}
			</div>
		</article>
	);
};

export default BlogCard;
