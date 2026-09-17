import { useContext } from 'react';
import { LOGIN_REDIRECT_TIMEOUT } from 'Hooks/useLoginRedirect/constants';
import { LocalStorageKeys } from 'Services/StorageService/constants';
import { StorageContext } from 'Services/StorageService/context';
import { useRouter } from 'next/navigation';

const useLoginRedirect = (navigateFromAuthRequired: boolean) => {
	const storageContext = useContext(StorageContext);
	const router = useRouter();
	const location = storageContext.StorageService.getStorageItem(
		LocalStorageKeys.LOGIN_REDIRECT_PATH
	) as Location;

	const loginRedirect = () => {
		if (!location || !location?.pathname || !navigateFromAuthRequired) return;

		setTimeout(() => {
			router.push(
				`${location?.pathname}${location?.search ? location?.search : ''}`
			);
			storageContext.StorageService.removeItem(
				LocalStorageKeys.LOGIN_REDIRECT_PATH
			);
		}, LOGIN_REDIRECT_TIMEOUT);
	};

	return loginRedirect;
};

export default useLoginRedirect;
