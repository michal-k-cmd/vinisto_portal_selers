import Skeleton from 'react-loading-skeleton';
import { useContext, useEffect, useMemo } from 'react';
import { PostTag } from 'Services/ApiService/Cms/interfaces';
import useLocalizedValue from 'Hooks/useLocalizedValue';
import { BlogContext } from 'pages-spa/Blog/context';
import { TabNavItem, TabNavItemList } from 'vinisto_ui';
import { useRouter } from 'next/navigation';
import NextLink from 'next/link';

interface Props {
	tagId?: string | undefined;
}

const BlogTagList = ({ tagId }: Props) => {
	const { isTagsLoading, tags, activeTagUrl } = useContext(BlogContext);
	const getLocalizedValue = useLocalizedValue();
	const router = useRouter();
	const isActive = useMemo(
		() => (tag: PostTag) => {
			const activeTag = tags?.find((t) => t.id === tagId);
			return (
				tag.id === activeTag?.id || getLocalizedValue(tag.url) === activeTagUrl
			);
		},
		[activeTagUrl, getLocalizedValue, tagId, tags]
	);

	useEffect(() => {
		if (
			activeTagUrl !== '' &&
			isTagsLoading === false &&
			tags &&
			tags?.length > 0 &&
			tags?.filter((tag) => {
				return getLocalizedValue(tag.url) === activeTagUrl;
			}).length === 0
		) {
			router.push('/404');
		}
	}, [activeTagUrl, getLocalizedValue, isTagsLoading, router, tags]);

	if (isTagsLoading)
		return (
			<div className="container">
				<Skeleton />
			</div>
		);

	return (
		<div className="container">
			<TabNavItemList>
				{tags?.map((tag) => (
					<li
						key={'blgtablistli' + tag.id}
						className="list-group-item"
					>
						<TabNavItem
							as={NextLink}
							href={`/blog/tag/${getLocalizedValue(tag.url)}`}
							isActive={isActive(tag)}
							aria-current="page"
							data-content={getLocalizedValue(tag.name)}
						>
							{getLocalizedValue(tag.name)}
						</TabNavItem>
					</li>
				))}
			</TabNavItemList>
		</div>
	);
};

export default BlogTagList;
