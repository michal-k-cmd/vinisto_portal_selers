import { useQuery } from '@tanstack/react-query';
import { useContext } from 'react';
import { AuthenticationContext } from 'Services/AuthenticationService/context';

import {
	BundleDetailCarouselsListParams,
	VinistoHelperDllEnumsCurrency,
} from '@/api-types/product-api';
import { bundleAdapter } from '@/index';
import CarouselService from '@/product-service/carousel';

export const useBundleCarousels = (
	bundleId: string,
	params: Omit<BundleDetailCarouselsListParams, 'BundleId'>
) => {
	const { priceLevel } = useContext(AuthenticationContext).vinistoUser;

	return useQuery({
		queryKey: ['bundle-carousels', bundleId, params, priceLevel],
		queryFn: async () => {
			return CarouselService.getBundleCarousels(bundleId, params).then(
				(response) => {
					return {
						lastViewedBundles:
							response?.lastViewedBundles.map((bundle) =>
								bundleAdapter.fromApi(bundle, {
									currency:
										params?.Currency ?? VinistoHelperDllEnumsCurrency.CZK,
									customerPriceLevel: priceLevel,
								})
							) ?? [],
						similarBundles:
							response?.similarBundles.map((bundle) =>
								bundleAdapter.fromApi(bundle, {
									currency:
										params?.Currency ?? VinistoHelperDllEnumsCurrency.CZK,
									customerPriceLevel: priceLevel,
								})
							) ?? [],
						manufacturerBundles:
							response?.manufacturerBundles.map((bundle) =>
								bundleAdapter.fromApi(bundle, {
									currency:
										params?.Currency ?? VinistoHelperDllEnumsCurrency.CZK,
									customerPriceLevel: priceLevel,
								})
							) ?? [],
					};
				}
			);
		},
		enabled: !!bundleId,
	});
};
