import cx from 'classnames';
import { VinistoCmsDllModelsApiCmsArticleCmsArticle } from 'vinisto_api_client/src/api-types/cms-api';
import { ReactNode, useState } from 'react';

import BlogCard, { BlogCardNext } from './blog-card';
import styles from './styles.module.css';

interface BlogSectionProps {
	title: string;
	description: string;
	articles: VinistoCmsDllModelsApiCmsArticleCmsArticle[];
	baseBlogUrl: string;
	expandText: ReactNode;
	contractText: ReactNode;
	readMore: ReactNode;
	isNext?: boolean;
}

export enum ColumnCount {
	columns_0 = 'columns_0',
	columns_1 = 'columns_1',
	columns_2 = 'columns_2',
	columns_3 = 'columns_3',
	columns_4 = 'columns_4',
}

const BlogSection = ({
	title,
	description,
	articles,
	baseBlogUrl,
	expandText,
	contractText,
	readMore,
	isNext,
}: BlogSectionProps) => {
	const [isExpanded, setIsExpanded] = useState(false);
	const totalArticlesCount = articles.length;

	const columnsCount = (() => {
		switch (true) {
			case totalArticlesCount === 0:
				return ColumnCount.columns_0;
			case totalArticlesCount === 1:
				return ColumnCount.columns_1;
			case totalArticlesCount === 2:
				return ColumnCount.columns_2;
			case totalArticlesCount === 3:
				return ColumnCount.columns_3;
			default:
				return ColumnCount.columns_4;
		}
	})();

	const visibleArticles = articles.slice(0, 4);
	const restArticles = articles.length > 4 ? articles.slice(4) : null;

	if (!articles.length) return null;

	const BlogCardComponent = isNext ? BlogCardNext : BlogCard;

	return (
		<section className={styles.component}>
			<h2 className={styles.title}>{title}</h2>
			<p className={styles.description}>{description}</p>
			<div className={cx(styles.articles, styles[columnsCount])}>
				{visibleArticles.map((article, i) => (
					<BlogCardComponent
						key={i}
						article={article}
						baseBlogUrl={baseBlogUrl}
						columnsClassName={columnsCount}
						readMore={readMore}
					/>
				))}
			</div>
			<div
				className={cx(styles.restArticles, styles[columnsCount], {
					[styles.expanded]: isExpanded,
				})}
				aria-expanded={isExpanded ? 'true' : 'false'}
			>
				<div className={cx(styles.articles, styles[columnsCount])}>
					{restArticles &&
						restArticles.map((article, i) => (
							<BlogCardComponent
								key={i}
								article={article}
								baseBlogUrl={baseBlogUrl}
								columnsClassName={columnsCount}
								readMore={readMore}
							/>
						))}
				</div>
			</div>
			{articles.length > 4 && (
				<button
					onClick={() => setIsExpanded(!isExpanded)}
					className={styles.button}
				>
					{isExpanded ? contractText : expandText}
					<img
						className={cx(styles.arrowDown, { [styles.rotated]: isExpanded })}
						src={'/assets/images/arrow-down.svg'}
						alt=""
					/>
				</button>
			)}
		</section>
	);
};

export default BlogSection;
