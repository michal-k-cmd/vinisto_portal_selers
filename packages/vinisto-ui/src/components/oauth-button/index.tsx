import { ComponentPropsWithoutRef, forwardRef } from 'react';
import { VinistoHelperDllEnumsUserTokenType } from 'vinisto_api_client/src/api-types/user-api';
import cn from 'classnames';

import Button from '../button';

import styles from './styles.module.css';

type OAuthProvider =
	| VinistoHelperDllEnumsUserTokenType.Google
	| VinistoHelperDllEnumsUserTokenType.Facebook
	| VinistoHelperDllEnumsUserTokenType.Seznam;

type Props = Omit<ComponentPropsWithoutRef<typeof Button>, 'children'> & {
	provider: OAuthProvider;
};

const PROVIDER_META: Record<OAuthProvider, { src: string; label: string }> = {
	[VinistoHelperDllEnumsUserTokenType.Google]: {
		src: '/assets/oauth-provider-icons/google.svg',
		label: 'Google',
	},
	[VinistoHelperDllEnumsUserTokenType.Facebook]: {
		src: '/assets/oauth-provider-icons/facebook.svg',
		label: 'Facebook',
	},
	[VinistoHelperDllEnumsUserTokenType.Seznam]: {
		src: '/assets/oauth-provider-icons/seznam.svg',
		label: 'Seznam',
	},
};

const OAuthButton = forwardRef<HTMLButtonElement, Props>((props, ref) => {
	return (
		<Button
			{...props}
			className={cn(styles.button, props.className)}
			ref={ref}
		>
			<img
				className={styles.img}
				src={PROVIDER_META[props.provider].src}
				alt={`${PROVIDER_META[props.provider].label} logo`}
				loading="lazy"
				decoding="async"
			/>
		</Button>
	);
});

OAuthButton.displayName = 'OAuthButton';

export default OAuthButton;
