import {
	createContext,
	useCallback,
	useContext,
	useEffect,
	useState,
} from 'react';
import { get } from 'lodash-es';
import { StorageContext } from 'Services/StorageService/context';
import { LocalStorageKeys } from 'Services/StorageService/constants';

import {
	ICookieServiceContextModel,
	ICookieServiceProviderProps,
} from './interfaces';

const defaultCookieServiceContextModel: ICookieServiceContextModel = {
	saveCookie: () => null,
	invalidateCookie: () => null,
	isAnalyticsAllowed: () => false,
	isCookieBannerVisible: false,
};

export const CookieServiceContext = createContext<ICookieServiceContextModel>(
	defaultCookieServiceContextModel
);

const CookieServiceProvider = (props: ICookieServiceProviderProps) => {
	const storageContext = useContext(StorageContext);

	const [isCookieBannerVisible, setIsCookieBannerVisible] = useState<boolean>(
		() => {
			if (typeof window === 'undefined') return false;

			try {
				const rawData = window.localStorage.getItem(
					LocalStorageKeys.COOKIE_DATA
				);
				if (rawData) {
					return false;
				}

				if (storageContext?.StorageService) {
					const serviceData = storageContext.StorageService.getStorageItem(
						LocalStorageKeys.COOKIE_DATA
					);
					if (serviceData !== null && serviceData !== undefined) {
						return false;
					}
				}
			} catch (e) {
				return false;
			}

			return true;
		}
	);

	const injectAnalyticsScripts = useCallback(() => {
		if (typeof window === 'undefined') {
			return;
		}

		const googleTagManagerId = process.env.NEXT_PUBLIC_GTM_ID;
		const googleAnalyticsId = process.env.NEXT_PUBLIC_GA4_ID;

		if (googleTagManagerId && !document.getElementById('gtm-script')) {
			const gtmScript = document.createElement('script');
			gtmScript.id = 'gtm-script';
			gtmScript.innerHTML = `
				(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
				new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
				j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
				'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
				})(window,document,'script','dataLayer','${googleTagManagerId}');
			`;
			document.head.appendChild(gtmScript);

			const noscriptIframe = document.createElement('noscript');
			noscriptIframe.id = 'gtm-noscript';
			const iframe = document.createElement('iframe');
			iframe.src = `https://www.googletagmanager.com/ns.html?id=${googleTagManagerId}`;
			iframe.height = '0';
			iframe.width = '0';
			iframe.style.display = 'none';
			iframe.style.visibility = 'hidden';
			noscriptIframe.appendChild(iframe);
			document.body.appendChild(noscriptIframe);
		}

		if (googleAnalyticsId && !document.getElementById('gtag-script')) {
			const gtagScript = document.createElement('script');
			gtagScript.id = 'gtag-script';
			gtagScript.async = true;
			gtagScript.src = `https://www.googletagmanager.com/gtag/js?id=${googleAnalyticsId}`;
			document.head.appendChild(gtagScript);

			const gtagConfigScript = document.createElement('script');
			gtagConfigScript.id = 'gtag-config';
			gtagConfigScript.innerHTML = `
				window.dataLayer = window.dataLayer || [];
				function gtag(){dataLayer.push(arguments);}
				gtag('js', new Date());
				gtag('config', '${googleAnalyticsId}', {
					send_page_view: false,
				});
			`;
			document.head.appendChild(gtagConfigScript);
		}
	}, []);

	const saveCookie = useCallback(() => {
		try {
			const cookieData = storageContext.StorageService.getStorageItem(
				LocalStorageKeys.COOKIE_DATA
			);
			if (cookieData) {
				storageContext.StorageService.removeItem(LocalStorageKeys.COOKIE_DATA);
			}
			storageContext.StorageService.setItem(LocalStorageKeys.COOKIE_DATA, {
				allowed: true,
			});
		} catch (e) {
			try {
				window.localStorage.setItem(
					LocalStorageKeys.COOKIE_DATA,
					JSON.stringify({ allowed: true })
				);
			} catch (err) {
				/* error while loading */
			}
		}

		setIsCookieBannerVisible(false);
		injectAnalyticsScripts();
	}, [storageContext, injectAnalyticsScripts]);

	const invalidateCookie = useCallback(() => {
		try {
			const cookieData = storageContext.StorageService.getStorageItem(
				LocalStorageKeys.COOKIE_DATA
			);
			if (cookieData) {
				storageContext.StorageService.removeItem(LocalStorageKeys.COOKIE_DATA);
			}
			storageContext.StorageService.setItem(LocalStorageKeys.COOKIE_DATA, {
				allowed: false,
			});
		} catch (e) {
			try {
				window.localStorage.setItem(
					LocalStorageKeys.COOKIE_DATA,
					JSON.stringify({ allowed: false })
				);
			} catch (err) {
				/* error while loading */
			}
		}

		setIsCookieBannerVisible(false);
	}, [storageContext]);

	const isAnalyticsAllowed = useCallback((): boolean => {
		try {
			const cookieData = storageContext.StorageService.getStorageItem(
				LocalStorageKeys.COOKIE_DATA
			);
			return Boolean(get(cookieData, 'allowed', false));
		} catch (e) {
			return false;
		}
	}, [storageContext]);

	useEffect(() => {
		if (typeof window === 'undefined') return;

		let isAllowed = false;

		try {
			const rawData = window.localStorage.getItem(LocalStorageKeys.COOKIE_DATA);
			if (rawData) {
				const parsed = JSON.parse(rawData);
				isAllowed = Boolean(parsed.allowed);
			} else {
				const serviceData = storageContext?.StorageService?.getStorageItem(
					LocalStorageKeys.COOKIE_DATA
				);
				if (serviceData !== null && serviceData !== undefined) {
					isAllowed = Boolean(get(serviceData, 'allowed', false));
				}
			}
		} catch (e) {
			/* error while loading */
		}

		if (isAllowed) {
			injectAnalyticsScripts();
		}
	}, [storageContext, injectAnalyticsScripts]);

	const cookieServiceContextModel: ICookieServiceContextModel = {
		saveCookie,
		invalidateCookie,
		isAnalyticsAllowed,
		isCookieBannerVisible,
	};

	return (
		<CookieServiceContext.Provider value={cookieServiceContextModel}>
			{props.children}
		</CookieServiceContext.Provider>
	);
};

export default CookieServiceProvider;
