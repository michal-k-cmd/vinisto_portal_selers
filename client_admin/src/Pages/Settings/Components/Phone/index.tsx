import { FC } from 'react';
import withForm from 'Components/SingleEditForm/withForm';

import { AddressPhoneFormProps, PhoneFormFields } from './interfaces';
import { FIELD_NAME } from './constants';
import PhoneInput from './input';

const FormAddressPhone = withForm<PhoneFormFields>(PhoneInput);

const AddressPhoneForm: FC<AddressPhoneFormProps> = ({
	formKey,
	initialValue,
	onSubmit,
	id,
}) => {
	return (
		<FormAddressPhone
			formKey={formKey}
			onSubmit={onSubmit}
			initialValues={{ [FIELD_NAME]: initialValue }}
			btnsClassName="single-edit-form__inline-btn-wrapper"
			id={id}
		/>
	);
};

export default AddressPhoneForm;
