import { FIELD_NAME } from './constants';

export interface CountryCodeFormFields {
	[FIELD_NAME]: string;
}

export interface AddressCountryCodeFormProps {
	formKey: string;
	initialValue?: CountryCodeFormFields[typeof FIELD_NAME];
	onSubmit: (values: CountryCodeFormFields) => Promise<CountryCodeFormFields>;
	id: string;
}
