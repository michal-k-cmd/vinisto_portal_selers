import { FC, useCallback, useContext } from 'react';
import { AddresseeFormFields } from 'Pages/Settings/Components/Addressee/interfaces';
import { FIELD_NAME } from 'Pages/Settings/Components/Addressee/constants';
import { SupplierDataAction } from 'Pages/Settings/SupplierDataContext/constants';
import { SupplierDataContext } from 'Pages/Settings/SupplierDataContext';
import AddressAddresseeForm from 'Pages/Settings/Components/Addressee';

const DeliveryAddresseeForm: FC = () => {
	const {
		dispatch,
		pickupAddress: { addressee },
	} = useContext(SupplierDataContext);

	const handleOnSubmit = useCallback(
		async (values: AddresseeFormFields) => {
			const submitError = await dispatch([
				SupplierDataAction.setAddressee,
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
			formKey="deliveryAddressee"
			id="deliveryAddressee"
			onSubmit={handleOnSubmit}
			initialValue={addressee}
		/>
	);
};

export default DeliveryAddresseeForm;
