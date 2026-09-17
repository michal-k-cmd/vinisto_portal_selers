import { get } from 'lodash-es';
import { LangValuePair } from 'Hooks/useLocalizedValue/interfaces';
import {
	BundlesDeleteDiscountPriceDeleteParams,
	VinistoProductDllModelsApiBundleBundle,
	VinistoProductDllModelsApiBundleBundlesGetParameters,
	VinistoProductDllModelsApiBundleBundlesReturn,
	VinistoProductDllModelsApiCategoryCategoriesReturn,
	VinistoProductDllModelsApiCategoryCategory,
} from 'vinisto_api_client/src/api-types/product-api';
import { apiServiceInstance } from 'Services/ApiService';

import { Bundle, BundleCategory } from './interfaces';
import {
	BUNDLE_ID_PLACEHOLDER,
	PRODUCT_API_BUNDLES,
	PRODUCT_API_DELETE_DISCOUNT_PRICE,
	PRODUCT_API_GET_PRICES,
} from './constants';

const mapLangValuePairs = (values: any): LangValuePair[] => {
	if (!Array.isArray(values)) return [];
	return values
		.map((pair) => ({
			language: pair.language,
			value: pair.value,
		}))
		.filter((pair) => pair.language !== '');
};

const mapCategories = (
	bundleCategoryIds: VinistoProductDllModelsApiBundleBundle['categories'],
	categories: VinistoProductDllModelsApiCategoryCategory[]
): BundleCategory[] => {
	if (!Array.isArray(bundleCategoryIds) || !Array.isArray(categories))
		return [];
	return bundleCategoryIds
		.map((categoryId): BundleCategory | null => {
			const categoryDetails = categories.find(
				(category) => category.id === categoryId
			);
			if (!categoryDetails?.id) return null;
			return {
				id: categoryDetails.id,
				name: mapLangValuePairs(categoryDetails.name),
				description: mapLangValuePairs(categoryDetails.description),
				url: mapLangValuePairs(categoryDetails.url),
				images: categoryDetails.images ?? [],
			};
		})
		.filter((category): category is BundleCategory => category !== null);
};

const BundleService = {
	getDetail: async (bundleId: string) => {
		return apiServiceInstance
			.get(PRODUCT_API_BUNDLES, true, bundleId)
			.then((response) => get(response, 'bundle', {}));
	},
	getPrices: async (bundleId: string, userLoginHash: string) => {
		const url = PRODUCT_API_GET_PRICES.replace(BUNDLE_ID_PLACEHOLDER, bundleId);
		return apiServiceInstance
			.get(url, true, undefined, [
				{ key: 'UserLoginHash', value: userLoginHash },
			])
			.then((response) => get(response, 'prices', {}));
	},
	getDiscounts: async (bundleId: string, userLoginHash: string) => {
		const url = PRODUCT_API_GET_PRICES.replace(BUNDLE_ID_PLACEHOLDER, bundleId);
		return apiServiceInstance
			.get(url, true, undefined, [
				{ key: 'UserLoginHash', value: userLoginHash },
			])
			.then((response) => get(response, 'discountPrices', []));
	},
	deleteDiscountPrice: async (
		bundleId: string,
		data: Omit<BundlesDeleteDiscountPriceDeleteParams, 'bundleId'>
	) => {
		const requestData = [
			{ key: 'UserLoginHash', value: data.UserLoginHash },
			{ key: 'currency', value: data.Currency },
			{ key: 'discountId', value: data.DiscountId },
			{ key: 'PriceLevel', value: data.PriceLevel },
		];
		const url = PRODUCT_API_DELETE_DISCOUNT_PRICE.replace(
			BUNDLE_ID_PLACEHOLDER,
			bundleId
		);
		return (
			apiServiceInstance
				// @ts-expect-error
				.delete(url, undefined, true, requestData)
				.then((response) => get(response, 'bundle', {}))
		);
	},
	getBundles: async (
		req: VinistoProductDllModelsApiBundleBundlesGetParameters
	) => {
		const response =
			await apiServiceInstance.post<VinistoProductDllModelsApiBundleBundlesReturn>(
				`${PRODUCT_API_BUNDLES}/get-bundles`,
				req,
				true
			);
		return response;
	},
	getBundlesCategories: async () => {
		const response =
			await apiServiceInstance.get<VinistoProductDllModelsApiCategoryCategoriesReturn>(
				'product-api/categories',
				true,
				undefined
			);
		return response;
	},

	mapApiToModel:
		(categories: VinistoProductDllModelsApiCategoryCategory[]) =>
		(data: VinistoProductDllModelsApiBundleBundle): Bundle => ({
			id: data.id ?? '',
			name: mapLangValuePairs(data.name),
			categories: mapCategories(data.categories, categories).slice(0, 2),
			description: mapLangValuePairs(data.description),
			images: data.images ?? [],
			prices: data.prices ?? [],
			priceDiscounts: data.priceDiscounts ?? [],
			specificationDetails: data.specificationDetails ?? [],
			isGift: data.isGift ?? false,
			temporaryUnavailable: data.temporaryUnavailable ?? false,
			isClearanceSale: data.isClearanceSale ?? false,
			isSaleOver: data.isSaleOver ?? false,
			isSet: data.isSet ?? false,
			warehouseId: data.warehouseId ?? [],
		}),
};

export default BundleService;
