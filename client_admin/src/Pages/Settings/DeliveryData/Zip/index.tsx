import { FC, useCallback, useContext } from 'react';
import { ZipFormFields } from 'Pages/Settings/Components/Zip/interfaces';
import { FIELD_NAME } from 'Pages/Settings/Components/Zip/constants';
import { SupplierDataAction } from 'Pages/Settings/SupplierDataContext/constants';
import { SupplierDataContext } from 'Pages/Settings/SupplierDataContext';
import AddressZipForm from 'Pages/Settings/Components/Zip';

const DeliveryZipForm: FC = () => {
	const {
		dispatch,
		pickupAddress: { zip },
	} = useContext(SupplierDataContext);

	const handleOnSubmit = useCallback(
		async (values: ZipFormFields) => {
			const submitError = await dispatch([
				SupplierDataAction.setZip,
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
			formKey="deliveryZip"
			id="deliveryZip"
			onSubmit={handleOnSubmit}
			initialValue={zip}
		/>
	);
};

export default DeliveryZipForm;
