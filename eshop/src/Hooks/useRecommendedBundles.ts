import { useQuery } from '@tanstack/react-query';
import { useContext } from 'react';
import { WarehouseContext } from 'Services/WarehouseService';
import { LocalizationContext } from 'Services/LocalizationService';
import { DEFAULT_BUNDLE_API_PARAMS } from 'vinisto_api_client/src/shared';
import { ProductApi } from 'vinisto_api_client/src/api-types/product-api';
import api from 'vinisto_api_client/src/api';
import { bundleAdapter } from 'vinisto_api_client/src/index';
import { AuthenticationContext } from 'Services/AuthenticationService/context';

import { RECOMMENDED_CAROUSEL_ID } from '../Components/Navbar/Components/Search/constants';

export const useRecommendedBundles = () => {
	const warehouseContext = useContext(WarehouseContext);
	const localizationContext = useContext(LocalizationContext);
	const {
		activeCurrency: { currency },
		countryOfSale,
	} = localizationContext;
	const { priceLevel } = useContext(AuthenticationContext).vinistoUser;

	const BUNDLE_SLICE_INDICES: [number, number] = [0, 5];

	const { data, isLoading } = useQuery(
		['recommendedCarousel', { currency, countryOfSale, priceLevel }],
		async () => {
			const response = await api.get<
				ProductApi.HomePageCustomCarouselsDetail.ResponseBody,
				ProductApi.HomePageCustomCarouselsDetail.RequestQuery
			>(`product-api/home-page/custom-carousels/${RECOMMENDED_CAROUSEL_ID}`, {
				...DEFAULT_BUNDLE_API_PARAMS,
				CountryOfSale: countryOfSale,
				Currency: currency,
			});

			if (response.isError) return Promise.reject(response.error);

			const uniqueIds = Array.from(
				new Set(
					(response.homePageCustomCarousel?.bundles ?? []).map(
						(bundle) => bundle.id
					)
				)
			).filter((id): id is string => Boolean(id));

			warehouseContext.fetchQuantity(uniqueIds);

			return (
				response.homePageCustomCarousel?.bundles
					?.slice(...BUNDLE_SLICE_INDICES)
					.map((bundle) =>
						bundleAdapter.fromApi(bundle, {
							currency,
							customerPriceLevel: priceLevel,
						})
					) ?? []
			);
		}
	);

	return { data, isLoading };
};
