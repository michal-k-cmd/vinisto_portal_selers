'use client';

import { createContext, ReactNode, useContext, useMemo } from 'react';

import useLoadScript, { useLoadScriptOptions } from './hooks/use-load-script';

interface GoogleOAuthContextProps {
	clientId: string;
	scriptLoadedSuccessfully: boolean;
}

const GoogleOAuthContext = createContext<GoogleOAuthContextProps | null>(null);

interface GoogleOAuthProviderProps extends useLoadScriptOptions {
	clientId: string;
	children: ReactNode;
}

export const GoogleOAuthProvider = ({
	clientId,
	nonce,
	onScriptLoadSuccess,
	onScriptLoadError,
	children,
}: GoogleOAuthProviderProps) => {
	const scriptLoadedSuccessfully = useLoadScript({
		nonce,
		onScriptLoadSuccess,
		onScriptLoadError,
	});

	const contextValue = useMemo(
		() => ({
			clientId,
			scriptLoadedSuccessfully,
		}),
		[clientId, scriptLoadedSuccessfully]
	);

	return (
		<GoogleOAuthContext.Provider value={contextValue}>
			{children}
		</GoogleOAuthContext.Provider>
	);
};

export function useGoogleOAuth() {
	const context = useContext(GoogleOAuthContext);
	if (!context) {
		throw new Error(
			'Google OAuth components must be used within GoogleOAuthProvider'
		);
	}
	return context;
}
