import { FIELD_NAME } from './constants';

export interface TitleFormFields {
	[FIELD_NAME]: string;
}

export interface AddressTitleFormProps {
	formKey: string;
	initialValue?: TitleFormFields[typeof FIELD_NAME];
	onSubmit: (values: TitleFormFields) => Promise<TitleFormFields>;
	id: string;
}
