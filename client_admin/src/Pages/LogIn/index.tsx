import { FC, useCallback, useContext, useEffect } from 'react';
import { ModalType } from 'Components/Modal/constants';
import { AuthenticationAction } from 'Services/AuthenticationService/constants';
import { requiredCustomMessage } from 'Components/Form/validators';
import { ModalContext } from 'Components/Modal/context';
import { AuthenticationContext } from 'Services/AuthenticationService/context';
import UserService from 'Services/UserService';
import { LocalizationContext } from 'Services/LocalizationService';
import { Form, InputEmail, InputPassword } from 'Components/Form';
import useLoginRedirect from 'Hooks/useLoginRedirect';
import OAuthButton from 'vinisto_ui/src/components/oauth-button';
import { useOAuthLogin } from 'vinisto_shared/src/oauth';
import { getCountryCodeFromLanguageKey } from 'Helpers/get-country-code';
import { NotificationsContext } from 'Services/NotificationService';

import { EMAIL_FIELD_NAME, PASSWORD_FIELD_NAME } from './constants';
import styles from './styles.module.css';
import { LogInFormFields } from './interfaces';

import './styles.css';

import {
	VinistoHelperDllEnumsUserLoginHashType,
	VinistoHelperDllEnumsUserTokenType,
} from '@/api-types/user-api';
import {
	VinistoAuthDllModelsApiUserBaseBuyerUser,
	VinistoAuthDllModelsApiUserCompany,
	VinistoAuthDllModelsApiUserMerchant,
	VinistoAuthDllModelsApiUserUser,
} from '@/api-types/order-api';

const isOauthFacebookEnabled =
	import.meta.env.VITE_OAUTH_FACEBOOK_ENABLED === 'true';

const isOauthGoogleEnabled =
	import.meta.env.VITE_OAUTH_GOOGLE_ENABLED === 'true';

const isOauthSeznamEnabled =
	import.meta.env.VITE_OAUTH_SEZNAM_ENABLED === 'true';

const isOauthEnabled =
	isOauthFacebookEnabled || isOauthGoogleEnabled || isOauthSeznamEnabled;

const LogInPage: FC = () => {
	const authenticationContext = useContext(AuthenticationContext);
	const localizationContext = useContext(LocalizationContext);
	const { handleShowErrorNotification } = useContext(NotificationsContext);
	const modalContext = useContext(ModalContext);
	const t = localizationContext.useFormatMessage();
	const loginRedirect = useLoginRedirect();

	const handleOnLogIn = useCallback(
		(formValues: LogInFormFields) => {
			authenticationContext.dispatch({
				type: AuthenticationAction.logIn,
				payload: {
					email: formValues[EMAIL_FIELD_NAME],
					password: formValues[PASSWORD_FIELD_NAME],
				},
			});
		},
		[authenticationContext]
	);

	const handleOnOAuthLogIn = useCallback(
		async (
			response:
				| VinistoAuthDllModelsApiUserBaseBuyerUser
				| VinistoAuthDllModelsApiUserCompany
				| VinistoAuthDllModelsApiUserMerchant
				| VinistoAuthDllModelsApiUserUser
		) => {
			try {
				const loginHash = response?.loginHash;
				if (typeof loginHash !== 'string') {
					handleShowErrorNotification(
						'notification.message.logIn.error.noSuppliers'
					);
					return;
				}

				const user = await UserService.getSupplier(loginHash);
				if (!user?.suppliers.length) {
					handleShowErrorNotification(
						'notification.message.logIn.error.noSuppliers'
					);
					return;
				}

				authenticationContext.dispatch({
					type: AuthenticationAction.oauthLogIn,
					payload: user,
				});
			} catch {
				handleShowErrorNotification('notification.message.logIn.error');
			}
		},
		[authenticationContext, handleShowErrorNotification]
	);

	const { handleGoogleLogin, handleFacebookLogin, handleSeznamLogin } =
		useOAuthLogin({
			requestData: {
				hashType: VinistoHelperDllEnumsUserLoginHashType.CLIENT,
				countryOfSale: getCountryCodeFromLanguageKey(
					localizationContext.activeLanguageKey
				),
			},
			onSuccess: handleOnOAuthLogIn,
			onError: () => {
				handleShowErrorNotification('notification.message.logIn.error');
			},
		});

	const handleOpenForgottenModal = useCallback(() => {
		modalContext.handleCloseModal();
		setTimeout(() => {
			modalContext.handleOpenModal(ModalType.FORGOTTEN_PASSWORD_MODAL);
		}, 200);
	}, [modalContext]);

	useEffect(() => {
		if (authenticationContext.isLoggedIn) loginRedirect();
	}, [authenticationContext.isLoggedIn, loginRedirect]);

	return (
		<div className="login">
			<div className="card">
				<div className="modal-body m-3">
					<div className="vinisto-popup__heading-wrap">
						<h2 className="vinisto-popup__heading">
							{t({ id: 'logIn.title' })}
						</h2>
					</div>
					<p>{t({ id: 'logIn.hint' })}</p>
					<Form<LogInFormFields>
						onSubmit={handleOnLogIn}
						submitLabel="logIn.submitButtonText"
					>
						<InputEmail
							name={EMAIL_FIELD_NAME}
							identifier="logInEmail"
							validate={requiredCustomMessage(
								'form.input.email.requiredValidation'
							)}
							label="logIn.email.label"
							placeholder="logIn.email.placeholder"
						/>
						<InputPassword
							name={PASSWORD_FIELD_NAME}
							identifier="logInPassword"
							label="logIn.password.label"
							placeholder="logIn.password.placeholder"
						/>
					</Form>
					{isOauthEnabled && (
						<div className={styles.oauthWrapper}>
							<div className={styles.oauthTextWrapper}>
								<span>{t({ id: 'logIn.oauth.text' })}</span>
							</div>
							<div className={styles.oauthButtonsWrapper}>
								{isOauthGoogleEnabled && (
									<OAuthButton
										onClick={() => handleGoogleLogin()}
										provider={VinistoHelperDllEnumsUserTokenType.Google}
									/>
								)}
								{isOauthFacebookEnabled && (
									<OAuthButton
										onClick={() => handleFacebookLogin()}
										provider={VinistoHelperDllEnumsUserTokenType.Facebook}
									/>
								)}
								{isOauthSeznamEnabled && (
									<OAuthButton
										onClick={() => handleSeznamLogin()}
										provider={VinistoHelperDllEnumsUserTokenType.Seznam}
									/>
								)}
							</div>
						</div>
					)}
					<div className="vinisto-popup__links underline-effect underline-effect--vinisto">
						{/* <Link
              to="/register"
              className="vinisto-popup__link underline-item"
            >
              {t({ id: 'logIn.moveToRegistrationButton' })}
            </Link> */}

						<span
							className="vinisto-popup__link underline-item"
							onClick={handleOpenForgottenModal}
						>
							{t({ id: 'logIn.moveForgottenPasswordButton' })}
						</span>
					</div>
				</div>
			</div>
		</div>
	);
};

export default LogInPage;
