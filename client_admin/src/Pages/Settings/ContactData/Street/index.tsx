import { FC, useCallback, useContext } from 'react';
import { StreetFormFields } from 'Pages/Settings/Components/Street/interfaces';
import { FIELD_NAME } from 'Pages/Settings/Components/Street/constants';
import { SupplierAddressAction } from 'Pages/Settings/SupplierAddressContext/constants';
import { SupplierAddressContext } from 'Pages/Settings/SupplierAddressContext';
import AddressStreetForm from 'Pages/Settings/Components/Street';

const ContactStreetForm: FC = () => {
	const { dispatch, street } = useContext(SupplierAddressContext);

	const handleOnSubmit = useCallback(
		async (values: StreetFormFields) => {
			const submitError = await dispatch([
				SupplierAddressAction.setStreet,
				values[FIELD_NAME],
			]);
			return Promise.resolve({
				[FIELD_NAME]: submitError,
			});
		},
		[dispatch]
	);

	return (
		<AddressStreetForm
			formKey="contactStreet"
			id="contactStreet"
			onSubmit={handleOnSubmit}
			initialValue={street}
		/>
	);
};

export default ContactStreetForm;
