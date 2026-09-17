import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import EnvironmentServiceProvider from 'Services/EnvironmentService/context';
import SideBarContextProvider from 'Components/SideBar/context';
import AuthenticationProvider from 'Services/AuthenticationService/context';
import IntegrationProvider from 'Services/IntergationService';
import DeviceServiceProvider from 'Services/DeviceService';
import LocalizationService from 'Services/LocalizationService';
import NotificationsProvider from 'Services/NotificationService';
import StorageService from 'Services/StorageService/context';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { OAuthConfig, OAuthProvider } from 'vinisto_shared/src/oauth';
import BasketServiceProvider from 'Services/BasketService';

import Routing from './router';

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
		callbackUri: `${import.meta.env.VITE_ESHOP_URI}api/oauth/callback/seznam/`,
	},
};

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			retry: 0,
			staleTime: 10000,
			refetchOnMount: false,
			refetchOnWindowFocus: false,
		},
	},
});

const VinistoAdminApp = () => {
	return (
		<OAuthProvider config={oauthConfig}>
			<EnvironmentServiceProvider>
				<DeviceServiceProvider>
					<StorageService>
						<LocalizationService>
							<NotificationsProvider>
								<QueryClientProvider client={queryClient}>
									<IntegrationProvider>
										<SideBarContextProvider>
											<AuthenticationProvider>
												<BasketServiceProvider>
													<Routing />
												</BasketServiceProvider>
											</AuthenticationProvider>
										</SideBarContextProvider>
										<ReactQueryDevtools initialIsOpen={false} />
									</IntegrationProvider>
								</QueryClientProvider>
							</NotificationsProvider>
						</LocalizationService>
					</StorageService>
				</DeviceServiceProvider>
			</EnvironmentServiceProvider>
		</OAuthProvider>
	);
};

export default VinistoAdminApp;
