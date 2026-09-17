import { createContext, FC, useCallback, useContext, useState } from 'react';
import { filter, find, get } from 'Helpers/lodash';
import { ModalContext } from 'Components/Modal/context';
import { SideBarContext } from 'Components/SideBar/context';
import { NotificationsContext } from 'Services/NotificationService';
import { StorageContext } from 'Services/StorageService/context';
import { LocalStorageKeys } from 'Services/StorageService/constants';

import {
	IAuthenticationContextProviderProps,
	IAuthenticationContextValues,
	IVinistoUser,
} from './interfaces';

import AuthenticationService from './index';

import {
	VinistoAuthDllModelsApiUserBaseBuyerUser,
	VinistoAuthDllModelsApiUserCompany,
	VinistoAuthDllModelsApiUserMerchant,
	VinistoAuthDllModelsApiUserUser,
	VinistoHelperDllEnumsUserCompanyMerchantRights,
	VinistoHelperDllEnumsUserUserRights,
} from '@/api-types/user-api';

const defaultVinistoUser: IVinistoUser = {
	id: null,
	email: null,
	loginKey: null,
	loginHash: '',
	permissions: [],
	createdAt: null,
	isAgreementCC: false,
	isNewsletterActive: false,
	isEmailVerified: false,
	merchantRights: [],
};

const defaultAuthenticationContextValues: IAuthenticationContextValues = {
	isLoggedIn: false,
	vinistoUser: defaultVinistoUser,
	handleOnLogIn: () => null,
	handleOnLogOut: () => null,
	handleOnForceLogOut: () => null,
	handleOnOptimisticAddPermission: () => null,
	handleOnOptimisticDeletePermission: () => null,
	handleOnOAuthLogIn: () => null,
};

export const AuthenticationContext = createContext(
	defaultAuthenticationContextValues
);

const AuthenticationProvider: FC<IAuthenticationContextProviderProps> = (
	props: IAuthenticationContextProviderProps
): JSX.Element => {
	const { children } = props;
	const sideBarContext = useContext(SideBarContext);
	const storageContext = useContext(StorageContext);
	const modalContext = useContext(ModalContext);
	const notificationsContext = useContext(NotificationsContext);

	const getVinistoUserData = useCallback(() => {
		const storedVinistoAuth = storageContext.StorageService.getStorageItem(
			LocalStorageKeys.VINISTO_AUTH
		);
		if (storedVinistoAuth) {
			const storedVinostoUser: IVinistoUser = {
				id: get(storedVinistoAuth, 'id') as string | null,
				email: get(storedVinistoAuth, 'email') as string | null,
				loginHash: get(storedVinistoAuth, 'loginHash') as string,
				permissions: get(storedVinistoAuth, 'permissions', []) as string[],
				loginKey: get(storedVinistoAuth, 'loginKey') as string | null,
				createdAt: get(storedVinistoAuth, 'createdAt') as number | Date | null,
				isNewsletterActive: get(
					storedVinistoAuth,
					'isNewsletterActive'
				) as boolean,
				isAgreementCC: get(storedVinistoAuth, 'isAgreementCC') as boolean,
				isEmailVerified: get(storedVinistoAuth, 'isEmailVerified') as boolean,
				merchantRights: get(
					storedVinistoAuth,
					'merchantRights'
				) as VinistoHelperDllEnumsUserCompanyMerchantRights[],
			};
			return storedVinostoUser;
		} else {
			return defaultAuthenticationContextValues.vinistoUser;
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [storageContext.StorageService]);

	const [vinistoUser, setVinistoUser] = useState(getVinistoUserData());
	const [isLoggedIn, setIsLoggedIn] = useState(!!vinistoUser.id);

	const handleOnLogOut = useCallback(() => {
		if (isLoggedIn) {
			const authenticationService = new AuthenticationService();
			authenticationService.logOut(vinistoUser.loginHash).finally(() => {
				setVinistoUser(defaultVinistoUser);
				setIsLoggedIn(false);
				storageContext.StorageService.removeItem(LocalStorageKeys.VINISTO_AUTH);
				notificationsContext.handleShowSuccessNotification(
					'notification.message.logOut.success'
				);
				storageContext.StorageService.setItem(
					LocalStorageKeys.LOGIN_REDIRECT_PATH,
					'/user-list'
				);
			});
		}
	}, [
		isLoggedIn,
		vinistoUser.loginHash,
		notificationsContext,
		storageContext.StorageService,
	]);

	const handleOnForceLogOut = () => {
		if (!isLoggedIn) return;
		setVinistoUser(defaultVinistoUser);
		setIsLoggedIn(false);
		storageContext.StorageService.removeItem(LocalStorageKeys.VINISTO_AUTH);
		notificationsContext.handleShowWarningNotification(
			'notification.message.logOut.forced'
		);
	};

	const handleOnOptimisticAddPermission = useCallback(
		(permissionId: string) => {
			const newPermissions = [
				...get(vinistoUser, 'permissions', []),
				permissionId,
			];
			const newVinostoUser: IVinistoUser = {
				...vinistoUser,
				permissions: newPermissions,
			};
			setVinistoUser(newVinostoUser);
			storageContext.StorageService.setItem(
				LocalStorageKeys.VINISTO_AUTH,
				newVinostoUser
			);
		},
		[vinistoUser]
	);

	const handleOnOptimisticDeletePermission = useCallback(
		(permissionId: string) => {
			const newPermissions = filter(
				get(vinistoUser, 'permissions', []),
				(vinistoUserPermission: string) =>
					vinistoUserPermission !== permissionId
			);
			const newVinostoUser: IVinistoUser = {
				...vinistoUser,
				permissions: newPermissions,
			};
			setVinistoUser(newVinostoUser);
			storageContext.StorageService.setItem(
				LocalStorageKeys.VINISTO_AUTH,
				newVinostoUser
			);
		},
		[vinistoUser]
	);

	const handleOnLogIn = useCallback(
		(email: string, password: string) => {
			if (!isLoggedIn) {
				const authenticationService = new AuthenticationService();
				authenticationService
					.logIn(email, password)
					.then((payload) => {
						const hasRights =
							find(
								get(payload, 'user.permissions', []),
								(permission: string) =>
									permission ===
										VinistoHelperDllEnumsUserUserRights.USER_ADMIN ||
									permission === VinistoHelperDllEnumsUserUserRights.USER_CSO
							) || get(payload, 'user.merchantRights', []).length;
						if (!hasRights) {
							notificationsContext.handleShowErrorNotification(
								'admin.logIn.noRights'
							);

							return;
						}
						modalContext.handleCloseModal();
						const newVinostoUser: IVinistoUser = {
							id: get(payload, 'user.id', null),
							email: get(payload, 'user.email', null),
							loginHash: get(payload, 'user.loginHash', ''),
							loginKey: get(payload, 'user.loginKey', null),
							permissions: get(payload, 'user.permissions', []),
							createdAt: get(payload, 'user.createdAt', null),
							isNewsletterActive: get(
								payload,
								'user.isNewsletterActive',
								false
							),
							isAgreementCC: get(payload, 'user.isAgreementCC', false),
							isEmailVerified: get(payload, 'user.isEmailVerified', false),
							merchantRights: get(payload, 'user.merchantRights', []),
						};
						setIsLoggedIn(true);
						setVinistoUser(newVinostoUser);
						storageContext.StorageService.setItem(
							LocalStorageKeys.VINISTO_AUTH,
							newVinostoUser
						);
						setTimeout(() => {
							sideBarContext.handleOnForceOpenSideBar();
						}, 300);
					})
					.catch(() => {
						notificationsContext.handleShowErrorNotification(
							'notification.message.logIn.error'
						);
					});
			}
		},
		[
			isLoggedIn,
			notificationsContext,
			storageContext.StorageService,
			sideBarContext,
			modalContext,
		]
	);

	const handleOnOAuthLogIn = useCallback(
		(
			user:
				| VinistoAuthDllModelsApiUserBaseBuyerUser
				| VinistoAuthDllModelsApiUserCompany
				| VinistoAuthDllModelsApiUserMerchant
				| VinistoAuthDllModelsApiUserUser
		) => {
			const hasRights =
				user?.permissions.find(
					(permission) =>
						permission === VinistoHelperDllEnumsUserUserRights.USER_ADMIN ||
						permission === VinistoHelperDllEnumsUserUserRights.USER_CSO
				) || get(user, 'merchantRights', []).length;

			if (!hasRights) {
				notificationsContext.handleShowErrorNotification(
					'admin.logIn.noRights'
				);

				return;
			}

			const newVinistoUser: IVinistoUser = {
				id: user?.id ?? null,
				email: user?.email ?? null,
				loginHash: user?.loginHash ?? '',
				loginKey: user?.loginKey ?? null,
				createdAt: user?.createdAt ?? null,
				isAgreementCC:
					(user && 'isAgreementCC' in user && user.isAgreementCC) ?? false,
				isEmailVerified: user?.isEmailVerified ?? false,
				isNewsletterActive:
					(user && 'isNewsletterActive' in user && user.isNewsletterActive) ??
					false,
				permissions: user?.permissions ?? [],
				merchantRights:
					(user && 'merchantRights' in user && user.merchantRights) || [],
			};

			modalContext.handleCloseModal();
			setIsLoggedIn(true);
			setVinistoUser(newVinistoUser);
			storageContext.StorageService.setItem(
				LocalStorageKeys.VINISTO_AUTH,
				newVinistoUser
			);
			setTimeout(() => {
				sideBarContext.handleOnForceOpenSideBar();
			}, 300);
		},
		[]
	);

	const localizationContextModel: IAuthenticationContextValues = {
		isLoggedIn,
		vinistoUser,
		handleOnForceLogOut,
		handleOnLogOut,
		handleOnLogIn,
		handleOnOptimisticAddPermission,
		handleOnOptimisticDeletePermission,
		handleOnOAuthLogIn,
	};

	return (
		<AuthenticationContext.Provider value={localizationContextModel}>
			{children}
		</AuthenticationContext.Provider>
	);
};

export default AuthenticationProvider;
