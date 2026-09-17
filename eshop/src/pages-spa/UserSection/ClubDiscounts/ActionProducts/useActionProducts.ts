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

import {
	DESTILATES_CATEGORY_ID,
	PRODUCT_TYPE,
	WINES_CATEGORY_ID,
} from './constants';

export const useActionProducts = (productType: PRODUCT_TYPE) => {
	const warehouseContext = useContext(WarehouseContext);
	const localizationContext = useContext(LocalizationContext);
	const {
		activeCurrency: { currency },
		countryOfSale,
	} = localizationContext;
	const { priceLevel } = useContext(AuthenticationContext).vinistoUser;

	const { data, isLoading } = useQuery(
		['actionsProducts', { currency, countryOfSale, priceLevel }, productType],
		async () => {
			const response = await api.post<
				VinistoProductDllModelsApiBundleBundlesReturn,
				VinistoProductDllModelsApiBundleBundlesGetParameters
			>('product-api/bundles/get-bundles', undefined, {
				isInImperialUnits: false,
				isCache: true,
				...DEFAULT_BUNDLE_API_PARAMS,
				isInStock: true,
				sortingColumn: VinistoHelperDllEnumsBundleSortableColumns.SCORING,
				isSortingDescending: true,
				currency,
				countryOfSale,
				isForLoggedUsers: true,
				isDiscounted: true,
				limit: 12,
				platform: 0,
				...(productType === PRODUCT_TYPE.SETS ? { isSet: true } : {}),
				...(productType === PRODUCT_TYPE.WINES
					? { categoryId: WINES_CATEGORY_ID }
					: {}),
				...(productType === PRODUCT_TYPE.DESTILATES
					? { categoryId: DESTILATES_CATEGORY_ID }
					: {}),
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
		}
	);

	return { data, isLoading };
};
