import { useCallback, useContext, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { AuthenticationAction } from 'Services/AuthenticationService/constants';
import { AuthenticationContext } from 'Services/AuthenticationService/context';
import UserService from 'Services/UserService';

import { CHECK_INTERVAL } from './constants';
import { IAuthorizationServiceProps } from './interfaces';

const AuthorizationService = ({ children }: IAuthorizationServiceProps) => {
	const authenticationContext = useContext(AuthenticationContext);

	const location = useLocation();

	const isLoggedIn = authenticationContext.isLoggedIn;
	const loginHash = authenticationContext.vinistoUser?.loginHash;

	const checkRights = useCallback(() => {
		if (typeof loginHash !== 'string') {
			return;
		}
		UserService.getSupplier(loginHash)
			.then((vinistoUser) => {
				if (!vinistoUser?.suppliers?.length) {
					throw new Error();
				}
				authenticationContext.dispatch({
					type: AuthenticationAction.updateSuppliers,
					payload: vinistoUser,
				});
			})
			.catch(() => {
				authenticationContext.dispatch({
					type: AuthenticationAction.forceLogOut,
				});
			});
	}, [loginHash, authenticationContext.dispatch]);

	useEffect(() => {
		if (!isLoggedIn) return;
		checkRights();
		let timeoutId: number;
		const loop = () => {
			checkRights();
			timeoutId = window.setTimeout(loop, CHECK_INTERVAL);
		};
		timeoutId = window.setTimeout(loop, CHECK_INTERVAL);
		return () => {
			window.clearTimeout(timeoutId);
		};
	}, [
		isLoggedIn,
		checkRights,
		location, // trigger on location change
	]);

	return <>{children}</>;
};

export default AuthorizationService;
