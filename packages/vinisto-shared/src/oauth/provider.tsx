'use client';

import { ReactNode, createContext, useContext, useMemo } from 'react';

import { GoogleOAuthProvider } from './google/provider';
import { FacebookSDKProvider } from './facebook/provider';

export interface OAuthConfig {
	google?: {
		clientId: string;
		nonce?: string;
		onScriptLoadSuccess?: () => void;
		onScriptLoadError?: () => void;
	};
	facebook?: {
		appId: string;
		version?: string;
		xfbml?: boolean;
		locale?: string;
		nonce?: string;
		onScriptLoadSuccess?: () => void;
		onScriptLoadError?: () => void;
	};
	seznam?: {
		clientId: string;
		callbackUri: string;
	};
}

interface OAuthProviderProps {
	config: OAuthConfig;
	children: ReactNode;
}

const OAuthConfigContext = createContext<OAuthConfig | null>(null);

export const useOAuthConfig = (): OAuthConfig => {
	const context = useContext(OAuthConfigContext);
	if (!context) {
		throw new Error('useOAuthConfig must be used within an OAuthProvider');
	}
	return context;
};

export const OAuthProvider = ({ config, children }: OAuthProviderProps) => {
	const ProviderTree = useMemo(() => {
		let element = children;

		if (
			config.facebook &&
			// We don't initiate Facebook SDK on localhost as it complains about http protocol and is really not needed for local development
			typeof window !== 'undefined'
		) {
			element = (
				<FacebookSDKProvider
					appId={config.facebook.appId}
					version={config.facebook.version}
					xfbml={config.facebook.xfbml}
					locale={config.facebook.locale}
					nonce={config.facebook.nonce}
					onScriptLoadSuccess={config.facebook.onScriptLoadSuccess}
					onScriptLoadError={config.facebook.onScriptLoadError}
				>
					{element}
				</FacebookSDKProvider>
			);
		}

		if (config.google) {
			element = (
				<GoogleOAuthProvider
					clientId={config.google.clientId}
					nonce={config.google.nonce}
					onScriptLoadSuccess={config.google.onScriptLoadSuccess}
					onScriptLoadError={config.google.onScriptLoadError}
				>
					{element}
				</GoogleOAuthProvider>
			);
		}

		return (
			<OAuthConfigContext.Provider value={config}>
				{element}
			</OAuthConfigContext.Provider>
		);
	}, [config, children]);

	return <>{ProviderTree}</>;
};
