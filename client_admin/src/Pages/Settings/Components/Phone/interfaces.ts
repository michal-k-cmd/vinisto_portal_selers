import { FIELD_NAME } from './constants';

export interface PhoneFormFields {
	[FIELD_NAME]: string;
}

export interface AddressPhoneFormProps {
	formKey: string;
	initialValue?: PhoneFormFields[typeof FIELD_NAME];
	onSubmit: (values: PhoneFormFields) => Promise<PhoneFormFields>;
	id: string;
}
