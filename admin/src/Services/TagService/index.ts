import { apiServiceInstance } from 'Services/ApiService';
import { VinistoProductDllModelsApiBundleBundleReturn } from 'vinisto_api_client/src/api-types/product-api/';

import { CountryCode } from '@/shared';

export interface AddTagToBundleRequestParams {
	bundleId: string;
	userLoginHash: string;
	countryOfSale: CountryCode;
	itemId: string;
}

export interface RemoveTagFromBundleRequestParams {
	bundleId: string;
	userLoginHash: string;
	countryOfSale: CountryCode;
	tagId: string;
}

const addTagToBundle = async (requestParams: AddTagToBundleRequestParams) => {
	const { bundleId, userLoginHash, itemId, countryOfSale } = requestParams;
	const response =
		await apiServiceInstance.post<VinistoProductDllModelsApiBundleBundleReturn>(
			`product-api/bundles/${bundleId}/tags`,
			{
				userLoginHash,
				itemId,
				countryOfSale,
			}
		);

	if (response.isError) {
		return Promise.reject(response.error);
	}

	return {
		...requestParams,
		bundle: response.bundle,
	};
};

const removeTagFromBundle = async (
	requestParams: RemoveTagFromBundleRequestParams
) => {
	const { bundleId, userLoginHash, tagId, countryOfSale } = requestParams;

	const response =
		await apiServiceInstance.delete<VinistoProductDllModelsApiBundleBundleReturn>(
			`product-api/bundles/${bundleId}/tags/${tagId}`,
			undefined,
			true,
			[
				{ key: 'userLoginHash', value: userLoginHash },
				{ key: 'tagId', value: tagId },
				{ key: 'bundleId', value: bundleId },
				{ key: 'countryOfSale', value: countryOfSale as string },
			]
		);

	if (response.isError) {
		return Promise.reject(response.error);
	}

	return {
		...requestParams,
		bundle: response.bundle,
	};
};

export { addTagToBundle, removeTagFromBundle };
