import { VinistoHelperDllEnumsUserLoginHashType } from 'vinisto_api_client/src/api-types/user-api/';

import ApiService from '../ApiService';

import {
	AUTH_API_PATH,
	LOG_IN_API_PATH,
	LOG_OUT_API_PATH,
	REGISTRATION_API_PATH,
} from './constants';

const ADMIN_HASH_TYPE = VinistoHelperDllEnumsUserLoginHashType.ADMIN;

/**
 * Authentication Service
 * @class AuthenticationService
 */
class AuthenticationService {
	private apiService: ApiService = new ApiService();

	public register(
		email: string,
		password: string,
		isNewsletterActive: boolean,
		isAgreementCC: boolean
	): Promise<unknown> {
		return new Promise(
			(
				resolve: (thenableOrResult?: unknown) => void,
				reject: (error?: any) => void
			) => {
				return this.apiService
					.post(REGISTRATION_API_PATH, {
						email,
						password,
						isNewsletterActive,
						isAgreementCC,
					})
					.then((response) => {
						return resolve(response);
					})
					.catch((error) => {
						return reject(error);
					});
			}
		);
	}

	public logIn(
		email: string,
		password: string,
		hashType: typeof ADMIN_HASH_TYPE = ADMIN_HASH_TYPE
	): Promise<unknown> {
		return new Promise(
			(
				resolve: (thenableOrResult?: unknown) => void,
				reject: (error?: any) => void
			) => {
				return this.apiService
					.put(LOG_IN_API_PATH, { email, password, hashType }, true)
					.then((response) => {
						return resolve(response);
					})
					.catch((error) => {
						return reject(error);
					});
			}
		);
	}

	public logOut(
		userLoginHash: string,
		hashType: typeof ADMIN_HASH_TYPE = ADMIN_HASH_TYPE
	): Promise<unknown> {
		return new Promise(
			(
				resolve: (thenableOrResult?: unknown) => void,
				reject: (error?: any) => void
			) => {
				return this.apiService
					.put(LOG_OUT_API_PATH, { userLoginHash, hashType })
					.then((response) => {
						return resolve(response);
					})
					.catch((error) => {
						return reject(error);
					});
			}
		);
	}

	public auth(userLoginHash: string): Promise<unknown> {
		return new Promise(
			(
				resolve: (thenableOrResult?: unknown) => void,
				reject: (error?: any) => void
			) => {
				return this.apiService
					.get(AUTH_API_PATH, true, undefined, [
						{ key: 'UserLoginHash', value: userLoginHash },
					])
					.then((response) => {
						return resolve(response);
					})
					.catch((error) => {
						return reject(error);
					});
			}
		);
	}
}

export default AuthenticationService;
