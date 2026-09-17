import { get } from 'lodash-es';
import { Dispatch } from 'Hooks/useMiddlewareReducer/types';
import UserService, { getVinistoUser } from 'Services/UserService';

import { AuthenticationReducerAction } from './interfaces';
import { AuthenticationAction, USER_NO_SUPPLIERS_ERROR } from './constants';

import { authenticationServiceInstance } from '.';

export const login = async (
	dispatch: Dispatch<AuthenticationReducerAction>,
	email: string,
	password: string
) => {
	return authenticationServiceInstance
		.logIn(email, password)
		.then(async (payload) => {
			return UserService.getSupplier(get(payload, 'user.loginHash', '')).then(
				(vinistoUser) => {
					if (!vinistoUser?.suppliers?.length) {
						throw new Error(USER_NO_SUPPLIERS_ERROR);
					}
					dispatch({
						type: AuthenticationAction.setUser,
						payload: vinistoUser,
					});
					return vinistoUser;
				}
			);
		});
};

export const logout = async (
	dispatch: Dispatch<AuthenticationReducerAction>,
	userLoginHash: string
) => {
	return authenticationServiceInstance.logOut(userLoginHash).finally(() => {
		resetUser(dispatch);
	});
};

export const resetUser = (dispatch: Dispatch<AuthenticationReducerAction>) => {
	dispatch({
		type: AuthenticationAction.setUser,
		payload: null,
	});
	dispatch({
		type: AuthenticationAction.setActiveSupplier,
		payload: '',
	});
};

export const register = async (
	dispatch: Dispatch<AuthenticationReducerAction>,
	email: string,
	password: string,
	isAgreementCC: boolean
) => {
	return authenticationServiceInstance
		.register(email, password, isAgreementCC)
		.then((payload) => {
			// @ts-expect-error payload is unknown
			const vinistoUser = getVinistoUser(payload?.user);

			dispatch({
				type: AuthenticationAction.setUser,
				payload: vinistoUser,
			});
			return vinistoUser;
		});
};
