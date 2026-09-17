import { useQueries, UseQueryOptions } from '@tanstack/react-query';
import { useContext } from 'react';
import { LocalizationContext } from 'Services/LocalizationService';
import {
	getBundleByIdQueryOptions,
	getBundleByIdRequestParams,
} from 'Hooks/Queries/useBundleById';

import {
	ProductApi,
	VinistoHelperDllEnumsCountryCode,
} from '@/api-types/product-api';
import { Bundle } from '@/domain/bundle';

export const useGetBundlesByIdsQueries = ({
	bundleIds,
	requestParams,
	options,
}: {
	bundleIds: string[];
	requestParams?: ProductApi.BundlesDetail.RequestQuery;
	options?: Omit<
		UseQueryOptions<Bundle, Error, Bundle>,
		'queryKey' | 'queryFn'
	>;
}) => {
	const {
		activeCurrency: { currency },
	} = useContext(LocalizationContext);
	const normalizedRequestParams = getBundleByIdRequestParams(currency, {
		countryOfSale: VinistoHelperDllEnumsCountryCode.CZ,
		...requestParams,
	});

	const queries: UseQueryOptions<Bundle, Error, Bundle>[] = bundleIds.map(
		(bundleId) => ({
			...getBundleByIdQueryOptions(bundleId, normalizedRequestParams),
			keepPreviousData: true,
			...options,
			enabled: Boolean(bundleId) && (options?.enabled ?? true),
		})
	);

	return useQueries({ queries });
};
