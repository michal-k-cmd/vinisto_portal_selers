import { TypeaheadProps } from 'react-bootstrap-typeahead';
import { FormControlProps } from 'Components/Form/interfaces';

export type AutocompleteTypeaheadModel = Record<any, any>;

export interface InputAutocompleteProps
	extends FormControlProps<AutocompleteTypeaheadModel> {
	options: TypeaheadProps<AutocompleteTypeaheadModel>['options'];
	labelKey?: TypeaheadProps<AutocompleteTypeaheadModel>['labelKey'];
	isRequired?: boolean;
}
