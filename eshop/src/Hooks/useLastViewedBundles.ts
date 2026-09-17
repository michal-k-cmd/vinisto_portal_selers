import { useQuery } from '@tanstack/react-query';
import { useContext } from 'react';
import { WarehouseContext } from 'Services/WarehouseService';
import { LocalizationContext } from 'Services/LocalizationService';
import { DEFAULT_BUNDLE_API_PARAMS } from 'vinisto_api_client/src/shared';
import { ProductApi } from 'vinisto_api_client/src/api-types/product-api';
import api from 'vinisto_api_client/src/api';
import { bundleAdapter } from 'vinisto_api_client/src/index';
import { AuthenticationContext } from 'Services/AuthenticationService/context';

export const useLastViewedBundles = () => {
	const warehouseContext = useContext(WarehouseContext);
	const localizationContext = useContext(LocalizationContext);
	const {
		activeCurrency: { currency },
		countryOfSale,
	} = localizationContext;
	const { priceLevel: customerPriceLevel } = useContext(
		AuthenticationContext
	).vinistoUser;

	const BUNDLE_SLICE_INDICES: [number, number] = [0, 5];

	const { data, isLoading } = useQuery({
		queryKey: [
			'product-api/bundles/GetLastViewed',
			{ currency, countryOfSale, limit: BUNDLE_SLICE_INDICES[1] },
		],
		queryFn: async () => {
			const res = await api.get<
				ProductApi.BundlesGetLastViewedList.ResponseBody,
				ProductApi.BundlesGetLastViewedList.RequestQuery
			>('product-api/bundles/GetLastViewed', {
				...DEFAULT_BUNDLE_API_PARAMS,
				IsCache: false,
				limit: BUNDLE_SLICE_INDICES[1],
				currency: currency,
				countryOfSale: countryOfSale,
			});

			const uniqueIds = Array.from(new Set(res.bundles ?? []))
				.map((bundle) => bundle.id)
				.filter((id): id is string => Boolean(id));

			void warehouseContext.fetchQuantity(uniqueIds);

			return (
				res.bundles?.map((bundle) =>
					bundleAdapter.fromApi(bundle, { currency, customerPriceLevel })
				) ?? []
			);
		},
		refetchInterval: 1000 * 30,
	});

	return { data, isLoading };
};
