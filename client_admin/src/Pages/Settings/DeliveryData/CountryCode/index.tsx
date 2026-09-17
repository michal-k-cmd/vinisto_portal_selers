import { FC, useCallback, useContext } from 'react';
import { CountryCodeFormFields } from 'Pages/Settings/Components/CountryCode/interfaces';
import {
	COUNTRY_CODES_MAP,
	FIELD_NAME,
} from 'Pages/Settings/Components/CountryCode/constants';
import { SupplierDataAction } from 'Pages/Settings/SupplierDataContext/constants';
import { SupplierDataContext } from 'Pages/Settings/SupplierDataContext';
import AddressCountryCodeForm from 'Pages/Settings/Components/CountryCode';

const DeliveryCountryCodeForm: FC = () => {
	const {
		dispatch,
		pickupAddress: { countryCode },
	} = useContext(SupplierDataContext);

	const handleOnSubmit = useCallback(
		async (values: CountryCodeFormFields) => {
			const submitError = await dispatch([
				SupplierDataAction.setCountryCode,
				COUNTRY_CODES_MAP[values[FIELD_NAME]],
			]);
			return Promise.resolve({
				[FIELD_NAME]: submitError,
			});
		},
		[dispatch]
	);

	return (
		<AddressCountryCodeForm
			formKey="deliveryCountryCode"
			id="deliveryCountryCode"
			onSubmit={handleOnSubmit}
			initialValue={countryCode}
		/>
	);
};

export default DeliveryCountryCodeForm;
