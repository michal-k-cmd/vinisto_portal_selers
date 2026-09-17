import { get, isPlainObject, map } from 'lodash-es';
import { LangValuePair } from 'Hooks/useLocalizedValue/interfaces';
import { IQueryArgument } from 'Services/ApiService/interfaces';
import { apiServiceInstance } from 'Services/ApiService';
import {
	VinistoProductDllModelsApiBundleBundle,
	VinistoProductDllModelsApiBundleBundleReturn,
	VinistoProductDllModelsApiBundleBundlesFilterReturn,
	VinistoProductDllModelsApiBundleBundlesGetWithoutLimitParameters,
	VinistoProductDllModelsApiBundleBundlesReturn,
	VinistoProductDllModelsApiCategoryCategoriesReturn,
	VinistoSearchDllModelsApiFullSearchFullSearchSeparatedReturn,
} from 'vinisto_api_client/src/api-types/product-api';
import { VinistoWarehouseDllModelsApiWarehouseItemWarehouseItemQuantityReturn } from 'vinisto_api_client/src/api-types/warehouse-api';

import { BundleType } from './interfaces';
import {
	AUTOCOMPLETE_API_ENDPOINT,
	AUTOCOMPLETE_LIMIT,
	BUNDLES_URI,
	LIST_API_ENDPOINT,
	WAREHOUSE_API_ENDPOINT,
} from './constants';

const mapApiToEntity = (
	bundle?: VinistoProductDllModelsApiBundleBundle
): BundleType | undefined => {
	if (
		!bundle ||
		!isPlainObject(bundle) ||
		!bundle.id ||
		!bundle.name ||
		!bundle.description
	) {
		return;
	}
	return {
		id: bundle.id,
		name: bundle.name as LangValuePair[],
		description: bundle.description as LangValuePair[],
		images: bundle.images ?? [],
		prices: bundle.prices ?? [],
	};
};

const getBundlesInCategory = async (categoryId: string) => {
	const requestParams = {
		isCache: false,
		categoryId,
	};
	return apiServiceInstance
		.post(
			LIST_API_ENDPOINT,
			{
				...requestParams,
				limit: 1,
			},
			true
		)
		.then((payload) => {
			const totalCount = get(payload, 'count');
			if (!totalCount) return [];
			return apiServiceInstance
				.post(
					LIST_API_ENDPOINT,
					{
						...requestParams,
						limit: totalCount,
					},
					true
				)
				.then((payload) =>
					map(
						get(payload, 'bundles', []),
						(bundle: VinistoProductDllModelsApiBundleBundle) =>
							mapApiToEntity(bundle)
					).filter((item): item is BundleType => item !== undefined)
				);
		});
};

const getAutocompleteBundles = (value: string) =>
	apiServiceInstance.getCollection<VinistoSearchDllModelsApiFullSearchFullSearchSeparatedReturn>(
		AUTOCOMPLETE_API_ENDPOINT,
		[
			{
				key: 'searchingNameString',
				value,
			},
			{
				key: 'limit',
				value: AUTOCOMPLETE_LIMIT,
			},
		],
		true
	);

const getWarehouseItemsQuantities = (bundleIds: string[]) => {
	const queryParams: IQueryArgument[] = bundleIds.map((id) => ({
		key: 'bundleIds',
		value: id,
	}));

	return apiServiceInstance.get<VinistoWarehouseDllModelsApiWarehouseItemWarehouseItemQuantityReturn>(
		WAREHOUSE_API_ENDPOINT,
		true,
		undefined,
		queryParams
	);
};

const getBundleById = (id: string) =>
	apiServiceInstance
		.get<VinistoProductDllModelsApiBundleBundleReturn>(`${BUNDLES_URI}/${id}`)
		.then((payload) => payload.bundle);

const getIdenticalBundles = async (bundleId: string) =>
	apiServiceInstance
		.get<VinistoProductDllModelsApiBundleBundlesReturn>(
			`${BUNDLES_URI}/${bundleId}/get-identical-bundles`,
			true
		)
		.then((response) => response.bundles);

const getAvailableFilters = async (
	req: VinistoProductDllModelsApiBundleBundlesGetWithoutLimitParameters
) => {
	const response =
		await apiServiceInstance.post<VinistoProductDllModelsApiBundleBundlesFilterReturn>(
			`${BUNDLES_URI}/get-available-filters`,
			req,
			true
		);
	return response;
};
const getBundlesCategories = async (
	req: VinistoProductDllModelsApiBundleBundlesGetWithoutLimitParameters
) => {
	const response =
		await apiServiceInstance.post<VinistoProductDllModelsApiCategoryCategoriesReturn>(
			`${BUNDLES_URI}/get-bundles-categories`,
			req,
			true
		);
	return response;
};

const BundleService = {
	getBundlesInCategory,
	getAutocompleteBundles,
	getBundleById,
	getWarehouseItemsQuantities,
	getIdenticalBundles,
	getAvailableFilters,
	getBundlesCategories,
};

export default BundleService;
