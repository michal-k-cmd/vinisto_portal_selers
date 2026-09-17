import { CFormControlWrapperProps } from '@coreui/react/dist/components/form/CFormControlWrapper';

export type ValidatorBase<T = string> = (
	value: T,
	...args: unknown[]
) => string | undefined;
export type RequiredValidatorCustomMessage<T = string> = ValidatorBase<T> & {
	isRequiredCustomMessage: boolean;
};
export type Validator<T = string | Date> =
	| ValidatorBase<T>
	| RequiredValidatorCustomMessage<T>;

export interface FormControlProps<T = string> {
	name: string;
	identifier: string;
	label?: string | CFormControlWrapperProps['label'];
	labelClassName?: string;
	placeholder?: string;
	className?: string;
	validate?: Validator<T> | Validator<T>[];
	onChange?: (value: T) => void;
	onFocus?: (event: React.FocusEvent<HTMLInputElement>) => void;
	onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
	showError?: boolean;
	disabled?: boolean;
}
