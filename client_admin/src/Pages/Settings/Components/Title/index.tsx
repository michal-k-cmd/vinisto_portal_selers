import { FC } from 'react';
import withForm from 'Components/SingleEditForm/withForm';

import { AddressTitleFormProps, TitleFormFields } from './interfaces';
import { FIELD_NAME } from './constants';
import TitleInput from './input';

const FormAddressTitle = withForm<TitleFormFields>(TitleInput);

const AddressTitleForm: FC<AddressTitleFormProps> = ({
	formKey,
	initialValue,
	onSubmit,
	id,
}) => {
	return (
		<FormAddressTitle
			formKey={formKey}
			onSubmit={onSubmit}
			initialValues={{ [FIELD_NAME]: initialValue }}
			btnsClassName="single-edit-form__inline-btn-wrapper"
			id={id}
		/>
	);
};

export default AddressTitleForm;
