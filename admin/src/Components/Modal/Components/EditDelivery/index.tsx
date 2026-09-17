import { useCallback, useContext } from 'react';
import { find, get } from 'Helpers/lodash';
import {
	VinistoHelperDllEnumsOrderDeliveryType,
	VinistoHelperDllEnumsOrderPickupPointType,
	VinistoOrderDllModelsApiDeliveryDeliveryEditParameters,
} from 'vinisto_api_client/src/api-types/order-api/';
import { ModalContext } from 'Components/Modal/context';
import { LocalizationContext } from 'Services/LocalizationService';
import { NotificationsContext } from 'Services/NotificationService';
import { apiServiceInstance } from 'Services/ApiService';
import {
	Condition,
	Form,
	Input,
	InputCheckBox,
	InputNumber,
	InputSelect,
	InputTextArea,
	LanguageSelect,
	Validators,
} from 'Components/Form';
import { AuthenticationContext } from 'Services/AuthenticationService/context';

import {
	deliveryBaseTypes,
	pickupPointTypes,
} from '../CreateDelivery/constants';

import { deliveryTypes } from './constants';

const EditDeliveryModal = () => {
	const modalContext = useContext(ModalContext);
	const authenticationContext = useContext(AuthenticationContext);
	const localizationContext = useContext(LocalizationContext);
	const { handleShowSuccessNotification, handleShowErrorNotification } =
		useContext(NotificationsContext);
	const isForStocking = modalContext?.data?.isForStocking;

	const handleOnUpdateDelivery = useCallback(
		(formValues: VinistoOrderDllModelsApiDeliveryDeliveryEditParameters) => {
			const requestData = {
				isForStocking: isForStocking,
				isForCustomerDelivery: !isForStocking,
				...formValues,
				userLoginHash: authenticationContext.vinistoUser.loginHash,
				pickupPointType:
					formValues?.deliveryType ===
					VinistoHelperDllEnumsOrderDeliveryType.PICKUP_POINT
						? formValues?.pickupPointType
						: undefined,
				orderTresholdTime: `${formValues?.orderTresholdTime ?? 14}:00:00`,
			};
			apiServiceInstance
				.put(
					`order-api/deliveries/${get(
						modalContext,
						'data.deliveryDetailState.deliveryDetailData.id'
					)}/EditDelivery`,
					requestData,
					true
				)
				.then(() => {
					handleShowSuccessNotification('admin.editDelivery.success');
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
					handleShowErrorNotification('admin.editDelivery.error');
				});
		},

		[
			authenticationContext.vinistoUser.loginHash,
			handleShowErrorNotification,
			handleShowSuccessNotification,
			isForStocking,
			modalContext,
		]
	);

	const getNameByLang = () => {
		const found = find(
			get(modalContext, 'data.deliveryDetailState.deliveryDetailData.name', []),
			(singleName: Record<string, any>) => {
				return singleName.language === localizationContext.activeLanguageKey;
			}
		);

		return get(found, 'value', '');
	};

	const getDescriptionByLang = () => {
		const found = find(
			get(
				modalContext,
				'data.deliveryDetailState.deliveryDetailData.description',
				[]
			),
			(singleName: Record<string, any>) => {
				return singleName.language === localizationContext.activeLanguageKey;
			}
		);

		return get(found, 'value', '');
	};

	const getNoteByLang = () => {
		const found = find(
			get(modalContext, 'data.deliveryDetailState.deliveryDetailData.note', []),
			(singleName: Record<string, any>) => {
				return singleName.language === localizationContext.activeLanguageKey;
			}
		);

		return get(found, 'value', '');
	};

	const getAlternativeNameByLang = () => {
		const found = find(
			get(
				modalContext,
				'data.deliveryDetailState.deliveryDetailData.alternativeName',
				[]
			),
			(singleName: Record<string, any>) => {
				return singleName.language === localizationContext.activeLanguageKey;
			}
		);

		return get(found, 'value', '');
	};

	return (
		<Form
			submitCallback={handleOnUpdateDelivery}
			submitText={'admin.modal.form.updateDelivery'}
			initializationValues={{
				language: localizationContext.activeLanguageKey,
				deliveryTime: get(
					modalContext,
					'data.deliveryDetailState.deliveryDetailData.deliveryTime'
				),
				name: getNameByLang(),
				description: getDescriptionByLang(),
				minAllowedWeight: get(
					modalContext,
					'data.deliveryDetailState.deliveryDetailData.minAllowedWeight'
				),
				deliveryType: get(
					modalContext,
					'data.deliveryDetailState.deliveryDetailData.deliveryType'
				),
				deliveryBaseType: get(
					modalContext,
					'data.deliveryDetailState.deliveryDetailData.deliveryBaseType'
				),
				pickupPointType:
					get(
						modalContext,
						'data.deliveryDetailState.deliveryDetailData.pickupPointType'
					) ?? VinistoHelperDllEnumsOrderPickupPointType.ZASILKOVNA,
				maxAllowedWeight: get(
					modalContext,
					'data.deliveryDetailState.deliveryDetailData.maxAllowedWeight'
				),
				deliveryCode: get(
					modalContext,
					'data.deliveryDetailState.deliveryDetailData.deliveryCode'
				),
				trackingUrl: get(
					modalContext,
					'data.deliveryDetailState.deliveryDetailData.trackingUrl'
				),
				order: get(
					modalContext,
					'data.deliveryDetailState.deliveryDetailData.order'
				),
				costs: get(
					modalContext,
					'data.deliveryDetailState.deliveryDetailData.costs'
				),
				isOnProductDetail: get(
					modalContext,
					'data.deliveryDetailState.deliveryDetailData.isOnProductDetail'
				),
				alternativeName: getAlternativeNameByLang(),
				orderTresholdTime: (
					modalContext?.data?.deliveryDetailState.deliveryDetailData
						.orderTresholdTime ?? '14:00:00'
				).split(':')[0],
				note: getNoteByLang(),
				isDeliveryOnSaturday: get(
					modalContext,
					'data.deliveryDetailState.deliveryDetailData.isDeliveryOnSaturday'
				),
				isDeliveryOnSunday: get(
					modalContext,
					'data.deliveryDetailState.deliveryDetailData.isDeliveryOnSunday'
				),
			}}
		>
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
				is={VinistoHelperDllEnumsOrderDeliveryType.PICKUP_POINT}
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
		</Form>
	);
};
export default EditDeliveryModal;
