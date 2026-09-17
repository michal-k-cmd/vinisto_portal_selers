import { useCallback, useContext, useState } from 'react';
import { LoginFormData } from 'Components/Modal/Components/Login/interfaces';
import { LOGIN_PASSWORD_TYPE } from 'Components/Form/Components/Password/constants';
import { requireEmail } from 'Components/Form/validators';
import { AuthenticationContext } from 'Services/AuthenticationService/context';
import { LocalizationContext } from 'Services/LocalizationService';
import { Form, InputEmail, InputPassword } from 'Components/Form';
import { VinistoSpanLink } from 'Components/VinistoLink';
import useLoginRedirect from 'Hooks/useLoginRedirect';
import { useRouter } from 'next/navigation';
import OAuthLogin from 'pages-spa/CartShippingData/Components/OAuthLogin';
import {
	B2B_LOGIN_ON_B2C_PLATFORM,
	B2C_LOGIN_ON_B2B_PLATFORM,
} from 'Services/AuthenticationService/constants';
import { useIsB2b } from 'Services/PlatformService';

import { ModalContext } from '../../context';
import {
	FORGOTTEN_PASSWORD_MODAL,
	REGISTRATION_MODAL,
	SAFE_REOPEN_TIMEOUT,
} from '../../constants';

import RegisterCta from './RegisterCta';
import styles from './styles.module.css';

const LoginModal = () => {
	const isB2b = useIsB2b();
	const { modalData, handleCloseModal, handleOpenModal } =
		useContext(ModalContext);
	const authenticationContext = useContext(AuthenticationContext);
	const { useFormatMessage } = useContext(LocalizationContext);
	const t = useFormatMessage();
	const navigateFromAuthRequired = modalData?.navigateFromAuthRequired ?? false;
	const onCloseCallback = modalData?.onCloseCallback;
	const onLogin =
		typeof modalData?.onLogin === 'function' ? modalData?.onLogin : undefined;
	const onRegister = modalData?.onRegister;

	const onForgottenPasswordClick = modalData?.onForgottenPasswordClick;

	const loginRedirect = useLoginRedirect(navigateFromAuthRequired);
	const router = useRouter();

	const [loginError, setLoginError] = useState<string>();

	const { showRegisterCta = true, showForgottenPasswordLink = true } =
		modalData ?? {};

	const handleOnLogIn = useCallback(
		(formValues: LoginFormData) => {
			authenticationContext.handleOnLogIn(
				{
					email: formValues.email,
					password: formValues.password,
				},
				() => {
					onLogin?.();
					loginRedirect();
				},
				(error) => {
					if (
						error &&
						typeof error === 'object' &&
						'message' in error &&
						error.message
					) {
						setLoginError(String(error.message));
					}
				}
			);
		},
		// onLogin is not referentialy stable, do not put it in dependencies
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[authenticationContext, loginRedirect]
	);

	const handleOpenRegistrationModal = useCallback(() => {
		handleCloseModal();
		if (typeof onCloseCallback === 'function') {
			router.back();
		}
		setTimeout(() => {
			handleOpenModal(REGISTRATION_MODAL, {
				onRegister,
			});
		}, SAFE_REOPEN_TIMEOUT);
		// onRegister is not referentialy stable, do not put it in dependencies
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [handleCloseModal, handleOpenModal, router, onCloseCallback]);

	const handleOpenForgottenModal = useCallback(() => {
		if (typeof onForgottenPasswordClick === 'function') {
			onForgottenPasswordClick();
			return;
		}

		handleCloseModal();
		if (typeof onCloseCallback === 'function') {
			router.back();
		}
		setTimeout(() => {
			handleOpenModal(FORGOTTEN_PASSWORD_MODAL, {});
		}, SAFE_REOPEN_TIMEOUT);
	}, [
		handleCloseModal,
		handleOpenModal,
		router,
		onCloseCallback,
		onForgottenPasswordClick,
	]);

	const hasPlatformMismatch =
		loginError === B2C_LOGIN_ON_B2B_PLATFORM ||
		loginError === B2B_LOGIN_ON_B2C_PLATFORM;

	const platformMismatchTargetUri = isB2b
		? process.env.NEXT_PUBLIC_BASE_URI
		: process.env.NEXT_PUBLIC_B2B_URI;

	return (
		<div className="vinisto-popup__split">
			<div className="vinisto-popup__split__form">
				{hasPlatformMismatch && (
					<div className={styles.platformMismatch}>
						{t({
							id: isB2b
								? 'modal.logIn.platformMismatch.b2b'
								: 'modal.logIn.platformMismatch.b2c',
						})}{' '}
						<a
							href={platformMismatchTargetUri}
							className={styles.platformMismatchLink}
						>
							{t({ id: 'modal.logIn.platformMismatch.link' })}
						</a>
					</div>
				)}
				<Form
					submitCallback={handleOnLogIn}
					submitText={'modal.logIn.submitButtonText'}
					initializationValues={{
						email: modalData?.email ?? '',
					}}
				>
					<div className="mb-3">
						<InputEmail validate={requireEmail} />
						<InputPassword type={LOGIN_PASSWORD_TYPE} />
					</div>
				</Form>
				<button
					onClick={handleOpenRegistrationModal}
					className="vinisto-btn vinisto-bg-outline-green tablet-mobile-only w-100 mt-3"
				>
					{t({ id: 'modal.registration.submitButtonText' })}
				</button>
				{!isB2b && <OAuthLogin title={t({ id: 'modal.logIn.oauth.text' })} />}
				{showForgottenPasswordLink && (
					<div className="vinisto-popup__links vinisto-popup__links--login">
						<VinistoSpanLink
							className="vinisto-popup__link--gray"
							onClick={handleOpenForgottenModal}
						>
							{t({ id: 'modal.logIn.moveForgottenPasswordButton' })}
						</VinistoSpanLink>
					</div>
				)}
			</div>
			{showRegisterCta && (
				<RegisterCta
					handleOpenRegistrationModal={handleOpenRegistrationModal}
				/>
			)}
		</div>
	);
};

export default LoginModal;
