import { FC } from 'react';
import withForm from 'Components/SingleEditForm/withForm';

import { AddressCityFormProps, CityFormFields } from './interfaces';
import { FIELD_NAME } from './constants';
import CityInput from './input';

const FormAddressCity = withForm<CityFormFields>(CityInput);

const AddressCityForm: FC<AddressCityFormProps> = ({
	formKey,
	initialValue,
	onSubmit,
	id,
}) => {
	return (
		<FormAddressCity
			formKey={formKey}
			onSubmit={onSubmit}
			initialValues={{ [FIELD_NAME]: initialValue }}
			btnsClassName="single-edit-form__inline-btn-wrapper"
			id={id}
		/>
	);
};

export default AddressCityForm;
