import { useQueries } from '@tanstack/react-query';
import { useContext, useEffect, useRef } from 'react';
import { LocalizationContext } from 'Services/LocalizationService';
import { WarehouseContext } from 'Services/WarehouseService';
import { URL_PARAM_LIMIT_DEFAULT_VALUE } from 'pages-spa/Category/Components/CategoryBundlesWithFilters/constants';
import { BundlesBatchedByPages } from 'pages-spa/Category/Components/CategoryBundlesWithFilters/context';
import { AuthenticationContext } from 'Services/AuthenticationService/context';
import { fetchListingBundlePage } from 'lib/data/listing-bundles';
import type { ListingBundlePage } from 'lib/data/listing-bundles';

import { VinistoHelperDllEnumsBundleSortableColumns } from '@/api-types/product-api';
import {
	VinistoHelperDllEnumsCountryCode,
	VinistoHelperDllEnumsCurrency,
	VinistoHelperDllEnumsPriceLevel,
} from '@/api-types/product-api';

interface UseGetBundlesParams {
	platform: number;
	categoryId: string | null;
	tagId?: string | null;
	sortingColumn: VinistoHelperDllEnumsBundleSortableColumns | undefined;
	isSortingDescending?: boolean;
	page: number;
	countryOfSale: VinistoHelperDllEnumsCountryCode;
	currency: VinistoHelperDllEnumsCurrency;
	priceLevel: VinistoHelperDllEnumsPriceLevel | null | undefined;
	filters?: Record<string, unknown>[];
	limit?: number;
	isEnabled?: boolean;
	onError?: (error: unknown) => void;
}

const useGetPaginatedBundleQueries = (
	bundlesRevisitedParams: Omit<UseGetBundlesParams, 'page'>,
	pageRange: number[],
	initialBundlePage?: ListingBundlePage
) => {
	const { fetchQuantity } = useContext(WarehouseContext);
	const localizationContext = useContext(LocalizationContext);
	const fetchedBundleIdsRef = useRef('');

	const {
		activeCurrency: { currency },
		countryOfSale,
	} = localizationContext;
	const { priceLevel } = useContext(AuthenticationContext).vinistoUser;

	const bundleQueries = useQueries<BundlesBatchedByPages>({
		queries: pageRange.map((page) => {
			const hasInitialBundlePage = page === 1 && Boolean(initialBundlePage);

			return {
				queryKey: [
					'bundlesRevisited',
					bundlesRevisitedParams,
					page,
					hasInitialBundlePage ? 'initial' : 'client',
					{ currency, countryOfSale },
				],
				queryFn: () => {
					const {
						platform,
						categoryId,
						tagId,
						sortingColumn,
						isSortingDescending,
						filters,
						onError,
					} = bundlesRevisitedParams;

					return fetchListingBundlePage({
						page,
						categoryId,
						tagId,
						sortingColumn,
						isSortingDescending,
						limit: URL_PARAM_LIMIT_DEFAULT_VALUE,
						filters,
						countryOfSale,
						currency,
						platform,
						priceLevel,
					}).catch((error) => {
						onError?.(error);
						return {
							bundles: [],
							count: 0,
						};
					});
				},
				initialData: hasInitialBundlePage ? initialBundlePage : undefined,
				keepPreviousData: true,
				retry: 0,
			};
		}),
	});

	useEffect(() => {
		const bundleIds = bundleQueries.flatMap(
			(query) => query.data?.bundles?.map((bundle) => bundle.id) ?? []
		);
		const idsKey = bundleIds.join('|');

		if (!idsKey || fetchedBundleIdsRef.current === idsKey) return;

		fetchedBundleIdsRef.current = idsKey;
		fetchQuantity(bundleIds);
	}, [bundleQueries, fetchQuantity]);

	return bundleQueries;
};

export default useGetPaginatedBundleQueries;
