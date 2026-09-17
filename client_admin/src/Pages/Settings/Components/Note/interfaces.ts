import { FIELD_NAME } from './constants';

export interface NoteFormFields {
	[FIELD_NAME]: string;
}

export interface AddressNoteFormProps {
	formKey: string;
	initialValue?: NoteFormFields[typeof FIELD_NAME];
	onSubmit: (values: NoteFormFields) => Promise<NoteFormFields>;
	id: string;
}
