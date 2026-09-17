'use client';

export * from './error';
export * from './handler';
export * from './provider';

import { useCallback } from 'react';
import {
	UsersAuthLoginByExternalAppUpdatePayload,
	VinistoAuthDllModelsApiUserBaseBuyerUser,
	VinistoAuthDllModelsApiUserCompany,
	VinistoAuthDllModelsApiUserMerchant,
	VinistoAuthDllModelsApiUserUser,
	VinistoHelperDllEnumsUserTokenType,
} from 'vinisto_api_client/src/api-types/user-api';

import { login } from './handler';
import { OAuthError, OAuthErrorCode } from './error';
import { TokenResponse } from './google/types';
import { useGoogleLogin } from './google';
import { useFacebookLogin } from './facebook';
import { useSeznamLogin } from './seznam';

interface OAuthLoginConfig {
	requestData: Omit<
		UsersAuthLoginByExternalAppUpdatePayload,
		'loginExternalAppType' | 'token'
	>;
	onSuccess: (
		userdata:
			| VinistoAuthDllModelsApiUserBaseBuyerUser
			| VinistoAuthDllModelsApiUserCompany
			| VinistoAuthDllModelsApiUserMerchant
			| VinistoAuthDllModelsApiUserUser
	) => void;
	onError?: (error: OAuthError) => void;
}

interface OAuthLoginHooks {
	handleGoogleLogin: () => void;
	handleFacebookLogin: () => void;
	handleSeznamLogin: () => void;
}

export const useOAuthLogin = ({
	requestData,
	onSuccess,
	onError,
}: OAuthLoginConfig): OAuthLoginHooks => {
	const handleOnError = useCallback(
		(error: OAuthError) => {
			onError?.(error);
		},
		[onError]
	);

	const handleGoogleLogin = useGoogleLogin({
		flow: 'implicit',
		onSuccess: async (tokenResponse: TokenResponse) => {
			try {
				const user = await login({
					loginExternalAppType: VinistoHelperDllEnumsUserTokenType.Google,
					token: tokenResponse.access_token,
					...requestData,
				});
				onSuccess(user);
			} catch (error) {
				handleOnError(
					error instanceof OAuthError
						? error
						: new OAuthError(
								OAuthErrorCode.SERVER_ERROR,
								VinistoHelperDllEnumsUserTokenType.Google
						  )
				);
			}
		},
		onError: handleOnError,
	});

	const handleFacebookLogin = useFacebookLogin({
		onSuccess: async (authResponse: fb.AuthResponse) => {
			try {
				if (!authResponse.accessToken) {
					throw new OAuthError(
						OAuthErrorCode.NO_ACCESS_TOKEN,
						VinistoHelperDllEnumsUserTokenType.Facebook
					);
				}

				const user = await login({
					loginExternalAppType: VinistoHelperDllEnumsUserTokenType.Facebook,
					token: authResponse.accessToken,
					...requestData,
				});
				onSuccess(user);
			} catch (error) {
				handleOnError(
					error instanceof OAuthError
						? error
						: new OAuthError(
								OAuthErrorCode.SERVER_ERROR,
								VinistoHelperDllEnumsUserTokenType.Facebook
						  )
				);
			}
		},
		onError: handleOnError,
	});

	const handleSeznamLogin = useSeznamLogin({
		onSuccess: async (tokenResponse) => {
			try {
				if (!tokenResponse.access_token) {
					throw new OAuthError(
						OAuthErrorCode.NO_ACCESS_TOKEN,
						VinistoHelperDllEnumsUserTokenType.Seznam
					);
				}

				const user = await login({
					loginExternalAppType: VinistoHelperDllEnumsUserTokenType.Seznam,
					token: tokenResponse.access_token,
					...requestData,
				});
				onSuccess(user);
			} catch (error) {
				handleOnError(
					error instanceof OAuthError
						? error
						: new OAuthError(
								OAuthErrorCode.SERVER_ERROR,
								VinistoHelperDllEnumsUserTokenType.Seznam
						  )
				);
			}
		},
		onError: () =>
			handleOnError(
				new OAuthError(
					OAuthErrorCode.OTHER,
					VinistoHelperDllEnumsUserTokenType.Seznam
				)
			),
	});

	return {
		handleGoogleLogin,
		handleFacebookLogin,
		handleSeznamLogin,
	};
};
