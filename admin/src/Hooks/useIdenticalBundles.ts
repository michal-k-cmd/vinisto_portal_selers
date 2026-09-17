import { useQuery } from '@tanstack/react-query';

import BundleService from '@/product-service/bundle';
import {
	BundlesGetIdenticalBundlesListParams,
	VinistoHelperDllEnumsCurrency,
} from '@/api-types/product-api';
import { bundleAdapter } from '@/index';

const useIdenticalBundles = (
	bundleId: string,
	params?: Omit<BundlesGetIdenticalBundlesListParams, 'bundleId'>
) => {
	return useQuery(
		['identical-bundles', bundleId],
		() =>
			BundleService.getIdenticalBundles(bundleId, params).then((res) =>
				res.map((bundle) =>
					bundleAdapter.fromApi(bundle, {
						currency: params?.currency ?? VinistoHelperDllEnumsCurrency.CZK,
					})
				)
			),
		{
			enabled: !!bundleId,
		}
	);
};

export default useIdenticalBundles;
