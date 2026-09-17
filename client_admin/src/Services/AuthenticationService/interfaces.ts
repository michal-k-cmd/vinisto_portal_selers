import { ReactNode } from 'react';
import { Dispatch } from 'Hooks/useMiddlewareReducer/types';
import { VinistoAuthDllModelsApiUserUser } from 'vinisto_api_client/src/api-types/user-api';
import { VinistoSupplierDllModelsApiSupplierSupplier } from 'vinisto_api_client/src/api-types/supplier-api';

import { AuthenticationAction } from './constants';

export type IVinistoUser = VinistoAuthDllModelsApiUserUser;

export interface AuthenticationState {
	isLoggedIn: boolean;
	vinistoUser: IVinistoUser | null;
	activeSupplierId: NonNullable<
		VinistoSupplierDllModelsApiSupplierSupplier['id']
	>;
}

export interface AuthenticationContextValues extends AuthenticationState {
	dispatch: Dispatch<AuthenticationReducerAction>;
}

export interface AuthenticationContextProviderProps {
	children: ReactNode;
}

export type SetUserAction = {
	type: AuthenticationAction.setUser;
	payload: AuthenticationState['vinistoUser'];
};

export type UpdateSuppliersAction = {
	type: AuthenticationAction.updateSuppliers;
	payload: NonNullable<AuthenticationState['vinistoUser']>;
};

export type UpdateSingleSupplierAction = {
	type: AuthenticationAction.updateSingleSupplier;
	payload: NonNullable<
		NonNullable<AuthenticationState['vinistoUser']>['suppliers']
	>[0];
};

export type SetActiveSupplierAction = {
	type: AuthenticationAction.setActiveSupplier;
	payload: AuthenticationState['activeSupplierId'];
};

export type LoginAction = {
	type: AuthenticationAction.logIn;
	payload: {
		email: string;
		password: string;
	};
};

export type LogOutAction = {
	type: AuthenticationAction.logOut;
};

export type ForceLogOutAction = {
	type: AuthenticationAction.forceLogOut;
};

export type RegisterAction = {
	type: AuthenticationAction.register;
	payload: {
		email: string;
		password: string;
		isAgreementCC: boolean;
	};
};

export type OAuthLoginAction = {
	type: AuthenticationAction.oauthLogIn;
	payload: IVinistoUser;
};

export type AuthenticationReducerAction =
	| SetUserAction
	| UpdateSuppliersAction
	| UpdateSingleSupplierAction
	| SetActiveSupplierAction
	| LoginAction
	| LogOutAction
	| ForceLogOutAction
	| RegisterAction
	| OAuthLoginAction;

export interface RequireAuthProps {
	children: ReactNode;
}
