import { AuthenticationReducerAction, AuthenticationState } from './interfaces';
import { AuthenticationAction } from './constants';

export const authenticationReducer = (
	state: AuthenticationState,
	action: AuthenticationReducerAction
): AuthenticationState => {
	switch (action.type) {
		case AuthenticationAction.setUser:
			return {
				...state,
				vinistoUser: action.payload,
				isLoggedIn: action.payload !== null,
			};
		case AuthenticationAction.setActiveSupplier:
			return {
				...state,
				activeSupplierId: action.payload,
			};
	}
	return state;
};
