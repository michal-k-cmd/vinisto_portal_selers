import { useCallback, useContext } from 'react';
import { apiServiceInstance } from 'Services/ApiService';
import { ModalContext } from 'Components/Modal/context';
import { AuthenticationContext } from 'Services/AuthenticationService/context';
import { NotificationsContext } from 'Services/NotificationService';
import { Form, InputNumber, Validators } from 'Components/Form';

/**
 * @category Component Edit exchange-rates Modal Content
 */
const EditExchangeRateCoefficientModal = () => {
	const modalContext = useContext(ModalContext);
	const authenticationContext = useContext(AuthenticationContext);
	const notificationsContext = useContext(NotificationsContext);

	const handleOnEditExchangeRateCoefficient = useCallback(
		(formValues: Record<any, any>) => {
			apiServiceInstance
				.put(
					`services-api/exchange-rates/edit-coefficient/${
						modalContext.data?.exchangeRateData.data[0].id ?? 0
					}`,
					{
						userLoginHash: authenticationContext.vinistoUser.loginHash,
						coefficient: formValues.coefficient / 100,
					},
					true
				)
				.then(() => {
					notificationsContext.handleShowSuccessNotification(
						'admin.EditExchangeRateCoefficient.success'
					);
					modalContext.handleCloseModal();
				})
				.catch(() => {
					notificationsContext.handleShowErrorNotification(
						'admin.EditExchangeRateCoefficient.error'
					);
				});
		},
		[
			authenticationContext.vinistoUser.loginHash,
			modalContext,
			notificationsContext,
		]
	);

	return (
		<Form
			submitCallback={handleOnEditExchangeRateCoefficient}
			submitText={'admin.modal.form.save'}
			initializationValues={{
				coefficient: 1,
			}}
		>
			<InputNumber
				name="coefficient"
				identifier="coefficient"
				label="admin.modal.form.coefficient"
				validate={Validators.required}
				min={0}
				max={5}
				step={0.1}
			/>
		</Form>
	);
};

export default EditExchangeRateCoefficientModal;
