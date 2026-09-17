export interface SeznamTokenResponse {
	access_token?: string;
	refresh_token?: string;
	expires_in?: number;
	token_type?: string;
	oauth_user_id?: string;
	account_name?: string;
	scopes?: string[];
}
