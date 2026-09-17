'use client';

import {
	QueryClient,
	QueryClientConfig,
	QueryClientProvider,
} from '@tanstack/react-query';
import PreloaderProvider from 'Components/Preloader/context';
import WarehouseServiceContextProvider from 'Services/WarehouseService';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { isPrerender } from 'Helpers/prerender';
import LocalizationServiceProvider from 'Services/LocalizationService';
import AuthenticationProvider from 'Services/AuthenticationService/context';
import NotificationsServiceProvider from 'Services/NotificationService';
import StorageServiceProvider from 'Services/StorageService/context';
import DeviceServiceProvider from 'Services/DeviceService';
import FavoritesServiceProvider from 'Services/FavoritesService';
import OrderServiceProvider from 'Services/OrderService/context';
import ModalProvider from 'Components/Modal/context';
import { OAuthConfig, OAuthProvider } from 'vinisto_shared/src/oauth';
import BasketServiceProvider from 'Services/BasketService';
import CookieServiceProvider from 'Services/CookieService';
import AuthorizationService from 'Services/AuthorizationService';
import Modal from 'Components/Modal';
import { NuqsAdapter } from 'nuqs/adapters/next/app';
import GoPayServiceProvider from 'Services/GoPayService';
import NavbarContextProvider from 'Components/Navbar/context';
import { Suspense } from 'react';
import StorageUTM from 'Services/RoutingService/Components/StorageUTM';
import { ProgressProvider } from 'contexts/ProgressContext';
import PlatformProvider from 'Services/PlatformService';
import dynamic from 'next/dynamic';

const CookiesModal = dynamic(
	() => import('Components/Modal/Components/Cookies'),
	{ ssr: false }
);

import ChatboxLoader from './chat-loader';
import EhubLoader from './EHubLoader';
import FacebookPixelLoader from './FacebookPixelLoader';

const queryClientConfig = {
	defaultOptions: {
		queries: {
			retry: 0,
			staleTime: 10000,
			refetchOnMount: false,
			refetchOnWindowFocus: false,
		},
	},
} satisfies QueryClientConfig;

const queryClient = new QueryClient(queryClientConfig);

const oauthConfig: OAuthConfig = {
	google: {
		clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID ?? '',
	},
	facebook: {
		appId: process.env.NEXT_PUBLIC_FACEBOOK_APP_ID ?? '',
		locale: 'cs_CZ',
		version: 'v21.0',
	},
	seznam: {
		clientId: process.env.NEXT_PUBLIC_SEZNAM_CLIENT_ID ?? '',
		callbackUri: `${process.env.NEXT_PUBLIC_BASE_URI}api/oauth/callback/seznam/`,
	},
};

const Providers = ({
	children,
	deviceType,
	activeCurrencyCookie,
	topLevelDomain,
	isServerSideB2b,
}: {
	children: React.ReactNode;
	deviceType: 'desktop' | 'mobile';
	activeCurrencyCookie: string | undefined;
	topLevelDomain: string | undefined;
	isServerSideB2b: boolean;
}) => {
	return (
		<Suspense>
			<NuqsAdapter>
				<FacebookPixelLoader />
				<OAuthProvider config={oauthConfig}>
					<PlatformProvider isServerSideB2b={isServerSideB2b}>
						<ProgressProvider>
							<QueryClientProvider client={queryClient}>
								<WarehouseServiceContextProvider>
									<DeviceServiceProvider deviceType={deviceType}>
										<StorageServiceProvider>
											<LocalizationServiceProvider
												activeCurrencyCookie={activeCurrencyCookie}
												topLevelDomain={topLevelDomain}
											>
												<NotificationsServiceProvider>
													<ModalProvider>
														<AuthenticationProvider>
															{!isPrerender() && <ChatboxLoader />}
															<FavoritesServiceProvider>
																<OrderServiceProvider>
																	<EhubLoader />
																	<StorageUTM />
																	<PreloaderProvider>
																		<AuthorizationService>
																			<BasketServiceProvider>
																				<GoPayServiceProvider>
																					<CookieServiceProvider>
																						<NavbarContextProvider
																							activeCurrencyCookie={
																								activeCurrencyCookie
																							}
																						>
																							<Modal />
																							<CookiesModal />
																							{children}
																						</NavbarContextProvider>
																					</CookieServiceProvider>
																				</GoPayServiceProvider>
																			</BasketServiceProvider>
																		</AuthorizationService>
																	</PreloaderProvider>
																</OrderServiceProvider>
															</FavoritesServiceProvider>
														</AuthenticationProvider>
													</ModalProvider>
												</NotificationsServiceProvider>
											</LocalizationServiceProvider>
										</StorageServiceProvider>
									</DeviceServiceProvider>
								</WarehouseServiceContextProvider>
								<ReactQueryDevtools
									initialIsOpen={false}
									position="top-left"
								/>
							</QueryClientProvider>
						</ProgressProvider>
					</PlatformProvider>
				</OAuthProvider>
			</NuqsAdapter>
		</Suspense>
	);
};

export default Providers;
