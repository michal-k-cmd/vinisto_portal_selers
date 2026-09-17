import { createContext, FC, useContext } from 'react';
import { Dispatch, Middleware } from 'Hooks/useMiddlewareReducer/types';
import useMiddlewareReducer from 'Hooks/useMiddlewareReducer';
import { AuthenticationContext } from 'Services/AuthenticationService/context';
import UserService from 'Services/UserService';
import { AuthenticationAction } from 'Services/AuthenticationService/constants';
import { NotificationsContext } from 'Services/NotificationService';

import { EditEmailAction, USER_UPDATE_USER_EMAIL_EXIST } from './constants';
import {
	EditEmailReducerAction,
	IEditEmailContextProps,
	IEditEmailContextValues,
	IEditEmailState,
} from './interfaces';
import { editEmailReducer } from './reducer';

const defaultContextValue: IEditEmailContextValues = {
	email: '',
	userId: '',
	userLoginHash: '',
	dispatch: () => {},
};

export const EditEmailContext =
	createContext<IEditEmailContextValues>(defaultContextValue);

const EditEmailContextProvider: FC<IEditEmailContextProps> = ({ children }) => {
	const authenticationContext = useContext(AuthenticationContext);
	const notificationsContext = useContext(NotificationsContext);

	const updateEmail = async (
		userId: string,
		userLoginHash: string,
		email: string,
		dispatch: Dispatch<EditEmailReducerAction>
	) => {
		return UserService.update(userId, {
			userLoginHash,
			email,
		})
			.then((vinistoUser) => {
				authenticationContext.dispatch({
					type: AuthenticationAction.setUser,
					payload: vinistoUser ?? null,
				});
				dispatch([EditEmailAction.update, vinistoUser?.email ?? '']);
				notificationsContext.handleShowSuccessNotification(
					'settings.email.success'
				);
			})
			.catch((error) => {
				return error.message === USER_UPDATE_USER_EMAIL_EXIST
					? 'settings.email.error.alreadyUsed'
					: 'settings.email.error.general';
			});
	};

	const editEmailMiddleware: Middleware<
		IEditEmailState,
		EditEmailReducerAction
	> =
		({ getState }) =>
		(next) =>
		(action) => {
			const [type, payload] = action;
			switch (type) {
				case EditEmailAction.update:
					return updateEmail(
						getState().userId,
						getState().userLoginHash,
						payload,
						next
					);
			}
		};

	const [state, dispatch] = useMiddlewareReducer(
		editEmailReducer,
		{
			...defaultContextValue,
			email: authenticationContext.vinistoUser?.email ?? '',
			userId: authenticationContext.vinistoUser?.id ?? '',
			userLoginHash: authenticationContext.vinistoUser?.loginHash ?? '',
		},
		[editEmailMiddleware]
	);

	const contextValues = {
		...state,
		dispatch,
	};

	return (
		<EditEmailContext.Provider value={contextValues}>
			{children}
		</EditEmailContext.Provider>
	);
};

export default EditEmailContextProvider;
