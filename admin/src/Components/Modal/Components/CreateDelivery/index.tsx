import { useCallback, useContext } from 'react';
import { Form } from 'react-final-form';
import { CForm } from '@coreui/react';
import {
	VinistoHelperDllEnumsOrderDeliveryBaseType,
	VinistoOrderDllModelsApiDeliveryDeliveryCreateParameters,
} from 'vinisto_api_client/src/api-types/order-api/';
import { AuthenticationContext } from 'Services/AuthenticationService/context';
import { LocalizationContext } from 'Services/LocalizationService';
import { NotificationsContext } from 'Services/NotificationService';
import DeliveryService from 'Services/OrderService/Delivery';
import { DeliveryListType } from 'Pages/DeliveryList/interfaces';
import {
	Condition,
	Input,
	InputCheckBox,
	InputNumber,
	InputSelect,
	InputTextArea,
	LanguageSelect,
	SubmitButton,
	Validators,
} from 'Components/Form';
import { ModalContext } from 'Components/Modal/context';

import {
	CreateDeliveryFormValues,
	CreateDeliveryModalData,
} from './interfaces';
import {
	DELIVERY_TYPES,
	deliveryBaseTypes,
	deliveryTypes,
	pickupPointTypes,
} from './constants';

const CreateDeliveryModal = () => {
	const modalContext = useContext(ModalContext);
	const { resetDeliveryList, transportBaseType } =
		modalContext?.data as CreateDeliveryModalData;
	const authenticationContext = useContext(AuthenticationContext);
	const localizationContext = useContext(LocalizationContext);
	const notificationsContext = useContext(NotificationsContext);

	const isForStocking = transportBaseType === DeliveryListType.STOCK;
	const { create } = DeliveryService;

	const handleOnCreateDelivery = useCallback(
		(formValues: CreateDeliveryFormValues) => {
			// TODO add platforms selection to form (it can be selected later using toggles on detail)
			const requestData: Omit<
				VinistoOrderDllModelsApiDeliveryDeliveryCreateParameters,
				'allowedOnPlatforms'
			> = {
				userLoginHash: authenticationContext.vinistoUser.loginHash,
				isActive: false,
				isForStocking: isForStocking,
				isForCustomerDelivery: !isForStocking,
				...formValues,
				orderTresholdTime: `${formValues?.orderTresholdTime ?? 14}:00:00`,
			};
			create(requestData)
				.then(() => {
					modalContext.handleCloseModal();
					notificationsContext.handleShowSuccessNotification(
						'admin.createDelivery.success'
					);
					resetDeliveryList();
				})
				.catch(() => {
					notificationsContext.handleShowErrorNotification(
						'admin.createDelivery.error'
					);
				});
		},
		[
			authenticationContext.vinistoUser.loginHash,
			create,
			isForStocking,
			modalContext,
			notificationsContext,
			resetDeliveryList,
		]
	);

	return (
		<Form
			onSubmit={handleOnCreateDelivery}
			initialValues={{
				language: localizationContext.activeLanguageKey,
				deliveryType: 'PICKUP',
				deliveryTime: 1,
				minAllowedWeight: 0,
				maxAllowedWeight: 0,
				deliveryBaseType:
					VinistoHelperDllEnumsOrderDeliveryBaseType.OWN_DELIVERY,
			}}
			render={({ handleSubmit, submitting, pristine, valid }) => {
				return (
					<CForm onSubmit={handleSubmit}>
						<LanguageSelect
							name="language"
							identifier="language"
							disabled={true}
							validate={Validators.required}
						/>
						<InputSelect
							options={deliveryTypes}
							name="deliveryType"
							identifier="deliveryType"
							label="admin.modal.form.deliveryType"
							validate={Validators.required}
						/>
						<InputSelect
							options={deliveryBaseTypes}
							name="deliveryBaseType"
							identifier="deliveryBaseType"
							label="admin.modal.form.deliveryBaseType"
							validate={Validators.required}
						/>
						<Condition
							when="deliveryType"
							is={DELIVERY_TYPES.PICKUP_POINT}
						>
							<InputSelect
								options={pickupPointTypes}
								name="pickupPointType"
								identifier="pickupPointType"
								label="admin.modal.form.pickupPointType"
							/>
						</Condition>
						<Input
							type="text"
							name="name"
							identifier="name"
							label="admin.modal.form.deliveryName"
							placeholder="admin.modal.form.name"
							validate={Validators.required}
						/>
						<InputTextArea
							name="note"
							identifier="note"
							label="admin.modal.form.deliveryNote"
							placeholder="admin.modal.form.deliveryNote"
						/>
						{!isForStocking && (
							<>
								<InputCheckBox
									name="isOnProductDetail"
									identifier="isOnProductDetail"
									label="admin.modal.form.IsOnProductDetail"
								/>
								<Condition
									when="isOnProductDetail"
									is={true}
								>
									<Input
										name="alternativeName"
										identifier="alternativeName"
										label="admin.modal.form.alternativeName"
										placeholder="admin.modal.form.alternativeName.placeholder"
										validate={Validators.required}
									/>
								</Condition>
							</>
						)}
						<InputTextArea
							name="description"
							identifier="description"
							label="admin.modal.form.description"
							placeholder="admin.modal.form.description"
							validate={Validators.required}
						/>
						<Input
							type="text"
							name="trackingUrl"
							identifier="trackingUrl"
							label="admin.modal.form.trackingUrl"
							placeholder="admin.modal.form.trackingUrl"
						/>
						<Input
							type="text"
							name="deliveryCode"
							identifier="deliveryCode"
							label="admin.modal.form.deliveryCode"
							placeholder="admin.modal.form.deliveryCode"
							validate={Validators.required}
						/>
						<InputNumber
							name="order"
							identifier="order"
							label="admin.modal.form.order"
							validate={Validators.required}
						/>

						{!isForStocking && (
							<>
								<InputNumber
									name="deliveryTime"
									identifier="deliveryTime"
									label="admin.modal.form.deliveryTime"
								/>
								<InputNumber
									name="orderTresholdTime"
									identifier="orderTresholdTime"
									label="admin.modal.form.orderTresholdTime"
									validate={Validators.required}
								/>
								<InputCheckBox
									name="isDeliveryOnSaturday"
									identifier="isDeliveryOnSaturday"
									label="admin.modal.form.isDeliveryOnSaturday"
								/>
								<InputCheckBox
									name="isDeliveryOnSunday"
									identifier="isDeliveryOnSunday"
									label="admin.modal.form.isDeliveryOnSunday"
								/>
								<InputNumber
									name="minAllowedWeight"
									identifier="minAllowedWeight"
									label="admin.modal.form.minWeight"
								/>
								<InputNumber
									name="maxAllowedWeight"
									identifier="maxAllowedWeight"
									label="admin.modal.form.maxWeight"
								/>
								<InputNumber
									name="costs"
									identifier="costs"
									label="admin.modal.form.costs"
								/>
							</>
						)}

						<SubmitButton
							valid={valid}
							pristine={pristine}
							submitting={submitting}
							submitText="admin.modal.form.createDelivery"
						/>
					</CForm>
				);
			}}
		/>
	);
};
export default CreateDeliveryModal;
