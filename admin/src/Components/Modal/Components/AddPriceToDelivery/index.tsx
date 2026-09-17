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
 * @category Component Add Price to Delivery Modal Content
 */
const AddPriceToDeliveryModal: FC = () => {
	const modalContext = useContext(ModalContext);
	const notificationsContext = useContext(NotificationsContext);
	const authenticationContext = useContext(AuthenticationContext);

	const handleOnAddPriceToDelivery = useCallback(
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
					)}/prices`,
					requestData,
					true
				)
				.then(() => {
					notificationsContext.handleShowSuccessNotification(
						'admin.addPriceToDelivery.success'
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
						loading: false,
						loaded: false,
					});
					modalContext.handleCloseModal();
				})
				.catch(() => {
					notificationsContext.handleShowErrorNotification(
						'admin.addPriceToDelivery.error'
					);
				});
		},
		[authenticationContext]
	);

	return (
		<Form
			submitCallback={handleOnAddPriceToDelivery}
			submitText={'admin.modal.addPriceToDelivery'}
			initializationValues={{
				price: 800,
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
		</Form>
	);
};

export default AddPriceToDeliveryModal;
