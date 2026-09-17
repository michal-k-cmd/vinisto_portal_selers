import { FC, useCallback, useContext } from 'react';
import { CityFormFields } from 'Pages/Settings/Components/City/interfaces';
import { FIELD_NAME } from 'Pages/Settings/Components/City/constants';
import { SupplierAddressAction } from 'Pages/Settings/SupplierAddressContext/constants';
import { SupplierAddressContext } from 'Pages/Settings/SupplierAddressContext';
import AddressCityForm from 'Pages/Settings/Components/City';

const ContactCityForm: FC = () => {
	const { dispatch, city } = useContext(SupplierAddressContext);

	const handleOnSubmit = useCallback(
		async (values: CityFormFields) => {
			const submitError = await dispatch([
				SupplierAddressAction.setCity,
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
			formKey="contactCity"
			id="contactCity"
			onSubmit={handleOnSubmit}
			initialValue={city}
		/>
	);
};

export default ContactCityForm;
