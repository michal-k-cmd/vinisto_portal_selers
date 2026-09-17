'use client';

import { useSearchParams } from 'next/navigation';
import { createContext, ReactNode, useCallback, useContext } from 'react';

import {
	CUSTOMER_ID,
	IS_B2B,
	IS_B2B_FORCED_BY_ENV,
	REQUESTED_BASKET_ID,
} from './constants';

interface PlatformServiceProps {
	children: ReactNode;
	isServerSideB2b: boolean;
}

interface PlatformContextValues {
	isB2b: boolean;
	customerId: string | null;
	requestedBasketId: string | null;
	withB2bQueryParams: (originalUrl: string) => string;
	getIsInAdminIframe: () => boolean;
}

export const PlatformContext = createContext<PlatformContextValues>({
	isB2b: false,
	customerId: null,
	requestedBasketId: null,
	withB2bQueryParams: (originalUrl: string) => originalUrl,
	getIsInAdminIframe: () => false,
});

const PlatformServiceProvider = ({
	children,
	isServerSideB2b,
}: PlatformServiceProps) => {
	const searchParams = useSearchParams();
	const isB2b =
		!!searchParams.get(IS_B2B) || isServerSideB2b || IS_B2B_FORCED_BY_ENV;
	const customerId = searchParams.get(CUSTOMER_ID);
	const requestedBasketId = searchParams.get(REQUESTED_BASKET_ID);

	const getIsInAdminIframe = useCallback(() => {
		if (
			typeof window === 'undefined' ||
			window.self === window.top ||
			!document.referrer
		)
			return false;

		try {
			const adminOrigin = new URL(process.env.NEXT_PUBLIC_ADMIN_URI ?? '')
				.origin;
			return new URL(document.referrer).origin === adminOrigin;
		} catch {
			return false;
		}
	}, []);

	const withB2bQueryParams = useCallback(
		(originalUrl: string) => {
			if (!getIsInAdminIframe()) return originalUrl;
			return (originalUrl +=
				(originalUrl.match(/[?]/g) ? '&' : '?') +
				`${IS_B2B}=true&${CUSTOMER_ID}=${customerId}&${REQUESTED_BASKET_ID}=${requestedBasketId}`);
		},
		[getIsInAdminIframe, customerId, requestedBasketId]
	);

	const value = {
		isB2b,
		customerId,
		requestedBasketId,
		withB2bQueryParams,
		getIsInAdminIframe,
	};

	return (
		<PlatformContext.Provider value={value}>
			{children}
		</PlatformContext.Provider>
	);
};

export default PlatformServiceProvider;

export const usePlatformContext = () => {
	const platformContext = useContext(PlatformContext);
	if (!platformContext)
		throw new Error(
			'Platform context is not available. This component needs to be a child of <PlatformContext.Provider> component to be able to use the context.'
		);
	return platformContext;
};

export const useIsB2b = () => {
	const platformContext = usePlatformContext();
	return platformContext.isB2b;
};

export const useWithB2bQueryParams = () => {
	const platformContext = usePlatformContext();
	return platformContext.withB2bQueryParams;
};
