'use client';

import { useCallback, useContext, useEffect } from 'react';
import { AuthenticationContext } from 'Services/AuthenticationService/context';
import { usePathname } from 'next/navigation';

import { INTERVAL_TO_AUTH_USER } from './constants';
import { AuthorizationServiceProps } from './interfaces';
import { authUserWithLoginHash } from './handlers';

const AuthorizationService = ({ children }: AuthorizationServiceProps) => {
	const pathname = usePathname();
	const authenticationContext = useContext(AuthenticationContext);
	const { isLoggedIn, vinistoUser, setVinistoUser, handleOnForceLogOut } =
		authenticationContext;
	const loginHash = vinistoUser?.loginHash ?? null;

	const handleOnAuthUser = useCallback(() => {
		authUserWithLoginHash({
			loginHash,
			vinistoUser,
			setVinistoUser,
			onError: () => handleOnForceLogOut(),
		});
	}, [handleOnForceLogOut, loginHash, setVinistoUser, vinistoUser]);

	useEffect(() => {
		// If location is not changed, auth user after certain interval
		if (isLoggedIn) {
			handleOnAuthUser();
			let timeoutId: ReturnType<typeof setTimeout>;
			const loop = () => {
				handleOnAuthUser();
				timeoutId = setTimeout(loop, INTERVAL_TO_AUTH_USER);
			};
			timeoutId = setTimeout(loop, INTERVAL_TO_AUTH_USER);
			return () => clearTimeout(timeoutId);
		}
	}, [pathname, isLoggedIn, handleOnAuthUser]);

	return <>{children}</>;
};

export default AuthorizationService;
