import { FC } from 'react';
import withForm from 'Components/SingleEditForm/withForm';

import { AddressAddresseeFormProps, AddresseeFormFields } from './interfaces';
import { FIELD_NAME } from './constants';
import AddresseeInput from './input';

const FormAddressAddressee = withForm<AddresseeFormFields>(AddresseeInput);

const AddressAddresseeForm: FC<AddressAddresseeFormProps> = ({
	formKey,
	initialValue,
	onSubmit,
	id,
}) => {
	return (
		<FormAddressAddressee
			formKey={formKey}
			onSubmit={onSubmit}
			initialValues={{ [FIELD_NAME]: initialValue }}
			btnsClassName="single-edit-form__inline-btn-wrapper"
			id={id}
		/>
	);
};

export default AddressAddresseeForm;
