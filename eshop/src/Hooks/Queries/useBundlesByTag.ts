'use client';

import { useQuery } from '@tanstack/react-query';
import { useContext } from 'react';
import { LocalizationContext } from 'Services/LocalizationService';
import BundleService from 'vinisto_api_client/src/product-service/bundle';
import { WarehouseContext } from 'Services/WarehouseService';
import { BundlesGetBundlesCreatePayload } from 'vinisto_api_client/src/api-types/product-api';
import { bundleAdapter } from 'vinisto_api_client/src/index';
import { AuthenticationContext } from 'Services/AuthenticationService/context';

export const useBundlesByTag = (
	tagId: string,
	params: BundlesGetBundlesCreatePayload
) => {
	const {
		activeCurrency: { currency },
		countryOfSale,
	} = useContext(LocalizationContext);
	const { fetchQuantity } = useContext(WarehouseContext);
	const { priceLevel } = useContext(AuthenticationContext).vinistoUser;

	const carouselsQuery = useQuery(
		['bundles-by-tag', tagId, { countryOfSale, currency }],
		async () => {
			const bundles = await BundleService.getBundlesByTag(tagId, params).then(
				(bundles) =>
					bundles?.map((bundle) =>
						bundleAdapter.fromApi(bundle, {
							currency: currency,
							customerPriceLevel: priceLevel,
						})
					) ?? []
			);

			fetchQuantity(bundles.map((bundle) => bundle.id));

			return bundles;
		}
	);

	return carouselsQuery;
};
