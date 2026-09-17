import { createContext, FC, useContext } from 'react';
import { Middleware } from 'Hooks/useMiddlewareReducer/types';
import useMiddlewareReducer from 'Hooks/useMiddlewareReducer';
import { AuthenticationContext } from 'Services/AuthenticationService/context';
import UserService from 'Services/UserService';
import { NotificationsContext } from 'Services/NotificationService';

import { ChangePasswordAction, USER_WRONG_OLD_PASS } from './constants';
import {
	ChangePasswordReducerAction,
	IChangePasswordContextProps,
	IChangePasswordContextValues,
	IChangePasswordState,
} from './interfaces';

const defaultContextValue: IChangePasswordContextValues = {
	userLoginHash: '',
	dispatch: () => {},
};

export const ChangePasswordContext =
	createContext<IChangePasswordContextValues>(defaultContextValue);

const ChangePasswordContextProvider: FC<IChangePasswordContextProps> = ({
	children,
}) => {
	const authenticationContext = useContext(AuthenticationContext);
	const notificationsContext = useContext(NotificationsContext);

	const changePassword = async (
		userLoginHash: string,
		oldPassword: string,
		newPassword: string
	) => {
		return UserService.changePassword({
			userLoginHash,
			oldPassword,
			newPassword,
		})
			.then(() => {
				notificationsContext.handleShowSuccessNotification(
					'settings.password.success'
				);
			})
			.catch((error) => {
				return error.message === USER_WRONG_OLD_PASS
					? 'settings.password.error.wrongOldPass'
					: 'settings.password.error.general';
			});
	};

	const changePasswordMiddleware: Middleware<
		IChangePasswordState,
		ChangePasswordReducerAction
	> =
		({ getState }) =>
		() =>
		(action) => {
			const [type, payload] = action;
			switch (type) {
				case ChangePasswordAction.change:
					return changePassword(
						getState().userLoginHash,
						payload.currentPassword,
						payload.newPassword
					);
			}
		};

	const [state, dispatch] = useMiddlewareReducer(
		(s) => s,
		{
			...defaultContextValue,
			userLoginHash: authenticationContext.vinistoUser?.loginHash ?? '',
		},
		[changePasswordMiddleware]
	);

	const contextValues = {
		...state,
		dispatch,
	};

	return (
		<ChangePasswordContext.Provider value={contextValues}>
			{children}
		</ChangePasswordContext.Provider>
	);
};

export default ChangePasswordContextProvider;
