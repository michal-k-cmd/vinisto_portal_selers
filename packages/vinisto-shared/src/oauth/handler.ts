import {
	UsersAuthLoginByExternalAppUpdatePayload,
	VinistoAuthDllModelsApiUserUserReturn,
} from 'vinisto_api_client/src/api-types/user-api';
import api from 'vinisto_api_client/src/api';

import { OAuthError, OAuthErrorCode } from './error';

export const login = async (
	requestData: UsersAuthLoginByExternalAppUpdatePayload
) => {
	const data = await api.put<VinistoAuthDllModelsApiUserUserReturn>(
		`user-api/users/auth/login-by-external-app`,
		undefined,
		requestData
	);

	if (data.isError) {
		throw new OAuthError(
			OAuthErrorCode.INVALID_REQUEST,
			requestData.loginExternalAppType
		);
	}

	if (!data.user) {
		throw new OAuthError(
			OAuthErrorCode.SERVER_ERROR,
			requestData.loginExternalAppType
		);
	}

	return data.user;
};
