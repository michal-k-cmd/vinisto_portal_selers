import { FC, useCallback, useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { authenticationServiceInstance } from 'Services/AuthenticationService';
import { LocalizationContext } from 'Services/LocalizationService';
import { Form, InputEmail } from 'Components/Form';
import { requiredCustomMessage } from 'Components/Form/validators';
import Preloader from 'Components/Preloader';

import { ModalContext } from '../context';

import { EMAIL_FIELD_NAME } from './constants';
import { ForgottenPasswordFormFields } from './interfaces';

/**
 * @category Component Forgotten Password Modal Content
 */
const ForgottenPasswordModal: FC = () => {
	const modalContext = useContext(ModalContext);
	const localizationContext = useContext(LocalizationContext);

	const t = localizationContext.useFormatMessage();
	const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
	const [isLoading, setIsLoading] = useState<boolean>(false);

	const handleOnForgottenPassword = useCallback(
		(formValues: ForgottenPasswordFormFields) => {
			setIsLoading(true);
			authenticationServiceInstance
				.forgottenPassword(formValues[EMAIL_FIELD_NAME])
				// we don't display error when e-mail is not in database for enhanced security
				?.catch(() => {})
				?.finally(() => {
					setIsLoading(false);
					setIsSubmitted(true);
				});
		},
		[]
	);

	const handleOnCloseModal = useCallback(() => {
		const { handleCloseModal, isOpened } = modalContext;

		if (handleCloseModal && isOpened) {
			handleCloseModal();
		}
	}, [modalContext]);

	return (
		<>
			{isSubmitted ? (
				<>
					<p>{t({ id: 'modal.forgottenPassword.success.message' })}</p>
					<button
						onClick={handleOnCloseModal}
						className="btn btn-primary"
					>
						{t({ id: 'modal.forgottenPassword.success.button' })}
					</button>
				</>
			) : (
				<>
					{isLoading ? <Preloader /> : null}
					<Form<ForgottenPasswordFormFields>
						onSubmit={handleOnForgottenPassword}
						submitLabel="modal.forgottenPassword.submitButtonText"
					>
						<p>{t({ id: 'modal.forgottenPassword.infoMessage' })}</p>
						<InputEmail
							name={EMAIL_FIELD_NAME}
							identifier="forgottenPasswordEmail"
							validate={requiredCustomMessage(
								'form.input.email.requiredValidation'
							)}
						/>
					</Form>
					<div className="vinisto-popup__links underline-effect underline-effect--vinisto">
						<Link
							onClick={handleOnCloseModal}
							to="/login"
							className="vinisto-popup__link underline-item"
						>
							{t({ id: 'modal.forgottenPassword.moveToLoginButton' })}
						</Link>

						{/* <Link
            onClick={handleOnCloseModal}
            to="/register"
            className="vinisto-popup__link underline-item"
          >
            {t({ id: 'modal.forgottenPassword.moveToRegistrationButton' })}
          </Link> */}
					</div>
				</>
			)}
		</>
	);
};

export default ForgottenPasswordModal;
