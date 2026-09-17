import TagView from 'pages-spa/Tag';
import getIntl from 'app/intl';
import type { Metadata } from 'next';
import { QueryClient } from '@tanstack/react-query';
import { fetchTagByUrl } from 'pages-spa/Tag/helpers';
import {
	OpenGraphItemType,
	XCardType,
} from 'Components/DocumentHeader/constants';
import Config from 'Config';
import NotFoundPage from 'pages-spa/NotFound';
import { fetchInitialListingBundlePage } from 'lib/data/listing-bundles';
import { getUserPreferences } from 'lib/server/user-preferences';
import {
	SORTING_DEFAULT,
	URL_PARAM_LIMIT_DEFAULT_VALUE,
} from 'pages-spa/Category/Components/CategoryBundlesWithFilters/constants';
import {
	getServerIsB2b,
	type ServerSearchParams,
} from 'Services/PlatformService/server';

import { VinistoProductDllModelsApiTagTag } from '@/api-types/product-api';
import { B2B_NUMERIC_CODE, B2C_NUMERIC_CODE } from '@/shared';

const hasSearchParams = (searchParams?: ServerSearchParams) =>
	Object.values(searchParams ?? {}).some((value) => value !== undefined);

export const generateMetadata = async ({
	params,
}: {
	params: Promise<{ slug: string[] }>;
}): Promise<Metadata> => {
	const intl = await getIntl();
	const t = intl.formatMessage;

	const { countryOfSale, currency } = await getUserPreferences();

	const urlSegments = (await params).slug;
	let tagUrl = urlSegments[0];

	if (tagUrl === 'novinky') {
		tagUrl = 'novinka';
	}

	const queryClient = new QueryClient();

	const tagQuery = await queryClient
		.fetchQuery({
			queryKey: ['tag', { tagUrl }],
			queryFn: () =>
				fetchTagByUrl({
					tagUrl,
					countryOfSale,
					Currency: currency,
				}),
		})
		.catch((error) => {
			return { tag: null, error };
		});

	if (!tagQuery.tag) {
		// TO CONSIDER - add some error metadata
		return {};
	}

	const tag = tagQuery.tag;
	const tagName = tag.name;
	const pageTitle = `${t(
		{
			id: 'app.title.page',
		},
		{ title: tag.metaTitle || tagName }
	)}`;
	const tagDescription = tag.metaDescription ?? tag.description ?? undefined;

	return {
		title: pageTitle,
		description: tagDescription,
		twitter: {
			card: XCardType.summary,
			title: pageTitle,
			description: tagDescription,
			images: `${Config.baseUrl}og.jpg`,
		},
		openGraph: {
			type: OpenGraphItemType.article,
			title: pageTitle,
			description: tagDescription,
			url: `${Config.baseUrl}${t({
				id: 'routes.tag.route',
			})}/${tagUrl}`,
			images: `${Config.baseUrl}og.jpg`,
			// fbAdmins: Config.market.socials.facebookAdmins,
		},
		alternates: {
			canonical: `/${t({
				id: 'routes.tag.route',
			})}/${tagUrl}`,
		},
	};
};

const Tag = async ({
	params,
	searchParams,
}: {
	params: Promise<{ slug: string[] }>;
	searchParams?: Promise<ServerSearchParams>;
}) => {
	const intl = await getIntl();
	const t = intl.formatMessage;

	const { countryOfSale, currency, customerPriceLevel } =
		await getUserPreferences();

	const urlSegments = (await params).slug;
	const resolvedSearchParams = await searchParams;
	const isB2b = await getServerIsB2b(resolvedSearchParams);
	let tagUrl = urlSegments[0];

	if (tagUrl === 'novinky') {
		tagUrl = 'novinka';
	}

	const queryClient = new QueryClient();

	const tagQuery = await queryClient
		.fetchQuery({
			queryKey: ['tag', { tagUrl }],
			queryFn: () =>
				fetchTagByUrl({
					tagUrl,
					countryOfSale,
					Currency: currency,
				}),
		})
		.catch((error) => {
			return { tag: null, error };
		});

	const { tag, error } = tagQuery;

	if (error) {
		// TODO match errors and handle generic ones
		return <NotFoundPage />;
	}

	const isCleanListingUrl =
		urlSegments.length === 1 && !hasSearchParams(resolvedSearchParams);

	const initialBundlePage =
		isCleanListingUrl && tag?.id
			? await fetchInitialListingBundlePage({
					categoryId: null,
					tagId: tag.id,
					page: 1,
					limit: URL_PARAM_LIMIT_DEFAULT_VALUE,
					sortingColumn: SORTING_DEFAULT.sortingColumn,
					isSortingDescending: SORTING_DEFAULT.isSortingDescending,
					countryOfSale,
					currency,
					priceLevel: customerPriceLevel,
					filters: [],
					platform: isB2b ? B2B_NUMERIC_CODE : B2C_NUMERIC_CODE,
			  }).catch(() => undefined)
			: undefined;

	const jsonLd = ((
		tag: VinistoProductDllModelsApiTagTag | null | undefined
	) => {
		if (!tag) {
			return null;
		}

		const tagName = tag.name;
		const pageTitle = `${t(
			{
				id: 'app.title.page',
			},
			{ title: tag.metaTitle || tagName }
		)}`;
		const tagDescription = tag.metaDescription ?? tag.description ?? undefined;

		return [
			{
				'@context': 'https://schema.org',
				'@type': 'BreadcrumbList',
				itemListElement: [
					{
						'@type': 'ListItem',
						position: 1,
						name: Config.domainName,
						item: Config.baseUrl,
					},
					{
						'@type': 'ListItem',
						position: 2,
						name: tagName,
					},
				],
			},
			{
				'@context': 'https://schema.org',
				'@type': 'Article',
				headline: pageTitle,
				articleBody: tagDescription,
				articleSection: tag.name,
				image: `${Config.baseUrl}og.jpg`,
			},
		];
	})(tag);

	return (
		<>
			{jsonLd !== null && (
				<script
					id="jsonLd/tag"
					type="application/ld+json"
					dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
				/>
			)}
			<TagView
				tag={tag}
				tagUrl={tagUrl}
				initialBundlePage={initialBundlePage}
			/>
		</>
	);
};

export default Tag;
