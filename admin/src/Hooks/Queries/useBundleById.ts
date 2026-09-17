import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { useContext } from 'react';
import { LocalizationContext } from 'Services/LocalizationService';
import { BundleService } from 'vinisto_api_client';

import { Bundle } from '@/domain/bundle';
import {
	ProductApi,
	VinistoHelperDllEnumsCurrency,
} from '@/api-types/product-api';

type BundleByIdRequestParams = ProductApi.BundlesDetail.RequestQuery;

interface UseBundleByIdParams {
	bundleId: string;
	requestParams?: BundleByIdRequestParams;
	options?: Omit<UseQueryOptions<Bundle, Error>, 'queryKey' | 'queryFn'>;
}

export const bundleQueryKeys = {
	all: ['product-api/bundles'] as const,
	byId: (bundleId: string) => [...bundleQueryKeys.all, bundleId] as const,
	detail: (bundleId: string, requestParams: BundleByIdRequestParams) =>
		[...bundleQueryKeys.byId(bundleId), requestParams] as const,
};

export const getBundleByIdRequestParams = (
	currency: VinistoHelperDllEnumsCurrency | undefined,
	requestParams: BundleByIdRequestParams = {}
): BundleByIdRequestParams => ({
	...requestParams,
	currency:
		requestParams.currency ?? currency ?? VinistoHelperDllEnumsCurrency.CZK,
	isHiddenTags: requestParams.isHiddenTags ?? true,
});

export const getBundleByIdQueryOptions = (
	bundleId: string,
	requestParams: BundleByIdRequestParams
) => ({
	queryKey: bundleQueryKeys.detail(bundleId, requestParams),
	queryFn: () => BundleService.getBundleById(bundleId, requestParams),
	staleTime: Infinity,
});

const useBundleById = ({
	bundleId,
	requestParams,
	options,
}: UseBundleByIdParams) => {
	const {
		activeCurrency: { currency },
	} = useContext(LocalizationContext);
	const normalizedRequestParams = getBundleByIdRequestParams(
		currency,
		requestParams
	);

	return useQuery<Bundle, Error>({
		...getBundleByIdQueryOptions(bundleId, normalizedRequestParams),
		enabled: Boolean(bundleId),
		...options,
	});
};

export default useBundleById;
