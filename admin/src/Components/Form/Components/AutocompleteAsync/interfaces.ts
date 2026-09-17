import { FormControlProps } from 'Components/Form/interfaces';

export interface AutocompleteOptionBase {
	label: string;
	value: any;
}

export interface AutocompleteOption extends AutocompleteOptionBase {
	value: string;
}

export interface InputAutocompleteAsyncProps<T extends AutocompleteOptionBase>
	extends FormControlProps<T[]> {
	options: T[];
	labelKey?: string;
	onSearchCallback?: (searchingNameString: string) => void;
	isLoading?: boolean;
	minLength?: number;
	defaultInputValue?: string;
}
