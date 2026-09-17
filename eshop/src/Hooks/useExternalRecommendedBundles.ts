'use client';
import { useQuery } from '@tanstack/react-query';
import { useContext } from 'react';
import { WarehouseContext } from 'Services/WarehouseService';
import { LocalizationContext } from 'Services/LocalizationService';
import { bundleAdapter } from 'vinisto_api_client/src/index';
import { AuthenticationContext } from 'Services/AuthenticationService/context';
import { BasketContext } from 'Services/BasketService';
import Config from 'Config';

import { VinistoProductDllModelsApiBundleBundle } from '@/api-types/product-api';
import { Bundle } from '@/domain/bundle';
import { B2B_NUMERIC_CODE, B2C_NUMERIC_CODE } from '@/shared';

interface Recommender {
	type: RecommenderName;
	isB2b?: boolean;
}

export enum RecommenderName {
	'Basket' = 'basket',
	'Basket_popup' = 'basket_popup',
	'Autocomplete_popup' = 'autocomplete_popup',
}

const LUIGISBOX_API =
	'https://live.luigisbox.tech/v1/recommend?tracker_id=676762-888347';

export const useExternalRecommendedBundles = ({ type, isB2b }: Recommender) => {
	const warehouseContext = useContext(WarehouseContext);
	const localizationContext = useContext(LocalizationContext);
	const { vinistoUser } = useContext(AuthenticationContext);
	const { basketBundles } = useContext(BasketContext);
	const {
		activeCurrency: { currency },
	} = localizationContext;
	const { priceLevel } = useContext(AuthenticationContext).vinistoUser;

	const url = new URL(`${Config.apiUrl}product-api/bundles/by-ids`);

	const basketBundlesIds = basketBundles?.map((bundle) => bundle.itemId);

	const { data, isLoading } = useQuery(
		[
			'externalRecommendedCarousel',
			{ basketBundlesIds, currency, isB2b, priceLevel },
		],
		async (): Promise<{ bundles: Bundle[]; meta: Record<string, unknown> }> => {
			// get Data from luigis box
			const payload = [
				{
					blacklisted_item_ids: [],
					item_ids: basketBundles?.map((bb) => {
						return bb.bundle?.id ?? '';
					}),
					recommendation_type: type ?? RecommenderName.Basket,
					recommender_client_identifier: type ?? RecommenderName.Basket,
					size: 10,
					user_id: vinistoUser.id,
					recommendation_context: {},
					hit_fields: ['url', 'title'],
				},
			];
			const request = fetch(LUIGISBOX_API, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(payload),
			});
			const response = await request.then((response) => {
				if (!response.ok) return Promise.reject(response.status);
				return response.json();
			});

			if (response.length <= 0) return { bundles: [], meta: {} };

			// load bundle details
			const { hits: recommended, ...rest } = response[0] ?? {};
			const bundles = recommended
				.filter((hit: { url: string; type: string }) => hit.type === 'item')
				.map((hit: { url: string; type: string }) => {
					url.searchParams.append('bundleIds', hit.url);
					return hit.url;
				});

			// load stock quantities;
			warehouseContext.fetchQuantity(bundles);

			url.searchParams.append('currency', currency);

			const requestBundles = fetch(url.toString(), {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
					'X-Api-Key':
						(isB2b
							? process.env.NEXT_PUBLIC_INTEGRATIONS_API_KEY_B2B
							: process.env.NEXT_PUBLIC_INTEGRATIONS_API_KEY) ?? '',
				},
			});

			const responseBundles = await requestBundles.then((response) => {
				if (!response.ok) return Promise.reject(response.status);
				return response.json();
			});

			return {
				bundles:
					responseBundles?.bundles?.map(
						(bundle: VinistoProductDllModelsApiBundleBundle) =>
							bundleAdapter.fromApi(bundle, {
								currency,
								customerPriceLevel: priceLevel,
								platformId: isB2b ? B2B_NUMERIC_CODE : B2C_NUMERIC_CODE,
							})
					) ?? [],
				meta: rest,
			};
		},
		{ keepPreviousData: true }
	);

	return { data, isLoading };
};
