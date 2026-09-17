import { cache } from 'react';
import { QueryClient } from '@tanstack/react-query';
import PostTagService from 'Services/ApiService/Cms/PostTag';
import getIntl from 'app/intl';
import { Metadata } from 'next';
import BlogView from 'pages-spa/Blog';
import {
	getMetaDescription,
	getMetaTitle,
	getPrettyTagName,
} from 'pages-spa/Blog/helpers';
import { getLocalizedValue } from 'Hooks/useLocalizedValue';
import { CMS_QUERY_TYPES } from 'Services/ApiService/Cms/constants';
import BlogService from 'Services/ApiService/Cms/Blog';
import {
	OpenGraphItemType,
	XCardType,
} from 'Components/DocumentHeader/constants';
import { notFound } from 'next/navigation';
import { getUserPreferences } from 'lib/server/user-preferences';

import { VinistoHelperDllEnumsCmsTagSortableColumns } from '@/api-types/cms-api';
import {
	VinistoHelperDllEnumsCountryCode,
	VinistoHelperDllEnumsCurrency,
} from '@/api-types/product-api';

const fallbackImage = '/assets/images/blog-fallback.webp';

const getCachedPost = cache(
	async (
		slug: string,
		countryOfSale: VinistoHelperDllEnumsCountryCode,
		currency: VinistoHelperDllEnumsCurrency
	) => {
		return BlogService.getArticle(slug, { countryOfSale, currency });
	}
);

const getPageSlugs = (slugArray?: string[]) => {
	const [prefixOrPostSlug, maybeTagSlug] = slugArray ?? [];
	const isTagPage = prefixOrPostSlug === 'tag';
	const isPostDetail = !isTagPage && prefixOrPostSlug !== undefined;

	return {
		activePostSlug: isPostDetail ? prefixOrPostSlug : '',
		activeTagSlug: isTagPage ? maybeTagSlug : '',
		prefixOrPostSlug,
	};
};

export const generateMetadata = async ({
	params,
}: {
	params: Promise<{ slug: string[] }>;
}): Promise<Metadata> => {
	const intl = await getIntl();
	const t = intl.formatMessage;

	const pageParams = await params;
	const { activePostSlug, activeTagSlug, prefixOrPostSlug } = getPageSlugs(
		pageParams.slug
	);
	const slug = pageParams.slug?.join('/') ?? '';

	if (activeTagSlug) {
		const queryClient = new QueryClient();
		const tagsData = await queryClient
			.fetchQuery({
				queryKey: [CMS_QUERY_TYPES.TAGS],
				queryFn: () =>
					PostTagService.getList({
						Limit: 100,
						SearchPublishedArticles: true,
						SortingColumn: VinistoHelperDllEnumsCmsTagSortableColumns.TIME,
						IsSortingDescending: false,
					}),
			})
			.catch(() => []);

		const prettyTagName = getPrettyTagName(
			tagsData,
			activeTagSlug,
			getLocalizedValue
		);
		const metaDescription = getMetaDescription(
			tagsData,
			activeTagSlug,
			getLocalizedValue
		);
		const metaTitle = getMetaTitle(tagsData, activeTagSlug, getLocalizedValue);

		return {
			title: t(
				{ id: 'app.title.page' },
				{
					title:
						metaTitle || prettyTagName || t({ id: 'routes.community.route' }),
				}
			),
			description: metaDescription,
			alternates: {
				canonical: `${t({ id: 'routes.community.route' })}/${slug}`,
			},
		};
	}

	if (activePostSlug) {
		const { currency, countryOfSale } = await getUserPreferences();

		const postData = await getCachedPost(
			activePostSlug,
			countryOfSale,
			currency
		).catch(() => null);

		const pageTitle = t(
			{ id: 'app.title.page' },
			{
				title:
					postData?.metaTitle ||
					postData?.title ||
					t({ id: 'routes.community.route' }),
			}
		);
		const pageDescription = postData?.meta;

		const imageUrl = postData?.image
			? `/cdn-cgi/image/format=jpeg/${postData.image.urls?.thumb_1000}`
			: fallbackImage;

		return {
			title: pageTitle,
			description: pageDescription,
			twitter: {
				card: XCardType.summary,
				title: pageTitle,
				description: pageDescription,
				images: imageUrl,
			},
			openGraph: {
				type: OpenGraphItemType.article,
				title: pageTitle,
				description: pageDescription ?? '',
				url: `${t({ id: 'routes.blog.route' })}/${prefixOrPostSlug}`,
				images: imageUrl,
			},
			alternates: {
				canonical: `${t({ id: 'routes.blog.route' })}/${prefixOrPostSlug}`,
			},
		};
	}

	return {
		title: `${t({ id: 'routes.community.route' })}`,
		alternates: {
			canonical: `/${t({ id: 'routes.community.route' })}`,
		},
	};
};

const Blog = async ({ params }: { params: Promise<{ slug: string[] }> }) => {
	const pageParams = await params;
	const { activePostSlug, activeTagSlug } = getPageSlugs(pageParams.slug);
	let initialPost = null;

	if (activePostSlug) {
		const { currency, countryOfSale } = await getUserPreferences();
		initialPost = await getCachedPost(
			activePostSlug,
			countryOfSale,
			currency
		).catch(() => null);

		if (!initialPost) {
			notFound();
		}
	}

	return (
		<BlogView
			activePostSlug={activePostSlug}
			activeTagSlug={activeTagSlug}
			initialPost={initialPost}
		/>
	);
};

export default Blog;
