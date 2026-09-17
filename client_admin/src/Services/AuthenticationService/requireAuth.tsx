import { FC, useContext, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { LocalStorageKeys } from 'Services/StorageService/constants';
import { LOGIN } from 'Services/RoutingService/constants';
import { storageServiceInstance } from 'Services/StorageService';

import { AuthenticationContext } from './context';
import { RequireAuthProps } from './interfaces';

const RequireAuth: FC<RequireAuthProps> = ({ children }) => {
	const authenticationContext = useContext(AuthenticationContext);
	const navigate = useNavigate();
	const location = useLocation();

	useEffect(() => {
		if (!authenticationContext.isLoggedIn) {
			storageServiceInstance.setItem(
				LocalStorageKeys.LOGIN_REDIRECT_PATH,
				location
			);

			setTimeout(() => {
				navigate(LOGIN, { replace: true });
				storageServiceInstance.setItem(
					LocalStorageKeys.LOGIN_REDIRECT_PATH,
					location
				);
			}, 100);
		}
	}, [authenticationContext, location, navigate]);

	return <>{children}</>;
};

export default RequireAuth;
