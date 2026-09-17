import { apiServiceInstance } from 'Services/ApiService';
import { VinistoHelperDllEnumsUserLoginHashType } from 'vinisto_api_client/src/api-types/user-api';

import {
	FORGOTTEN_PASSWORD_API_PATH,
	LOG_IN_API_PATH,
	LOG_OUT_API_PATH,
	REGISTRATION_API_PATH,
} from './constants';

const CLIENT_HASH_TYPE = VinistoHelperDllEnumsUserLoginHashType.CLIENT;

/**
 * Authentication Service
 * @class AuthenticationService
 */
class AuthenticationService {
	private apiService = apiServiceInstance;

	public register(
		email: string,
		password: string,
		isAgreementCC: boolean
	): Promise<unknown> {
		return new Promise(
			(
				resolve: (thenableOrResult?: unknown) => void,
				reject: (error?: any) => void
			) => {
				return this.apiService
					.post(REGISTRATION_API_PATH, { email, password, isAgreementCC }, true)
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
		hashType: typeof CLIENT_HASH_TYPE = CLIENT_HASH_TYPE
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
		hashType: typeof CLIENT_HASH_TYPE = CLIENT_HASH_TYPE
	): Promise<unknown> {
		return new Promise(
			(
				resolve: (thenableOrResult?: unknown) => void,
				reject: (error?: any) => void
			) => {
				return this.apiService
					.put(LOG_OUT_API_PATH, { userLoginHash, hashType }, true)
					.then((response) => {
						return resolve(response);
					})
					.catch((error) => {
						return reject(error);
					});
			}
		);
	}

	public forgottenPassword(email: string): Promise<unknown> {
		return new Promise(
			(
				resolve: (thenableOrResult?: unknown) => void,
				reject: (error?: any) => void
			) => {
				return this.apiService
					.get(FORGOTTEN_PASSWORD_API_PATH, true, undefined, [
						{
							key: 'email',
							value: email,
						},
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

const authenticationServiceInstance = new AuthenticationService();

export { authenticationServiceInstance };
