import { IQueryArgument } from 'Services/ApiService/interfaces';
import { apiServiceInstance } from 'Services/ApiService';
import {
	VinistoProductDllModelsApiBundleBundleReturn,
	VinistoProductDllModelsApiBundleBundlesReturn,
	VinistoSearchDllModelsApiFullSearchFullSearchSeparatedReturn,
} from 'vinisto_api_client/src/api-types/product-api/';
import { VinistoWarehouseDllModelsApiWarehouseItemWarehouseItemQuantityReturn } from 'vinisto_api_client/src/api-types/warehouse-api/';
import { B2C_NUMERIC_CODE } from 'Services/IntergationService/constants';

import { CategoryBundleDiscountFilter } from '../Category/interfaces';

import {
	AUTOCOMPLETE_API_ENDPOINT,
	AUTOCOMPLETE_LIMIT,
	BUNDLES_URI,
	LIST_API_ENDPOINT,
	SET_IS_APPROVED_ENDPOINT,
	SET_IS_GIFT_ENDPOINT,
	SET_IS_TEMPORARY_UNAVAILABLE_ENDPOINT,
	WAREHOUSE_API_ENDPOINT,
} from './constants';
import {
	BundleCanSendToWmsParameters,
	GetAutocompleteBundlesParams,
	RemoveOrderLimitationInput,
	SetFlagInput,
	SetIsBundleClearanceSaleInput,
	SetOrderLimitationInput,
} from './interfaces';

import { CountryCode } from '@/shared';

const getBundlesInCategory = async (
	categoryId: string,
	bundleDiscountFilter = CategoryBundleDiscountFilter.ALL
) => {
	const requestParams = {
		isCache: false,
		categoryId,
		limit: 0,
		...(bundleDiscountFilter === CategoryBundleDiscountFilter.DISCOUNTED_ONLY
			? { isDiscounted: true }
			: {}),
		...(bundleDiscountFilter ===
		CategoryBundleDiscountFilter.NON_DISCOUNTED_ONLY
			? { isDiscounted: false }
			: {}),
	};
	const res =
		await apiServiceInstance.post<VinistoProductDllModelsApiBundleBundlesReturn>(
			LIST_API_ENDPOINT,
			{
				...requestParams,
			},
			true
		);

	return res.bundles;
};

const getAutocompleteBundles = (
	value: string,
	params: GetAutocompleteBundlesParams = {}
) => {
	const defaultParams = [
		{
			key: 'searchingNameString',
			value,
		},
		{
			key: 'limit',
			value: AUTOCOMPLETE_LIMIT,
		},
		{
			key: 'isDeleted',
			value: false,
		},
		{
			key: 'isGift',
			value: false,
		},
		{
			key: 'platform',
			value: B2C_NUMERIC_CODE,
		},
		{
			key: 'filterPrices',
			value: false,
		},
		{
			key: 'isSaleOver',
			value: false,
		},
	];

	Object.keys(params).forEach((key) => {
		const existingParam = defaultParams.find((param) => key === param.key);
		if (existingParam) {
			existingParam.value = params[key];
		} else {
			defaultParams.push({
				key,
				value: params[key],
			});
		}
	});

	return apiServiceInstance.getCollection<VinistoSearchDllModelsApiFullSearchFullSearchSeparatedReturn>(
		AUTOCOMPLETE_API_ENDPOINT,
		defaultParams,
		true
	);
};

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

const setIsBundleTemporaryUnavailable = ({
	desiredState,
	bundleId,
	userLoginHash,
}: SetFlagInput) => {
	return apiServiceInstance.put<VinistoProductDllModelsApiBundleBundleReturn>(
		`${BUNDLES_URI}/${bundleId}/${SET_IS_TEMPORARY_UNAVAILABLE_ENDPOINT}`,
		{
			userLoginHash,
			temporaryUnavailable: desiredState,
		}
	);
};

const setIsBundleGift = ({
	desiredState,
	bundleId,
	userLoginHash,
}: SetFlagInput) => {
	return apiServiceInstance.put<VinistoProductDllModelsApiBundleBundleReturn>(
		`${BUNDLES_URI}/${bundleId}/${SET_IS_GIFT_ENDPOINT}`,
		{
			userLoginHash,
			isGift: desiredState,
		}
	);
};

const setIsBundleEnabled = ({
	desiredState,
	bundleId,
	userLoginHash,
}: SetFlagInput) => {
	return apiServiceInstance.put<VinistoProductDllModelsApiBundleBundleReturn>(
		`${BUNDLES_URI}/${bundleId}/${desiredState ? 'Enable' : 'Disable'}Bundle`,
		{
			userLoginHash,
		}
	);
};

const setIsApproved = ({
	desiredState,
	bundleId,
	userLoginHash,
}: SetFlagInput) => {
	return apiServiceInstance.put<VinistoProductDllModelsApiBundleBundleReturn>(
		`${BUNDLES_URI}/${bundleId}/${SET_IS_APPROVED_ENDPOINT}`,
		{
			userLoginHash,
			isApproved: desiredState,
		}
	);
};

const setOrderLimitation = ({
	bundleId,
	limit,
	from,
	to,
	userLoginHash,
}: SetOrderLimitationInput) => {
	return apiServiceInstance.put<VinistoProductDllModelsApiBundleBundleReturn>(
		`product-api/bundles/${bundleId}/set-order-limitation`,
		{
			userLoginHash,
			limit,
			validFrom: Math.ceil(
				Math.max(Number(from) / 1000, Number(new Date()) / 1000)
			),
			validTo: to ? Math.ceil(Number(to) / 1000) : null,
		}
	);
};

const removeOrderLimitation = ({
	bundleId,
	userLoginHash,
}: RemoveOrderLimitationInput) => {
	return apiServiceInstance.put<VinistoProductDllModelsApiBundleBundleReturn>(
		`product-api/bundles/${bundleId}/remove-order-limitation`,
		{
			userLoginHash,
		}
	);
};

const getBundlesWithTag = async (tagId: string, countryOfSale: CountryCode) => {
	const response =
		await apiServiceInstance.post<VinistoProductDllModelsApiBundleBundlesReturn>(
			`${BUNDLES_URI}/get-bundles`,
			{
				tagId: tagId,
				limit: 0,
				offset: 0,
				IsPriceRequired: false,
				countryOfSale,
			}
		);

	if (response.isError) {
		return Promise.reject(response.error);
	}

	return {
		tagId,
		bundles: response.bundles,
	};
};

const setIsBundleClearanceSale = async (
	requestParams: SetIsBundleClearanceSaleInput
) => {
	const { userLoginHash, bundleId, desiredState } = requestParams;
	const response =
		await apiServiceInstance.put<VinistoProductDllModelsApiBundleBundleReturn>(
			`${BUNDLES_URI}/${bundleId}/set-is-clearance-sale`,
			{
				userLoginHash,
				isClearanceSale: desiredState,
			}
		);

	if (response.isError) {
		return Promise.reject(response.error);
	}

	return {
		...requestParams,
		bundle: response.bundle,
	};
};

const setCanSendToWms = async (
	bundleId: string,
	queryParams: BundleCanSendToWmsParameters
) => {
	const response =
		await apiServiceInstance.put<VinistoProductDllModelsApiBundleBundleReturn>(
			`${BUNDLES_URI}/${bundleId}/set-can-send-to-wms`,
			queryParams
		);

	if (response.isError) return Promise.reject(response.error);

	return response.bundle;
};

/**
 * @deprecated move to vinisto_api_client
 */
const BundleService = {
	getBundlesInCategory,
	getAutocompleteBundles,
	getBundleById,
	getWarehouseItemsQuantities,
	getIdenticalBundles,
	setIsBundleTemporaryUnavailable,
	setIsBundleGift,
	setIsBundleEnabled,
	setOrderLimitation,
	removeOrderLimitation,
	getBundlesWithTag,
	setIsBundleClearanceSale,
	setCanSendToWms,
	setIsApproved,
};

export default BundleService;
