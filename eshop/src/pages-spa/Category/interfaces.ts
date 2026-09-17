import { UseQueryResult } from '@tanstack/react-query';
import React from 'react';
import { VinistoProductDllModelsApiCategoryCategoryReturn } from 'vinisto_api_client/src/api-types/product-api';

export interface ICategoryContextValues {
	categoryData: UseQueryResult<
		VinistoProductDllModelsApiCategoryCategoryReturn,
		Error
	>;
	subCategories: Record<any, any>[];
}

export interface ICategoryContextProviderProps {
	children?: React.ReactNode;
}

export interface IFetchCategoryByUrlProps {
	categoryUrl?: string;
}

export interface IFetchCategorySubcategoriesProps {
	categoryId?: string;
}
