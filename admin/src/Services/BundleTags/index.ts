import { apiServiceInstance } from 'Services/ApiService';
import {
	TagsDeleteParams,
	VinistoProductDllModelsApiTagTag,
	VinistoProductDllModelsApiTagTagCreateParameters,
	VinistoProductDllModelsApiTagTagEditParameters,
	VinistoProductDllModelsApiTagTagEnableParameters,
	VinistoProductDllModelsApiTagTagReturn,
} from 'vinisto_api_client/src/api-types/product-api';
import { PRODUCT_SERVICE_TAGS_URI } from 'Services/BundleTags/constants';

import { countryCodes } from '@/shared';
import { VinistoHelperDllEnumsCountryCode } from '@/api-types/user-api';
// import { mapApiToEntity } from 'Services/BundleTags/helpers';

type GetTagByIdParams = {
	includeSpecifications?: boolean;
	isCacheable?: boolean;
	countryOfSale?: string;
	currency?: string;
};

const getById = async (tagId: string, params?: GetTagByIdParams) => {
	const url = `${PRODUCT_SERVICE_TAGS_URI}/${tagId}`;

	const res =
		await apiServiceInstance.get<VinistoProductDllModelsApiTagTagReturn>(
			url,
			undefined,
			undefined,
			[
				{
					key: 'includeSpecifications',
					value: params?.includeSpecifications ?? false,
				},
				{
					key: 'isCacheable',
					value: params?.isCacheable ?? false,
				},
				{
					key: 'countryOfSale',
					value: params?.countryOfSale ?? countryCodes[0],
				},
				{
					key: 'currency',
					value: params?.currency ?? 'CZK',
				},
			]
		);

	//return mapApiToEntity(
	//	res.tag,
	//	activeLanguage ?? VinistoHelperDllEnumsLanguage.CZECH
	//);

	return res.tag;
};

const setEnable = async (
	tagId: string,
	requestBody: VinistoProductDllModelsApiTagTagEnableParameters
) => {
	const url = `${PRODUCT_SERVICE_TAGS_URI}/${tagId}/set-enable`;

	const res =
		await apiServiceInstance.put<VinistoProductDllModelsApiTagTagReturn>(
			url,
			requestBody
		);

	return res;
};

const update = async (
	postTagId: string,
	postTag: VinistoProductDllModelsApiTagTagEditParameters
) => {
	await apiServiceInstance.patch<VinistoProductDllModelsApiTagTag>(
		`${PRODUCT_SERVICE_TAGS_URI}/${postTagId}`,
		postTag,
		true
	);
};

const create = async (
	request: VinistoProductDllModelsApiTagTagCreateParameters
) => {
	await apiServiceInstance.post<VinistoProductDllModelsApiTagTag>(
		`${PRODUCT_SERVICE_TAGS_URI}`,
		request,
		true
	);
};

const remove = async (
	postTagId: string,
	params: {
		userLoginHash: string;
		countryOfSale: VinistoHelperDllEnumsCountryCode;
	}
) => {
	const tagParams = new URLSearchParams(params);

	await apiServiceInstance.delete<TagsDeleteParams>(
		`${PRODUCT_SERVICE_TAGS_URI}/${postTagId}?${tagParams}`,
		undefined,
		true
	);
};

/**
 * @deprecated use new api service
 */
export const BundleTagService = {
	create,
	update,
	remove,
	getById,
	setEnable,
};
