import api, { BaseResponse } from '@/api';
import {
	AddonResponse,
	AddonsValidationResponse,
	AddonType,
	ValidateAddonsRequest,
} from '@/api-types/addons-api';

const get = async (id: string) =>
	api.get<BaseResponse & AddonResponse>(`addons-api/Addons/${id}`);

const validate = async (req: ValidateAddonsRequest) =>
	api.post<BaseResponse & AddonsValidationResponse, ValidateAddonsRequest>(
		`addons-api/Addons/validate-addons`,
		undefined,
		req
	);

const getGiftsForBundle = async (bundleId: string, addonType: AddonType) =>
	api.get<BaseResponse & AddonResponse[]>(
		`addons-api/Addons/item/${bundleId}?addonType=${addonType}`
	);

const AddonsService = {
	get,
	validate,
	getGiftsForBundle,
};

export default AddonsService;
