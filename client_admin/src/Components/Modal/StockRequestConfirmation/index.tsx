import { FC, useCallback, useContext, useMemo } from 'react';
import { CCol, CContainer, CForm, CRow } from '@coreui/react';
import { FormApi, MutableState } from 'final-form';
import { unset } from 'lodash-es';
import { Button } from 'react-bootstrap';
import { Form } from 'react-final-form';
import { ModalType } from 'Components/Modal/constants';
import {
	STOCKING_REQUEST_ALREADY_CONFIRMED,
	STOCKING_REQUEST_DELIVERY_DATE_NOT_FUTURE,
} from 'Services/StockRequest/constants';
import StockRequestService from 'Services/StockRequest';
import { AuthenticationContext } from 'Services/AuthenticationService/context';
import { LocalizationContext } from 'Services/LocalizationService';
import { NotificationsContext } from 'Services/NotificationService';
import {
	Condition,
	InputSelect,
	InputTimePicker,
	Validators,
} from 'Components/Form';

import { ModalContext } from '../context';

import { EMPTY_VALUE, TIME_SLOTS_OPTIONS } from './constants';
import {
	StockRequestConfirmationFormValues,
	StockRequestConfirmationModalData,
} from './interfaces';

import './styles.css';

const minDate = new Date();

const StockRequestConfirmationModal: FC = () => {
	const { vinistoUser } = useContext(AuthenticationContext);
	const { useFormatMessage } = useContext(LocalizationContext);
	const { handleShowErrorNotification, handleShowSuccessNotification } =
		useContext(NotificationsContext);
	const { modalType, handleCloseModal, data } = useContext(ModalContext);

	const t = useFormatMessage();

	const { stockRequestId, reloadData } =
		data as StockRequestConfirmationModalData;
	const isShipping =
		modalType === ModalType.STOCK_REQUEST_CONFIRMATION_SHIPPING;

	const handleOnSubmit = (
		{ date, time }: StockRequestConfirmationFormValues,
		form: FormApi<StockRequestConfirmationFormValues>
	) => {
		StockRequestService.confirmDelivery(
			stockRequestId,
			vinistoUser?.loginHash ?? '',
			new Date(date),
			time
		)
			.then(() => {
				reloadData();
				handleShowSuccessNotification('modal.stockRequestConfirm.success');
				handleCloseModal();
			})
			.catch((specificError: Error) => {
				if (
					specificError.message === STOCKING_REQUEST_DELIVERY_DATE_NOT_FUTURE
				) {
					form.mutators.updateFormWithApiError(
						isShipping
							? 'modal.stockRequestConfirm.shipping.date.error.past'
							: 'modal.stockRequestConfirm.pickup.date.error.past'
					);
					return;
				} else if (
					specificError.message === STOCKING_REQUEST_ALREADY_CONFIRMED
				) {
					handleShowErrorNotification(
						'modal.stockRequestConfirm.error.alreadyConfirmed'
					);
					return;
				}
				handleShowErrorNotification('modal.stockRequestConfirm.error.general');
			});
	};

	const timeOptions = useMemo(
		() => [
			{
				label: String(
					t({
						id: isShipping
							? 'modal.stockRequestConfirm.shipping.time.option.empty'
							: 'modal.stockRequestConfirm.pickup.time.option.empty',
					})
				),
				value: EMPTY_VALUE,
			},
			...TIME_SLOTS_OPTIONS,
		],
		[isShipping, t]
	);

	const formMutators = {
		clearSubmitError: (
			[fieldId]: [string],
			state: MutableState<StockRequestConfirmationFormValues>
		) => {
			unset(state, `formState.submitErrors[${fieldId}]`);
		},
		updateFormWithApiError: (
			[apiError]: [string],
			state: MutableState<StockRequestConfirmationFormValues>
		) => {
			state.formState.submitErrors = {
				...state.formState.submitErrors,
				date: apiError,
			};
			state.fields.date.blur();
		},
	};

	const handleOnChange = useCallback(
		(form: FormApi<StockRequestConfirmationFormValues>) => () =>
			form.mutators.clearSubmitError('date'),
		[]
	);

	return (
		<Form<StockRequestConfirmationFormValues>
			mutators={formMutators}
			onSubmit={handleOnSubmit}
			render={({ handleSubmit, form }) => (
				<CForm onSubmit={handleSubmit}>
					<CContainer>
						<CRow>
							<p className="fst-italic fs-6">
								{t({
									id: isShipping
										? 'modal.stockRequestConfirm.shipping.description'
										: 'modal.stockRequestConfirm.pickup.description',
								})}
							</p>
						</CRow>
						<CRow>
							<CCol md={6}>
								<InputTimePicker
									identifier="date"
									name="date"
									label={
										isShipping
											? 'modal.stockRequestConfirm.shipping.date.label'
											: 'modal.stockRequestConfirm.pickup.date.label'
									}
									showTimeInput={false}
									validate={Validators.requiredCustomMessage(
										isShipping
											? 'modal.stockRequestConfirm.shipping.date.error.empty'
											: 'modal.stockRequestConfirm.pickup.date.error.empty'
									)}
									minDate={minDate}
									onChange={handleOnChange(form)}
								/>
							</CCol>
							<Condition
								field="date"
								condition={(value: string) => !!value}
							>
								<CCol md={6}>
									<InputSelect
										identifier="time"
										name="time"
										label={
											isShipping
												? 'modal.stockRequestConfirm.shipping.time.label'
												: 'modal.stockRequestConfirm.pickup.time.label'
										}
										className="select-empty-option"
										options={timeOptions}
										// TODO: use Validators.requiredCustomMessage() after bug mentioned in EMPTY_VALUE description is solved
										validate={(value) =>
											value === undefined || value === EMPTY_VALUE
												? isShipping
													? 'modal.stockRequestConfirm.shipping.time.error.empty'
													: 'modal.stockRequestConfirm.pickup.time.error.empty'
												: undefined
										}
										onChange={handleOnChange(form)}
									/>
								</CCol>
							</Condition>
						</CRow>
						<CRow>
							<CCol>
								<Button
									className="modal-btn-cancel"
									onClick={handleCloseModal}
								>
									{t({ id: 'modal.stockRequestConfirm.btn.cancel' })}
								</Button>
							</CCol>
							<CCol>
								<Button
									className="btn-ok"
									type="submit"
								>
									{t({ id: 'modal.stockRequestConfirm.btn.submit' })}
								</Button>
							</CCol>
						</CRow>
					</CContainer>
				</CForm>
			)}
		/>
	);
};

export default StockRequestConfirmationModal;
