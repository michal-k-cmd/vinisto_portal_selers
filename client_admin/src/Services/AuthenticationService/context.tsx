import { createContext, FC, useCallback, useContext } from 'react';
import { isEqual } from 'lodash-es';
import { Dispatch, Middleware } from 'Hooks/useMiddlewareReducer/types';
import { LocalStorageKeys } from 'Services/StorageService/constants';
import useMiddlewareReducer from 'Hooks/useMiddlewareReducer';
import { ModalContext } from 'Components/Modal/context';
import { NotificationsContext } from 'Services/NotificationService';
import { storageServiceInstance } from 'Services/StorageService';
import { getVinistoUser } from 'Services/UserService';
import { VinistoAuthDllModelsApiUserUser } from 'vinisto_api_client/src/api-types/user-api';

import {
	AuthenticationAction,
	UI_DELAY,
	USER_LOGIN_ERROR,
	USER_NO_SUPPLIERS_ERROR,
} from './constants';
import { getValidActiveSupplierId } from './helpers';
import {
	AuthenticationContextProviderProps,
	AuthenticationContextValues,
	AuthenticationReducerAction,
	AuthenticationState,
	IVinistoUser,
	LoginAction,
	OAuthLoginAction,
	RegisterAction,
	SetUserAction,
	UpdateSingleSupplierAction,
	UpdateSuppliersAction,
} from './interfaces';
import { login, logout, register, resetUser } from './actions';
import { authenticationReducer } from './reducer';

export const defaultContextValue: AuthenticationState = {
	isLoggedIn: false, // TODO: would be nice to decouple this, i.e. return value according vinistoUser property value
	vinistoUser: null,
	activeSupplierId: '',
};

export const AuthenticationContext = createContext<AuthenticationContextValues>(
	{
		...defaultContextValue,
		dispatch: () => {},
	}
);

const AuthenticationProvider: FC<AuthenticationContextProviderProps> = ({
	children,
}) => {
	const modalContext = useContext(ModalContext);
	const notificationsContext = useContext(NotificationsContext);

	const saveVinistoUser = useCallback((vinistoUser: IVinistoUser) => {
		storageServiceInstance.setItem(LocalStorageKeys.VINISTO_AUTH, vinistoUser);
	}, []);

	const clearVinistoUser = useCallback(() => {
		storageServiceInstance.removeItem(LocalStorageKeys.VINISTO_AUTH);
	}, []);

	const saveActiveSupplier = useCallback((supplierId: string) => {
		if (supplierId === '') return;
		storageServiceInstance.setItem(
			LocalStorageKeys.ACTIVE_SUPPLIER,
			supplierId
		);
	}, []);

	const clearActiveSupplier = useCallback(() => {
		storageServiceInstance.removeItem(LocalStorageKeys.ACTIVE_SUPPLIER);
	}, []);

	const updateActiveSupplier = useCallback(
		(
			newActiveSupplierId: AuthenticationState['activeSupplierId'],
			currentActiveSupplierId: AuthenticationState['activeSupplierId'],
			suppliers: IVinistoUser['suppliers'],
			dispatch: Dispatch<AuthenticationReducerAction>
		) => {
			const activeSupplierId = getValidActiveSupplierId(
				newActiveSupplierId,
				suppliers
			);
			if (currentActiveSupplierId !== activeSupplierId) {
				dispatch({
					type: AuthenticationAction.setActiveSupplier,
					payload: activeSupplierId,
				});
				saveActiveSupplier(activeSupplierId);
			}
		},
		[saveActiveSupplier]
	);

	const loginAction = useCallback(
		(
			currentState: AuthenticationState,
			dispatch: Dispatch<AuthenticationReducerAction>,
			action: LoginAction
		) => {
			if (currentState.isLoggedIn) return;
			login(dispatch, action.payload.email, action.payload.password)
				.then((vinistoUser) => {
					notificationsContext.handleShowSuccessNotification(
						'notification.message.logIn.success'
					);
					modalContext.handleCloseModal();
					saveVinistoUser(vinistoUser);
					updateActiveSupplier(
						currentState.activeSupplierId,
						currentState.activeSupplierId,
						vinistoUser.suppliers,
						dispatch
					);
				})
				.catch((err: Error) => {
					let msg = 'notification.message.logIn.error';
					if (err.message === USER_LOGIN_ERROR) {
						msg = 'notification.message.logIn.error.credentials';
					} else if (err.message === USER_NO_SUPPLIERS_ERROR) {
						msg = 'notification.message.logIn.error.noSuppliers';
					}
					notificationsContext.handleShowErrorNotification(msg);
				});
		},
		[modalContext, notificationsContext, saveVinistoUser, updateActiveSupplier]
	);

	const logoutAction = useCallback(
		(
			currentState: AuthenticationState,
			dispatch: Dispatch<AuthenticationReducerAction>
		) => {
			if (!currentState.isLoggedIn || !currentState.vinistoUser?.loginHash)
				return;
			logout(dispatch, currentState.vinistoUser.loginHash)
				.then(() => {
					storageServiceInstance.removeItem(
						LocalStorageKeys.LOGIN_REDIRECT_PATH
					);
					notificationsContext.handleShowSuccessNotification(
						'notification.message.logOut.success'
					);
				})
				.catch(() => {
					notificationsContext.handleShowErrorNotification(
						'notification.message.logOut.error'
					);
				})
				.finally(() => {
					clearActiveSupplier();
					clearVinistoUser();
				});
		},
		[notificationsContext, clearVinistoUser, clearActiveSupplier]
	);

	const forceLogoutAction = useCallback(
		(
			currentState: AuthenticationState,
			dispatch: Dispatch<AuthenticationReducerAction>
		) => {
			if (!currentState.isLoggedIn) return;
			resetUser(dispatch);
			clearVinistoUser();
			clearActiveSupplier();
			notificationsContext.handleShowSuccessNotification(
				'notification.message.logOut.success'
			);
		},
		[notificationsContext, clearVinistoUser, clearActiveSupplier]
	);

	const oauthLoginAction = useCallback(
		(
			currentState: AuthenticationState,
			dispatch: Dispatch<AuthenticationReducerAction>,
			action: OAuthLoginAction
		) => {
			saveVinistoUser(action.payload);
			notificationsContext.handleShowSuccessNotification(
				'notification.message.logIn.success'
			);
			modalContext.handleCloseModal();

			updateActiveSupplier(
				currentState.activeSupplierId,
				currentState.activeSupplierId,
				action.payload.suppliers,
				dispatch
			);
		},
		[modalContext, notificationsContext, saveVinistoUser, updateActiveSupplier]
	);

	const registerAction = useCallback(
		(
			currentState: AuthenticationState,
			dispatch: Dispatch<AuthenticationReducerAction>,
			action: RegisterAction
		) => {
			if (currentState.isLoggedIn) return;
			register(
				dispatch,
				action.payload.email,
				action.payload.password,
				action.payload.isAgreementCC
			)
				.then((vinistoUser) => {
					saveVinistoUser(vinistoUser);
					saveActiveSupplier(vinistoUser.suppliers?.[0]?.id ?? '');
					setTimeout(() => {
						notificationsContext.handleShowSuccessNotification(
							'notification.message.registration.success'
						);
					}, UI_DELAY);
				})
				.catch(() => {
					notificationsContext.handleShowErrorNotification(
						'notification.message.registration.error'
					);
				});
		},
		[saveVinistoUser, saveActiveSupplier, notificationsContext]
	);

	const setUserAction = useCallback(
		(
			currentState: AuthenticationState,
			dispatch: Dispatch<AuthenticationReducerAction>,
			{ payload: user }: SetUserAction
		) => {
			if (user === null) {
				clearVinistoUser();
			} else {
				saveVinistoUser(user);
				// check if active supplier is within new user suppliers
				updateActiveSupplier(
					currentState.activeSupplierId,
					currentState.activeSupplierId,
					user.suppliers,
					dispatch
				);
			}
		},
		[clearVinistoUser, saveVinistoUser, updateActiveSupplier]
	);

	const updateSuppliersAction = useCallback(
		(
			currentState: AuthenticationState,
			dispatch: Dispatch<AuthenticationReducerAction>,
			{ payload: user }: UpdateSuppliersAction
		) => {
			if (!isEqual(currentState.vinistoUser?.suppliers, user.suppliers)) {
				dispatch({
					type: AuthenticationAction.setUser,
					payload: user,
				});
				saveVinistoUser(user);
				// check if active supplier is within updated suppliers
				updateActiveSupplier(
					currentState.activeSupplierId,
					currentState.activeSupplierId,
					user.suppliers,
					dispatch
				);
			}
		},
		[saveVinistoUser, updateActiveSupplier]
	);

	const updateSingleSupplierAction = useCallback(
		(
			currentState: AuthenticationState,
			dispatch: Dispatch<AuthenticationReducerAction>,
			{ payload: updatedSupplier }: UpdateSingleSupplierAction
		) => {
			const updatedSuppliers = [
				...(currentState.vinistoUser?.suppliers ?? []),
			].map((supplier) =>
				supplier.id === updatedSupplier.id
					? { ...supplier, ...updatedSupplier }
					: supplier
			);
			if (!isEqual(currentState.vinistoUser?.suppliers, updatedSuppliers)) {
				const user = {
					...currentState.vinistoUser,
					suppliers: updatedSuppliers,
				} as VinistoAuthDllModelsApiUserUser;
				dispatch({
					type: AuthenticationAction.setUser,
					payload: user,
				});
				saveVinistoUser(user);
				// check if active supplier is within updated suppliers
				updateActiveSupplier(
					currentState.activeSupplierId,
					currentState.activeSupplierId,
					user.suppliers,
					dispatch
				);
			}
		},
		[saveVinistoUser, updateActiveSupplier]
	);

	const authenticationMiddleware: Middleware<
		AuthenticationState,
		AuthenticationReducerAction
	> = useCallback(
		({ getState }) =>
			(next) =>
			(action) => {
				const currentState = getState();
				const suppliers = currentState.vinistoUser?.suppliers ?? [];

				switch (action.type) {
					case AuthenticationAction.logIn:
						loginAction(currentState, next, action);
						break;
					case AuthenticationAction.logOut:
						logoutAction(currentState, next);
						break;
					case AuthenticationAction.forceLogOut:
						forceLogoutAction(currentState, next);
						break;
					case AuthenticationAction.register:
						registerAction(currentState, next, action);
						break;
					case AuthenticationAction.setUser:
						setUserAction(currentState, next, action);
						break;
					case AuthenticationAction.updateSuppliers:
						updateSuppliersAction(currentState, next, action);
						return;
					case AuthenticationAction.updateSingleSupplier:
						updateSingleSupplierAction(currentState, next, action);
						return;
					case AuthenticationAction.setActiveSupplier:
						updateActiveSupplier(
							action.payload,
							currentState.activeSupplierId,
							suppliers,
							next
						);
						return;
					case AuthenticationAction.oauthLogIn:
						oauthLoginAction(currentState, next, action);
						return;
				}
				return next(action);
			},
		[
			loginAction,
			logoutAction,
			forceLogoutAction,
			registerAction,
			setUserAction,
			updateSuppliersAction,
			updateSingleSupplierAction,
			updateActiveSupplier,
			oauthLoginAction,
		]
	);

	const [state, dispatch] = useMiddlewareReducer(
		authenticationReducer,
		() => {
			// process on app initialization
			const initState = { ...defaultContextValue };
			const storedVinistoAuth = storageServiceInstance.getStorageItem(
				LocalStorageKeys.VINISTO_AUTH
			);
			if (typeof storedVinistoAuth === 'object' && storedVinistoAuth !== null) {
				initState.vinistoUser = getVinistoUser(
					storedVinistoAuth as VinistoAuthDllModelsApiUserUser
				);
				initState.isLoggedIn = true;
			}
			const storedActiveSupplier = storageServiceInstance.getStorageItem(
				LocalStorageKeys.ACTIVE_SUPPLIER
			);
			if (typeof storedActiveSupplier !== 'string') return initState;
			// no (valid) user remembered, save what we got from storage for selected supplier;
			// it will be validated after login
			if (initState.vinistoUser === null) {
				initState.activeSupplierId = storedActiveSupplier;
				return initState;
			}
			initState.activeSupplierId = getValidActiveSupplierId(
				storedActiveSupplier,
				initState.vinistoUser.suppliers
			);
			saveActiveSupplier(initState.activeSupplierId);
			return initState;
		},
		[authenticationMiddleware]
	);

	const localizationContextModel: AuthenticationContextValues = {
		...state,
		dispatch,
	};

	return (
		<AuthenticationContext.Provider value={localizationContextModel}>
			{children}
		</AuthenticationContext.Provider>
	);
};

export default AuthenticationProvider;
