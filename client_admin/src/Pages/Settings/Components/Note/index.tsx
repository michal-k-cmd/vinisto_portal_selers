import { FC } from 'react';
import withForm from 'Components/SingleEditForm/withForm';

import { AddressNoteFormProps, NoteFormFields } from './interfaces';
import { FIELD_NAME } from './constants';
import NoteInput from './input';

const FormAddressNote = withForm<NoteFormFields>(NoteInput);

const AddressNoteForm: FC<AddressNoteFormProps> = ({
	formKey,
	initialValue,
	onSubmit,
	id,
}) => {
	return (
		<FormAddressNote
			formKey={formKey}
			onSubmit={onSubmit}
			initialValues={{ [FIELD_NAME]: initialValue }}
			btnsClassName="single-edit-form__inline-btn-wrapper"
			id={id}
		/>
	);
};

export default AddressNoteForm;
