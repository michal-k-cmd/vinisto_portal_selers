import { ReactNode } from 'react';

export interface ICookieServiceProviderProps {
	children: ReactNode;
}

export interface ICookieServiceContextModel {
	saveCookie: () => void;
	invalidateCookie: () => void;
	isAnalyticsAllowed: () => boolean;
	isCookieBannerVisible: boolean;
}
