import { FIELD_NAME } from './constants';

export interface ZipFormFields {
	[FIELD_NAME]: string;
}

export interface AddressZipFormProps {
	formKey: string;
	initialValue?: ZipFormFields[typeof FIELD_NAME];
	onSubmit: (values: ZipFormFields) => Promise<ZipFormFields>;
	id: string;
}
