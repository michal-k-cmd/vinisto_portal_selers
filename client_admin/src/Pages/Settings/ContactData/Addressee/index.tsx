import { FC, useCallback, useContext } from 'react';
import { SupplierAddressAction } from 'Pages/Settings/SupplierAddressContext/constants';
import { SupplierAddressContext } from 'Pages/Settings/SupplierAddressContext';
import AddressAddresseeForm from 'Pages/Settings/Components/Addressee';
import { FIELD_NAME } from 'Pages/Settings/Components/Addressee/constants';
import { AddresseeFormFields } from 'Pages/Settings/Components/Addressee/interfaces';

const ContactAddresseeForm: FC = () => {
	const { dispatch, addressee } = useContext(SupplierAddressContext);

	const handleOnSubmit = useCallback(
		async (values: AddresseeFormFields) => {
			const submitError = await dispatch([
				SupplierAddressAction.setAddressee,
				values[FIELD_NAME],
			]);
			return Promise.resolve({
				[FIELD_NAME]: submitError,
			});
		},
		[dispatch]
	);

	return (
		<AddressAddresseeForm
			formKey="contactAddressee"
			id="contactAddressee"
			onSubmit={handleOnSubmit}
			initialValue={addressee}
		/>
	);
};

export default ContactAddresseeForm;
