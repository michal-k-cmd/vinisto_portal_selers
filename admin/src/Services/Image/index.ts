import {
	VinistoImageDllModelsApiImageImage,
	VinistoImageDllModelsApiReturnDataImageReturn,
} from 'vinisto_api_client/src/api-types/image-api/';
import { apiServiceInstance } from 'Services/ApiService';

import { IMAGE_API_BASE_URL } from './constants';

interface DeleteImageRequestParams {
	imageId: string;
	userLoginHash: string;
}

interface SetMainImageRequestParams {
	imageId: string;
	itemId: string;
	itemType: VinistoImageDllModelsApiImageImage['objectType'];
	userLoginHash: string;
}

const deleteImage = async (requestParams: DeleteImageRequestParams) => {
	const { imageId, userLoginHash } = requestParams;
	const response =
		await apiServiceInstance.delete<VinistoImageDllModelsApiReturnDataImageReturn>(
			`${IMAGE_API_BASE_URL}/images/${imageId}`,
			undefined,
			false,
			[
				{
					key: 'userLoginHash',
					value: userLoginHash,
				},
			]
		);
	if (response.isError) {
		return Promise.reject(response.error);
	}

	return {
		...requestParams,
		images: response.images,
	};
};

const setMainImage = async (requestParams: SetMainImageRequestParams) => {
	const { imageId, itemType, itemId, userLoginHash } = requestParams;
	const queryParams = new URLSearchParams(
		Object.entries({
			imageId,
			itemType: `${itemType}`,
			itemId,
			userLoginHash,
		})
	);

	const response =
		await apiServiceInstance.put<VinistoImageDllModelsApiReturnDataImageReturn>(
			`${IMAGE_API_BASE_URL}/images/${imageId}?${queryParams.toString()}`,
			{ imageId, itemType, itemId, userLoginHash }
		);
	if (response.isError) {
		return Promise.reject(response.error);
	}

	return {
		...requestParams,
		images: response.images,
	};
};

const ImageService = {
	deleteImage,
	setMainImage,
};

export default ImageService;
