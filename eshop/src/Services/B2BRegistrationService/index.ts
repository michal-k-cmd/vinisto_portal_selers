import api, { type BaseResponse } from 'vinisto_api_client/src/api';
import { UserApi } from 'vinisto_api_client/src/api-types/user-api';

const isCompanyIcoAlreadyUsed = (
	ico: string
): Promise<UserApi.CompaniesExistsByIcoList.ResponseBody> =>
	api
		.get<
			UserApi.CompaniesExistsByIcoList.ResponseBody & BaseResponse,
			UserApi.CompaniesExistsByIcoList.RequestQuery
		>('user-api/companies/exists-by-ico', { ico })
		.then(Boolean);

const register = (requestBody: UserApi.CompaniesCreate.RequestBody) =>
	api.post<UserApi.CompaniesCreate.ResponseBody>(
		'user-api/companies',
		undefined,
		requestBody
	);

const B2BRegistrationService = {
	isCompanyIcoAlreadyUsed,
	register,
};

export default B2BRegistrationService;
