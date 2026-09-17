'use client';

import { createContext, ReactNode, useContext, useMemo } from 'react';

import useLoadFacebookSDK, {
	UseLoadFacebookSDKOptions,
} from './hooks/use-load-script';

interface FacebookSDKContextProps {
	appId: string;
	scriptLoadedSuccessfully: boolean;
}

const FacebookSDKContext = createContext<FacebookSDKContextProps | null>(null);

type FacebookSDKProviderProps = Omit<UseLoadFacebookSDKOptions, 'config'> & {
	appId: string;
	version?: string;
	xfbml?: boolean;
	locale?: string;
	children: ReactNode;
};

export const FacebookSDKProvider = ({
	appId,
	version,
	xfbml,
	locale,
	nonce,
	onScriptLoadSuccess,
	onScriptLoadError,
	children,
}: FacebookSDKProviderProps) => {
	const scriptLoadedSuccessfully = useLoadFacebookSDK({
		config: {
			appId,
			version,
			xfbml,
			locale,
		},
		nonce,
		onScriptLoadSuccess,
		onScriptLoadError,
	});

	const contextValue = useMemo(
		() => ({
			appId,
			scriptLoadedSuccessfully,
		}),
		[appId, scriptLoadedSuccessfully]
	);

	return (
		<FacebookSDKContext.Provider value={contextValue}>
			{children}
		</FacebookSDKContext.Provider>
	);
};

export function useFacebookSDK() {
	const context = useContext(FacebookSDKContext);
	if (!context) {
		throw new Error(
			'Facebook SDK components must be used within FacebookSDKProvider'
		);
	}
	return context;
}
