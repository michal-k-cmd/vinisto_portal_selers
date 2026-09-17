import { ChangeEvent, ReactNode } from 'react';
import Form from 'Components/Forms';
import { TestIdType } from 'Constants/test-ids';

export type ComboboxRenderPropArg<T> = {
	open: boolean;
	disabled: boolean;
	activeIndex: number | null;
	activeOption: T | null;
	value: T;
};

export type AutocompleteProps<T> = {
	value: string;
	onChange: (e: ChangeEvent<HTMLInputElement>) => void;
	selectedItem?: T;
	onSelect: (selectedItem: T) => void;
	placeholderValue?:
		| string
		| ((props: ComboboxRenderPropArg<T> & { inputValue: string }) => string);

	label?: ReactNode;

	isDropdownMenuOpen?: boolean | null;

	inputLeftContent?: ReactNode;
	inputRightContent?: ReactNode;
	dropdownContent?:
		| ReactNode
		| ((props: ComboboxRenderPropArg<T> & { inputValue: string }) => ReactNode);

	className?: string;
	contentWrapperClassName?: string;
	inputsWrapperClassName?: string;
	dropdownClassName?: string;

	inputProps?: Parameters<typeof Form.Input>[0];
	inputPlaceholderProps?: Parameters<typeof Form.Input>[0];
	dataTestid?: TestIdType;
};
