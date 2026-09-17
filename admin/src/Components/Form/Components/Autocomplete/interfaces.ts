import { FormControlProps } from 'Components/Form/interfaces';

export interface InputAutocompleteProps
	extends FormControlProps<Record<any, any>[]> {
	options: Record<any, any>[];
	labelKey?: string;
}
