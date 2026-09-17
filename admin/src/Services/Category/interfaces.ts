import {
	VinistoCommonDllModelsApiMultiLangValues,
	VinistoHelperDllEnumsCategoryCategoryBundleDiscountFilter,
	VinistoHelperDllEnumsCountryCode,
	VinistoHelperDllEnumsLanguage,
	VinistoImageDllModelsApiImageImage,
	VinistoProductDllModelsApiTagTag,
	VinistoSupplierDllModelsApiSupplierSupplier,
} from 'vinisto_api_client/src/api-types/product-api/';
import {
	SpecificationDetail,
	SpecificationParams,
} from 'Services/Specification/interfaces';

import { ProductSelectionType } from './constants';

export const CategoryBundleDiscountFilter =
	VinistoHelperDllEnumsCategoryCategoryBundleDiscountFilter;

export interface CategoryTranslation {
	name: string;
	url: string;
	description: string;
	metaDescription: string;
	metaTitle?: string;
	keywords: string;
}

export type CategoryTranslationApiRequestData = Omit<
	CategoryTranslation,
	'keywords'
> & {
	userLoginHash: string;
	language: VinistoHelperDllEnumsLanguage;
	keywords: string[];
};

export type CreateCategoryApiRequestData = Omit<
	CategoryTranslation,
	'keywords'
> & {
	userLoginHash: string;
	language: VinistoHelperDllEnumsLanguage;
	type: ProductSelectionType;
	keywords: string[];
	bundleDiscountFilter?: (typeof CategoryBundleDiscountFilter)[keyof typeof CategoryBundleDiscountFilter];
};

export interface CategoryType {
	id: string;
	productSelectionType: ProductSelectionType;
	translations: Record<VinistoHelperDllEnumsLanguage, CategoryTranslation>;
	images: VinistoImageDllModelsApiImageImage[];
	specificationDetails: SpecificationDetail[];
	keywords: VinistoCommonDllModelsApiMultiLangValues[];
	availableOnPlatforms: number[];
	tagsDetail: VinistoProductDllModelsApiTagTag[];
	suppliersDetail: VinistoSupplierDllModelsApiSupplierSupplier[];
	allowedSearchCountries: VinistoHelperDllEnumsCountryCode[];
	bundleDiscountFilter: (typeof CategoryBundleDiscountFilter)[keyof typeof CategoryBundleDiscountFilter];
}

export type UpdateSpecificationParams = {
	categoryId: string;
	userLoginHash: string;
} & SpecificationParams;
