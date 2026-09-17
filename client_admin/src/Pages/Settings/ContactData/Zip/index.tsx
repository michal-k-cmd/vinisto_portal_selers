import { FC, useCallback, useContext } from 'react';
import { ZipFormFields } from 'Pages/Settings/Components/Zip/interfaces';
import { FIELD_NAME } from 'Pages/Settings/Components/Zip/constants';
import { SupplierAddressAction } from 'Pages/Settings/SupplierAddressContext/constants';
import { SupplierAddressContext } from 'Pages/Settings/SupplierAddressContext';
import AddressZipForm from 'Pages/Settings/Components/Zip';

const ContactZipForm: FC = () => {
	const { dispatch, zip } = useContext(SupplierAddressContext);

	const handleOnSubmit = useCallback(
		async (values: ZipFormFields) => {
			const submitError = await dispatch([
				SupplierAddressAction.setZip,
				values[FIELD_NAME],
			]);
			return Promise.resolve({
				[FIELD_NAME]: submitError,
			});
		},
		[dispatch]
	);

	return (
		<AddressZipForm
			formKey="contactZip"
			id="contactZip"
			onSubmit={handleOnSubmit}
			initialValue={zip}
		/>
	);
};

export default ContactZipForm;
