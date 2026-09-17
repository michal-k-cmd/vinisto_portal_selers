import { useCallback } from 'react';
import { LocalStorageKeys } from 'Services/StorageService/constants';
import { Location, useNavigate } from 'react-router-dom';
import { storageServiceInstance } from 'Services/StorageService';

const useLoginRedirect = () => {
	const navigate = useNavigate();

	const location = storageServiceInstance.getStorageItem(
		LocalStorageKeys.LOGIN_REDIRECT_PATH
	) as Location;

	const hasPathname = Boolean(location?.pathname);

	const loginRedirectPath = `${location?.pathname}${
		location?.search ? location?.search : ''
	}`;

	const loginRedirect = useCallback(() => {
		if (hasPathname) {
			navigate(loginRedirectPath);
		} else {
			navigate('/');
		}
	}, [hasPathname, loginRedirectPath, navigate]);

	return loginRedirect;
};

export default useLoginRedirect;
