'use client';

import { useEffect, useRef, useState } from 'react';

export interface useLoadScriptOptions {
	/**
	 * Nonce applied to GSI script tag. Propagates to GSI's inline style tag
	 */
	nonce?: string;
	/**
	 * Callback fires on load [gsi](https://accounts.google.com/gsi/client) script success
	 */
	onScriptLoadSuccess?: () => void;
	/**
	 * Callback fires on load [gsi](https://accounts.google.com/gsi/client) script failure
	 */
	onScriptLoadError?: () => void;
}

export default function useLoadScript(
	options: useLoadScriptOptions = {}
): boolean {
	const { nonce, onScriptLoadSuccess, onScriptLoadError } = options;

	const [scriptLoadedSuccessfully, setScriptLoadedSuccessfully] =
		useState(false);

	const onScriptLoadSuccessRef = useRef(onScriptLoadSuccess);
	onScriptLoadSuccessRef.current = onScriptLoadSuccess;

	const onScriptLoadErrorRef = useRef(onScriptLoadError);
	onScriptLoadErrorRef.current = onScriptLoadError;

	useEffect(() => {
		const scriptTag = document.createElement('script');
		scriptTag.src = 'https://accounts.google.com/gsi/client';
		scriptTag.async = true;
		scriptTag.defer = true;
		scriptTag.nonce = nonce;
		scriptTag.onload = () => {
			setScriptLoadedSuccessfully(true);
			onScriptLoadSuccessRef.current?.();
		};
		scriptTag.onerror = () => {
			setScriptLoadedSuccessfully(false);
			onScriptLoadErrorRef.current?.();
		};

		document.body.appendChild(scriptTag);

		return () => {
			document.body.removeChild(scriptTag);
		};
	}, [nonce]);

	return scriptLoadedSuccessfully;
}
