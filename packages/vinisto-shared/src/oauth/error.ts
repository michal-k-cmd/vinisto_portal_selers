import { VinistoHelperDllEnumsUserTokenType } from 'vinisto_api_client/src/api-types/user-api';

export class OAuthError extends Error {
	constructor(
		public code: OAuthErrorCode,
		public provider: VinistoHelperDllEnumsUserTokenType
	) {
		super(code);
		this.name = 'OAuthError';
		this.provider = provider;
		this.code = code;
	}
}

export enum OAuthErrorCode {
	NO_ACCESS_TOKEN = 'No access token provided',
	NOT_AUTHORIZED = 'Not authorized',
	AUTHORIZATION_EXPIRED = 'Authorization expired',
	ACCESS_DENIED = 'Access denied',
	INVALID_REQUEST = 'Invalid request',
	UNAUTHORIZED_CLIENT = 'Unauthorized client',
	UNSUPPORTED_RESPONSE_TYPE = 'Unsupported response type',
	INVALID_SCOPE = 'Invalid scope',
	SERVER_ERROR = 'Server error',
	TEMPORARILY_UNAVAILABLE = 'Temporarily unavailable',
	OTHER = 'Other',
}
