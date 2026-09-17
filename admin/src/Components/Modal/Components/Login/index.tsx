import { useCallback, useContext } from 'react';
import { LoginFormValues } from 'Components/Modal/Components/Login/interfaces';
import { AuthenticationContext } from 'Services/AuthenticationService/context';
import { Form, InputEmail, InputPassword, Validators } from 'Components/Form';
import OAuthButton from 'vinisto_ui/src/components/oauth-button';
import cn from 'classnames';
import { useOAuthLogin } from 'vinisto_shared/src/oauth';
import { NotificationsContext } from 'Services/NotificationService';
import { LocalizationContext } from 'Services/LocalizationService';
import { getCountryCodeFromLanguageKey } from 'Helpers/get-country-code';

import styles from './styles.module.css';

import {
	VinistoHelperDllEnumsUserLoginHashType,
	VinistoHelperDllEnumsUserTokenType,
} from '@/api-types/user-api';

const isOauthFacebookEnabled =
	import.meta.env.VITE_OAUTH_FACEBOOK_ENABLED === 'true';

const isOauthGoogleEnabled =
	import.meta.env.VITE_OAUTH_GOOGLE_ENABLED === 'true';

const isOauthSeznamEnabled =
	import.meta.env.VITE_OAUTH_SEZNAM_ENABLED === 'true';

const isOauthEnabled =
	isOauthFacebookEnabled || isOauthGoogleEnabled || isOauthSeznamEnabled;

const LoginModal = () => {
	const authenticationContext = useContext(AuthenticationContext);
	const { handleShowErrorNotification } = useContext(NotificationsContext);
	const localizationContext = useContext(LocalizationContext);
	const t = localizationContext.useFormatMessage();

	const handleOnLogIn = useCallback(
		(formValues: LoginFormValues) => {
			authenticationContext.handleOnLogIn(
				formValues.email,
				formValues.password
			);
		},
		[authenticationContext]
	);

	const { handleGoogleLogin, handleFacebookLogin, handleSeznamLogin } =
		useOAuthLogin({
			requestData: {
				hashType: VinistoHelperDllEnumsUserLoginHashType.ADMIN,
				countryOfSale: getCountryCodeFromLanguageKey(
					localizationContext.activeLanguageKey
				),
			},
			onSuccess: authenticationContext.handleOnOAuthLogIn,
			onError: () => {
				handleShowErrorNotification('notification.message.logIn.error');
			},
		});

	return (
		<div>
			<Form
				submitCallback={handleOnLogIn}
				submitText={'modal.logIn.submitButtonText'}
			>
				<InputEmail
					name="email"
					identifier="email"
					validate={Validators.requireEmail}
				/>

				<InputPassword
					name="password"
					identifier="password"
					label="form.input.password.label"
					placeholder="form.input.password.placeholder"
				/>
			</Form>
			{isOauthEnabled && (
				<div className={cn(styles.oauthWrapper, 'container')}>
					<div className={styles.oauthTextWrapper}>
						<span>{t({ id: 'modal.logIn.oauth.text' })}</span>
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
		</div>
	);
};

export default LoginModal;
