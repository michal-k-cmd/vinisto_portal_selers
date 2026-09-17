import { FC, useCallback, useContext } from 'react';
import { CountryCodeFormFields } from 'Pages/Settings/Components/CountryCode/interfaces';
import {
	COUNTRY_CODES_MAP,
	FIELD_NAME,
} from 'Pages/Settings/Components/CountryCode/constants';
import { SupplierAddressAction } from 'Pages/Settings/SupplierAddressContext/constants';
import { SupplierAddressContext } from 'Pages/Settings/SupplierAddressContext';
import AddressCountryCodeForm from 'Pages/Settings/Components/CountryCode';

const ContactCountryCodeForm: FC = () => {
	const { dispatch, countryCode } = useContext(SupplierAddressContext);

	const handleOnSubmit = useCallback(
		async (values: CountryCodeFormFields) => {
			const submitError = await dispatch([
				SupplierAddressAction.setCountryCode,
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
			formKey="contactCountryCode"
			id="contactCountryCode"
			onSubmit={handleOnSubmit}
			initialValue={countryCode}
		/>
	);
};

export default ContactCountryCodeForm;
