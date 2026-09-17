import { FC, useContext, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { AuthenticationContext } from 'Services/AuthenticationService/context';
import { StorageContext } from 'Services/StorageService/context';
import { LocalStorageKeys } from 'Services/StorageService/constants';

import { IRequirePermissionsProps } from './interfaces';

const RequirePermissions: FC<IRequirePermissionsProps> = ({
	permissions,
	children,
}) => {
	const authenticationContext = useContext(AuthenticationContext);
	const location = useLocation();
	const storageContext = useContext(StorageContext);
	const userRights = authenticationContext.vinistoUser?.permissions ?? [];
	const merchantRights =
		authenticationContext.vinistoUser?.merchantRights ?? [];

	const combinedPermissions = userRights.concat(merchantRights);

	const navigate = useNavigate();
	const canAccess = permissions.some((permission) =>
		combinedPermissions.includes(permission)
	);

	useEffect(() => {
		if (canAccess) return;

		navigate('/', { replace: true });
		storageContext.StorageService.setItem(
			LocalStorageKeys.LOGIN_REDIRECT_PATH,
			location
		);
	}, [authenticationContext]);

	return <>{children}</>;
};

export default RequirePermissions;
