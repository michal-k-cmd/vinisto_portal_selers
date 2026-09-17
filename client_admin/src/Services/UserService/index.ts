import { IVinistoUser } from 'Services/AuthenticationService/interfaces';
import { apiServiceInstance } from 'Services/ApiService';
import {
	VinistoAuthDllModelsApiUserUserReturn,
	VinistoHelperDllEnumsUserLoginHashType,
} from 'vinisto_api_client/src/api-types/user-api';

import { IUserChangePasswordData, IUserUpdateData } from './interfaces';
import {
	USER_API_AUTH_GET_SUPPLIER,
	USER_API_CHANGE_PASSWORD_SUPPLIER,
	USER_API_PATH,
} from './constants';

const CLIENT_HASH_TYPE = VinistoHelperDllEnumsUserLoginHashType.CLIENT;

const isClientAdminUser = (
	user: VinistoAuthDllModelsApiUserUserReturn['user']
): user is IVinistoUser => user != null && 'suppliers' in user;

export const getVinistoUser = (
	user: IVinistoUser | undefined
): IVinistoUser => {
	const {
		id = '',
		email = '',
		loginKey = '',
		loginHash = null,
		createdAt = 0,
		isAgreementCC = false,
		isEmailVerified = false,
		suppliers = [],
		nickname = null,
		permissions = [],
	} = user ?? {};
	return {
		id,
		email,
		loginKey,
		loginHash,
		createdAt,
		isAgreementCC,
		isEmailVerified,
		suppliers,
		nickname,
		permissions,
	};
};

const UserService = {
	getSupplier: async (userLoginHash: string) =>
		apiServiceInstance
			.get<VinistoAuthDllModelsApiUserUserReturn>(
				USER_API_AUTH_GET_SUPPLIER,
				true,
				undefined,
				[
					{ key: 'UserLoginHash', value: userLoginHash },
					{ key: 'hashType', value: CLIENT_HASH_TYPE },
				]
			)
			.then((payload = {}) =>
				isClientAdminUser(payload.user)
					? getVinistoUser(payload.user)
					: undefined
			),
	update: async (userId: string, data: IUserUpdateData) =>
		apiServiceInstance
			.put<VinistoAuthDllModelsApiUserUserReturn>(
				`${USER_API_PATH}/${userId}`,
				data,
				true
			)
			.then((response) =>
				isClientAdminUser(response.user)
					? getVinistoUser(response.user)
					: undefined
			),
	changePassword: async (data: IUserChangePasswordData) =>
		apiServiceInstance.put(USER_API_CHANGE_PASSWORD_SUPPLIER, data, true),
};

export default UserService;
