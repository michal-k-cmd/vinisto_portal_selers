import { FC, useCallback, useContext } from 'react';
import { LandRegistryNumberFormFields } from 'Pages/Settings/Components/LandRegistryNumber/interfaces';
import { FIELD_NAME } from 'Pages/Settings/Components/LandRegistryNumber/constants';
import { SupplierDataAction } from 'Pages/Settings/SupplierDataContext/constants';
import { SupplierDataContext } from 'Pages/Settings/SupplierDataContext';
import AddressLandRegistryNumberForm from 'Pages/Settings/Components/LandRegistryNumber';

const DeliveryLandRegistryNumberForm: FC = () => {
	const {
		dispatch,
		pickupAddress: { landRegistryNumber },
	} = useContext(SupplierDataContext);

	const handleOnSubmit = useCallback(
		async (values: LandRegistryNumberFormFields) => {
			const submitError = await dispatch([
				SupplierDataAction.setLandRegistryNumber,
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
			formKey="deliveryLandRegistryNumber"
			id="deliveryLandRegistryNumber"
			onSubmit={handleOnSubmit}
			initialValue={landRegistryNumber}
		/>
	);
};

export default DeliveryLandRegistryNumberForm;
