import { FC } from 'react';
import withForm from 'Components/SingleEditForm/withForm';

import {
	AddressLandRegistryNumberFormProps,
	LandRegistryNumberFormFields,
} from './interfaces';
import { FIELD_NAME } from './constants';
import LandRegistryNumberInput from './input';

const FormAddressLandRegistryNumber = withForm<LandRegistryNumberFormFields>(
	LandRegistryNumberInput
);

const AddressLandRegistryNumberForm: FC<AddressLandRegistryNumberFormProps> = ({
	formKey,
	initialValue,
	onSubmit,
	id,
}) => {
	return (
		<FormAddressLandRegistryNumber
			formKey={formKey}
			onSubmit={onSubmit}
			initialValues={{ [FIELD_NAME]: initialValue }}
			btnsClassName="single-edit-form__inline-btn-wrapper"
			id={id}
		/>
	);
};

export default AddressLandRegistryNumberForm;
