import { useCallback, useContext } from 'react';
import { get, invoke } from 'lodash-es';
import UserService from 'Services/UserService';
import { AuthenticationContext } from 'Services/AuthenticationService/context';
import { LocalizationContext } from 'Services/LocalizationService';
import { NotificationsContext } from 'Services/NotificationService';
import { Form, InputText } from 'Components/Form';

import { ModalContext } from '../../context';

const FillNicknameModal = () => {
	const authenticationContext = useContext(AuthenticationContext);
	const { useFormatMessage } = useContext(LocalizationContext);
	const modalContext = useContext(ModalContext);
	const notificationsContext = useContext(NotificationsContext);
	const t = useFormatMessage();

	const handleOnSubmit = useCallback(
		(values: Record<any, any>) => {
			UserService.update(get(authenticationContext, 'vinistoUser.id', ''), {
				userLoginHash: get(authenticationContext, 'vinistoUser.loginHash', ''),
				email: get(authenticationContext, 'vinistoUser.email', ''),
				nickname: values.nickname,
			})
				.then((newVinistoUser) => {
					authenticationContext.saveVinistoUser(newVinistoUser);
					notificationsContext.handleShowSuccessNotification(
						'notification.message.fillNickname.success'
					);
					modalContext.handleCloseModal();
					invoke(modalContext, 'modalData.showReviewModal');
				})
				.catch((exception) => {
					if (get(exception, 'message') === 'NicknameAlreadyUsed') {
						notificationsContext.handleShowErrorNotification(
							'notification.message.fillNickname.alreadyUsed'
						);
						return;
					}
					notificationsContext.handleShowErrorNotification(
						'notification.message.fillNickname.error'
					);
				});
		},
		[authenticationContext, modalContext, notificationsContext]
	);

	return (
		<div>
			<Form
				submitCallback={handleOnSubmit}
				submitText="modal.fillNickname.submit"
			>
				<p>{t({ id: 'modal.fillNickname.text' })}</p>
				<InputText
					name="nickname"
					identifier="nickname"
					label="modal.fillNickname.nickname.label"
					placeholder="modal.fillNickname.nickname.placeholder"
				/>
			</Form>
		</div>
	);
};

export default FillNicknameModal;
