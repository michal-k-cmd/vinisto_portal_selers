'use client';

import { useEffect, useRef, useState } from 'react';

export interface FacebookSDKConfig {
	appId: string;
	version?: string;
	xfbml?: boolean;
	locale?: string;
}

export interface UseLoadFacebookSDKOptions {
	config: FacebookSDKConfig;
	nonce?: string;
	onScriptLoadSuccess?: () => void;
	onScriptLoadError?: () => void;
}

export default function useLoadFacebookSDK(
	options: UseLoadFacebookSDKOptions
): boolean {
	const { config, nonce, onScriptLoadSuccess, onScriptLoadError } = options;
	const [scriptLoadedSuccessfully, setScriptLoadedSuccessfully] =
		useState(false);

	const onScriptLoadSuccessRef = useRef(onScriptLoadSuccess);
	onScriptLoadSuccessRef.current = onScriptLoadSuccess;

	const onScriptLoadErrorRef = useRef(onScriptLoadError);
	onScriptLoadErrorRef.current = onScriptLoadError;

	useEffect(() => {
		// Facebook SDK requires HTTPS
		if (window.location.protocol !== 'https:') {
			return;
		}
		// Define FB init function
		window.fbAsyncInit = function () {
			window.FB?.init({
				appId: config.appId,
				xfbml: config.xfbml ?? true,
				version: config.version ?? 'v21.0',
			});
			setScriptLoadedSuccessfully(true);
			onScriptLoadSuccessRef.current?.();
		};

		// Create and append script tag
		const scriptTag = document.createElement('script');
		scriptTag.src = `https://connect.facebook.net/${
			config.locale ?? 'en_US'
		}/sdk.js`;
		scriptTag.async = true;
		scriptTag.defer = true;
		scriptTag.crossOrigin = 'anonymous';
		scriptTag.nonce = nonce;
		scriptTag.onerror = () => {
			setScriptLoadedSuccessfully(false);
			onScriptLoadErrorRef.current?.();
		};

		document.body.appendChild(scriptTag);

		return () => {
			document.body.removeChild(scriptTag);
		};
	}, [config, nonce]);

	return scriptLoadedSuccessfully;
}
