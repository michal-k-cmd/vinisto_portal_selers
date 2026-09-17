import { FC } from 'react';
import withForm from 'Components/SingleEditForm/withForm';

import {
	AddressHouseNumberFormProps,
	HouseNumberFormFields,
} from './interfaces';
import { FIELD_NAME } from './constants';
import HouseNumberInput from './input';

const FormAddressHouseNumber =
	withForm<HouseNumberFormFields>(HouseNumberInput);

const AddressHouseNumberForm: FC<AddressHouseNumberFormProps> = ({
	formKey,
	initialValue,
	onSubmit,
	id,
}) => {
	return (
		<FormAddressHouseNumber
			formKey={formKey}
			onSubmit={onSubmit}
			initialValues={{ [FIELD_NAME]: initialValue }}
			btnsClassName="single-edit-form__inline-btn-wrapper"
			id={id}
		/>
	);
};

export default AddressHouseNumberForm;
