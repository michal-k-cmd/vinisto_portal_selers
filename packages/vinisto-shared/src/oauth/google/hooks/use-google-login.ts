'use client';

/* eslint-disable no-redeclare */
/* eslint-disable import/export */
import { useCallback, useEffect, useRef } from 'react';
import { VinistoHelperDllEnumsUserTokenType } from 'vinisto_api_client/src/api-types/user-api';
import { useIsClient } from '@uidotdev/usehooks';

import { useGoogleOAuth } from '../provider';
import {
	CodeClientConfig,
	CodeResponse,
	NonOAuthError,
	OverridableTokenClientConfig,
	TokenClientConfig,
	TokenResponse,
} from '../types';
import { OAuthError, OAuthErrorCode } from '../../error';

declare global {
	interface Window {
		google?: {
			accounts?: {
				oauth2: {
					initTokenClient: (config: TokenClientConfig) => any;
					initCodeClient: (config: CodeClientConfig) => any;
				};
			};
		};
	}
}
interface ImplicitFlowOptions
	extends Omit<TokenClientConfig, 'client_id' | 'scope' | 'callback'> {
	onSuccess?: (
		tokenResponse: Omit<
			TokenResponse,
			'error' | 'error_description' | 'error_uri'
		>
	) => Promise<void>;
	onError?: (error: OAuthError) => void;
	onNonOAuthError?: (nonOAuthError: NonOAuthError) => void;
	scope?: TokenClientConfig['scope'];
	overrideScope?: boolean;
}

interface AuthCodeFlowOptions
	extends Omit<CodeClientConfig, 'client_id' | 'scope' | 'callback'> {
	onSuccess?: (
		codeResponse: Omit<
			CodeResponse,
			'error' | 'error_description' | 'error_uri'
		>
	) => void;
	onError?: (error: OAuthError) => void;
	onNonOAuthError?: (nonOAuthError: NonOAuthError) => void;
	scope?: CodeResponse['scope'];
	overrideScope?: boolean;
}

export type UseGoogleLoginOptionsImplicitFlow = {
	flow?: 'implicit';
} & ImplicitFlowOptions;

export type UseGoogleLoginOptionsAuthCodeFlow = {
	flow?: 'auth-code';
} & AuthCodeFlowOptions;

export type UseGoogleLoginOptions =
	| UseGoogleLoginOptionsImplicitFlow
	| UseGoogleLoginOptionsAuthCodeFlow;

export default function useGoogleLogin(
	options: UseGoogleLoginOptionsImplicitFlow
): (overrideConfig?: OverridableTokenClientConfig) => void;
export default function useGoogleLogin(
	options: UseGoogleLoginOptionsAuthCodeFlow
): () => void;

export default function useGoogleLogin({
	flow = 'implicit',
	scope = '',
	onSuccess,
	onError,
	onNonOAuthError,
	overrideScope,
	state,
	...props
}: UseGoogleLoginOptions): unknown {
	const { clientId, scriptLoadedSuccessfully } = useGoogleOAuth();
	const clientRef = useRef<any>();

	const onSuccessRef = useRef(onSuccess);
	onSuccessRef.current = onSuccess;

	const onErrorRef = useRef(onError);
	onErrorRef.current = onError;

	const onNonOAuthErrorRef = useRef(onNonOAuthError);
	onNonOAuthErrorRef.current = onNonOAuthError;

	const isClient = useIsClient();

	useEffect(() => {
		if (!scriptLoadedSuccessfully || !isClient) return;

		const clientMethod =
			flow === 'implicit' ? 'initTokenClient' : 'initCodeClient';
		const client = window?.google?.accounts?.oauth2[clientMethod]({
			client_id: clientId,
			scope: overrideScope ? scope : `openid profile email ${scope}`,
			callback: async (response: TokenResponse | CodeResponse) => {
				if (response.error) {
					let error: OAuthError;
					switch (response.error) {
						case 'access_denied':
							error = new OAuthError(
								OAuthErrorCode.ACCESS_DENIED,
								VinistoHelperDllEnumsUserTokenType.Google
							);
							break;
						case 'invalid_request':
							error = new OAuthError(
								OAuthErrorCode.INVALID_REQUEST,
								VinistoHelperDllEnumsUserTokenType.Google
							);
							break;
						case 'unauthorized_client':
							error = new OAuthError(
								OAuthErrorCode.UNAUTHORIZED_CLIENT,
								VinistoHelperDllEnumsUserTokenType.Google
							);
							break;
						case 'unsupported_response_type':
							error = new OAuthError(
								OAuthErrorCode.UNSUPPORTED_RESPONSE_TYPE,
								VinistoHelperDllEnumsUserTokenType.Google
							);
							break;
						case 'invalid_scope':
							error = new OAuthError(
								OAuthErrorCode.INVALID_SCOPE,
								VinistoHelperDllEnumsUserTokenType.Google
							);
							break;
						case 'server_error':
							error = new OAuthError(
								OAuthErrorCode.SERVER_ERROR,
								VinistoHelperDllEnumsUserTokenType.Google
							);
							break;
						case 'temporarily_unavailable':
							error = new OAuthError(
								OAuthErrorCode.TEMPORARILY_UNAVAILABLE,
								VinistoHelperDllEnumsUserTokenType.Google
							);
							break;
						default:
							error = new OAuthError(
								OAuthErrorCode.OTHER,
								VinistoHelperDllEnumsUserTokenType.Google
							);
							break;
					}

					return onErrorRef.current?.(error);
				}
				try {
					await onSuccessRef.current?.(response as any);
				} catch (error) {
					if (error instanceof OAuthError) {
						return onErrorRef.current?.(error);
					}
					return onErrorRef.current?.(
						new OAuthError(
							OAuthErrorCode.SERVER_ERROR,
							VinistoHelperDllEnumsUserTokenType.Google
						)
					);
				}
			},
			error_callback: (nonOAuthError: NonOAuthError) => {
				onNonOAuthErrorRef.current?.(nonOAuthError);
			},
			state,
			...props,
		});

		clientRef.current = client;
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [clientId, scriptLoadedSuccessfully, flow, scope, state, isClient]);

	const loginImplicitFlow = useCallback(
		(overrideConfig?: OverridableTokenClientConfig) =>
			clientRef.current?.requestAccessToken(overrideConfig),
		[]
	);

	const loginAuthCodeFlow = useCallback(
		() => clientRef.current?.requestCode(),
		[]
	);

	return flow === 'implicit' ? loginImplicitFlow : loginAuthCodeFlow;
}
