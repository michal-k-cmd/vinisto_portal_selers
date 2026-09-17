import 'core-js/stable';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import Config from 'Config';
import SideBarContextProvider from 'Components/SideBar/context';
import AuthenticationProvider from 'Services/AuthenticationService/context';
import DeviceServiceProvider from 'Services/DeviceService';
import LocalizationService from 'Services/LocalizationService';
import NotificationsProvider from 'Services/NotificationService';
import RoutingService from 'Services/RoutingService';
import { OAuthConfig, OAuthProvider } from 'vinisto_shared/src/oauth';
import { getRootDomain } from 'Helpers/get-root-domain';
import IntegrationProvider from 'Services/IntegrationService';

import ChatboxLoader from './chat-loader';

const queryClient = new QueryClient({
	defaultOptions: Config.queryClient,
});

const eshopDomain = getRootDomain(import.meta.env.VITE_API_URI ?? '');

const oauthConfig: OAuthConfig = {
	google: {
		clientId: import.meta.env.VITE_GOOGLE_CLIENT_ID,
	},
	facebook: {
		appId: import.meta.env.VITE_FACEBOOK_APP_ID,
		locale: 'cs_CZ',
		version: 'v21.0',
	},
	seznam: {
		clientId: import.meta.env.VITE_SEZNAM_CLIENT_ID,
		callbackUri: `https://${eshopDomain}api/oauth/callback/seznam/`,
	},
};

const VinistoClientAdminApp = () => {
	return (
		<OAuthProvider config={oauthConfig}>
			<DeviceServiceProvider>
				<LocalizationService>
					<NotificationsProvider>
						<SideBarContextProvider>
							<QueryClientProvider client={queryClient}>
								<IntegrationProvider>
									<ReactQueryDevtools initialIsOpen={false} />
									<AuthenticationProvider>
										<ChatboxLoader />
										<RoutingService />
									</AuthenticationProvider>
								</IntegrationProvider>
							</QueryClientProvider>
						</SideBarContextProvider>
					</NotificationsProvider>
				</LocalizationService>
			</DeviceServiceProvider>
		</OAuthProvider>
	);
};

export default VinistoClientAdminApp;
