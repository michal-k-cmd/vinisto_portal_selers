'use client';

import { useContext, useEffect, useRef } from 'react';
import { AuthenticationContext } from 'Services/AuthenticationService/context';
import { useRouter } from 'next/navigation';

export const useProtectedRoute = ({ redirectTo }: { redirectTo?: string }) => {
	const { isLoggedIn, isLoggining } = useContext(AuthenticationContext);
	const router = useRouter();
	const wasInitiallyLoggedIn = useRef<boolean | null>(null);

	useEffect(() => {
		// Don't do anything while checking authentication status
		if (isLoggining) return;

		// On first render after login check, store the initial login state
		if (wasInitiallyLoggedIn.current === null) {
			wasInitiallyLoggedIn.current = isLoggedIn;
		}

		if (!isLoggedIn) {
			// If user was never logged in during this component's lifecycle, show login modal
			if (!wasInitiallyLoggedIn.current) {
				router.replace(`/?modal=login&redirectTo=${redirectTo}`);
			} else {
				// If user was logged in but logged out, just redirect to homepage without showing login modal
				router.replace('/');
			}
		}
	}, [isLoggedIn, isLoggining, router, redirectTo]);
};
