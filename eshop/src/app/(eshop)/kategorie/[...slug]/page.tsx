import {
	OpenGraphItemType,
	XCardType,
} from 'Components/DocumentHeader/constants';
import Config from 'Config';
import { getLocalizedValue } from 'Hooks/useLocalizedValue';
import getIntl from 'app/intl';
import { fetchInitialListingBundlePage } from 'lib/data/listing-bundles';
import { getUserPreferences } from 'lib/server/user-preferences';
import type { Metadata } from 'next';
import CategoryView from 'pages-spa/Category';
import {
	SORTING_DEFAULT,
	URL_PARAM_LIMIT_DEFAULT_VALUE,
} from 'pages-spa/Category/Components/CategoryBundlesWithFilters/constants';
import NotFoundPage from 'pages-spa/NotFound';
import { cache } from 'react';
import {
	getServerIsB2b,
	type ServerSearchParams,
} from 'Services/PlatformService/server';

import {
	convertMultiLangValues,
	getCategoryLinkWidgets,
	getCategoryWithVirtualCategory,
} from './helpers-server';

import { VinistoProductDllModelsApiCategoryCategory } from '@/api-types/product-api';
import { B2B_NUMERIC_CODE, B2C_NUMERIC_CODE } from '@/shared';

const getCategoryWithVirtualCategoryCached = cache(async (fullUrl: string) => {
	const result = await getCategoryWithVirtualCategory(fullUrl);
	return result;
});

const hasSearchParams = (searchParams?: ServerSearchParams) =>
	Object.values(searchParams ?? {}).some((value) => value !== undefined);

export const generateMetadata = async ({
	params,
}: {
	params: Promise<{ slug: string[] }>;
}): Promise<Metadata> => {
	const intl = await getIntl();

	const t = intl.formatMessage;

	const urlSegments = (await params).slug;
	const categoryUrl = urlSegments[0];
	const fullUrl = urlSegments.join('/');

	const { categoryWithVirtualMetaData, categoryWithVirtualData } =
		await getCategoryWithVirtualCategoryCached(fullUrl);

	const hasVirtualCategory = !!categoryWithVirtualData;

	if (!categoryWithVirtualMetaData) {
		// TO CONSIDER - add some error metadata
		return {};
	}

	const localizedCategoryName = getLocalizedValue(
		categoryWithVirtualMetaData?.name
	);
	const localizedPageDescription = getLocalizedValue(
		categoryWithVirtualMetaData?.description
	);

	const keywords = categoryWithVirtualMetaData.keywords
		? getLocalizedValue(
				convertMultiLangValues(categoryWithVirtualMetaData.keywords)
		  )
		: undefined;

	const pageTitle = `${t(
		{ id: 'app.title.page' },
		{ title: localizedCategoryName }
	)}`;

	return {
		title: pageTitle,
		description: localizedPageDescription,
		keywords,
		twitter: {
			card: XCardType.summary,
			title: pageTitle,
			description: localizedPageDescription,
			images:
				categoryWithVirtualMetaData?.images?.[0]?.domainUrls?.original_png ??
				`${Config.baseUrl}og.jpg`,
		},
		openGraph: {
			type: OpenGraphItemType.article,
			title: pageTitle,
			description: localizedPageDescription,
			url: hasVirtualCategory
				? `kategorie/${fullUrl}`
				: `${Config.baseUrl}${t({
						id: 'routes.category.route',
				  })}/${categoryUrl}`,
			images:
				categoryWithVirtualMetaData?.images?.[0]?.domainUrls?.original_png ??
				`${Config.baseUrl}og.jpg`,
			// fbAdmins: Config.market.socials.facebookAdmins,
		},
		alternates: {
			canonical: hasVirtualCategory
				? `kategorie/${fullUrl}`
				: `kategorie/${categoryUrl}`,
		},
	};
};

const Category = async ({
	params,
	searchParams,
}: {
	params: Promise<{ slug: string[] }>;
	searchParams?: Promise<ServerSearchParams>;
}) => {
	const intl = await getIntl();
	const t = intl.formatMessage;

	const urlSegments = (await params).slug;
	const categoryUrl = urlSegments[0];
	const fullUrl = urlSegments.join('/');
	const resolvedSearchParams = await searchParams;
	const isB2b = await getServerIsB2b(resolvedSearchParams);

	const [categoriesData, linkwidgetsData] = await Promise.all([
		getCategoryWithVirtualCategoryCached(fullUrl),
		getCategoryLinkWidgets({
			pathname: fullUrl,
			availableOnPlatform: isB2b ? B2B_NUMERIC_CODE : B2C_NUMERIC_CODE,
		}),
	]);

	const { category, categoryWithVirtualData } = categoriesData;

	if (!category) {
		// TODO match errors and handle generic ones
		return <NotFoundPage />;
	}

	const usedCategory = categoryWithVirtualData || category;
	const hasVirtualCategory = !!categoryWithVirtualData;

	const isCleanListingUrl =
		urlSegments.length === 1 && !hasSearchParams(resolvedSearchParams);

	const initialBundlePage = isCleanListingUrl
		? await getUserPreferences()
				.then(({ countryOfSale, currency, customerPriceLevel }) =>
					fetchInitialListingBundlePage({
						categoryId: category.id ?? '',
						tagId: null,
						page: 1,
						limit: URL_PARAM_LIMIT_DEFAULT_VALUE,
						sortingColumn: SORTING_DEFAULT.sortingColumn,
						isSortingDescending: SORTING_DEFAULT.isSortingDescending,
						countryOfSale,
						currency,
						priceLevel: customerPriceLevel,
						filters: [],
						platform: isB2b ? B2B_NUMERIC_CODE : B2C_NUMERIC_CODE,
					})
				)
				.catch(() => undefined)
		: undefined;

	const jsonLd = ((
		usedCategory: VinistoProductDllModelsApiCategoryCategory
	) => {
		const localizedCategoryName = getLocalizedValue(usedCategory?.name);
		const localizedPageDescription = getLocalizedValue(
			usedCategory?.description
		);
		const keywords = usedCategory.keywords
			? getLocalizedValue(convertMultiLangValues(usedCategory.keywords))
			: undefined;

		const pageTitle = `${t(
			{ id: 'app.title.page' },
			{ title: localizedCategoryName }
		)}`;

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
						name: localizedCategoryName,
					},
				],
			},
			{
				'@context': 'https://schema.org',
				'@type': 'Article',
				url: hasVirtualCategory
					? `${Config.baseUrl}kategorie/${fullUrl}`
					: `${Config.baseUrl}kategorie/${categoryUrl}`,
				headline: pageTitle,
				keywords,
				articleSection: localizedCategoryName,
				articleBody: localizedPageDescription,
				image:
					usedCategory?.images?.[0]?.domainUrls?.original_png ??
					`${Config.baseUrl}og.jpg`,
			},
		];
	})(usedCategory);

	return (
		<>
			{jsonLd !== null && (
				<script
					id="jsonLd/category"
					type="application/ld+json"
					dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
				/>
			)}
			<CategoryView
				category={category}
				categoryWithVirtualData={categoryWithVirtualData}
				linkWidgets={linkwidgetsData}
				initialBundlePage={initialBundlePage}
			/>
		</>
	);
};

export default Category;
