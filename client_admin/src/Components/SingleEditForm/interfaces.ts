import { ReactNode } from 'react';
import { Config } from 'final-form';
import { Dispatch } from 'Hooks/useMiddlewareReducer/types';

import { SingleEditFormAction } from './constants';

import { VinistoHelperDllEnumsPriceLevel } from '@/api-types/product-api';

export interface SingleEditFormContextProps {
	children: ReactNode;
}

export interface SingleEditFormState {
	isLoading: boolean;
	editEnabledField: SingleEditFormProps<Record<string, any>>['formKey'] | null;
	isDirty: boolean;
}

export type SetAllAction = [
	SingleEditFormAction.setAll,
	Partial<SingleEditFormState>
];

export type SetIsEditEnabled = [
	SingleEditFormAction.setEditEnabledField,
	SingleEditFormState['editEnabledField']
];

export type SetIsLoading = [
	SingleEditFormAction.setIsLoading,
	SingleEditFormState['isLoading']
];

export type SetIsDirty = [
	SingleEditFormAction.setIsDirty,
	SingleEditFormState['isDirty']
];

export type SingleEditFormReducerAction =
	| SetAllAction
	| SetIsEditEnabled
	| SetIsLoading
	| SetIsDirty;

export interface SingleEditFormContextValues extends SingleEditFormState {
	dispatch: Dispatch<SingleEditFormReducerAction>;
}

export interface SingleEditFormProps<FormValues> {
	formKey: string;
	onSubmit: Config<FormValues>['onSubmit'];
	initialValues?: Partial<FormValues>;
	labelValue?: Partial<FormValues>;
	wrapperClassName?: string;
	btnsClassName?: string;
	children?: ReactNode;
	id?: string | string[];
	priceLevel?: VinistoHelperDllEnumsPriceLevel | undefined;
	platformId?: number;
	priceControls?: boolean;
}

export interface SingleEditWrapperComponentProps {
	label: (labelText: string | ReactNode) => ReactNode;
	disabled: boolean;
	children?: ReactNode;
	id?: string | string[];
	labelValue?: number;
	priceLevel: VinistoHelperDllEnumsPriceLevel | undefined;
	platformId?: number;
	inputSuffix?: ReactNode;
}
