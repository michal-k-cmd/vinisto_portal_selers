import React from 'react';
import { VIEW } from 'Hooks/useCategoryView/interfaces';
import { type UseQueryResult } from '@tanstack/react-query';
import { Specification } from 'vinisto_api_client/src/domain/specification/schema';
import ProductTag from 'vinisto_api_client/src/domain/tag';
import {
	VinistoHelperDllEnumsBundleSortableColumns,
	VinistoProductDllModelsApiCategoryCategory,
	VinistoProductDllModelsApiTagTag,
} from 'vinisto_api_client/src/api-types/product-api';
import type { InitialListingBundlePage } from 'lib/data/listing-bundles';

import { MappedVinistoProductDllModelsApiBundleBundlesReturn } from './context';

export interface CategoryBundlesWithFiltersProviderProps {
	children?: React.ReactNode;
	category: VinistoProductDllModelsApiCategoryCategory | null | undefined;
	initialBundlePage?: InitialListingBundlePage;
}

export interface TagBundlesWithFiltersProviderProps {
	children?: React.ReactNode;
	tag: VinistoProductDllModelsApiTagTag | null | undefined;
	initialBundlePage?: InitialListingBundlePage;
}

export interface IBundlesWithFiltersContextValues {
	activeSpecificationFilters: Record<any, any>[];
	activeTagFilters: ProductTag[];
	bundlesCount: number;
	bundlesToLoadMoreCount: number;
	currentPage: number;
	bundleQueries: UseQueryResult<
		MappedVinistoProductDllModelsApiBundleBundlesReturn,
		unknown
	>[];
	isDataLoading: boolean;
	handleOnRemoveFilter: (specificationName: string) => () => void;
	handleOnViewChange: (view: VIEW) => () => void;
	limit: number;
	page: [number] | [number, number];
	query: Record<any, any>;
	setPageParam: (page: [number] | [number, number] | undefined) => void;
	isInStockParam: string;
	isInStockParamRef?: string;
	isDiscountedParam: string;
	isInStockActive: boolean;
	isDiscountedActive: boolean;
	totalActiveFiltersCount: number;
	setQuery: (query: Record<any, any>) => void;
	specificationsQuery: UseQueryResult<{ specifications: Specification[] }>;
	specificationsWithBundleFilters: {
		specificationFilters: Record<any, any>[];
		tagFilters: AvailableTagFilter[];
		supplierFilters: Record<any, any>[];
		isInStockFilters: Record<any, any>[];
		isDiscountedFilters: Record<any, any>[];
	};
	view: VIEW;
	sorting: BundleSorting;
	setSorting: (sort: BundleSorting) => void;
}

export type BundleSorting = {
	title: string;
	sortingColumn: VinistoHelperDllEnumsBundleSortableColumns;
	isSortingDescending: boolean;
};

export interface AvailableTagFilter {
	id: string;
	name: string;
	color: string;
	occurence: number;
}

export enum ListingType {
	Category = 'Category',
	Tag = 'Tag',
	All = 'All',
}

export interface IBundlesWithFiltersProviderProps {
	children: React.ReactNode;
	category?: VinistoProductDllModelsApiCategoryCategory | null;
	initialBundlePage?: InitialListingBundlePage;
}
