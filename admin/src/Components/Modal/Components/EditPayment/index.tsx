import { FC, useCallback, useContext, useState } from 'react';
import { defaultTo, find, get, head } from 'Helpers/lodash';
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

import {
	GO_PAY_TYPE,
	goPayPaymentTypes,
	paymentTypes,
} from '../CreatePayment/constants';

/**
 * @category Component Edit Payment Modal Content
 */
const EditPaymentModal: FC = () => {
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
			};
			apiServiceInstance
				.put(
					`order-api/payments/${get(
						modalContext,
						'data.paymentDetailState.paymentDetailData.id'
					)}/EditPayment`,
					requestData,
					true
				)
				.then((payload: Record<any, any>) => {
					notificationsContext.handleShowSuccessNotification(
						'admin.editPayment.success'
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
						'admin.editPayment.error'
					);
				});
		},

		[authenticationContext, modalContext]
	);

	const getNameByLang = useCallback(() => {
		const found = find(
			get(modalContext, 'data.paymentDetailState.paymentDetailData.name', []),
			(singleName: Record<any, any>) => {
				return singleName.language === localizationContext.activeLanguageKey;
			}
		);

		return get(found, 'value', '');
	}, [modalContext, localizationContext]);

	const getDescriptionByLang = useCallback(() => {
		const found = find(
			get(
				modalContext,
				'data.paymentDetailState.paymentDetailData.description',
				[]
			),
			(singleName: Record<any, any>) => {
				return singleName.language === localizationContext.activeLanguageKey;
			}
		);

		return get(found, 'value', '');
	}, [modalContext, localizationContext]);

	const getNoteByLang = useCallback(() => {
		const found = find(
			get(modalContext, 'data.paymentDetailState.paymentDetailData.note', []),
			(singleName: Record<any, any>) => {
				return singleName.language === localizationContext.activeLanguageKey;
			}
		);

		return get(found, 'value', '');
	}, [modalContext, localizationContext]);

	return (
		<Form
			submitCallback={handleOnCreatePayment}
			formStateSubscriber={setFormState}
			submitText={'admin.modal.form.updatePayment'}
			initializationValues={{
				language: localizationContext.activeLanguageKey,
				name: getNameByLang(),
				description: getDescriptionByLang(),
				paymentType: defaultTo(
					get(
						modalContext,
						'data.paymentDetailState.paymentDetailData.paymentType'
					),
					get(head(paymentTypes), 'value')
				),
				goPayType: defaultTo(
					get(
						modalContext,
						'data.paymentDetailState.paymentDetailData.goPayType'
					),
					get(head(goPayPaymentTypes), 'value')
				),
				order: get(
					modalContext,
					'data.paymentDetailState.paymentDetailData.order'
				),
				note: getNoteByLang(),
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
export default EditPaymentModal;
