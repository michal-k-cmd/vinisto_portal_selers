import React from 'react';
import { invoke } from 'Helpers/lodash';
import { AuthenticationContext } from 'Services/AuthenticationService/context';
import { NotificationsContext } from 'Services/NotificationService';
import { apiServiceInstance } from 'Services/ApiService';
import { Form, Input, Validators } from 'Components/Form';

import { ModalContext } from '../../context';

const CreateFeeRecordsFromOrderModal = () => {
	const modalContext = React.useContext(ModalContext);
	const authenticationContext = React.useContext(AuthenticationContext);
	const notificationsContext = React.useContext(NotificationsContext);

	const handleOnCreateFeeRecordsFromOrder = React.useCallback(
		(formValues: Record<string, any>) => {
			const requestData = {
				userLoginHash: authenticationContext.vinistoUser.loginHash,
				orderId: formValues.orderId,
			};

			apiServiceInstance
				.post(
					`supplier-api/fee-records/CreateFeeRecordsFromOrder`,
					requestData,
					true
				)
				.then(() => {
					modalContext.handleCloseModal();
					notificationsContext.handleShowSuccessNotification(
						'admin.createFeeRecordsFromOrder.success'
					);
					invoke(modalContext, 'data.resetFeeRecordList');
				})
				.catch((e) => {
					if (e?.error?.[0]?.specificError == 'ORDER_NOT_PAID') {
						notificationsContext.handleShowErrorNotification(
							'admin.createFeeRecordsFromOrder.error.notPaid'
						);
					} else {
						notificationsContext.handleShowErrorNotification(
							'admin.createFeeRecordsFromOrder.error'
						);
					}
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
			submitCallback={handleOnCreateFeeRecordsFromOrder}
			submitText={'admin.modal.form.createFeeRecordsFromOrder'}
			initializationValues={{
				userLoginHash: authenticationContext.vinistoUser?.loginHash,
				orderId: '',
			}}
		>
			<fieldset>
				<Input
					name="orderId"
					identifier="orderId"
					type="text"
					label="admin.modal.form.orderId"
					placeholder="admin.modal.form.orderId.placeholder"
					validate={Validators.required}
				/>
			</fieldset>
		</Form>
	);
};
export default CreateFeeRecordsFromOrderModal;
