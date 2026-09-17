import { FC, useContext } from 'react';
import { Link } from 'react-router-dom';
import { DeviceServiceContext } from 'Services/DeviceService';
import { LocalizationContext } from 'Services/LocalizationService';
import { EnvironmentContext } from 'Services/EnvironmentService/context';
import { LOCAL_ENVIRONMENT_KEYS } from 'Services/EnvironmentService/constants';

import './styles.css';

const Logo: FC = () => {
	const localizationContext = useContext(LocalizationContext);
	const deviceServiceContext = useContext(DeviceServiceContext);
	const environmentalContext = useContext(EnvironmentContext);
	const environment = environmentalContext.EnvironmentService.getEnvironment();

	const t = localizationContext.useFormatMessage();

	let translatableString = 'admin.appName.desktop';

	if (deviceServiceContext.isMobile) {
		translatableString = 'admin.appName.mobile';
	}
	if (deviceServiceContext.isTablet) {
		translatableString = 'admin.appName.tablet';
	}

	let logoColor = '#68a910';
	let previewInfo = '';

	if (environment === LOCAL_ENVIRONMENT_KEYS.LOCALHOST) {
		previewInfo = 'LOCALHOST preview';
		logoColor = '#c9062e';
	} else if (environment === LOCAL_ENVIRONMENT_KEYS.DEV) {
		previewInfo = 'developer preview';
		logoColor = '#c9062e';
	}

	const previewInfoStyle = {
		fontSize: '0.6875rem',
		fontWeight: 'bold' as const,
		color: logoColor,
		textAlign: 'center' as const,
		marginBottom: 0,
	};

	return (
		<>
			<Link
				className="sidebar-logo"
				to="/"
			>
				<svg
					width={190}
					height={43.578}
					fill={logoColor}
				>
					<path d="M46.553 9.925h2.993v32.944h-2.993Z" />
					<path d="M85.456 25.686c0-9.22-3.072-13.794-10.718-13.794-4.728 0-13.084 2.681-13.084 14.661v16.315H58.66V9.924h2.993v7.884c2.681-7.015 9.46-8.589 13.478-8.589 9.378 0 13.317 5.99 13.317 16.472v17.18h-2.993V25.69Z" />
					<path d="M97.135 9.925h2.99v32.944h-2.99Z" />
					<path d="M129.875 14.89c-2.445-1.893-6.621-2.918-9.851-2.918-4.1 0-8.9 1.42-8.9 5.675 0 9.378 21.042 4.1 21.042 16.472 0 6.384-5.753 9.46-12.69 9.46a23.446 23.446 0 0 1-13-3.94c.552-.71 1.495-1.972 1.653-2.129a21.4 21.4 0 0 0 11.27 3.388c5.675 0 9.851-2.129 9.851-6.621 0-9.772-20.964-4.728-20.964-16.708 0-6.069 6.227-8.274 11.744-8.274 3.7 0 8.04 1.183 10.324 2.757l-.473 2.839Z" />
					<path d="M141.167 30.407V12.686h-6.384l.71-2.589h5.675V2.729l2.993-.706v8.074h10.562v2.589h-10.562v17.8c0 9.565 3.628 10.9 10.955 10.114l-.631 2.664c-9.062.705-13.318-2.198-13.318-12.857Z" />
					<path d="M173.134 43.577c-9.381 0-16.866-6.069-16.866-17.1s7.485-17.1 16.866-17.1S190 15.446 190 26.559s-7.485 17.024-16.866 17.024Zm0-31.528c-7.725 0-13.952 5.044-13.952 14.425s6.227 14.421 13.952 14.421 13.869-4.965 13.869-14.343-6.068-14.502-13.869-14.502Z" />
					<path d="m37.565 10.641-1.19-.686-17.521 30.348L1.333 9.955l-1.186.686v2.743l16.335 28.291 2.373 1.372 2.376-1.372 16.334-28.291Z" />
				</svg>
				<div className="sidebar-logo-text">{t({ id: translatableString })}</div>
			</Link>
			{environment !== LOCAL_ENVIRONMENT_KEYS.PRODUCTION && (
				<p style={previewInfoStyle}>{previewInfo}</p>
			)}
		</>
	);
};

export default Logo;
