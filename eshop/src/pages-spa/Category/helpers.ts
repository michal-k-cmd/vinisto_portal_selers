import { VinistoProductDllModelsApiCategoryCategoryReturn } from 'vinisto_api_client/src/api-types/product-api';
import api from 'vinisto_api_client/src/api';

import { SKELETONS_NUM_SUBCATEGORIES } from './constants';
import {
	IFetchCategoryByUrlProps,
	IFetchCategorySubcategoriesProps,
} from './interfaces';

export const fetchCategoryByUrl = async (props: IFetchCategoryByUrlProps) => {
	const categoryUrl = props.categoryUrl;

	const categoryData =
		await api.get<VinistoProductDllModelsApiCategoryCategoryReturn>(
			`product-api/categories/${categoryUrl}/GetCategoryByUrl`,
			{ IsCache: true }
		);
	return categoryData;
};

export const fetchCategorySubcategories = async (
	props: IFetchCategorySubcategoriesProps
) => {
	const categoryId = props.categoryId;

	const subcategoriesData = await api.get(
		`product-api/categories/${categoryId}/subcategories`
	);
	return subcategoriesData;
};

export const generateSubCategoriesToShow = (
	subCategories: Record<string, any>[],
	isLoading = false
) => {
	if (isLoading)
		return Array(SKELETONS_NUM_SUBCATEGORIES).map(() => ({
			isLoading: true,
		}));
	return subCategories;
};
