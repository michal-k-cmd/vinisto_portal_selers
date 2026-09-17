import { useCallback, useContext, useState } from 'react';
import { get, invoke } from 'Helpers/lodash';
import { apiServiceInstance } from 'Services/ApiService';
import { ModalContext } from 'Components/Modal/context';
import { AuthenticationContext } from 'Services/AuthenticationService/context';
import { LocalizationContext } from 'Services/LocalizationService';
import { NotificationsContext } from 'Services/NotificationService';
import {
	Form,
	Input,
	InputNumber,
	InputSelect,
	InputTextArea,
	LanguageSelect,
	Validators,
} from 'Components/Form';

import { GO_PAY_TYPE, goPayPaymentTypes, paymentTypes } from './constants';

/**
 * @category Component Create Payment Modal Content
 */
const CreatePaymentModal = () => {
	const [formState, setFormState] = useState({});
	const modalContext = useContext(ModalContext);
	const authenticationContext = useContext(AuthenticationContext);
	const localizationContext = useContext(LocalizationContext);
	const notificationsContext = useContext(NotificationsContext);

	const handleOnCreatePayment = useCallback(
		(formValues: Record<any, any>) => {
			const requestData = {
				userLoginHash: authenticationContext.vinistoUser.loginHash,
				...formValues,
				isActive: false,
			};
			apiServiceInstance
				.post(`order-api/payments`, requestData, true)
				.then(() => {
					modalContext.handleCloseModal();
					notificationsContext.handleShowSuccessNotification(
						'admin.createPayment.success'
					);
					invoke(modalContext, 'data.resetPaymentList');
				})
				.catch(() => {
					notificationsContext.handleShowErrorNotification(
						'admin.createPayment.error'
					);
				});
		},

		[authenticationContext, modalContext]
	);

	return (
		<Form
			formStateSubscriber={setFormState}
			submitCallback={handleOnCreatePayment}
			submitText={'admin.modal.form.createPayment'}
			initializationValues={{
				language: localizationContext.activeLanguageKey,
				paymentType: paymentTypes[0].value,
			}}
		>
			<LanguageSelect
				name="language"
				identifier="language"
				disabled={true}
			/>
			<InputSelect
				label="admin.modal.form.payment.type.label"
				options={paymentTypes}
				name="paymentType"
				identifier="paymentType"
			/>
			{get(formState, 'values.paymentType') === GO_PAY_TYPE && (
				<InputSelect
					label="admin.modal.form.goPayType.label"
					options={goPayPaymentTypes}
					name="goPayType"
					identifier="goPayType"
				/>
			)}
			<Input
				type="text"
				name="name"
				identifier="name"
				label="admin.modal.form.payment.title.label"
				placeholder="admin.modal.form.payment.title.placeholder"
				validate={Validators.required}
			/>
			<InputTextArea
				name="note"
				identifier="note"
				label="admin.modal.form.payment.note.label"
				placeholder="admin.modal.form.payment.note.placeholder"
			/>
			<InputTextArea
				name="description"
				identifier="description"
				label="admin.modal.form.payment.description.label"
				placeholder="admin.modal.form.payment.description.placeholder"
				validate={Validators.required}
			/>
			<InputNumber
				name="order"
				identifier="order"
				label="admin.modal.form.order"
			/>
		</Form>
	);
};
export default CreatePaymentModal;
