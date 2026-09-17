import { FC, useCallback, useContext } from 'react';
import { get } from 'Helpers/lodash';
import { COUNTRIES } from 'Components/Form/Components/CountrySelect/constants';
import { apiServiceInstance } from 'Services/ApiService';
import { ModalContext } from 'Components/Modal/context';
import { AuthenticationContext } from 'Services/AuthenticationService/context';
import { NotificationsContext } from 'Services/NotificationService';
import { CountrySelect, Form } from 'Components/Form';

/**
 * @category Component Add Country to Payment Modal Content
 */
const AddCountryToPaymentModal: FC = () => {
	const modalContext = useContext(ModalContext);
	const notificationsContext = useContext(NotificationsContext);
	const authenticationContext = useContext(AuthenticationContext);

	const handleOnAddCountryToPayment = useCallback(
		(formValues: Record<any, any>) => {
			const requestData = {
				userLoginHash: authenticationContext.vinistoUser.loginHash,
				...formValues,
			};

			apiServiceInstance
				.post(
					`order-api/payments/${get(
						modalContext,
						'data.paymentDetailState.paymentDetailData.id'
					)}/AddCountryForPayment`,
					requestData,
					true
				)
				.then((payload: Record<any, any>) => {
					notificationsContext.handleShowSuccessNotification(
						'admin.addCountryToPayment.success'
					);
					const setPaymentDetailState = get(
						modalContext,
						'data.setPaymentDetailState'
					);
					setPaymentDetailState((paymentDetailState: Record<any, any>) => ({
						...paymentDetailState,
						paymentDetailData: get(payload, 'payment', {}),
					}));
					modalContext.handleCloseModal();
				})
				.catch(() => {
					notificationsContext.handleShowErrorNotification(
						'admin.addCountryToPayment.error'
					);
				});
		},
		[authenticationContext, modalContext]
	);

	return (
		<Form
			submitCallback={handleOnAddCountryToPayment}
			submitText={'admin.modal.addCountryToPayment.submit'}
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

export default AddCountryToPaymentModal;
