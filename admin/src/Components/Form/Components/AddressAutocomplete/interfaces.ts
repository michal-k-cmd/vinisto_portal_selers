import { VinistoSmartformDllModelsResponsePostResponseAddress } from 'vinisto_api_client/src/api-types/services-api/';
import { OmitConstrained } from 'types';

import { InputAutocompleteAsyncProps } from '../AutocompleteAsync/interfaces';

export type SmartformAddress = NonNullable<
	VinistoSmartformDllModelsResponsePostResponseAddress['values']
>;

export interface AutocompleteOptionAddress {
	label: string;
	value: SmartformAddress;
}

export interface AddressAutocompleteProps
	extends OmitConstrained<
		InputAutocompleteAsyncProps<AutocompleteOptionAddress>,
		'options'
	> {
	options?: AutocompleteOptionAddress[];
	onSelect?: (address: AutocompleteOptionAddress['value']) => void;
}
