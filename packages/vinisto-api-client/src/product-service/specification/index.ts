import api, { BaseResponse } from '@/api';
import SpecificationAdapter from '@/domain/specification/adapter';
import { SpecificationType } from '@/domain/specification/schema';
import {
	CategoriesSpecificationsListParams,
	SpecificationsGetSpecificationAllowedValuesListParams,
	SpecificationsListParams,
	TagsSpecificationsListParams,
	VinistoProductDllModelsApiSpecificationComboSpecificationAllowedValuesReturn,
	VinistoProductDllModelsApiSpecificationSpecificationValuesReturn,
} from '../../api-types/product-api';

const SpecificationAdapterInstance = new SpecificationAdapter();

export type SpecificationsResponse = BaseResponse & {
	specifications: SpecificationType[];
};

export const getAllSpecifications = async (
	params: SpecificationsListParams
) => {
	const response = await api.get<SpecificationsResponse>(
		`product-api/specifications`,
		params
	);

	return {
		...response,
		specifications: response.specifications.map((specification) =>
			SpecificationAdapterInstance.fromApi(specification)
		),
	};
};

const getCategorySpecifications = async (
	categoryId: string,
	params?: Omit<CategoriesSpecificationsListParams, 'categoryId'>
) => {
	const response = await api.get<SpecificationsResponse>(
		`product-api/categories/${categoryId}/specifications`,
		params
	);

	return {
		...response,
		specifications: response.specifications.map((specification) =>
			SpecificationAdapterInstance.fromApi(specification)
		),
	};
};

const getTagSpecifications = async (
	tagId: string,
	params?: Omit<TagsSpecificationsListParams, 'tagId'>
) => {
	const response = await api.get<SpecificationsResponse>(
		`product-api/tags/${tagId}/specifications`,
		params
	);
	return {
		...response,
		specifications: response.specifications.map((specification) =>
			SpecificationAdapterInstance.fromApi(specification)
		),
	};
};

const getSpecificationValueForBundle = async (
	bundleId: string,
	specificationId: string
) => {
	const response = await api
		.get<VinistoProductDllModelsApiSpecificationSpecificationValuesReturn>(
			`product-api/bundles/${bundleId}/get-specification-values`,
			{ specificationId }
		)
		.catch(() => {
			return {
				specificationValues: [],
			};
		});

	return response.specificationValues;
};

const getSpecificationAllowedValues = async (
	query: SpecificationsGetSpecificationAllowedValuesListParams
) => {
	const response =
		await api.get<VinistoProductDllModelsApiSpecificationComboSpecificationAllowedValuesReturn>(
			`product-api/specifications/${query.specificationId}/GetSpecificationAllowedValues`,
			query
		);

	return response;
};

const SpecificationService = {
	getAllSpecifications,
	getCategorySpecifications,
	getTagSpecifications,
	getSpecificationValueForBundle,
	getSpecificationAllowedValues,
};

export default SpecificationService;
