import { FC, useCallback, useContext } from 'react';
import { apiServiceInstance } from 'Services/ApiService';
import { AuthenticationContext } from 'Services/AuthenticationService/context';
import { NotificationsContext } from 'Services/NotificationService';
import { Form, InputNumber } from 'Components/Form';

import { ModalContext } from '../../context';

/**
 * @category Component Change HP Category Sequence Number Modal Content
 */
const ChangeHPCategorySequenceNumberModal: FC = () => {
	const modalContext = useContext(ModalContext);
	const notificationsContext = useContext(NotificationsContext);
	const authenticationContext = useContext(AuthenticationContext);
	const category = modalContext?.data?.category?.original;
	const selectedType = modalContext?.data?.selectedType;

	const handleOnSubmit = useCallback(
		(formValues: Record<any, any>) => {
			apiServiceInstance
				.put(
					'product-api/home-page/categories',
					{
						userLoginHash: authenticationContext.vinistoUser.loginHash,
						homePageCategoryType: selectedType,
						categoryId: category?.id,
						...formValues,
					},
					true
				)
				.then(() => {
					if (typeof modalContext?.data?.onSubmit === 'function') {
						modalContext?.data?.onSubmit();
					}
					modalContext.handleCloseModal();
					notificationsContext.handleShowSuccessNotification(
						'admin.changeHPCategorySequenceNumber.success'
					);
				})
				.catch(() => {
					notificationsContext.handleShowErrorNotification(
						'admin.changeHPCategorySequenceNumber.error'
					);
				});
		},
		[authenticationContext, selectedType, category]
	);

	return (
		<Form
			submitCallback={handleOnSubmit}
			submitText="admin.modal.changeHPCategorySequenceNumber.submit"
			initializationValues={{
				sequenceNumber: category?.sequenceNumber,
			}}
		>
			<InputNumber
				identifier="sequenceNumber"
				name="sequenceNumber"
				label="admin.modal.form.sequenceNumber"
			/>
		</Form>
	);
};

export default ChangeHPCategorySequenceNumberModal;
