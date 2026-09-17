import 'react-loading-skeleton/dist/skeleton.css';
import '../assets/styles/bootstrap/bootstrap.min.css';
import 'react-confirm-alert/src/react-confirm-alert.css';
import '../assets/styles/fonts.css';
import '../assets/styles/utility.css';
import '../assets/styles/template.css';
import '../assets/styles/responsive.css';
import '../assets/styles/notifications.css';
import '../assets/styles/alice-carousel.css';
import 'vinisto_ui/src/assets/styles/variables.css';

import './styles.css';

import { Metadata } from 'next';
import Providers from 'providers';
import { cookies, headers } from 'next/headers';
import Config from 'Config';
import { prefix } from 'Services/StorageService/helpers';
import { LocalStorageKeys } from 'Services/StorageService/constants';
import getIntl from 'app/intl';
import { DEFAULT_LANGUAGE } from 'Services/LocalizationService/constants';
import { getServerIsB2b } from 'Services/PlatformService/server';

export const generateMetadata = async (): Promise<Metadata> => {
	const intl = await getIntl();
	const t = intl.formatMessage;

	return {
		metadataBase: new URL(Config.baseUrl),
		title: `${t({ id: 'app.title.name' })}`,
		description: `${t({ id: 'app.description' })}`,
	};
};

const RootLayout = async ({
	children,
	modal,
}: {
	children: React.ReactNode;
	modal: React.ReactNode;
}) => {
	const h = await headers();

	const topLevelDomain = h.get('host')?.split('.').pop() || DEFAULT_LANGUAGE;

	const deviceType = h.get('x-device-type') as 'desktop' | 'mobile';

	const cookie = await cookies();

	const activeCurrencyCookie = cookie.get(
		prefix(LocalStorageKeys.ACTIVE_CURRENCY)
	)?.value;

	const isB2b = await getServerIsB2b();

	const intl = await getIntl();
	const t = intl.formatMessage;

	const jsonLd = {
		'@context': 'https://schema.org',
		'@type': 'OnlineStore',
		name: `${t({ id: 'app.title.name' })}`,
		alternateName: 'vinisto',
		description: `${t({ id: 'app.description' })}`,
		logo: `${Config.baseUrl}vinisto_logo.svg`,
		image: `${Config.baseUrl}og.jpg`,
		url: Config.baseUrl,
	};

	return (
		<html lang="cs">
			<head>
				{/* {process.env.NODE_ENV === 'development' && (
					<script
						async
						src="https://unpkg.com/react-scan/dist/auto.global.js"
					/>
				)} */}
				<link
					rel="icon"
					type="image/png"
					href="/favicon.ico"
				/>
				<link
					rel="manifest"
					href="/manifest.json"
					crossOrigin="use-credentials"
				/>

				<link
					rel="alternate"
					type="application/rss+xml"
					title="vinisto RSS Feed"
					href="/cms-api/rss"
				/>
				<script
					id="jsonLd/app"
					type="application/ld+json"
					dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
				/>
			</head>

			<body>
				<noscript>You need to enable JavaScript to run this app.</noscript>
				<div id="vinisto_eshop_root">
					<Providers
						deviceType={deviceType}
						activeCurrencyCookie={activeCurrencyCookie}
						topLevelDomain={topLevelDomain}
						isServerSideB2b={isB2b}
					>
						{modal}
						{children}
					</Providers>
				</div>
			</body>
		</html>
	);
};

export default RootLayout;
