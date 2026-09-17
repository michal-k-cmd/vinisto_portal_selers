import { FC, useCallback, useContext } from 'react';
import { CityFormFields } from 'Pages/Settings/Components/City/interfaces';
import { FIELD_NAME } from 'Pages/Settings/Components/City/constants';
import { SupplierDataAction } from 'Pages/Settings/SupplierDataContext/constants';
import { SupplierDataContext } from 'Pages/Settings/SupplierDataContext';
import AddressCityForm from 'Pages/Settings/Components/City';

const DeliveryCityForm: FC = () => {
	const {
		dispatch,
		pickupAddress: { city },
	} = useContext(SupplierDataContext);

	const handleOnSubmit = useCallback(
		async (values: CityFormFields) => {
			const submitError = await dispatch([
				SupplierDataAction.setCity,
				values[FIELD_NAME],
			]);
			return Promise.resolve({
				[FIELD_NAME]: submitError,
			});
		},
		[dispatch]
	);

	return (
		<AddressCityForm
			formKey="deliveryCity"
			id="deliveryCity"
			onSubmit={handleOnSubmit}
			initialValue={city}
		/>
	);
};

export default DeliveryCityForm;
