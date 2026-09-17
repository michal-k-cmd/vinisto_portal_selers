import { FIELD_NAME } from './constants';

export interface LandRegistryNumberFormFields {
	[FIELD_NAME]: string;
}

export interface AddressLandRegistryNumberFormProps {
	formKey: string;
	initialValue?: LandRegistryNumberFormFields[typeof FIELD_NAME];
	onSubmit: (
		values: LandRegistryNumberFormFields
	) => Promise<LandRegistryNumberFormFields>;
	id: string;
}
