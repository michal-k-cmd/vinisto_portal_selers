import {
	BUNDLES_URI,
	AUTOCOMPLETE_LIMIT,
	LIST_API_ENDPOINT,
	VIRTUAL_CATEGORIES_URI,
} from '../constants';

import api from '@/api';
import {
	BundlesAddPlatformPartialUpdateParams,
	BundlesByIdsListParams,
	BundlesGetBundleByUrlListParams,
	BundlesGetBundleGiftsListParams,
	BundlesGetBundlesCreatePayload,
	BundlesGetIdenticalBundlesListParams,
	BundlesGetSupplierSetsListParams,
	BundlesRemovePlatformPartialUpdateParams,
	ProductApi,
	VinistoEmailDllModelBaseSendEmailParameters,
	VinistoGiftsDllModelsApiGiftRuleGiftRulesReturn,
	VinistoHelperDllBaseBoolReturn,
	VinistoHelperDllEnumsCurrency,
	VinistoProductDllModelsApiBundleBundleAssignParameters,
	VinistoProductDllModelsApiBundleBundleCategoriesReturn,
	VinistoProductDllModelsApiBundleBundleCreateParameters,
	VinistoProductDllModelsApiBundleBundleReturn,
	VinistoProductDllModelsApiBundleBundleSaleOverParameters,
	VinistoProductDllModelsApiBundleBundleUnassignParameters,
	VinistoProductDllModelsApiBundleBundlesFilterReturn,
	VinistoProductDllModelsApiBundleBundlesGetParameters,
	VinistoProductDllModelsApiBundleBundlesGetWithoutLimitParameters,
	VinistoProductDllModelsApiBundleBundlesReturn,
	VinistoProductDllModelsApiBundleSetsSupplierBundleReturn,
	VinistoProductDllModelsApiCategoryCategoryReturn,
	VinistoProductDllModelsApiVirtualCategoryVirtualCategoryReturn,
	VinistoSearchDllModelsApiFullSearchFullSearchSeparatedReturn,
	VirtualCategoriesGetVirtualCategoryByUrlListParams,
} from '../../api-types/product-api';
import { bundleAdapter, giftRuleAdapter } from '../../index';
import { DEFAULT_BUNDLE_API_PARAMS } from '@/shared';

const getAutocompleteBundles = (value: string) =>
	api.get<VinistoSearchDllModelsApiFullSearchFullSearchSeparatedReturn>(
		`${BUNDLES_URI}/GetAutocompleteNames`,
		{
			searchingNameString: value,
			limit: AUTOCOMPLETE_LIMIT,
			...DEFAULT_BUNDLE_API_PARAMS,
		}
	);

const getBundleById = async (
	id: string,
	params?: VinistoProductDllModelsApiBundleBundlesGetParameters
) => {
	const res = await api.get<VinistoProductDllModelsApiBundleBundleReturn>(
		`${BUNDLES_URI}/${id}`,
		params
	);

	if (res.bundle === null || res.bundle === undefined)
		throw new Error('No bundle data in response');

	return bundleAdapter.fromApi(res.bundle, {
		currency: params?.currency ?? VinistoHelperDllEnumsCurrency.CZK,
	});
};

const getBundleByUrl = (
	url: string,
	params: Omit<BundlesGetBundleByUrlListParams, 'bundleUrl'>
) => {
	return api
		.get<VinistoProductDllModelsApiBundleBundleReturn>(
			`${BUNDLES_URI}/${url}/GetBundleByUrl`,
			{
				IsCache: true,
				currency: params.currency,
				countryOfSale: params.countryOfSale,
			}
		)
		.then((payload) => {
			if (!payload.bundle) throw new Error('No bundle in response');

			return payload.bundle;
		});
};

const getSupplierSets = async (params: BundlesGetSupplierSetsListParams) => {
	const res =
		await api.get<VinistoProductDllModelsApiBundleSetsSupplierBundleReturn>(
			`${BUNDLES_URI}/get-supplier-sets`,
			params
		);

	if (res.supplierSets === undefined)
		throw new Error('No bundle data in response');

	return res;
};

const getBundlesByTag = async (
	tagId: string,
	params?: BundlesGetBundlesCreatePayload
) => {
	const res = await api.post<VinistoProductDllModelsApiBundleBundlesReturn>(
		LIST_API_ENDPOINT,
		{},
		{
			tagId,
			...params,
		}
	);

	if (res.bundles === undefined) return null;

	return res.bundles;
};

const getBundlesByIds = async (
	bundleIds: string[],
	params?: BundlesByIdsListParams
) => {
	const res = await api.get<VinistoProductDllModelsApiBundleBundlesReturn>(
		`${BUNDLES_URI}/by-ids`,
		{
			bundleIds,
			...params,
		}
	);

	if (res.bundles === null || res.bundles === undefined) return [];

	return res.bundles;
};

const getIdenticalBundles = async (
	bundleId: string,
	params?: Omit<BundlesGetIdenticalBundlesListParams, 'bundleId'>
) => {
	const res = await api.get<
		ProductApi.BundlesGetIdenticalBundlesList.ResponseBody,
		ProductApi.BundlesGetIdenticalBundlesList.RequestQuery
	>(`${BUNDLES_URI}/${bundleId}/get-identical-bundles`, {
		...params,
	});

	if (res.bundles === null || res.bundles === undefined) return [];

	return res.bundles;
};

const getBundleGifts = async (
	bundleId: string,
	params: Omit<BundlesGetBundleGiftsListParams, 'bundleId'>
) => {
	const res = await api.get<VinistoGiftsDllModelsApiGiftRuleGiftRulesReturn>(
		`${BUNDLES_URI}/${bundleId}/get-bundle-gifts`,
		params
	);

	if (res.giftRules === null || res.giftRules === undefined) return [];

	return res.giftRules.map((giftRule) => giftRuleAdapter.fromApi(giftRule));
};

const createBundleSet = async (
	params: VinistoProductDllModelsApiBundleBundleCreateParameters
) =>
	api.post<VinistoProductDllModelsApiBundleBundleReturn>(
		`${BUNDLES_URI}`,
		undefined,
		params
	);

const addBundleToSet = async (
	bundleSetId: string,
	params: VinistoProductDllModelsApiBundleBundleAssignParameters
) =>
	api.post<VinistoProductDllModelsApiBundleBundleReturn>(
		`${BUNDLES_URI}/${bundleSetId}/bundles`,
		undefined,
		params
	);

const removeBundleFromSet = async (
	bundleSetId: string,
	params: VinistoProductDllModelsApiBundleBundleUnassignParameters
) => {
	const { itemId, amount, price, userLoginHash } = params;
	return api.delete(`${BUNDLES_URI}/${bundleSetId}/bundles`, undefined, {
		itemId,
		amount,
		price,
		userLoginHash,
	});
};

const setIsSellOver = async (
	bundleId: string,
	req: VinistoProductDllModelsApiBundleBundleSaleOverParameters
) => {
	const res = await api.put(
		`${BUNDLES_URI}/${bundleId}/set-sell-over`,
		undefined,
		req
	);

	return res;
};

const updateLastViewedRecord = async (bundleId: string) => {
	const res = await api.put(`product-api/bundles/${bundleId}/SetLastViewBundle
`);
	return res;
};

const getPackagingBundles = async (
	params?: VinistoProductDllModelsApiBundleBundlesGetParameters
) => {
	return api.get<VinistoProductDllModelsApiBundleBundlesReturn>(
		`${BUNDLES_URI}/get-shipping-packaging-bundles`,
		params
	);
};

const getCategoriesById = (
	categoryId: string,
	params?: Record<string, any>
) => {
	return api
		.get<VinistoProductDllModelsApiCategoryCategoryReturn>(
			`${BUNDLES_URI}/categories/${categoryId}`,
			params
		)
		.then((payload) => {
			return payload.category;
		});
};

const getBundleCategories = (bundleId: string) => {
	return api
		.get<VinistoProductDllModelsApiBundleBundleCategoriesReturn>(
			`${BUNDLES_URI}/${bundleId}/categories`,
			{
				IsCache: true,
			}
		)
		.then((payload) => {
			return payload?.categories ?? [];
		});
};

const getAvailableFilters = async (
	req: VinistoProductDllModelsApiBundleBundlesGetWithoutLimitParameters
) => {
	const response =
		await api.post<VinistoProductDllModelsApiBundleBundlesFilterReturn>(
			`${BUNDLES_URI}/get-available-filters`,
			undefined,
			req
		);
	return response;
};

const addPlatform = async (params: BundlesAddPlatformPartialUpdateParams) => {
	const res = await api.patch<VinistoProductDllModelsApiBundleBundleReturn>(
		`${BUNDLES_URI}/${params.bundleId}/add-platform`,
		params
	);

	if (res.bundle === undefined) {
		throw new Error('No bundle data in response');
	}

	if (res.isError) {
		throw new Error('Error adding platform to bundle');
	}

	return res;
};

const removePlatform = async (
	params: BundlesRemovePlatformPartialUpdateParams
) => {
	const res = await api.patch<VinistoProductDllModelsApiBundleBundleReturn>(
		`${BUNDLES_URI}/${params.bundleId}/remove-platform`,
		params
	);

	if (res.bundle === undefined) {
		throw new Error('No bundle data in response');
	}

	if (res.isError) {
		throw new Error('Error removing platform from bundle');
	}

	return res;
};

const sendEmailToSupplier = async (
	bundleId: string,
	params: VinistoEmailDllModelBaseSendEmailParameters
) => {
	const res = await api.post<VinistoHelperDllBaseBoolReturn>(
		`${BUNDLES_URI}/${bundleId}/send-email-to-supplier`,
		undefined,
		params
	);

	return res.isError ? Promise.reject(res.error) : res.result;
};

const getVirtualCategoryByUrl = async (
	params: VirtualCategoriesGetVirtualCategoryByUrlListParams
) => {
	const virtualCategoryUrl = params.virtualCategoryUrl;

	return api
		.get<VinistoProductDllModelsApiVirtualCategoryVirtualCategoryReturn>(
			`${VIRTUAL_CATEGORIES_URI}/${virtualCategoryUrl}/get-virtual-category-by-url`,
			params
		)
		.then((payload) => {
			return payload;
		});
};

const BundleService = {
	getAutocompleteBundles,
	getBundleById,
	getBundleByUrl,
	getSupplierSets,
	getBundlesByTag,
	getBundlesByIds,
	getIdenticalBundles,
	getBundleGifts,
	createBundleSet,
	addBundleToSet,
	removeBundleFromSet,
	setIsSellOver,
	updateLastViewedRecord,
	getPackagingBundles,
	getCategoriesById,
	getBundleCategories,
	getAvailableFilters,
	addPlatform,
	removePlatform,
	sendEmailToSupplier,
	getVirtualCategoryByUrl,
};

export default BundleService;
