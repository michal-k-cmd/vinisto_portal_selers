import { ReactNode } from 'react';
import { Dispatch } from 'Hooks/useMiddlewareReducer/types';

import {
	ChangePasswordAction,
	CURRENT_PASSWORD_FIELD,
	NEW_PASSWORD_FIELD,
	PASSWORD_PLACEHOLDER_FIELD,
} from './constants';

export interface IChangePasswordContextProps {
	children: ReactNode;
}

export interface IChangePasswordState {
	userLoginHash: string;
}

export type ChangeAction = [
	ChangePasswordAction.change,
	{
		currentPassword: string;
		newPassword: string;
	}
];

export type ChangePasswordReducerAction = ChangeAction;

export interface IChangePasswordContextValues extends IChangePasswordState {
	dispatch: Dispatch<ChangePasswordReducerAction>;
}

export interface IChangePasswordForm {
	[PASSWORD_PLACEHOLDER_FIELD]: string;
	[CURRENT_PASSWORD_FIELD]: string;
	[NEW_PASSWORD_FIELD]: string;
}
