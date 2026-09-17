import * as React from 'react';
import { useLocation } from 'react-router-dom';
import AuthenticationService from 'Services/AuthenticationService';

import { AuthenticationContext } from '../AuthenticationService/context';

import { IAuthorizationServiceProps } from './interfaces';
import { INTERVAL_TO_AUTH_USER } from './constants';

/**
 * Authorization Service
 * @class AuthorizationService
 */
const AuthorizationService: React.FC<IAuthorizationServiceProps> = (
	props: IAuthorizationServiceProps
): JSX.Element => {
	const { children } = props;
	const location = useLocation();
	const authenticationContext = React.useContext(AuthenticationContext);
	const loginHash = authenticationContext?.vinistoUser?.loginHash ?? null;
	const isLoggedIn = authenticationContext?.isLoggedIn;

	const handleOnAuthUser = React.useCallback(() => {
		const authenticationService = new AuthenticationService();
		authenticationService
			.auth(loginHash)
			.catch(() => authenticationContext.handleOnForceLogOut());
	}, [loginHash]);

	React.useEffect(() => {
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
	}, [location.pathname, isLoggedIn]);

	return <>{children}</>;
};

export default AuthorizationService;
