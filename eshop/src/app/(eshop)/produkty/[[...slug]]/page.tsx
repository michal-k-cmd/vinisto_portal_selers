import WinesView from 'pages-spa/Wines';
import getIntl from 'app/intl';
import type { Metadata } from 'next';
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

import { B2B_NUMERIC_CODE, B2C_NUMERIC_CODE } from '@/shared';

const hasSearchParams = (searchParams?: ServerSearchParams) =>
	Object.values(searchParams ?? {}).some((value) => value !== undefined);

export const generateMetadata = async (): Promise<Metadata> => {
	const intl = await getIntl();
	const t = intl.formatMessage;

	return {
		title: `${t(
			{ id: 'app.title.page' },
			{ title: `${t({ id: 'routes.products.name' })}` }
		)}`,
		alternates: {
			canonical: 'routes.products.name',
		},
	};
};

const Wines = async ({
	params,
	searchParams,
}: {
	params: Promise<{ slug?: string[] }>;
	searchParams?: Promise<ServerSearchParams>;
}) => {
	const urlSegments = (await params).slug ?? [];
	const resolvedSearchParams = await searchParams;
	const isB2b = await getServerIsB2b(resolvedSearchParams);
	const isCleanListingUrl =
		urlSegments.length === 0 && !hasSearchParams(resolvedSearchParams);

	const initialBundlePage = isCleanListingUrl
		? await getUserPreferences()
				.then(({ countryOfSale, currency, customerPriceLevel }) =>
					fetchInitialListingBundlePage({
						categoryId: null,
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

	return <WinesView initialBundlePage={initialBundlePage} />;
};

export default Wines;
