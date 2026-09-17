import { useContext } from 'react';
import { LocalStorageKeys } from 'Services/StorageService/constants';
import { StorageContext } from 'Services/StorageService/context';
import { Location, useNavigate } from 'react-router-dom';

const useLoginRedirect = () => {
	const storageContext = useContext(StorageContext);
	const navigate = useNavigate();
	const location = storageContext.StorageService.getStorageItem(
		LocalStorageKeys.LOGIN_REDIRECT_PATH
	) as Location;

	const hasPathname = Boolean(location?.pathname);

	const loginRedirectPath = `${location?.pathname}${
		location?.search ? location?.search : ''
	}`;

	const loginRedirect = () => {
		if (hasPathname) {
			navigate(loginRedirectPath);
			storageContext.StorageService.removeItem(
				LocalStorageKeys.LOGIN_REDIRECT_PATH
			);
		} else {
			navigate('/');
		}
	};

	return loginRedirect;
};

export default useLoginRedirect;
