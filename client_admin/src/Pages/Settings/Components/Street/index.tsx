import { FC } from 'react';
import withForm from 'Components/SingleEditForm/withForm';

import { AddressStreetFormProps, StreetFormFields } from './interfaces';
import { FIELD_NAME } from './constants';
import StreetInput from './input';

const FormAddressStreet = withForm<StreetFormFields>(StreetInput);

const AddressStreetForm: FC<AddressStreetFormProps> = ({
	formKey,
	initialValue,
	onSubmit,
	id,
}) => {
	return (
		<FormAddressStreet
			formKey={formKey}
			onSubmit={onSubmit}
			initialValues={{ [FIELD_NAME]: initialValue }}
			btnsClassName="single-edit-form__inline-btn-wrapper"
			id={id}
		/>
	);
};

export default AddressStreetForm;
