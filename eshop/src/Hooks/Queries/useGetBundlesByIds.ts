import { useQueries, useQuery, UseQueryOptions } from '@tanstack/react-query';
import { useContext } from 'react';
import { WarehouseContext } from 'Services/WarehouseService';
import { LocalizationContext } from 'Services/LocalizationService';
import { AuthenticationContext } from 'Services/AuthenticationService/context';

import api from '@/api';
import { ProductApi } from '@/api-types/product-api';
import { bundleAdapter } from '@/index';
import { Bundle } from '@/domain/bundle';

const useGetBundlesByIds = ({
	bundleIds,
	requestParams,
	options,
}: {
	bundleIds: string[];
	requestParams?: ProductApi.BundlesByIdsList.RequestQuery;
	options?: Omit<
		| UseQueryOptions<Map<string, Bundle>, Error, Map<string, Bundle>>
		| undefined,
		'queryKey' | 'queryFn'
	>;
}) => {
	const { fetchQuantity } = useContext(WarehouseContext);
	const {
		countryOfSale,
		activeCurrency: { currency },
	} = useContext(LocalizationContext);
	const { priceLevel } = useContext(AuthenticationContext).vinistoUser;

	return useQuery<Map<string, Bundle>>({
		queryKey: [
			'bundlesByIdsAdapted',
			{ bundleIds, currency, countryOfSale, priceLevel, ...requestParams },
		],
		queryFn: () =>
			api
				.get<
					ProductApi.BundlesByIdsList.ResponseBody,
					ProductApi.BundlesByIdsList.RequestQuery
				>(`product-api/bundles/by-ids`, {
					bundleIds,
					countryOfSale,
					currency,
					...requestParams,
				})
				.then((response) => {
					const bundles =
						response.bundles?.map((bundle) =>
							bundleAdapter.fromApi(bundle, {
								currency,
								customerPriceLevel: priceLevel,
							})
						) ?? [];
					const bundleIds = bundles.map((bundle) => bundle.id);

					if (bundleIds.length > 0) {
						fetchQuantity(bundleIds);
					}

					return new Map(bundles.map((bundle) => [bundle.id, bundle]));
				}),
		enabled: bundleIds.length > 0,
		keepPreviousData: true,
		...options,
	});
};

// This is optimized version of 'useGetBundlesByIds' that leverages caching of individual bundles,
// rather than querying all the bundles details again when bundle is e.g., added to basket.
export const useGetBundlesByIdsQueries = ({
	bundleIds,
	requestParams,
	options,
}: {
	bundleIds: string[];
	requestParams?: ProductApi.BundlesByIdsList.RequestQuery;
	options?: Omit<
		| UseQueryOptions<Map<string, Bundle>, Error, Map<string, Bundle>>
		| undefined,
		'queryKey' | 'queryFn'
	>;
}) => {
	const { fetchQuantity } = useContext(WarehouseContext);
	const {
		countryOfSale,
		activeCurrency: { currency },
	} = useContext(LocalizationContext);
	const { priceLevel } = useContext(AuthenticationContext).vinistoUser;

	return useQueries({
		queries: bundleIds.map((bundleId) => ({
			queryKey: [
				'bundleByIdAdapted',
				{ bundleId, currency, countryOfSale, priceLevel, ...requestParams },
			],
			queryFn: () =>
				api
					.get<
						ProductApi.BundlesDetail.ResponseBody,
						ProductApi.BundlesDetail.RequestQuery
					>(`product-api/bundles/${bundleId}`, {
						countryOfSale,
						currency,
						...requestParams,
					})
					.then((response) => {
						const bundle = response.bundle
							? bundleAdapter.fromApi(response.bundle, {
									currency,
									customerPriceLevel: priceLevel,
							  })
							: undefined;

						if (bundle) {
							fetchQuantity(bundle.id);
						}
						return bundle;
					}),
			enabled: bundleIds.length > 0,
			keepPreviousData: true,
			...options,
		})),
	});
};

export default useGetBundlesByIds;
