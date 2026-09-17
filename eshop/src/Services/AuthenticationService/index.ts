import {
	VinistoAuthDllModelsApiUserUserReturn,
	VinistoHelperDllEnumsCountryCode,
	VinistoHelperDllEnumsUserLoginHashType,
	VinistoHelperDllEnumsUserUserType,
} from 'vinisto_api_client/src/api-types/user-api';
import api from 'vinisto_api_client/src/api';
import { UserApi } from 'vinisto_api_client/src/api-types/user-api';

import {
	AUTH_API_PATH,
	B2C_LOGIN_ON_B2B_PLATFORM,
	CONFIRM_EMAIL_API_PATH,
	FORGOTTEN_PASSWORD_API_PATH,
	IS_EMAIL_ALREADY_USED_API_PATH,
	LOG_IN_API_PATH,
	LOG_OUT_API_PATH,
	REGISTRATION_API_PATH,
} from './constants';

const SHOP_HASH_TYPE = VinistoHelperDllEnumsUserLoginHashType.SHOP;

const register = (
	email: string,
	password: string,
	isNewsletterActive: boolean,
	isAgreementCC: boolean,
	registrationCountry: VinistoHelperDllEnumsCountryCode
) =>
	api
		.post<UserApi.UsersCreate.ResponseBody, UserApi.UsersCreate.RequestBody>(
			REGISTRATION_API_PATH,
			undefined,
			{
				email,
				password,
				isNewsletterActive,
				isAgreementCC,
				registrationCountry,
			}
		)
		.then((response) => {
			if (!response.user) throw new Error('No user in response');
			return response.user;
		});

const logIn = (email: string, password: string, isB2b: boolean) =>
	api
		.put<UserApi.UsersUpdate.ResponseBody, UserApi.UsersUpdate.RequestBody>(
			LOG_IN_API_PATH,
			undefined,
			{ email, password, hashType: SHOP_HASH_TYPE }
		)
		.then((response) => {
			const user = response.user;
			if (!user) throw new Error('No user in response');

			// What about Merchant users? Won't somebody *please* think of the Merchants?
			if (isB2b && user.type !== VinistoHelperDllEnumsUserUserType.Company) {
				throw new Error(B2C_LOGIN_ON_B2B_PLATFORM);
			}
			if (!isB2b && user.type === VinistoHelperDllEnumsUserUserType.Company) {
				throw new Error(B2C_LOGIN_ON_B2B_PLATFORM);
			}

			return user;
		});

const logOut = (
	userLoginHash: string,
	hashType: typeof SHOP_HASH_TYPE = SHOP_HASH_TYPE
) =>
	api
		.put(LOG_OUT_API_PATH, undefined, { userLoginHash, hashType })
		.then((response) => {
			return response;
		});

const forgottenPassword = (email: string) =>
	api.get(FORGOTTEN_PASSWORD_API_PATH, { email }).then((response) => {
		return response;
	});

const confirmEmail = (hash: string) =>
	api.put(CONFIRM_EMAIL_API_PATH, undefined, { hash }).then((response) => {
		return response;
	});

const resetPassword = (resetHash: string, newPassword: string) =>
	api
		.put(FORGOTTEN_PASSWORD_API_PATH, undefined, { resetHash, newPassword })
		.then((response) => {
			return response;
		});

const checkIfEmailIsAlreadyInUse = (email: string) =>
	api
		.get(IS_EMAIL_ALREADY_USED_API_PATH, {
			email,
		})
		.then((response) => {
			return response;
		});

const auth = (userLoginHash: string) =>
	api
		.get<VinistoAuthDllModelsApiUserUserReturn>(AUTH_API_PATH, {
			userLoginHash,
		})
		.then((response) => {
			return response;
		});

export default {
	register,
	logIn,
	logOut,
	forgottenPassword,
	confirmEmail,
	resetPassword,
	checkIfEmailIsAlreadyInUse,
	auth,
};
