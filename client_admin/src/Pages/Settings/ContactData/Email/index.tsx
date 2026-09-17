import { FC, useCallback, useContext } from 'react';
import { EmailFormFields } from 'Pages/Settings/Components/Email/interfaces';
import { FIELD_NAME } from 'Pages/Settings/Components/Email/constants';
import { SupplierAddressAction } from 'Pages/Settings/SupplierAddressContext/constants';
import { SupplierAddressContext } from 'Pages/Settings/SupplierAddressContext';
import AddressEmailForm from 'Pages/Settings/Components/Email';

const ContactEmailForm: FC = () => {
	const { dispatch, email } = useContext(SupplierAddressContext);

	const handleOnSubmit = useCallback(
		async (values: EmailFormFields) => {
			const submitError = await dispatch([
				SupplierAddressAction.setEmail,
				values[FIELD_NAME],
			]);
			return Promise.resolve({
				[FIELD_NAME]: submitError,
			});
		},
		[dispatch]
	);

	return (
		<AddressEmailForm
			formKey="contactEmail"
			id="contactEmail"
			onSubmit={handleOnSubmit}
			initialValue={email}
		/>
	);
};

export default ContactEmailForm;
