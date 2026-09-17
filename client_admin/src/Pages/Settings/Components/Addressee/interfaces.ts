import { FIELD_NAME } from './constants';

export interface AddresseeFormFields {
	[FIELD_NAME]: string;
}

export interface AddressAddresseeFormProps {
	formKey: string;
	initialValue?: AddresseeFormFields[typeof FIELD_NAME];
	onSubmit: (values: AddresseeFormFields) => Promise<AddresseeFormFields>;
	id: string;
}
