import { Config } from 'final-form';
import { ReactNode } from 'react';
import { FormRenderProps, RenderableProps } from 'react-final-form';

export type FormValues = Record<string, string | number | undefined>;

export interface FormProps<T extends FormValues> {
	className?: string;
	submitLabel?: string;
	submitClassName?: string;
	onSubmit?: (formValues: T) => void;
	validate?: (values: T) => Record<string, string> | undefined;
	initialValues?: T;
	// TODO make following props library independent
	mutators?: Config<T>['mutators'];
	children: ReactNode | RenderableProps<FormRenderProps<T>>['render'];
}
