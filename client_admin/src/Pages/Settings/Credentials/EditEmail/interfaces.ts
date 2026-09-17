import { ReactNode } from 'react';
import { Dispatch } from 'Hooks/useMiddlewareReducer/types';

import { EditEmailAction, FIELD_ID } from './constants';

export interface IEditEmailContextProps {
	children: ReactNode;
}

export interface IEditEmailState {
	email: string;
	userId: string;
	userLoginHash: string;
}

export type UpdateAction = [EditEmailAction.update, IEditEmailState['email']];

export type EditEmailReducerAction = UpdateAction;

export interface IEditEmailContextValues extends IEditEmailState {
	dispatch: Dispatch<EditEmailReducerAction>;
}

export interface IEditEmailForm {
	[FIELD_ID]: string;
}
