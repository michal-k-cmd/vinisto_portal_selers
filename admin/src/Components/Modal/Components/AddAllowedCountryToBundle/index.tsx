import { useCallback, useContext } from 'react';
import { COUNTRIES } from 'Components/Form/Components/CountrySelect/constants';
import { ModalContext } from 'Components/Modal/context';
import { AuthenticationContext } from 'Services/AuthenticationService/context';
import { NotificationsContext } from 'Services/NotificationService';
import { CountrySelect, Form } from 'Components/Form';

import api from '@/api';
import { VinistoHelperDllEnumsCountryCode } from '@/api-types/user-api';

const AddAllowedCountryToBundle = () => {
	const modalContext = useContext(ModalContext);
	const notificationsContext = useContext(NotificationsContext);
	const authenticationContext = useContext(AuthenticationContext);

	const bundleId = modalContext.data?.bundle.id;
	const refetchBundleDetail = modalContext.data?.refetchBundleDetail;

	const handleOnaddAllowedCountry = useCallback(
		(formValues: { country: VinistoHelperDllEnumsCountryCode }) => {
			const requestData = {
				userLoginHash: authenticationContext.vinistoUser.loginHash,
				...formValues,
			};

			api
				.post(
					`product-api/bundles/${bundleId}/add-allowed-country`,
					undefined,
					requestData
				)
				.then(() => {
					notificationsContext.handleShowSuccessNotification(
						'admin.addAllowedCountryToBundle.success'
					);
					refetchBundleDetail?.();
					modalContext.handleCloseModal();
				})
				.catch(() => {
					notificationsContext.handleShowErrorNotification(
						'admin.addAllowedCountryToBundle.error'
					);
				});
		},
		[
			authenticationContext.vinistoUser.loginHash,
			bundleId,
			modalContext,
			notificationsContext,
			refetchBundleDetail,
		]
	);

	return (
		<Form
			submitCallback={handleOnaddAllowedCountry}
			submitText={'admin.btn.addAllowedCountry'}
			initializationValues={{
				country: COUNTRIES[0].value,
			}}
		>
			<CountrySelect
				name="country"
				identifier="country"
				label="admin.modal.form.country"
			/>
		</Form>
	);
};

export default AddAllowedCountryToBundle;
