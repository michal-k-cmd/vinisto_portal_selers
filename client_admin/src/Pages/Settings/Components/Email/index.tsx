import { FC } from 'react';
import withForm from 'Components/SingleEditForm/withForm';

import { AddressEmailFormProps, EmailFormFields } from './interfaces';
import { FIELD_NAME } from './constants';
import EmailInput from './input';

const FormAddressEmail = withForm<EmailFormFields>(EmailInput);

const AddressEmailForm: FC<AddressEmailFormProps> = ({
	formKey,
	initialValue,
	onSubmit,
	id,
}) => {
	return (
		<FormAddressEmail
			formKey={formKey}
			onSubmit={onSubmit}
			initialValues={{ [FIELD_NAME]: initialValue }}
			btnsClassName="single-edit-form__inline-btn-wrapper"
			id={id}
		/>
	);
};

export default AddressEmailForm;
