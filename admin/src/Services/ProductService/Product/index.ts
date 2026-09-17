import { apiServiceInstance } from 'Services/ApiService';
import {
	ProductsDeleteParams,
	ProductsDisableProductUpdatePayload,
	ProductsPricesDeleteParams,
	VinistoHelperDllBaseItemsAssignParameters,
	VinistoProductDllModelsApiProductProductReturn,
	VinistoProductDllModelsApiProductProductsAvailabilityParameters,
} from 'vinisto_api_client/src/api-types/product-api/';
import { IQueryArgument } from 'Services/ApiService/interfaces';

import { PRODUCT_API_BASE_URI } from '../constants';

import { productAdapter } from '@/index';

const getProductById = async (id: string) => {
	const res =
		await apiServiceInstance.get<VinistoProductDllModelsApiProductProductReturn>(
			`${PRODUCT_API_BASE_URI}/products/${id}`
		);

	if (res.product === null || res.product === undefined)
		throw new Error('No product data in response');

	return productAdapter.fromApi(res.product);
};

const addCategoryToProducts = async (
	req: VinistoHelperDllBaseItemsAssignParameters
) =>
	await apiServiceInstance.post(
		`${PRODUCT_API_BASE_URI}/products/categories`,
		req
	);

const enableProducts = async (
	req: VinistoProductDllModelsApiProductProductsAvailabilityParameters
) =>
	await apiServiceInstance.put(
		`${PRODUCT_API_BASE_URI}/products/EnableProducts`,
		req
	);

const enableProduct = async (req: {
	payload: ProductsDisableProductUpdatePayload;
	productId: string;
}) => {
	await apiServiceInstance.put<VinistoProductDllModelsApiProductProductReturn>(
		`${PRODUCT_API_BASE_URI}/products/${req.productId}/EnableProduct`,
		req.payload
	);
};

const disableProducts = async (
	req: VinistoProductDllModelsApiProductProductsAvailabilityParameters
) =>
	await apiServiceInstance.put(
		`${PRODUCT_API_BASE_URI}/products/DisableProducts`,
		req
	);

const disableProduct = async (req: {
	payload: ProductsDisableProductUpdatePayload;
	productId: string;
}) => {
	return apiServiceInstance.put<VinistoProductDllModelsApiProductProductReturn>(
		`${PRODUCT_API_BASE_URI}/products/${req.productId}/DisableProduct`,
		req.payload
	);
};

const addProductsTag = async (req: VinistoHelperDllBaseItemsAssignParameters) =>
	await apiServiceInstance.put(
		`${PRODUCT_API_BASE_URI}/products/AddProductsTag`,
		req,
		true
	);

const deleteProductPrices = async (req: ProductsPricesDeleteParams) => {
	const requestData: IQueryArgument[] = [
		{ key: 'UserLoginHash', value: req.UserLoginHash ?? '' },
		{ key: 'Currency', value: req.Currency },
	];

	return apiServiceInstance.delete<VinistoProductDllModelsApiProductProductReturn>(
		`${PRODUCT_API_BASE_URI}/products/${req.productId}/prices`,
		undefined,
		true,
		requestData
	);
};

export const deleteProduct = async (req: ProductsDeleteParams) => {
	const requestData: IQueryArgument[] = [
		{ key: 'UserLoginHash', value: req.UserLoginHash ?? '' },
		{ key: 'productId', value: req.productId ?? '' },
	];

	return apiServiceInstance.delete<VinistoProductDllModelsApiProductProductReturn>(
		`${PRODUCT_API_BASE_URI}/products/${req.productId ?? ''}`,
		undefined,
		true,
		requestData
	);
};

const ProductService = {
	getProductById,
	addCategoryToProducts,
	enableProducts,
	enableProduct,
	disableProducts,
	disableProduct,
	addProductsTag,
	deleteProductPrices,
	deleteProduct,
};

export default ProductService;
