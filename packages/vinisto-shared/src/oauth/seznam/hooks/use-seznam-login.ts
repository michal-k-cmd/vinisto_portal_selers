import { useOAuthConfig } from '../../provider';
import { SeznamTokenResponse } from '../types';

export interface UseSeznamLoginOptions {
	onSuccess?: (data: SeznamTokenResponse) => void;
	onError?: () => void;
}

export default function useSeznamLogin(options: UseSeznamLoginOptions = {}) {
	const { seznam } = useOAuthConfig();

	const login = () => {
		const clientId = seznam?.clientId;
		const scope = 'identity';
		const responseType = 'code';
		const redirectUri = seznam?.callbackUri;

		if (!clientId || !redirectUri) {
			throw new Error('Seznam client ID is not set');
		}

		const authUrl = `https://login.szn.cz/api/v1/oauth/auth?client_id=${encodeURIComponent(
			clientId
		)}&scope=${encodeURIComponent(scope)}&response_type=${encodeURIComponent(
			responseType
		)}&redirect_uri=${encodeURIComponent(redirectUri)}`;

		const popup = window.open(authUrl, '_blank', 'width=500,height=600');
		if (!popup) return;

		const handler = (event: MessageEvent) => {
			if (event.origin !== window.location.origin) return;
			const message = event.data as {
				type?: 'SEZNAM_OAUTH_TOKEN' | 'SEZNAM_OAUTH_ERROR';
				data?: SeznamTokenResponse;
			};
			if (message && message.type === 'SEZNAM_OAUTH_TOKEN') {
				window.removeEventListener('message', handler);
				options.onSuccess?.(message.data ?? {});
			}
			if (message && message.type === 'SEZNAM_OAUTH_ERROR') {
				window.removeEventListener('message', handler);
				options.onError?.();
			}
		};

		window.addEventListener('message', handler);
	};

	return login;
}
