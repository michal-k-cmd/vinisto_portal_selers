import { FC, useCallback, useContext } from 'react';
import { EmailFormFields } from 'Pages/Settings/Components/Email/interfaces';
import { FIELD_NAME } from 'Pages/Settings/Components/Email/constants';
import { SupplierDataAction } from 'Pages/Settings/SupplierDataContext/constants';
import { SupplierDataContext } from 'Pages/Settings/SupplierDataContext';
import AddressEmailForm from 'Pages/Settings/Components/Email';

const DeliveryEmailForm: FC = () => {
	const {
		dispatch,
		pickupAddress: { email },
	} = useContext(SupplierDataContext);

	const handleOnSubmit = useCallback(
		async (values: EmailFormFields) => {
			const submitError = await dispatch([
				SupplierDataAction.setEmail,
				values[FIELD_NAME],
			]);
			return Promise.resolve({
				[FIELD_NAME]: submitError,
			});
		},
		[dispatch]
	);

	return (
		<AddressEmailForm
			formKey="deliveryEmail"
			id="deliveryEmail"
			onSubmit={handleOnSubmit}
			initialValue={email}
		/>
	);
};

export default DeliveryEmailForm;
