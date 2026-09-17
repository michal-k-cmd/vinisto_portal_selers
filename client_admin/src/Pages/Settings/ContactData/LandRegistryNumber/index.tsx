import { FC, useCallback, useContext } from 'react';
import { LandRegistryNumberFormFields } from 'Pages/Settings/Components/LandRegistryNumber/interfaces';
import { FIELD_NAME } from 'Pages/Settings/Components/LandRegistryNumber/constants';
import { SupplierAddressAction } from 'Pages/Settings/SupplierAddressContext/constants';
import { SupplierAddressContext } from 'Pages/Settings/SupplierAddressContext';
import AddressLandRegistryNumberForm from 'Pages/Settings/Components/LandRegistryNumber';

const ContactLandRegistryNumberForm: FC = () => {
	const { dispatch, landRegistryNumber } = useContext(SupplierAddressContext);

	const handleOnSubmit = useCallback(
		async (values: LandRegistryNumberFormFields) => {
			const submitError = await dispatch([
				SupplierAddressAction.setLandRegistryNumber,
				values[FIELD_NAME],
			]);
			return Promise.resolve({
				[FIELD_NAME]: submitError,
			});
		},
		[dispatch]
	);

	return (
		<AddressLandRegistryNumberForm
			formKey="contactLandRegistryNumber"
			id="contactLandRegistryNumber"
			onSubmit={handleOnSubmit}
			initialValue={landRegistryNumber}
		/>
	);
};

export default ContactLandRegistryNumberForm;
