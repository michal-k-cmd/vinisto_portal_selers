import { FC, useCallback, useContext } from 'react';
import { StreetFormFields } from 'Pages/Settings/Components/Street/interfaces';
import { FIELD_NAME } from 'Pages/Settings/Components/Street/constants';
import { SupplierDataAction } from 'Pages/Settings/SupplierDataContext/constants';
import { SupplierDataContext } from 'Pages/Settings/SupplierDataContext';
import AddressStreetForm from 'Pages/Settings/Components/Street';

const DeliveryStreetForm: FC = () => {
	const {
		dispatch,
		pickupAddress: { street },
	} = useContext(SupplierDataContext);

	const handleOnSubmit = useCallback(
		async (values: StreetFormFields) => {
			const submitError = await dispatch([
				SupplierDataAction.setStreet,
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
			formKey="deliveryStreet"
			id="deliveryStreet"
			onSubmit={handleOnSubmit}
			initialValue={street}
		/>
	);
};

export default DeliveryStreetForm;
