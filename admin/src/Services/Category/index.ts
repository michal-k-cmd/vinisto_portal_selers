import { includes, isPlainObject } from 'Helpers/lodash';
import {
	ProductApi,
	VinistoHelperDllEnumsLanguage,
	VinistoProductDllModelsApiCategoryCategoriesReturn,
	VinistoProductDllModelsApiCategoryCategory,
	VinistoProductDllModelsApiCategoryCategoryReturn,
	VinistoProductDllModelsApiCommonBundlesCountReturn,
} from 'vinisto_api_client/src/api-types/product-api/';
import { SpecificationDetail } from 'Services/Specification/interfaces';
import { apiServiceInstance } from 'Services/ApiService';
import {
	CATEGORY_API_ENDPOINT,
	ProductSelectionType,
	SPECIFICATION_API_ENDPOINT_MAP,
} from 'Services/Category/constants';
import { IQueryArgument } from 'Services/ApiService/interfaces';

import {
	CategoryBundleDiscountFilter,
	CategoryTranslation,
	CategoryTranslationApiRequestData,
	CategoryType,
	CreateCategoryApiRequestData,
	UpdateSpecificationParams,
} from './interfaces';
import { sortTranslations } from './helpers';

const categoryProps = [
	'name',
	'url',
	'description',
	'metaDescription',
	'metaTitle',
] as const;

function transform(category: VinistoProductDllModelsApiCategoryCategory) {
	const result = {} as CategoryType['translations'];
	for (const field of categoryProps) {
		if (!Array.isArray(category[field])) continue;
		category[field]?.forEach((i) => {
			if (i.language === undefined || i.value === undefined || i.value === null)
				return;
			if (!result[i.language]) {
				result[i.language] = {} as CategoryTranslation;
			}
			result[i.language][field] = i.value;
		});
	}
	return result;
}

const mapApiToEntity = (
	category?: VinistoProductDllModelsApiCategoryCategory | null
) => {
	if (
		!category ||
		!isPlainObject(category) ||
		!category.id ||
		!category.type ||
		!includes(Object.values(ProductSelectionType), String(category.type))
	) {
		return;
	}
	return {
		id: category.id,
		productSelectionType: category.type as unknown as ProductSelectionType,
		translations: sortTranslations(transform(category ?? {})),
		images: category.images ?? [],
		specificationDetails:
			(category.specificationDetails as SpecificationDetail[]) ?? [],
		keywords: category.keywords ?? [],
		availableOnPlatforms: category.availableOnPlatforms ?? [],
		tagsDetail: category.tagsDetail ?? [],
		suppliersDetail: category.suppliersDetail ?? [],
		allowedSearchCountries: category.allowedSearchCountries ?? [],
		bundleDiscountFilter:
			category.bundleDiscountFilter ?? CategoryBundleDiscountFilter.ALL,
	};
};

const addCategory = (data: CreateCategoryApiRequestData) =>
	apiServiceInstance.post(CATEGORY_API_ENDPOINT, data, true);

const deleteCategory = (categoryId: string, userLoginHash: string) =>
	apiServiceInstance.delete(CATEGORY_API_ENDPOINT, categoryId, true, [
		{
			key: 'userLoginHash',
			value: userLoginHash,
		},
	]);

const updateTranslation = (
	categoryId: string,
	data: CategoryTranslationApiRequestData
) => apiServiceInstance.put(CATEGORY_API_ENDPOINT, data, true, categoryId);

const setBundleDiscountFilter = (
	categoryId: string,
	bundleDiscountFilter: (typeof CategoryBundleDiscountFilter)[keyof typeof CategoryBundleDiscountFilter],
	userLoginHash: string
) =>
	apiServiceInstance.patch(
		`${CATEGORY_API_ENDPOINT}/${categoryId}/bundle-discount-filter?UserLoginHash=${encodeURIComponent(
			userLoginHash
		)}&BundleDiscountFilter=${encodeURIComponent(bundleDiscountFilter)}`,
		{},
		true
	);

const deleteTranslation = (
	categoryId: string,
	language: VinistoHelperDllEnumsLanguage,
	userLoginHash: string
) =>
	apiServiceInstance.put(
		`${CATEGORY_API_ENDPOINT}/${categoryId}/remove-language`,
		{
			language,
			userLoginHash,
		},
		true
	);

const addBundle = (
	categoryId: string,
	bundleId: string,
	userLoginHash: string
) =>
	apiServiceInstance.post(`product-api/bundles/${bundleId}/categories`, {
		userLoginHash,
		itemId: categoryId,
	});

const removeBundle = (
	categoryId: string,
	bundleId: string,
	userLoginHash: string
) =>
	apiServiceInstance.delete(
		`product-api/bundles/${bundleId}/categories`,
		categoryId,
		true,
		[
			{
				key: 'UserLoginHash',
				value: userLoginHash,
			},
		]
	);

const updateSpecification = ({
	categoryId,
	specification,
	value,
	userLoginHash,
}: UpdateSpecificationParams) =>
	apiServiceInstance.post(
		`${CATEGORY_API_ENDPOINT}/${categoryId}/specifications/${
			SPECIFICATION_API_ENDPOINT_MAP[specification.specificationType]
		}`,
		{
			userLoginHash,
			specificationDefinitionId: specification.id,
			allowedValues: value,
		},
		true
	);

const removeSpecification = (
	categoryId: string,
	specificationId: string,
	userLoginHash: string
) =>
	apiServiceInstance.delete(
		`${CATEGORY_API_ENDPOINT}/${categoryId}/specifications`,
		specificationId,
		true,
		[
			{
				key: 'UserLoginHash',
				value: userLoginHash,
			},
		]
	);

const getBundlesCount = (categoryId: string) =>
	apiServiceInstance
		.get(`${CATEGORY_API_ENDPOINT}/${categoryId}/bundlescount`, true)
		.then(
			(payload) =>
				(payload as VinistoProductDllModelsApiCommonBundlesCountReturn)
					?.bundlesCount ?? 0
		)
		.catch(() => 0);

const getCategory = async (categoryId: string) =>
	apiServiceInstance
		.get<VinistoProductDllModelsApiCategoryCategoryReturn>(
			CATEGORY_API_ENDPOINT,
			true,
			categoryId,
			[
				{
					key: 'IsCache',
					value: 'false',
				},
				{
					key: 'isHiddenTags',
					value: 'true',
				},
			]
		)
		.then((payload) => mapApiToEntity(payload.category));

// TODO: BE limit 0 stopped returing all records, therefore limit 9999
const getAll = async (limit = 9999) => {
	const payload =
		await apiServiceInstance.get<VinistoProductDllModelsApiCategoryCategoriesReturn>(
			CATEGORY_API_ENDPOINT,
			true,
			undefined,
			[
				{
					key: 'IsCache',
					value: 'false',
				},
				{
					key: 'limit',
					value: String(limit),
				},
			]
		);
	const data = payload?.categories ?? [];
	const categories = data
		.map((category) => mapApiToEntity(category))
		.filter((category): category is CategoryType => category !== undefined);
	return categories;
};

const getByIds = async (categoryIds: string[]) => {
	const params: IQueryArgument<
		keyof ProductApi.CategoriesGetCategoriesByIdsList.RequestQuery
	>[] = categoryIds.map((categoryId) => ({
		key: 'CategoryIds',
		value: categoryId,
	}));

	params.push({
		key: 'Limit',
		value: categoryIds.length,
	});

	const { categories } =
		await apiServiceInstance.get<ProductApi.CategoriesGetCategoriesByIdsList.ResponseBody>(
			'product-api/categories/GetCategoriesByIds',
			false,
			undefined,
			params
		);

	return categories;
};

const CategoryService = {
	get: getCategory,
	getAll,
	mapApiToEntity,
	addCategory,
	deleteCategory,
	updateTranslation,
	setBundleDiscountFilter,
	deleteTranslation,
	addBundle,
	removeBundle,
	updateSpecification,
	removeSpecification,
	getBundlesCount,
	getByIds,
};

export default CategoryService;
