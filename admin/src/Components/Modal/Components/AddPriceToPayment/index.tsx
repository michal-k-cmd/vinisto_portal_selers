import { FC, useCallback, useContext } from 'react';
import { get } from 'Helpers/lodash';
import { CURRENCIES } from 'Components/Form/Components/CurrencySelect/constants';
import { VATS } from 'Components/Form/Components/VatSelect/constants';
import { apiServiceInstance } from 'Services/ApiService';
import { ModalContext } from 'Components/Modal/context';
import { AuthenticationContext } from 'Services/AuthenticationService/context';
import { NotificationsContext } from 'Services/NotificationService';
import { CurrencySelect, Form, InputNumber, VatSelect } from 'Components/Form';

/**
 * @category Component Add Price to Payment Modal Content
 */
const AddPriceToPaymentModal: FC = () => {
	const modalContext = useContext(ModalContext);
	const notificationsContext = useContext(NotificationsContext);
	const authenticationContext = useContext(AuthenticationContext);

	const handleOnAddPriceToPayment = useCallback(
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
					)}/AddPriceForPayment`,
					requestData,
					true
				)
				.then((payload: Record<any, any>) => {
					notificationsContext.handleShowSuccessNotification(
						'admin.addPriceToPayment.success'
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
						'admin.addPriceToPayment.error'
					);
				});
		},
		[authenticationContext]
	);

	return (
		<Form
			submitCallback={handleOnAddPriceToPayment}
			submitText={'admin.modal.addPriceToPayment.submit'}
			initializationValues={{
				price: 0,
				minOrderPrice: 0,
				maxOrderPrice: 0,
				currency: CURRENCIES[0].value,
				vat: VATS[0].value,
			}}
		>
			<CurrencySelect
				name="currency"
				identifier="currency"
				label="admin.modal.form.currency"
			/>
			<VatSelect
				name="vat"
				identifier="vat"
				label="admin.modal.form.vat"
			/>
			<div
				className="position-relative"
				style={{ zIndex: 1 }}
			>
				<InputNumber
					name="price"
					identifier="maxOrderPrice"
					label="admin.modal.form.price"
				/>
				<InputNumber
					name="minOrderPrice"
					identifier="minOrderPrice"
					label="admin.modal.form.minOrderPrice"
				/>
				<InputNumber
					name="maxOrderPrice"
					identifier="maxOrderPrice"
					label="admin.modal.form.maxOrderPrice"
				/>
			</div>
		</Form>
	);
};

export default AddPriceToPaymentModal;
