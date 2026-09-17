import { useQuery } from '@tanstack/react-query';
import BundleService from 'vinisto_api_client/src/product-service/bundle';
import {
	BundlesGetIdenticalBundlesListParams,
	VinistoHelperDllEnumsCurrency,
} from 'vinisto_api_client/src/api-types/product-api';
import { bundleAdapter } from 'vinisto_api_client/src/index';
import { AuthenticationContext } from 'Services/AuthenticationService/context';
import { useContext } from 'react';

const useIdenticalBundles = (
	bundleId: string,
	params?: Omit<BundlesGetIdenticalBundlesListParams, 'bundleId'>
) => {
	const { priceLevel } = useContext(AuthenticationContext).vinistoUser;

	return useQuery(
		['identical-bundles', bundleId, priceLevel, params],
		() =>
			BundleService.getIdenticalBundles(bundleId, params).then((res) =>
				res.map((bundle) =>
					bundleAdapter.fromApi(bundle, {
						currency: params?.currency ?? VinistoHelperDllEnumsCurrency.CZK,
						customerPriceLevel: priceLevel,
					})
				)
			),
		{
			enabled: !!bundleId,
		}
	);
};

export default useIdenticalBundles;
