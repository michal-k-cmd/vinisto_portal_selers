import { FC, useCallback, useContext } from 'react';
import { get } from 'Helpers/lodash';
import { COUNTRIES } from 'Components/Form/Components/CountrySelect/constants';
import { apiServiceInstance } from 'Services/ApiService';
import { ModalContext } from 'Components/Modal/context';
import { AuthenticationContext } from 'Services/AuthenticationService/context';
import { NotificationsContext } from 'Services/NotificationService';
import { CountrySelect, Form } from 'Components/Form';

/**
 * @category Component Add Country to Delivery Modal Content
 */
const AddCountryToDeliveryModal: FC = () => {
	const modalContext = useContext(ModalContext);
	const notificationsContext = useContext(NotificationsContext);
	const authenticationContext = useContext(AuthenticationContext);

	const handleOnAddCountryToDelivery = useCallback(
		(formValues: Record<any, any>) => {
			const requestData = {
				userLoginHash: authenticationContext.vinistoUser.loginHash,
				...formValues,
			};

			apiServiceInstance
				.post(
					`order-api/deliveries/${get(
						modalContext,
						'data.deliveryDetailState.deliveryDetailData.id'
					)}/countries`,
					requestData,
					true
				)
				.then(() => {
					notificationsContext.handleShowSuccessNotification(
						'admin.addCountryToDelivery.success'
					);
					const setDeliveryDetailState = get(
						modalContext,
						'data.setDeliveryDetailState'
					);
					const deliveryDetailState = get(
						modalContext,
						'data.deliveryDetailState'
					);
					setDeliveryDetailState({
						...deliveryDetailState,
						loaded: false,
						loading: false,
					});
					modalContext.handleCloseModal();
				})
				.catch(() => {
					notificationsContext.handleShowErrorNotification(
						'admin.addCountryToDelivery.error'
					);
				});
		},
		[authenticationContext, modalContext]
	);

	return (
		<Form
			submitCallback={handleOnAddCountryToDelivery}
			submitText={'admin.modal.addCountryToDelivery.submit'}
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

export default AddCountryToDeliveryModal;
