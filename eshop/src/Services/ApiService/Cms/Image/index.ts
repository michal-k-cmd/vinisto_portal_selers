import { VinistoCmsDllModelsApiReturnCmsImageReturn } from 'vinisto_api_client/src/api-types/cms-api';
import api from 'vinisto_api_client/src/api';

import { CMS_SERVICE_IMAGE_URI } from '../constants';

//const getList = async (requestParams: IQueryArgument[]) =>
//	await apiServiceInstance.get<VinistoCmsDllModelsApiReturnCmsImagesReturn>(
//		CMS_SERVICE_IMAGE_URI,
//		true,
//		undefined,
//		requestParams
//	);

const getById = async (imageId: string) =>
	await api.get<VinistoCmsDllModelsApiReturnCmsImageReturn>(
		`${CMS_SERVICE_IMAGE_URI}/${imageId}`
	);

//const create = async (image: CmsImage) =>
//	await apiServiceInstance.post(CMS_SERVICE_IMAGE_URI, image, true);
//
//const update = async (image: CmsImage) =>
//	await apiServiceInstance.put(
//		`${CMS_SERVICE_IMAGE_URI}/${image.id}`,
//		image,
//		true
//	);
//
//const remove = async (imageId: string) =>
//	await apiServiceInstance.delete(
//		`${CMS_SERVICE_IMAGE_URI}/${imageId}`,
//		undefined,
//		true
//	);

const CmsImageService = {
	// getList,
	getById,
	//create,
	//update,
	//remove,
};

export default CmsImageService;
