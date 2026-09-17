import { FC, useCallback, useContext } from 'react';
import { PhoneFormFields } from 'Pages/Settings/Components/Phone/interfaces';
import { FIELD_NAME } from 'Pages/Settings/Components/Phone/constants';
import { SupplierDataAction } from 'Pages/Settings/SupplierDataContext/constants';
import { SupplierDataContext } from 'Pages/Settings/SupplierDataContext';
import AddressPhoneForm from 'Pages/Settings/Components/Phone';

const DeliveryPhoneForm: FC = () => {
	const {
		dispatch,
		pickupAddress: { phone },
	} = useContext(SupplierDataContext);

	const handleOnSubmit = useCallback(
		async (values: PhoneFormFields) => {
			const submitError = await dispatch([
				SupplierDataAction.setPhone,
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
			formKey="deliveryPhone"
			id="deliveryPhone"
			onSubmit={handleOnSubmit}
			initialValue={phone}
		/>
	);
};

export default DeliveryPhoneForm;
