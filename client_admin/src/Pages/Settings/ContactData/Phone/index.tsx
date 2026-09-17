import { FC, useCallback, useContext } from 'react';
import { PhoneFormFields } from 'Pages/Settings/Components/Phone/interfaces';
import { SupplierAddressAction } from 'Pages/Settings/SupplierAddressContext/constants';
import { FIELD_NAME } from 'Pages/Settings/Components/Phone/constants';
import { SupplierAddressContext } from 'Pages/Settings/SupplierAddressContext';
import AddressPhoneForm from 'Pages/Settings/Components/Phone';

const ContactPhoneForm: FC = () => {
	const { dispatch, phone } = useContext(SupplierAddressContext);

	const handleOnSubmit = useCallback(
		async (values: PhoneFormFields) => {
			const submitError = await dispatch([
				SupplierAddressAction.setPhone,
				values[FIELD_NAME],
			]);
			return Promise.resolve({
				[FIELD_NAME]: submitError,
			});
		},
		[dispatch]
	);

	return (
		<AddressPhoneForm
			formKey="contactPhone"
			id="contactPhone"
			onSubmit={handleOnSubmit}
			initialValue={phone}
		/>
	);
};

export default ContactPhoneForm;
