import { ReactNode, useContext } from 'react';
import { LocalizationContext } from 'Services/LocalizationService';
import OAuthButton from 'vinisto_ui/src/components/oauth-button';
import { useOAuthLogin } from 'vinisto_shared/src/oauth';
import { AuthenticationContext } from 'Services/AuthenticationService/context';
import { NotificationsContext } from 'Services/NotificationService';

import styles from './styles.module.css';

import {
	VinistoHelperDllEnumsUserLoginHashType,
	VinistoHelperDllEnumsUserTokenType,
} from '@/api-types/user-api';

interface OAuthLoginProps {
	title: ReactNode | string;
	onLogin?: () => void;
}

const OAuthLogin = ({ title, onLogin }: OAuthLoginProps) => {
	const { countryOfSale, activeCurrency, activeLanguageKey } =
		useContext(LocalizationContext);
	const { handleShowErrorNotification } = useContext(NotificationsContext);
	const { handleOnOAuthLogIn } = useContext(AuthenticationContext);

	const { handleGoogleLogin, handleFacebookLogin, handleSeznamLogin } =
		useOAuthLogin({
			requestData: {
				hashType: VinistoHelperDllEnumsUserLoginHashType.SHOP,
				countryOfSale: countryOfSale,
				currency: activeCurrency.currency,
				language: activeLanguageKey,
			},
			onSuccess: (data) => {
				handleOnOAuthLogIn(data);
				onLogin?.();
			},
			onError: () => {
				handleShowErrorNotification('notification.message.logIn.error');
			},
		});

	const isOauthFacebookEnabled =
		process.env.NEXT_PUBLIC_OAUTH_FACEBOOK_ENABLED === 'true';

	const isOauthGoogleEnabled =
		process.env.NEXT_PUBLIC_OAUTH_GOOGLE_ENABLED === 'true';

	const isOauthSeznamEnabled =
		process.env.NEXT_PUBLIC_OAUTH_SEZNAM_ENABLED === 'true';

	const isOauthEnabled =
		isOauthFacebookEnabled || isOauthGoogleEnabled || isOauthSeznamEnabled;

	if (!isOauthEnabled) return;

	return (
		<div className={styles.oauthWrapper}>
			<div className={styles.oauthTextWrapper}>
				<span>{title}</span>
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
	);
};

export default OAuthLogin;
