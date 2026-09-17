import React, { useContext } from 'react';
import { invoke } from 'Helpers/lodash';
import { AuthenticationContext } from 'Services/AuthenticationService/context';
import { NotificationsContext } from 'Services/NotificationService';
import { apiServiceInstance } from 'Services/ApiService';
import {
	Form,
	Input,
	InputCheckBox,
	InputSelect,
	Validators,
} from 'Components/Form';
import { feeRecordTypeTranslationMap } from 'Pages/FeeRecordDetail/constants';
import { LocalizationContext } from 'Services/LocalizationService';

import { ModalContext } from '../../context';

const CreateFeeRecordsModal: React.FC = (): JSX.Element => {
	const modalContext = React.useContext(ModalContext);
	const authenticationContext = React.useContext(AuthenticationContext);
	const notificationsContext = React.useContext(NotificationsContext);
	const t = useContext(LocalizationContext).useFormatMessage();

	const handleOnCreateFeeRecords = React.useCallback(
		(formValues: Record<any, any>) => {
			const requestData: Record<any, any> = {
				userLoginHash: authenticationContext.vinistoUser.loginHash,
				bundleId: formValues.bundleId,
				orderId: formValues.orderId,
				type: formValues.type,
				isPaidOut: formValues.isPaidOut,
			};

			apiServiceInstance
				.post(`supplier-api/fee-records`, requestData, true)
				.then(() => {
					modalContext.handleCloseModal();
					notificationsContext.handleShowSuccessNotification(
						'admin.createFeeRecordsFromOrder.success'
					);
					invoke(modalContext, 'data.resetFeeRecordList');
				})
				.catch(() => {
					notificationsContext.handleShowErrorNotification(
						'admin.createFeeRecords.error'
					);
				});
		},
		[authenticationContext, modalContext]
	);

	return (
		<Form
			submitCallback={handleOnCreateFeeRecords}
			submitText={'admin.modal.form.createFeeRecords'}
			initializationValues={{
				userLoginHash: authenticationContext.vinistoUser?.loginHash,
				bundleId: '',
				orderId: '',
				type: 'SELL',
				isPaidOut: true,
			}}
		>
			<fieldset>
				<Input
					name="bundleId"
					identifier="bundleId"
					type="text"
					label="admin.modal.form.bundleId"
					placeholder="admin.modal.form.bundleId.placeholder"
					validate={Validators.required}
				/>
				<Input
					name="orderId"
					identifier="orderId"
					type="text"
					label="admin.modal.form.orderId"
					placeholder="admin.modal.form.orderId.placeholder"
					validate={Validators.required}
				/>
				<InputSelect
					options={Object.entries(feeRecordTypeTranslationMap).map(
						([key, value]) => ({ value: key, label: `${t({ id: value })}` })
					)}
					name="type"
					identifier="type"
					label="admin.modal.form.type"
				/>
				<InputCheckBox
					identifier="isPaidOut"
					name="isPaidOut"
					label="admin.modal.form.isPaidOut"
				/>
			</fieldset>
		</Form>
	);
};
export default CreateFeeRecordsModal;
