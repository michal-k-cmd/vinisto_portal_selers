import { FC } from 'react';
import withForm from 'Components/SingleEditForm/withForm';

import { AddressZipFormProps, ZipFormFields } from './interfaces';
import { FIELD_NAME } from './constants';
import ZipInput from './input';

const FormAddressZip = withForm<ZipFormFields>(ZipInput);

const AddressZipForm: FC<AddressZipFormProps> = ({
	formKey,
	initialValue,
	onSubmit,
	id,
}) => {
	return (
		<FormAddressZip
			formKey={formKey}
			onSubmit={onSubmit}
			initialValues={{ [FIELD_NAME]: initialValue }}
			btnsClassName="single-edit-form__inline-btn-wrapper"
			id={id}
		/>
	);
};

export default AddressZipForm;
