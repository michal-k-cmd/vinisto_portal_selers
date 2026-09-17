import { apiServiceInstance } from 'Services/ApiService';
import {
	VinistoCmsDllModelsApiImageTagImageTagReturn,
	VinistoCmsDllModelsApiImageTagImageTagsReturn,
	VinistoHelperDllBaseBaseReturn,
} from 'vinisto_api_client/src/api-types/cms-api/';
import { IQueryArgument } from 'Services/ApiService/interfaces';
import { CMS_SERVICE_IMAGE_TAG_URI } from 'Services/CmsService/constants';
import {
	CmsImageTag,
	CmsImageTagCreateParams,
} from 'Services/CmsService/interfaces';

const getList = async (requestParams: IQueryArgument[]) => {
	const res =
		await apiServiceInstance.get<VinistoCmsDllModelsApiImageTagImageTagsReturn>(
			CMS_SERVICE_IMAGE_TAG_URI,
			true,
			undefined,
			requestParams
		);

	return res.tags;
};

const getById = async (imageTagId: string, requestParams: IQueryArgument[]) =>
	await apiServiceInstance.get<VinistoCmsDllModelsApiImageTagImageTagReturn>(
		`${CMS_SERVICE_IMAGE_TAG_URI}/${imageTagId}`,
		true,
		undefined,
		requestParams
	);

const create = async (request: CmsImageTagCreateParams) =>
	await apiServiceInstance.post<VinistoCmsDllModelsApiImageTagImageTagReturn>(
		CMS_SERVICE_IMAGE_TAG_URI,
		request,
		true
	);

const update = async (imageTag: CmsImageTag) =>
	await apiServiceInstance.put<VinistoCmsDllModelsApiImageTagImageTagReturn>(
		`${CMS_SERVICE_IMAGE_TAG_URI}/${imageTag.id}`,
		imageTag,
		true
	);

const remove = async (imageTagId: string) =>
	await apiServiceInstance.delete<VinistoHelperDllBaseBaseReturn>(
		`${CMS_SERVICE_IMAGE_TAG_URI}/${imageTagId}`,
		undefined,
		true
	);

const CmsImageTagService = {
	getList,
	getById,
	create,
	update,
	remove,
};

export default CmsImageTagService;
