import { FC, useCallback, useContext } from 'react';
import { HouseNumberFormFields } from 'Pages/Settings/Components/HouseNumber/interfaces';
import { FIELD_NAME } from 'Pages/Settings/Components/HouseNumber/constants';
import { SupplierDataAction } from 'Pages/Settings/SupplierDataContext/constants';
import { SupplierDataContext } from 'Pages/Settings/SupplierDataContext';
import AddressHouseNumberForm from 'Pages/Settings/Components/HouseNumber';

const DeliveryHouseNumberForm: FC = () => {
	const {
		dispatch,
		pickupAddress: { houseNumber },
	} = useContext(SupplierDataContext);

	const handleOnSubmit = useCallback(
		async (values: HouseNumberFormFields) => {
			const submitError = await dispatch([
				SupplierDataAction.setHouseNumber,
				values[FIELD_NAME],
			]);
			return Promise.resolve({
				[FIELD_NAME]: submitError,
			});
		},
		[dispatch]
	);

	return (
		<AddressHouseNumberForm
			formKey="deliveryHouseNumber"
			id="deliveryHouseNumber"
			onSubmit={handleOnSubmit}
			initialValue={houseNumber}
		/>
	);
};

export default DeliveryHouseNumberForm;
