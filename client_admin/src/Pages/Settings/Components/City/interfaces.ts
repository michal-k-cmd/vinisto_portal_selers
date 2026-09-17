import { FIELD_NAME } from './constants';

export interface CityFormFields {
	[FIELD_NAME]: string;
}

export interface AddressCityFormProps {
	formKey: string;
	initialValue?: CityFormFields[typeof FIELD_NAME];
	onSubmit: (values: CityFormFields) => Promise<CityFormFields>;
	id: string;
}
