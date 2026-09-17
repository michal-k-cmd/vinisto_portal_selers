import { useCallback, useContext } from 'react';
import { LOGIN_MODAL, REGISTRATION_MODAL } from 'Components/Modal/constants';
import { requireEmail } from 'Components/Form/validators';
import { AuthenticationContext } from 'Services/AuthenticationService/context';
import { LocalizationContext } from 'Services/LocalizationService';
import { Form, InputEmail } from 'Components/Form';
import { VinistoSpanLink } from 'Components/VinistoLink';

import { ModalContext } from '../../context';

import { OPEN_MODAL_DELAY } from './constants';

const ForgottenPasswordModal = () => {
	const { handleOpenModal, handleCloseModal } = useContext(ModalContext);
	const { handleOnForgottenPassword } = useContext(AuthenticationContext);
	const { useFormatMessage } = useContext(LocalizationContext);
	const t = useFormatMessage();

	const handleForgottenPassword = useCallback(
		(formValues: { email: string }) => {
			handleOnForgottenPassword(formValues.email);
		},
		[handleOnForgottenPassword]
	);

	const handleOpenRegistrationModal = useCallback(() => {
		handleCloseModal();
		setTimeout(() => {
			handleOpenModal(REGISTRATION_MODAL);
		}, OPEN_MODAL_DELAY);
	}, [handleCloseModal, handleOpenModal]);

	const handleOpenLogInModal = useCallback(() => {
		handleCloseModal();
		setTimeout(() => {
			handleOpenModal(LOGIN_MODAL);
		}, OPEN_MODAL_DELAY);
	}, [handleCloseModal, handleOpenModal]);

	return (
		<>
			<Form
				submitCallback={handleForgottenPassword}
				submitText={'modal.forgottenPassword.submitButtonText'}
			>
				<div className="mb-3">
					<p>{t({ id: 'modal.forgottenPassword.infoMessage' })}</p>
					<InputEmail validate={requireEmail} />
				</div>
			</Form>
			<div className="vinisto-popup__links underline-effect underline-effect--vinisto">
				<VinistoSpanLink
					className="vinisto-popup__link--gray"
					onClick={handleOpenLogInModal}
				>
					{t({ id: 'modal.forgottenPassword.moveToLoginButton' })}
				</VinistoSpanLink>

				<VinistoSpanLink
					onClick={handleOpenRegistrationModal}
					className="vinisto-popup__link--gray"
				>
					{t({
						id: 'modal.forgottenPassword.moveToRegistrationButton',
					})}
				</VinistoSpanLink>
			</div>
		</>
	);
};

export default ForgottenPasswordModal;
