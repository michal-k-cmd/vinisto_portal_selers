import api from '@/api';
import {
	CategoriesGetAutocompleteNamesListParams,
	CategoriesGetCategoriesByFullSearchListParams,
	CategoriesListParams,
	VinistoProductDllModelsApiCategoryCategoriesReturn,
	VinistoProductDllModelsApiCategoryCategoryCreateParameters,
	VinistoProductDllModelsApiCategoryCategoryReturn,
} from '../../api-types/product-api';
import { CATEGORIES_BASE_URI } from './constants';

/** Get Categories according to provided parameters */
const getCategories = async (
	params: CategoriesListParams,
) => {
	const res = await api.get<VinistoProductDllModelsApiCategoryCategoriesReturn>(
		`${CATEGORIES_BASE_URI}`,
		params,
	);

	if (res.categories === undefined) {
		throw new Error('No categories data in response');
	}

	if (res.isError) {
		throw new Error('Error getting categories');
	}

	return res;
};

/** Create new category with provided parameters */
const createCategory = async (
	request: VinistoProductDllModelsApiCategoryCategoryCreateParameters
) => {
	const res = await api.post<VinistoProductDllModelsApiCategoryCategoryReturn>(
		`${CATEGORIES_BASE_URI}`,
		undefined,
		request
	);

	if (res.category === undefined) {
		throw new Error('No category data in response');
	}

	if (res.isError) {
		throw new Error('Error creating category');
	}

	return res;
};

/** Find and get categories, categories will be searched according to the entered letters (min. 3) It will return categories only in provided language. */
const getAutocompleteNames = async (
	params: CategoriesGetAutocompleteNamesListParams,
) => {
	const res = await api.get<VinistoProductDllModelsApiCategoryCategoriesReturn>(
		`${CATEGORIES_BASE_URI}/GetAutocompleteNames`,
		params,
	);

	if (res.categories === undefined) {
		throw new Error('No categories data in response');
	}

	if (res.isError) {
		throw new Error('Error getting categories');
	}

	return res;
};

/** Find and get categories, categories will be searched according to the entered letters (min. 3) It will return categories only in provided language. */
const getCategoriesByFullSearch = async (
	params: CategoriesGetCategoriesByFullSearchListParams,
) => {
	const res = await api.get<VinistoProductDllModelsApiCategoryCategoriesReturn>(
		`${CATEGORIES_BASE_URI}/GetCategoriesByFullSearch`,
		params,
	);

	if (res.categories === undefined) {
		throw new Error('No categories data in response');
	}

	if (res.isError) {
		throw new Error('Error getting categories');
	}

	return res;
};

const CategoriesService = {
	getCategories,
	createCategory,
	getAutocompleteNames,
	getCategoriesByFullSearch,
};

export default CategoriesService;
