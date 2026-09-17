import { FC } from 'react';
import withForm from 'Components/SingleEditForm/withForm';

import {
	AddressCountryCodeFormProps,
	CountryCodeFormFields,
} from './interfaces';
import { FIELD_NAME } from './constants';
import CountryCodeSelect from './input';

const FormAddressCountryCode =
	withForm<CountryCodeFormFields>(CountryCodeSelect);

const AddressCountryCodeForm: FC<AddressCountryCodeFormProps> = ({
	formKey,
	initialValue,
	onSubmit,
	id,
}) => {
	return (
		<FormAddressCountryCode
			formKey={formKey}
			onSubmit={onSubmit}
			initialValues={{ [FIELD_NAME]: initialValue }}
			btnsClassName="single-edit-form__inline-btn-wrapper"
			id={id}
		/>
	);
};

export default AddressCountryCodeForm;
