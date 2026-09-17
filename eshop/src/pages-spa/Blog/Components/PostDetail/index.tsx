import Skeleton from 'react-loading-skeleton';
import { useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { useContext, useEffect } from 'react';
import { dayjsInstance as dayjs } from 'Services/Date';
import { CMS_QUERY_TYPES } from 'Services/ApiService/Cms/constants';
import { LocalizationContext } from 'Services/LocalizationService';
import { AuthenticationContext } from 'Services/AuthenticationService/context';
import { Author } from 'Services/ApiService/Cms/interfaces';
import BlogService from 'Services/ApiService/Cms/Blog';
import { BlogArticle } from 'Services/ApiService/Cms/Blog/interfaces';
import { BlogContext } from 'pages-spa/Blog/context';
import { WarehouseContext } from 'Services/WarehouseService';
import sanitizeHTML from 'Helpers/sanitizeHTML';
import transformImage from 'Helpers/transformImage';
import {
	VinistoHelperDllEnumsCountryCode,
	VinistoProductDllModelsApiBundleBundle,
} from 'vinisto_api_client/src/api-types/product-api';
import { bundleAdapter } from 'vinisto_api_client/src/index';
import { Bundle } from 'vinisto_api_client/src/domain/bundle';
const fallbackImage = '/assets/images/blog-fallback.webp';

import BlogPostCard from '../PostCard';
import BlogBreadcrumb from '../Breadcrumb';
import BlogTagList from '../TagList';

import PostLinkedBundles from './LinkedBundles';
import './styles.css';
import styles from './styles.module.css';

const MAX_SUGGESTED_POSTS = 4;

const getUniqueByProperty = (arr: Bundle[], prop: keyof Bundle) => {
	const seen = new Set();
	return arr.filter((item) => {
		const val = item[prop];
		if (seen.has(val)) {
			return false;
		}
		seen.add(val);
		return true;
	});
};

const BlogPostDetail = ({
	initialPost,
}: {
	initialPost: BlogArticle | null;
}) => {
	const { posts, activePostUrl, activeTagUrl } = useContext(BlogContext);
	const { fetchQuantity } = useContext(WarehouseContext);
	const localizationContext = useContext(LocalizationContext);
	const t = localizationContext.useFormatMessage();
	const {
		countryOfSale,
		activeCurrency: { currency },
	} = localizationContext;
	const { priceLevel } = useContext(AuthenticationContext).vinistoUser;
	const initialPostData = initialPost
		? {
				...initialPost,
				bundleDetails: initialPost.bundleDetails?.map((bundle) =>
					bundleAdapter.fromApi(bundle, {
						currency,
						customerPriceLevel: priceLevel,
					})
				),
		  }
		: undefined;

	const router = useRouter();

	const { data, isLoading } = useQuery(
		[
			`${CMS_QUERY_TYPES.POST}`,
			{ activePostUrl, currency, countryOfSale, priceLevel },
		],
		() =>
			BlogService.getArticle(activePostUrl ?? '', {
				countryOfSale: countryOfSale as VinistoHelperDllEnumsCountryCode,
				currency,
			}).then((res) => ({
				...res,
				bundleDetails: res?.bundleDetails?.map((bundle) =>
					bundleAdapter.fromApi(
						bundle as VinistoProductDllModelsApiBundleBundle,
						{ currency, customerPriceLevel: priceLevel }
					)
				),
			})),
		{
			placeholderData: initialPostData,
		}
	);

	useEffect(() => {
		const bundles = data?.bundleDetails || [];
		const uniqueBundles = getUniqueByProperty(bundles, 'id');
		const bundleIds = uniqueBundles.map((bundle) => {
			return bundle.id || '';
		});
		fetchQuantity(bundleIds);
	}, [data?.bundleDetails, fetchQuantity]);

	useEffect(() => {
		if (data === null) {
			router.push('/404');
		}
	}, [data, router]);

	if (isLoading)
		return (
			<>
				<div className="container">
					<Skeleton />
				</div>
				<div className="container">
					<Skeleton height="35px" />
				</div>
				<div className="container">
					<Skeleton
						height="200px"
						count={3}
						className="mb-2"
					/>
				</div>
			</>
		);

	const authors = data?.authorDetails
		?.map((author: Author) => author.name)
		.join(', ');
	const sanitizedHTML = sanitizeHTML(data?.content ?? '');
	const suggestedPosts = posts
		?.filter((p) => p.url !== activePostUrl)
		.slice(0, MAX_SUGGESTED_POSTS);

	return (
		<>
			<BlogBreadcrumb
				tagId={data?.tags?.[0]}
				postTitle={data?.title}
			/>
			<BlogTagList tagId={data?.tags?.[0]} />
			<div className="container">
				<div className={styles.postDetail}>
					<div className={styles.postWrap}>
						<h1 className={styles.postTitle}>{data?.title}</h1>
						<div className={styles.postInfo}>
							<span>
								{dayjs(data?.publishDate)
									.locale(
										typeof navigator === 'undefined'
											? data?.language ?? 'cs'
											: navigator.language
									)
									.format('LL')}
							</span>
							<span className={styles.postAuthor}> - {authors} - </span>
							<span>
								{t(
									{ id: 'blog.readingTime' },
									{
										time: data?.readingTime?.toString(),
									}
								)}
							</span>
						</div>
						<h6 className={styles.postMeta}>{data?.perex}</h6>
						<div className={styles.postImgWrap}>
							<img
								className={styles.postImg}
								src={transformImage(
									data?.image ? data?.image?.urls?.thumb_1000 : fallbackImage
								)}
								alt={data?.image?.alternativeText ?? ''}
							/>
						</div>
						<div
							className="v-blog-post"
							dangerouslySetInnerHTML={{ __html: sanitizedHTML }}
						></div>
						<PostLinkedBundles
							bundles={data?.bundleDetails ?? []}
							listingType={data?.productType}
							bundlesTitle={data?.productListTitle ?? ''}
						/>
					</div>
					<div className={styles.nextPostsWrap}>
						<h2 className={styles.nextPostsTitle}>
							{t(
								{ id: 'blog.suggestedArticles' },
								{
									topic: activeTagUrl,
								}
							)}
						</h2>
						<div className={styles.nextPosts}>
							{suggestedPosts?.map((post) => (
								<BlogPostCard
									key={'blgpostc' + post.id}
									post={post}
								/>
							))}
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default BlogPostDetail;
