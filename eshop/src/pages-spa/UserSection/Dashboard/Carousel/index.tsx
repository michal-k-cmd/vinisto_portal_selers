import { useContext } from 'react';
import { useQuery } from '@tanstack/react-query';
import { WarehouseContext } from 'Services/WarehouseService';
import { LocalizationContext } from 'Services/LocalizationService';
import CarouselSection from 'Components/CarouselSection';
import {
	VinistoHelperDllEnumsBundleSortableColumns,
	VinistoProductDllModelsApiBundleBundlesGetParameters,
	VinistoProductDllModelsApiBundleBundlesReturn,
} from 'vinisto_api_client/src/api-types/product-api';
import { bundleAdapter } from 'vinisto_api_client/src/index';
import api from 'vinisto_api_client/src/api';
import { AuthenticationContext } from 'Services/AuthenticationService/context';

const UserCarousel = () => {
	const { fetchQuantity } = useContext(WarehouseContext);
	const {
		activeCurrency: { currency },
		countryOfSale,
	} = useContext(LocalizationContext);
	const { priceLevel } = useContext(AuthenticationContext).vinistoUser;

	const userCarouselQueryKey = [
		'userCarousel',
		{ currency, countryOfSale, priceLevel },
	];
	const userCarouselsQuery = useQuery(userCarouselQueryKey, async () => {
		const response = await api.post<
			VinistoProductDllModelsApiBundleBundlesReturn,
			VinistoProductDllModelsApiBundleBundlesGetParameters
		>('product-api/bundles/get-bundles', undefined, {
			currency: currency,
			CountryOfSale: countryOfSale,
			isDeleted: false,
			isEnabled: true,
			isGift: false,
			isTemporaryUnavailable: false,
			tagId: '64456a70340fb40acd6c6ca0',
			sortingColumn: VinistoHelperDllEnumsBundleSortableColumns.SCORING,
			isSortingDescending: true,
			platform: 0,
		});

		if (response.isError) return Promise.reject(response.error);

		const bundleIds = response.bundles
			?.map((b) => b?.id)
			.filter((id): id is string => id !== null && id !== undefined);

		if (bundleIds && bundleIds.length > 0) fetchQuantity(bundleIds);

		return (
			response.bundles?.map((bundle) =>
				bundleAdapter.fromApi(bundle, {
					currency,
					customerPriceLevel: priceLevel,
				})
			) ?? []
		);
	});

	return (
		<CarouselSection
			key={`userSectionCarousel221`}
			data={userCarouselsQuery.data ?? []}
			title={''}
			isLoading={userCarouselsQuery.isLoading}
			analyticsListId="user_dashboard_carousel"
		/>
	);
};
export default UserCarousel;
