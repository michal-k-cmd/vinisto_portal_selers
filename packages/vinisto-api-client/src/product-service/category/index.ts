import api from '@/api';
import {
	CategoriesAddAllowedSearchCountryPartialUpdateParams,
	CategoriesAddPlatformPartialUpdateParams,
	CategoriesCategoryBradcrumbsListParams,
	CategoriesDeleteParams,
	CategoriesDetailParams,
	CategoriesRemoveAllowedSearchCountryPartialUpdateParams,
	CategoriesRemovePlatformPartialUpdateParams,
	VinistoProductDllModelsApiCategoryCategoryBreadcrumbsReturn,
	VinistoProductDllModelsApiCategoryCategoryReturn,
	VinistoProductDllModelsApiCategoryModifyParentCategoryParameters,
} from '../../api-types/product-api';
import { CATEGORY_BASE_URI } from './constants';

/** Get category for provided ID */
const getCategoryById = async (params: CategoriesDetailParams) => {
	const res = await api.get<VinistoProductDllModelsApiCategoryCategoryReturn>(
		`${CATEGORY_BASE_URI}${params.categoryId}`,
		params
	);

	if (res.category === undefined) {
		throw new Error('No category data in response');
	}

	if (res.isError) {
		throw new Error('Error deleting category parent');
	}

	return res;
};

/** Add / edit parent category to provided category defined by id. If category has parent, then parent is overwritten. */
const modifyCategoryParent = async (
	categoryId: string,
	request: VinistoProductDllModelsApiCategoryModifyParentCategoryParameters
) => {
	const res = await api.put<VinistoProductDllModelsApiCategoryCategoryReturn>(
		`${CATEGORY_BASE_URI}${categoryId}/modify-category-parent`,
		{ categoryId },
		request
	);

	if (res.category === undefined) {
		throw new Error('No category data in response');
	}

	if (res.isError) {
		throw new Error('Error deleting category parent');
	}

	return res;
};

/** Remove parent category from provided category defined by id. */
const removeCategoryParent = async (params: CategoriesDeleteParams) => {
	const { categoryId, UserLoginHash } = params;

	const res =
		await api.delete<VinistoProductDllModelsApiCategoryCategoryReturn>(
			`${CATEGORY_BASE_URI}${categoryId}/remove-category-parent`,
			{ categoryId },
			{ UserLoginHash }
		);

	if (res.category === undefined) {
		throw new Error('No category data in response');
	}

	if (res.isError) {
		throw new Error('Error deleting category parent');
	}

	return res;
};

const getBreadcrumbs = async (
	params: CategoriesCategoryBradcrumbsListParams
) => {
	const response =
		await api.get<VinistoProductDllModelsApiCategoryCategoryBreadcrumbsReturn>(
			`${CATEGORY_BASE_URI}${params.categoryId}/category-bradcrumbs`,
			params
		);

	return response.breadcrumbs;
};

const addPlatform = async (
	params: CategoriesAddPlatformPartialUpdateParams
) => {
	const res = await api.patch<VinistoProductDllModelsApiCategoryCategoryReturn>(
		`${CATEGORY_BASE_URI}${params.categoryId}/add-platform`,
		params
	);

	if (res.category === undefined) {
		throw new Error('No category data in response');
	}

	if (res.isError) {
		throw new Error('Error adding platform to category');
	}

	return res;
};

const removePlatform = async (
	params: CategoriesRemovePlatformPartialUpdateParams
) => {
	const res = await api.patch<VinistoProductDllModelsApiCategoryCategoryReturn>(
		`${CATEGORY_BASE_URI}${params.categoryId}/remove-platform`,
		params
	);

	if (res.category === undefined) {
		throw new Error('No category data in response');
	}

	if (res.isError) {
		throw new Error('Error removing platform from category');
	}

	return res;
};

const addSearchCountry = async (
	params: CategoriesAddAllowedSearchCountryPartialUpdateParams
) => {
	const res = await api.patch<VinistoProductDllModelsApiCategoryCategoryReturn>(
		`${CATEGORY_BASE_URI}${params.categoryId}/add-allowed-search-country`,
		params
	);

	if (res.category === undefined) {
		throw new Error('No category data in response');
	}

	if (res.isError) {
		throw new Error('Error adding search country to category');
	}

	return res;
};
const removeSearchCountry = async (
	params: CategoriesRemoveAllowedSearchCountryPartialUpdateParams
) => {
	const res = await api.patch<VinistoProductDllModelsApiCategoryCategoryReturn>(
		`${CATEGORY_BASE_URI}${params.categoryId}/remove-allowed-search-country`,
		params
	);

	if (res.category === undefined) {
		throw new Error('No category data in response');
	}

	if (res.isError) {
		throw new Error('Error removing search country from category');
	}

	return res;
};

const CategoryService = {
	addPlatform,
	removePlatform,
	addSearchCountry,
	removeSearchCountry,
	getCategoryById,
	modifyCategoryParent,
	removeCategoryParent,
	getBreadcrumbs,
};

export default CategoryService;
