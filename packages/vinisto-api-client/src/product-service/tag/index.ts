import api from '@/api';
import {
	TagsListParams,
	VinistoProductDllModelsApiTagTagReturn,
	VinistoProductDllModelsApiTagTagsReturn,
} from '../../api-types/product-api';

import { CountryCode } from '../../shared';

import { tagAdapter } from "../../index"

const getAll = async (params: TagsListParams) => {
	const response = await api.get<VinistoProductDllModelsApiTagTagsReturn>(
		`product-api/tags`,
		params
	);

	return response.tags?.map((tag) => tagAdapter.fromApi(tag)) ?? [];
};

type AddSpecificationToTagParams = {
	tagId: string;
	countryOfSale: CountryCode;
};

type AddSpecificationToTagRequest = {
	allowedValues: boolean[] | string[] | number[];
	specificationDefinitionId: string;
	userLoginHash: string;
};

type AddNumberSpecificationToTagRequest = {
	allowedNumberValues: number[] | string[]; // BE accepts strings too
	specificationDefinitionId: string;
	userLoginHash: string;
};

type DeleteSpecificationFromTagParams = {
	tagId: string;
	countryOfSale: CountryCode;
	specificationId: string;
	UserLoginHash: string;
};

const addCheckboxSpecificationToTag = async (
	params: AddSpecificationToTagParams,
	req: AddSpecificationToTagRequest
) => {
	const response = await api.post<VinistoProductDllModelsApiTagTagReturn>(
		`product-api/tags/${params.tagId}/${params.countryOfSale}/specifications/add-checkbox-specification`,
		undefined,
		req
	);

	return response;
};

const addMultiComboboxSpecificationToTag = async (
	params: AddSpecificationToTagParams,
	req: AddSpecificationToTagRequest
) => {
	const response = await api.post<VinistoProductDllModelsApiTagTagReturn>(
		`product-api/tags/${params.tagId}/${params.countryOfSale}/specifications/add-multi-combobox-specification`,
		undefined,
		req
	);

	return response;
};

const addComboboxSpecificationToTag = async (
	params: AddSpecificationToTagParams,
	req: AddSpecificationToTagRequest
) => {
	const response = await api.post<VinistoProductDllModelsApiTagTagReturn>(
		`product-api/tags/${params.tagId}/${params.countryOfSale}/specifications/add-combobox-specification`,
		undefined,
		req
	);

	return response;
};

const addNumberSpecificationToTag = async (
	params: AddSpecificationToTagParams,
	req: AddNumberSpecificationToTagRequest
) => {
	const response = await api.post<VinistoProductDllModelsApiTagTagReturn>(
		`product-api/tags/${params.tagId}/${params.countryOfSale}/specifications/add-number-specification`,
		undefined,
		req
	);

	return response;
};

const addNumberImperialSpecificationToTag = async (
	params: AddSpecificationToTagParams,
	req: AddSpecificationToTagRequest
) => {
	const response = await api.post<VinistoProductDllModelsApiTagTagReturn>(
		`product-api/tags/${params.tagId}/${params.countryOfSale}/specifications/add-number-imperial-specification`,
		undefined,
		req
	);

	return response;
};

const addDecimalSpecificationToTag = async (
	params: AddSpecificationToTagParams,
	req: AddSpecificationToTagRequest
) => {
	const response = await api.post<VinistoProductDllModelsApiTagTagReturn>(
		`product-api/tags/${params.tagId}/${params.countryOfSale}/specifications/add-decimal-number-specification`,
		undefined,
		req
	);

	return response;
};

const addDecimalNumberImperialSpecificationToTag = async (
	params: AddSpecificationToTagParams,
	req: AddSpecificationToTagRequest
) => {
	const response = await api.post<VinistoProductDllModelsApiTagTagReturn>(
		`product-api/tags/${params.tagId}/${params.countryOfSale}/specifications/add-decimal-number-imperial-specification`,
		undefined,
		req
	);

	return response;
};

const addTextSpecificationToTag = async (
	params: AddSpecificationToTagParams,
	req: AddSpecificationToTagRequest
) => {
	const response = await api.post<VinistoProductDllModelsApiTagTagReturn>(
		`product-api/tags/${params.tagId}/${params.countryOfSale}/specifications/add-text-specification`,
		undefined,
		req
	);

	return response;
};

const deleteSpecificationFromTag = async (params: DeleteSpecificationFromTagParams) => {
	const response = await api.delete<VinistoProductDllModelsApiTagTagReturn>(
		`product-api/tags/${params.tagId}/${params.countryOfSale}/specifications/${params.specificationId}`,
		{ UserLoginHash: params.UserLoginHash }
	);

	return response;
};

/**
 * Get bundles count for tag with matching specifications
 */
const getBundlesCountForTag = async (
	tagId: string,
	countryOfSale: CountryCode
) => {
	const response = await api.get<any>(
		`product-api/tags/${tagId}/get-bundles-count-for-tag`,
		{ countryOfSale }
	);

	return response;
}


const TagService = {
	getAll,
	addCheckboxSpecificationToTag,
	addMultiComboboxSpecificationToTag,
	addComboboxSpecificationToTag,
	addNumberSpecificationToTag,
	addNumberImperialSpecificationToTag,
	addDecimalSpecificationToTag,
	addDecimalNumberImperialSpecificationToTag,
	addTextSpecificationToTag,
	deleteSpecificationFromTag,
	getBundlesCountForTag,
};

export default TagService;
export type {
	AddSpecificationToTagParams,
	AddSpecificationToTagRequest,
	DeleteSpecificationFromTagParams,
}
