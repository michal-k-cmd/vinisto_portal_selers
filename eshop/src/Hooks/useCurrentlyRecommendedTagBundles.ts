import { useQuery } from '@tanstack/react-query';
import { useContext } from 'react';
import { WarehouseContext } from 'Services/WarehouseService';
import { LocalizationContext } from 'Services/LocalizationService';
import { DEFAULT_BUNDLE_API_PARAMS } from 'vinisto_api_client/src/shared';
import {
	VinistoHelperDllEnumsBundleSortableColumns,
	VinistoProductDllModelsApiBundleBundlesGetParameters,
	VinistoProductDllModelsApiBundleBundlesReturn,
} from 'vinisto_api_client/src/api-types/product-api';
import api from 'vinisto_api_client/src/api';
import { bundleAdapter } from 'vinisto_api_client/src/index';
import { AuthenticationContext } from 'Services/AuthenticationService/context';

const CURRENTLY_RECOMMENDED_TAG_ID = '65732a9ffe577d37044f5902';

export const useCurrentlyRecommendedTagBundles = () => {
	const warehouseContext = useContext(WarehouseContext);
	const localizationContext = useContext(LocalizationContext);
	const {
		activeCurrency: { currency },
		countryOfSale,
	} = localizationContext;
	const { priceLevel } = useContext(AuthenticationContext).vinistoUser;

	const { data, isLoading } = useQuery({
		queryKey: [
			'currentlyRecommendedTagBundles',
			{ currency, countryOfSale, priceLevel },
		],
		queryFn: async () => {
			const response = await api.post<
				VinistoProductDllModelsApiBundleBundlesReturn,
				VinistoProductDllModelsApiBundleBundlesGetParameters
			>('product-api/bundles/get-bundles', undefined, {
				isInImperialUnits: false,
				isCache: true,
				...DEFAULT_BUNDLE_API_PARAMS,
				isInStock: true,
				tagId: CURRENTLY_RECOMMENDED_TAG_ID,
				sortingColumn: VinistoHelperDllEnumsBundleSortableColumns.SCORING,
				isSortingDescending: true,
				currency,
				countryOfSale,
				platform: 0,
			});
			if (response.isError) return Promise.reject(response.error);

			const uniqueIds = Array.from(
				new Set((response.bundles ?? []).map((bundle) => bundle.id))
			).filter((id): id is string => Boolean(id));

			warehouseContext.fetchQuantity(uniqueIds);

			return (
				response.bundles?.map((bundle) =>
					bundleAdapter.fromApi(bundle, {
						currency,
						customerPriceLevel: priceLevel,
					})
				) ?? []
			);
		},
		// TO CONSIDER: This carousel was disabled (returning hardcoded empty array), but the data were being loaded! Disabled for now…
		enabled: false,
	});

	return { data, isLoading };
};
