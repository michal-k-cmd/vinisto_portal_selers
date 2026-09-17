import { FC, useCallback, useContext } from 'react';
import { HouseNumberFormFields } from 'Pages/Settings/Components/HouseNumber/interfaces';
import { FIELD_NAME } from 'Pages/Settings/Components/HouseNumber/constants';
import { SupplierAddressAction } from 'Pages/Settings/SupplierAddressContext/constants';
import { SupplierAddressContext } from 'Pages/Settings/SupplierAddressContext';
import AddressHouseNumberForm from 'Pages/Settings/Components/HouseNumber';

const ContactHouseNumberForm: FC = () => {
	const { dispatch, houseNumber } = useContext(SupplierAddressContext);

	const handleOnSubmit = useCallback(
		async (values: HouseNumberFormFields) => {
			const submitError = await dispatch([
				SupplierAddressAction.setHouseNumber,
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
			formKey="contactHouseNumber"
			id="contactHouseNumber"
			onSubmit={handleOnSubmit}
			initialValue={houseNumber}
		/>
	);
};

export default ContactHouseNumberForm;
