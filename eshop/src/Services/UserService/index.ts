// import { IVinistoUser } from 'Services/AuthenticationService/interfaces';
// import { get } from 'lodash-es';
import api from 'vinisto_api_client/src/api';
// import { hasAdminToolbarAccess } from 'Services/AuthenticationService/helpers';

import { COMPANY_API_PATH, USER_API_PATH } from './constants';
import { IUserUpdateData } from './interfaces';

import { UserApi } from '@/api-types/user-api';
import { userAdapter } from '@/index';

const UserService = {
	update: (userId: string, data: IUserUpdateData) =>
		api
			.put<UserApi.UsersUpdate.ResponseBody, UserApi.UsersUpdate.RequestBody>(
				`${USER_API_PATH}/${userId}`,
				undefined,
				data
			)
			.then((response) => {
				const user = response.user;
				if (!user) throw new Error('No user in response');

				const newVinistoUser = userAdapter.fromApi(user, {
					loginHash: data.userLoginHash,
				});

				return newVinistoUser;
			}),

	updateCompany: (
		companyId: string,
		data: UserApi.CompaniesUpdate.RequestBody & { userLoginHash: string }
	) =>
		api
			.put<
				UserApi.CompaniesUpdate.ResponseBody,
				UserApi.CompaniesUpdate.RequestBody
			>(`${COMPANY_API_PATH}/${companyId}`, undefined, data)
			.then((response) => {
				const user = response.user;
				if (!user) throw new Error('No user in response');

				return {
					user,
					vinistoUser: userAdapter.fromApi(user, {
						loginHash: data.userLoginHash,
					}),
				};
			}),

	addEmailToNewsletter: (email: string) =>
		api.put(`${USER_API_PATH}/set-newsletter-is-active`, { email }, undefined),
};

export default UserService;
