import { CFormControlWrapperProps } from '@coreui/react/dist/components/form/CFormControlWrapper';

export type TranslationObject = {
	id: string;
	[key: string]: any;
};

export type Validator<T = string> = (
	value: T,
	...args: any
) => string | undefined | TranslationObject | Promise<string | undefined>;

export interface FormControlProps<T = string> {
	name: string;
	identifier: string;
	label?: string | CFormControlWrapperProps['label'];
	labelClassName?: string;
	placeholder?: string;
	className?: string;
	validate?: Validator<T> | Validator<T>[];
	onChange?: (value: T) => void;
	showError?: boolean;
	disabled?: boolean;
}

export type TInputError<T> = T | null;
