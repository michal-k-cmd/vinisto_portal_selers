export const REGISTRATION_API_PATH = 'user-api/users';
export const LOG_IN_API_PATH = 'user-api/users/auth/Login';
export const LOG_OUT_API_PATH = 'user-api/users/auth/Logout';
export const FORGOTTEN_PASSWORD_API_PATH = 'user-api/forgotten-password';

export const USER_LOGIN_ERROR = 'USER_LOGIN_ERROR';
export const USER_NO_SUPPLIERS_ERROR = 'USER_NO_SUPPLIERS_ERROR';

export const UI_DELAY = 300;

export enum AuthenticationAction {
	setUser = 'setUser',
	updateSuppliers = 'updateSuppliers',
	updateSingleSupplier = 'updateSingleSupplier',
	setActiveSupplier = 'setActiveSupplier',
	logIn = 'logIn',
	logOut = 'logOut',
	forceLogOut = 'forceLogOut',
	register = 'register',
	oauthLogIn = 'oauthLogIn',
}
