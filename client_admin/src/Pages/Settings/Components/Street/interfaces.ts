import { FIELD_NAME } from './constants';

export interface StreetFormFields {
	[FIELD_NAME]: string;
}

export interface AddressStreetFormProps {
	formKey: string;
	initialValue?: StreetFormFields[typeof FIELD_NAME];
	onSubmit: (values: StreetFormFields) => Promise<StreetFormFields>;
	id: string;
}
