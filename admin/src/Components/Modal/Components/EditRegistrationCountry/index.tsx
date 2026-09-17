import { FC, useCallback, useContext } from 'react';
import { ModalContext } from 'Components/Modal/context';
import { AuthenticationContext } from 'Services/AuthenticationService/context';
import { LocalizationContext } from 'Services/LocalizationService';
import { Form } from 'Components/Form';
import { UseMutateFunction } from '@tanstack/react-query';
import { UserApi } from 'vinisto_api_client/src/api-types/user-api';
import Radio from 'Components/Form/Components/Radio';
import { COUNTRIES } from 'Components/Form/Components/CountrySelect/constants';

import styles from './styles.module.css';

import { VinistoHelperDllEnumsCountryCode } from '@/api-types/product-api';

/**
 * @category Component Edit Registration Country Modal Content
 */
const EditRegistrationCountryModal: FC = () => {
	const modalContext = useContext(ModalContext);
	const authenticationContext = useContext(AuthenticationContext);
	const localizationContext = useContext(LocalizationContext);
	const t = localizationContext.useFormatMessage();

	const currentRegistrationCountry = modalContext.data
		?.registrationCountry as VinistoHelperDllEnumsCountryCode;

	const updateUserRegistrationCountry = modalContext.data
		?.updateUserRegistrationCountryMutation as UseMutateFunction<
		UserApi.UsersChangeRegistrationCountryPartialUpdate.ResponseBody,
		unknown,
		UserApi.UsersChangeRegistrationCountryPartialUpdate.RequestBody,
		unknown
	>;

	const handleSubmit = useCallback(
		(formValues: { registrationCountry: VinistoHelperDllEnumsCountryCode }) => {
			updateUserRegistrationCountry(
				{
					registrationCountry: formValues.registrationCountry,
					userLoginHash: authenticationContext.vinistoUser.loginHash,
				},
				{
					onSuccess: () => {
						modalContext.handleCloseModal();
					},
				}
			);
		},
		[authenticationContext, updateUserRegistrationCountry, modalContext]
	);

	return (
		<Form
			submitCallback={handleSubmit}
			submitText={'admin.modal.editUserRegistrationCountry.button'}
			initializationValues={{
				registrationCountry: currentRegistrationCountry,
			}}
		>
			<Radio
				name="registrationCountry"
				options={COUNTRIES.map((country) => ({
					label: `${t({ id: `country.${country.label}` })}`,
					value: country.value,
				}))}
				className={styles.radio}
			/>
		</Form>
	);
};

export default EditRegistrationCountryModal;
