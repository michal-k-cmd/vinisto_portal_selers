import { apiServiceInstance } from 'Services/ApiService';
import {
	VinistoCmsDllModelsApiReturnCmsImageReturn,
	VinistoCmsDllModelsApiReturnCmsImagesReturn,
} from 'vinisto_api_client/src/api-types/cms-api/';
import { IQueryArgument } from 'Services/ApiService/interfaces';
import { CMS_SERVICE_IMAGE_URI } from 'Services/CmsService/constants';
import { CmsImage } from 'Services/CmsService/interfaces';

const getList = async (requestParams: IQueryArgument[]) =>
	await apiServiceInstance.get<VinistoCmsDllModelsApiReturnCmsImagesReturn>(
		CMS_SERVICE_IMAGE_URI,
		true,
		undefined,
		requestParams
	);

const getById = async (imageId: string, requestParams: IQueryArgument[]) =>
	await apiServiceInstance.get(
		`${CMS_SERVICE_IMAGE_URI}/${imageId}`,
		true,
		undefined,
		requestParams
	);

const create = async (image: CmsImage) =>
	await apiServiceInstance.post<VinistoCmsDllModelsApiReturnCmsImageReturn>(
		CMS_SERVICE_IMAGE_URI,
		image,
		true
	);

const update = async (image: CmsImage) =>
	await apiServiceInstance.put(
		`${CMS_SERVICE_IMAGE_URI}/${image.id}`,
		image,
		true
	);

const remove = async (imageId: string) =>
	await apiServiceInstance.delete(
		`${CMS_SERVICE_IMAGE_URI}/${imageId}`,
		undefined,
		true
	);

const CmsImageService = {
	getList,
	getById,
	create,
	update,
	remove,
};

export default CmsImageService;
