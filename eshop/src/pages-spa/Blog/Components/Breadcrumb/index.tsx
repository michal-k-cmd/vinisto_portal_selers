import { useContext } from 'react';
import cx from 'classnames';
import { Breadcrumb } from 'react-bootstrap';
import Skeleton from 'react-loading-skeleton';
import { capitalize } from 'lodash-es';
import { LocalizationContext } from 'Services/LocalizationService';
import BreadcrumbHomeIcon from 'Components/Icons/BreadcrumbHome';
import { BlogContext } from 'pages-spa/Blog/context';
import { type PostTag } from 'Services/ApiService/Cms/interfaces';
import { type BlogArticle } from 'Services/ApiService/Cms/Blog/interfaces';
import useLocalizedValue from 'Hooks/useLocalizedValue';

import styles from './styles.module.css';

interface Props {
	tagId?: string | undefined;
	postTitle?: string | undefined;
}

const BlogBreadcrumb = ({ tagId: tag, postTitle }: Props) => {
	const {
		isTagsLoading,
		tags,
		posts,
		activeTagUrl: activeTag,
		activePostUrl: activePost,
	} = useContext(BlogContext);

	const t = useContext(LocalizationContext).useFormatMessage();
	const getLocalizedValue = useLocalizedValue();

	const getPrettyPostName = (
		posts: BlogArticle[] | undefined,
		activeUrl: string
	) => {
		const needle = posts?.find((post) => post.url === activeUrl);
		return needle ? needle.title : '';
	};

	const getPrettyTagName = (tags: PostTag[] | undefined, activeUrl: string) => {
		const needle = tags?.find((tag) =>
			tag.url.find((translation) => translation.value === activeUrl)
		);

		const tagName = getLocalizedValue(needle?.name);
		return tagName;
	};

	const getFirstTagPrettyName = () => {
		const post = posts?.find((post) => post.url === activePost);
		return post ? getLocalizedValue(post.tagDetails[0]?.name) : null;
	};

	const getTagById = (tagId: string | undefined) => {
		const tag = tags?.find((tag) => tag.id === tagId);
		return tag ? getLocalizedValue(tag.name) : null;
	};

	const getTagUrl = (tag: string | null) => {
		const tagObj = tags?.find(
			(tagObj) => getLocalizedValue(tagObj.name) === tag
		);
		return tagObj ? tagObj.url[0].value : '';
	};

	const tagToRender = getTagById(tag) ?? getFirstTagPrettyName();
	const postToRender = postTitle ?? getPrettyPostName(posts, activePost ?? '');

	const tagToRenderUrl = getTagUrl(tagToRender);

	return (
		<div className={cx('container', styles.breadcrumbsWrap)}>
			{isTagsLoading ? (
				<Skeleton
					containerClassName="breadcrumb ms-1"
					className="me-2"
					width="80px"
					count={2.8}
					inline
				/>
			) : (
				<Breadcrumb>
					<Breadcrumb.Item href="/">
						<BreadcrumbHomeIcon
							id="breadcrumbs-ico"
							alt={t({ id: 'alt.breadcrumb.home' })}
							title="Home"
							className={styles.homeIcon}
						/>
					</Breadcrumb.Item>
					<Breadcrumb.Item
						href={`/${t({ id: 'routes.community.route' })}`}
						className={styles.breadcrumb}
					>
						{capitalize(`${t({ id: 'routes.community.route' })}`)}
					</Breadcrumb.Item>
					{activeTag && (
						<Breadcrumb.Item
							active={!activePost}
							className={styles.breadcrumb}
						>
							{getPrettyTagName(tags, activeTag)}
						</Breadcrumb.Item>
					)}
					{activePost && tagToRender && (
						<>
							<Breadcrumb.Item
								href={`/${t({
									id: 'routes.community.route',
								})}/tag/${tagToRenderUrl ?? ''}`}
								active={!activePost}
								className={styles.breadcrumb}
							>
								{capitalize(tagToRender ?? '')}
							</Breadcrumb.Item>
							<Breadcrumb.Item
								active
								className={styles.breadcrumb}
							>
								{postToRender}
							</Breadcrumb.Item>
						</>
					)}
				</Breadcrumb>
			)}
		</div>
	);
};

export default BlogBreadcrumb;
