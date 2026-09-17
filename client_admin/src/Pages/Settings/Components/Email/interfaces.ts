import { FIELD_NAME } from './constants';

export interface EmailFormFields {
	[FIELD_NAME]: string;
}

export interface AddressEmailFormProps {
	formKey: string;
	initialValue?: EmailFormFields[typeof FIELD_NAME];
	onSubmit: (values: EmailFormFields) => Promise<EmailFormFields>;
	id: string;
}
