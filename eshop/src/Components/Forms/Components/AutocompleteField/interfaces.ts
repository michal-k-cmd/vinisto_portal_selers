import { ChangeEvent, ReactNode } from 'react';
import {
	ControllerProps,
	ControllerRenderProps,
	FieldPath,
	FieldValues,
} from 'react-hook-form';
import Form from 'Components/Forms';
import { TestIdType } from 'Constants/test-ids';

import { ComboboxRenderPropArg } from '../Autocomplete/interfaces';

export type AutocompleteFieldProps<
	T extends Record<string, any> = Record<string, any>
> = {
	id?: string;
	name: FieldPath<FieldValues>;
	label?: ReactNode;
	placeholder?:
		| string
		| ((props: ComboboxRenderPropArg<T> & { inputValue: string }) => string);
	wrapperClassName?: string;
	labelClassName?: string;
	inputClassName?: string;
	messageClassName?: string;
	showSuccess?: boolean;
	showSuccessIcon?: boolean;
	showError?: boolean;
	successMessage?: string;
	isRequired?: boolean;
	rules?: ControllerProps['rules'];
	setValueOnSelect: (
		selectedItem: T,
		field: ControllerRenderProps<FieldValues, any>
	) => string;
	onSelect?: (selectedItem: T) => void;
	onChangeInput?: (
		event: ChangeEvent<HTMLInputElement>,
		fieldId: string
	) => void;
	dropdownContent?:
		| ReactNode
		| ((props: ComboboxRenderPropArg<T> & { inputValue: string }) => ReactNode);

	inputLeftContent?: ReactNode;
	inputRightContent?: ReactNode;

	inputProps?: Parameters<typeof Form.Input>[0];
	inputPlaceholderProps?: Parameters<typeof Form.Input>[0];
	dataTestid?: TestIdType;
};
