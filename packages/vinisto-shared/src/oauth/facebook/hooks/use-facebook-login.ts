'use client';

import { VinistoHelperDllEnumsUserTokenType } from 'vinisto_api_client/src/api-types/user-api';

import { OAuthError, OAuthErrorCode } from '../../error';

export interface UseFacebookLoginOptions {
	onSuccess: (authResponse: fb.AuthResponse) => Promise<void>;
	onError?: (error: OAuthError) => void;
}

export default function useFacebookLogin({
	onSuccess,
	onError,
}: UseFacebookLoginOptions) {
	const login = () => {
		try {
			window.FB.login((response) => {
				if (response.status === 'connected') {
					if (response.authResponse.accessToken) {
						Promise.resolve(onSuccess(response.authResponse)).catch(() => {
							onError?.(
								new OAuthError(
									OAuthErrorCode.SERVER_ERROR,
									VinistoHelperDllEnumsUserTokenType.Facebook
								)
							);
						});
					} else {
						onError?.(
							new OAuthError(
								OAuthErrorCode.SERVER_ERROR,
								VinistoHelperDllEnumsUserTokenType.Facebook
							)
						);
					}
				} else {
					switch (response.status) {
						case 'authorization_expired':
							onError?.(
								new OAuthError(
									OAuthErrorCode.AUTHORIZATION_EXPIRED,
									VinistoHelperDllEnumsUserTokenType.Facebook
								)
							);
							break;
						case 'not_authorized':
							onError?.(
								new OAuthError(
									OAuthErrorCode.NOT_AUTHORIZED,
									VinistoHelperDllEnumsUserTokenType.Facebook
								)
							);
							break;
						default:
							onError?.(
								new OAuthError(
									OAuthErrorCode.OTHER,
									VinistoHelperDllEnumsUserTokenType.Facebook
								)
							);
					}
				}
			}, {
				scope: 'email'
			});
		} catch (error) {
			onError?.(
				new OAuthError(
					OAuthErrorCode.SERVER_ERROR,
					VinistoHelperDllEnumsUserTokenType.Facebook
				)
			);
		}
	};

	return login;
}
