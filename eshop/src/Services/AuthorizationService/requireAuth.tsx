import { useContext, useEffect, useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { LocalStorageKeys } from 'Services/StorageService/constants';
import { ModalContext } from 'Components/Modal/context';
import {
	FORGOTTEN_PASSWORD_MODAL,
	LOGIN_MODAL,
	REGISTRATION_MODAL,
} from 'Components/Modal/constants';
import { StorageContext } from 'Services/StorageService/context';
import { AuthenticationContext } from 'Services/AuthenticationService/context';

import { AuthorizationServiceProps } from './interfaces';

const RequireAuth = ({ children }: AuthorizationServiceProps) => {
	const { isLoggedIn } = useContext(AuthenticationContext);
	const { handleOpenModal, handleCloseModal } = useContext(ModalContext);
	const router = useRouter();
	const pathname = usePathname();
	const searchParams = useSearchParams();
	const { StorageService } = useContext(StorageContext);

	const [isOpenForgottenPasswordModal, setIsOpenForgottenPasswordModal] =
		useState(false);
	const [isOpenRegisterModal, setIsOpenRegisterModal] = useState(false);

	useEffect(() => {
		if (!isLoggedIn) {
			StorageService.setItem(LocalStorageKeys.LOGIN_REDIRECT_PATH, {
				pathname: pathname,
				search: searchParams ? searchParams.toString() : '',
			});
			if (isOpenForgottenPasswordModal) {
				router.push('/');
				handleOpenModal(FORGOTTEN_PASSWORD_MODAL, {
					onLoginClick: () => {
						setIsOpenForgottenPasswordModal(false);
					},
				});
			} else if (isOpenRegisterModal) {
				handleOpenModal(REGISTRATION_MODAL);
			} else {
				handleOpenModal(LOGIN_MODAL, {
					onCloseCallback: () => {
						router.back();
						setTimeout(() => {
							StorageService.removeItem(LocalStorageKeys.LOGIN_REDIRECT_PATH);
						}, 100);
					},
					onForgottenPasswordClick: () => {
						setIsOpenForgottenPasswordModal(true);
						handleCloseModal();
					},
					onRegistrationClick: () => {
						setIsOpenRegisterModal(true);
						handleCloseModal();
					},
					navigateFromAuthRequired: true,
					showForgottenPasswordLink: true,
					showRegisterCta: false,
				});
			}
		}
	}, [
		handleOpenModal,
		isLoggedIn,
		router,
		StorageService,
		isOpenForgottenPasswordModal,
		isOpenRegisterModal,
		pathname,
		searchParams,
		handleCloseModal,
	]);

	return isLoggedIn ? <>{children}</> : <></>;
};

export default RequireAuth;
