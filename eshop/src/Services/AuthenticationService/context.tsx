import * as React from 'react';
import { get } from 'lodash-es';
import NewsletterService from 'Services/NewsletterService';
import { PreloaderContext } from 'Components/Preloader/context';
import useAnalytics from 'Hooks/useAnalytics';
import { GA_EVENT } from 'Hooks/useAnalytics/constants';
import { ModalContext } from 'Components/Modal/context';
import {
	FORGOTTEN_PASSWORD_CONFIRM_MODAL,
	PLATFORM_MISMATCH_MODAL,
	REGISTRATION_CONFIRM_MODAL,
	SAFE_REOPEN_TIMEOUT,
} from 'Components/Modal/constants';
import { LocalizationContext } from 'Services/LocalizationService';
import { VinistoHelperDllEnumsUserUserType } from 'vinisto_api_client/src/api-types/user-api';
import webSocketClient from 'WebSocketClient';
import { storageServiceInstance as storageService } from 'Services/StorageService';
import { createBasket, mergeBaskets } from 'Services/BasketService/handlers';
import { useQueryClient } from '@tanstack/react-query';
import {
	useCallback,
	useContext,
	useEffect,
	useMemo,
	useRef,
	useState,
} from 'react';
import {
	SignalRErrorType,
	TransformedSignalRErrors,
} from 'Services/BasketService/interfaces';
import { ObjectId } from 'bson';
import useBroadcastChannel from 'Hooks/useBroadcastChannel';
import { authUserWithLoginHash } from 'Services/AuthorizationService/handlers';
import { usePrevious } from '@uidotdev/usehooks';
import { useIsB2b, usePlatformContext } from 'Services/PlatformService';
import { useRouter } from 'next/navigation';
import {
	AUTH_BROADCAST_MESSAGE_TYPES,
	AuthBroadcastMessage,
	BASKET_BROADCAST_MESSAGE_TYPES,
	BasketBroadcastMessage,
	BROADCAST_CHANNELS,
} from 'Hooks/useBroadcastChannel/constants';
import { LocalStorageKeys } from 'Services/StorageService/constants';

import { NotificationsContext } from '../NotificationService';
// TODO remove this, there is absolutely no need to have this as a context
import { StorageContext } from '../StorageService/context';

import { USER_REGISTER_ERROR_USER_EXIST, USER_WRONG_EMAIL } from './constants';
import {
	AuthenticationContextProviderProps,
	BasketErrorBuckets,
	IAnonymousUID,
	IAuthenticationContextValues,
} from './interfaces';
import {
	deletePriceLevelCookie,
	generateUniqueUserHash,
	mergeWebsocketErrors,
	setPriceLevelCookie,
} from './helpers';
import connectToWebsocket from './connectToWebsocket';
import {
	aggregateErrorsForOwner,
	createEmptyErrorMessages,
	getBucketKey,
	getOwnerKey,
} from './basketErrorsHelpers';

import AuthenticationService from './index';

import { Actions } from '@/message-bus/constants';
import { MessageEventType } from '@/message-bus/interfaces';
import {
	BasketPlatformType,
	BasketResponse,
	BasketType,
} from '@/api-types/basket-api';
import api from '@/api';
import User from '@/domain/user';
import { userAdapter } from '@/index';
import {
	VinistoAuthDllModelsApiUserBaseBuyerUser,
	VinistoAuthDllModelsApiUserCompany,
	VinistoAuthDllModelsApiUserMerchant,
	VinistoAuthDllModelsApiUserUser,
} from '@/api-types/order-api';
import { VinistoHelperDllEnumsPriceLevel } from '@/api-types/product-api';

const defaultVinistoUser: User = {
	id: null,
	email: null,
	loginKey: null,
	loginHash: '',
	createdAt: null,
	permissions: [],
	isAgreementCC: false,
	isEmailVerified: false,
	isNewsletterActive: false,
	firstName: null,
	surname: null,
	nickname: null,
	priceLevel: VinistoHelperDllEnumsPriceLevel.Level1,
	type: VinistoHelperDllEnumsUserUserType.B2C,
	hasAdminToolbarAccess: false,
};

const defaultAnonymousUID: IAnonymousUID = {
	anonymousUserId: null,
	initial_timestamp: null,
	expiresOn: null,
};

export const initialErrorMessages: TransformedSignalRErrors = {
	Bundle: [],
	Coupon: [],
	Addon: [],
};

const defaultAuthenticationContextValues: IAuthenticationContextValues = {
	isLoggedIn: false,
	isLoggining: false,
	vinistoUser: defaultVinistoUser,
	handleOnLogIn: () => null,
	handleOnLogOut: () => null,
	handleResetBasketState: () => null,
	handleOnForceLogOut: () => null,
	saveVinistoUser: () => null,
	handleOnRegister: () => Promise.resolve(),
	handleOnForgottenPassword: () => null,
	handleOnConfirmEmail: () => null,
	handleOnResetPassword: () => Promise.resolve(),
	setIsLoggedIn: () => null,
	setVinistoUser: () => null,
	anonymousUID: defaultAnonymousUID,
	handleOnOAuthLogIn: () => null,
	basketId: null,
	setBasketId: () => null,
	isCreatingBasketRef: { current: false } as React.MutableRefObject<boolean>,
	wsConnectionId: null,
	basketErrorMessages: initialErrorMessages,
	clearBasketErrorCategory: () => null,
};

export const AuthenticationContext = React.createContext(
	defaultAuthenticationContextValues
);

const AuthenticationProvider = ({
	children,
}: AuthenticationContextProviderProps) => {
	const isB2b = useIsB2b();
	const storageContext = useContext(StorageContext);
	const modalContext = useContext(ModalContext);
	const preloaderContext = useContext(PreloaderContext);
	const notificationsContext = useContext(NotificationsContext);
	const localizationContext = useContext(LocalizationContext);
	const {
		activeCurrency: { currency },
		countryOfSale,
	} = localizationContext;

	const [basketId, setBasketId] = useState<string | null>(() => {
		if (isB2b) return null;
		const storedId = storageService.getStorageItem(LocalStorageKeys.BASKET_ID);
		if (storedId) return String(storedId);
		return null;
	});

	const isCreatingBasketRef = useRef<boolean>(false);

	const queryClient = useQueryClient();
	const router = useRouter();

	const getVinistoUserData = useCallback(() => {
		const storedVinistoAuth = storageContext.StorageService.getStorageItem(
			LocalStorageKeys.VINISTO_AUTH
		) as any;
		if (storedVinistoAuth) {
			const storedUserType = get(
				storedVinistoAuth,
				'type',
				VinistoHelperDllEnumsUserUserType.B2C
			);

			const storedVinostoUser: User = {
				id: get(storedVinistoAuth, 'id', null),
				email: get(storedVinistoAuth, 'email', null),
				loginHash: get(storedVinistoAuth, 'loginHash', null),
				loginKey: get(storedVinistoAuth, 'loginKey', null),
				createdAt: get(storedVinistoAuth, 'createdAt', null),
				// NOTE permissions are not being stored in local storage. Therefore, the computed properties are used instead
				permissions: get(storedVinistoAuth, 'permissions', null),
				isAgreementCC: get(storedVinistoAuth, 'isAgreementCC', false),
				isEmailVerified: get(storedVinistoAuth, 'isEmailVerified', false),
				isNewsletterActive: get(storedVinistoAuth, 'isNewsletterActive', false),
				firstName: get(storedVinistoAuth, 'firstName', false),
				surname: get(storedVinistoAuth, 'surname', false),
				nickname: get(storedVinistoAuth, 'nickname', null),
				hasAdminToolbarAccess: get(
					storedVinistoAuth,
					'hasAdminToolbarAccess',
					false
				),
				priceLevel: get(storedVinistoAuth, 'priceLevel', null),
				type: storedUserType,
				...(storedUserType === VinistoHelperDllEnumsUserUserType.Merchant && {
					feePercentage: get(storedVinistoAuth, 'feePercentage', 0),
					canCreateOrderAsMerchant: get(
						storedVinistoAuth,
						'canCreateOrderAsMerchant',
						false
					),
				}),
			};
			return storedVinostoUser;
		} else {
			return defaultAuthenticationContextValues.vinistoUser;
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const { customerId, withB2bQueryParams, getIsInAdminIframe } =
		usePlatformContext();

	const [vinistoUser, setVinistoUser] = useState(getVinistoUserData());
	const [isLoggedIn, setIsLoggedIn] = useState(!!vinistoUser.id);

	const hasExplicitUserType = useMemo(() => {
		if (!vinistoUser.id) return false;
		const storedVinistoAuth = storageContext.StorageService.getStorageItem(
			LocalStorageKeys.VINISTO_AUTH
		) as any;
		return get(storedVinistoAuth, 'type') !== undefined;
	}, [vinistoUser.id, storageContext.StorageService]);

	const hasPlatformMismatch = useMemo(() => {
		if (!isLoggedIn || getIsInAdminIframe()) return false;
		if (isB2b) {
			return (
				hasExplicitUserType &&
				vinistoUser.type === VinistoHelperDllEnumsUserUserType.B2C
			);
		}
		return vinistoUser.type === VinistoHelperDllEnumsUserUserType.Company;
	}, [
		isLoggedIn,
		isB2b,
		getIsInAdminIframe,
		hasExplicitUserType,
		vinistoUser.type,
	]);

	const {
		handleOpenModal: openModal,
		handleCloseModal: closeModal,
		modalType: openedModalType,
	} = modalContext;

	useEffect(() => {
		if (hasPlatformMismatch) {
			openModal(PLATFORM_MISMATCH_MODAL);
		} else if (openedModalType === PLATFORM_MISMATCH_MODAL) {
			closeModal();
		}
	}, [hasPlatformMismatch, openModal, closeModal, openedModalType]);

	const [wsClient, setWsClient] = useState(webSocketClient.get());
	const [wsConnectionId, setWsConnectionId] = useState(() => {
		const storedWsConnectionId = storageService.getStorageItem(
			LocalStorageKeys.WS_CONNECTION_ID
		);
		if (!storedWsConnectionId) {
			const randomObjectId = new ObjectId().toString();
			storageService.setItem(LocalStorageKeys.WS_CONNECTION_ID, randomObjectId);
			return String(randomObjectId);
		}
		return String(storedWsConnectionId);
	});

	const getAnonymousUserData = useCallback((): IAnonymousUID => {
		if (isLoggedIn) return defaultAnonymousUID;

		const anonymousData = storageService.getStorageItem(
			LocalStorageKeys.ANONYMOUS_UID
		) as IAnonymousUID | undefined;
		if (
			!anonymousData ||
			!anonymousData?.anonymousUserId ||
			!anonymousData?.initial_timestamp ||
			!anonymousData?.expiresOn
		) {
			const uid = generateUniqueUserHash();
			storageService.setItem(LocalStorageKeys.ANONYMOUS_UID, uid);
			return uid;
		}
		const storedAnonymousUser: IAnonymousUID = {
			anonymousUserId: anonymousData?.anonymousUserId,
			initial_timestamp: anonymousData?.initial_timestamp,
			expiresOn: anonymousData?.expiresOn,
		};
		return storedAnonymousUser;
	}, [isLoggedIn]);

	const [anonymousUID, setAnonymousUID] = useState<IAnonymousUID>(
		getAnonymousUserData()
	);

	const [isLoggining, setIsLoggining] = useState(false);

	const [basketErrorBuckets, setBasketErrorBuckets] =
		useState<BasketErrorBuckets>({});

	const { sendEvent } = useAnalytics();

	const currentOwnerKey = useMemo(
		() =>
			getOwnerKey({
				isLoggedIn,
				userId: vinistoUser.id,
				anonymousUserId: anonymousUID.anonymousUserId,
			}),
		[isLoggedIn, vinistoUser.id, anonymousUID.anonymousUserId]
	);

	const currentOwnerKeyRef = useRef(currentOwnerKey);

	useEffect(() => {
		currentOwnerKeyRef.current = currentOwnerKey;
	}, [currentOwnerKey]);

	const clearAllBasketErrorBuckets = useCallback(() => {
		setBasketErrorBuckets({});
	}, []);

	const basketErrorMessages = useMemo(
		() => aggregateErrorsForOwner(basketErrorBuckets, currentOwnerKey),
		[basketErrorBuckets, currentOwnerKey]
	);

	const clearBasketErrorCategory = useCallback((category: SignalRErrorType) => {
		setBasketErrorBuckets((previousBuckets) => {
			const ownerKey = currentOwnerKeyRef.current;
			const nextBuckets = { ...previousBuckets };

			Object.keys(nextBuckets).forEach((bucketKey) => {
				const bucket = nextBuckets[bucketKey];

				if (bucket.ownerKey === ownerKey) {
					nextBuckets[bucketKey] = {
						...bucket,
						errors: {
							...bucket.errors,
							[category]: [],
						},
					};
				}
			});

			return nextBuckets;
		});
	}, []);

	// In updateContent, basketId (and most likely all the other variables) are stale
	// the basketIdRef.current is fresh though
	// TODO extract to one hook?
	const basketIdRef = useRef(basketId);

	useEffect(() => {
		basketIdRef.current = basketId;
	}, [basketId]);

	const updateContent = async (message: string) => {
		const parsedMessage = JSON.parse(message);

		if (
			(parsedMessage as BasketBroadcastMessage)?.type ===
			BASKET_BROADCAST_MESSAGE_TYPES.CLEAR_PRIMARY_BASKET
		) {
			handleResetBasketState();
			return;
		}

		const basketErrors = parsedMessage?.errors || [];
		const basketContent = parsedMessage?.response;

		if (
			basketContent.type === BasketType.Primary &&
			(basketContent.id !== basketIdRef.current ||
				(isB2b && basketContent.platformType === BasketPlatformType.B2C))
		)
			return;

		if (basketContent?.type === BasketType.Primary) {
			try {
				queryClient.cancelQueries({
					queryKey: ['basketByUserOrId'],
				});
				queryClient.setQueryData<BasketResponse | null>(
					['basketByUserOrId'],
					basketContent ?? null
				);

				if (basketErrors.length > 0 && basketContent?.id) {
					setBasketErrorBuckets((previousBuckets) => {
						const ownerKey = currentOwnerKeyRef.current;
						const bucketKey = getBucketKey(ownerKey, basketContent.id);
						const previousErrorsForBucket =
							previousBuckets[bucketKey]?.errors ?? createEmptyErrorMessages();

						return {
							...previousBuckets,
							[bucketKey]: {
								basketId: basketContent.id,
								basketType: basketContent.type,
								ownerKey,
								errors: mergeWebsocketErrors(
									basketErrors,
									previousErrorsForBucket
								),
							},
						};
					});
				}
			} catch (error) {
				/* eslint-disable-next-line no-console */
				console.error('Failed to parse message or update basket:', error);

				// If parsing fails, just invalidate queries
				queryClient.invalidateQueries({
					queryKey: ['basketByUserOrId'],
				});
			}
		}

		if (
			[BasketType.UserDefined, BasketType.SystemDefined].includes(
				basketContent?.type
			)
		) {
			try {
				queryClient.cancelQueries({
					queryKey: ['userAndSystemBaskets'],
				});
				queryClient.setQueryData<BasketResponse[] | null>(
					['userAndSystemBaskets'],
					(userBaskets) =>
						userBaskets?.map((userBasket) =>
							userBasket.id === basketContent.id ? basketContent : userBasket
						)
				);

				if (basketErrors.length > 0 && basketContent?.id) {
					setBasketErrorBuckets((previousBuckets) => {
						const ownerKey = currentOwnerKeyRef.current;
						const bucketKey = getBucketKey(ownerKey, basketContent.id);
						const previousErrorsForBucket =
							previousBuckets[bucketKey]?.errors ?? createEmptyErrorMessages();

						return {
							...previousBuckets,
							[bucketKey]: {
								basketId: basketContent.id,
								basketType: basketContent.type,
								ownerKey,
								errors: mergeWebsocketErrors(
									basketErrors,
									previousErrorsForBucket
								),
							},
						};
					});
				}
			} catch (error) {
				/* eslint-disable-next-line no-console */
				console.error('Failed to parse message or update basket:', error);

				// If parsing fails, just invalidate queries
				queryClient.invalidateQueries({
					queryKey: ['userAndSystemBaskets'],
				});
			}
		}
	};

	const { broadcastMessage } = useBroadcastChannel<string>({
		channelName: BROADCAST_CHANNELS.BASKET_SYNC,
		onMessage: (event) => updateContent(event.data),
	});

	const applyForceLogOutState = useCallback(() => {
		if (isLoggedIn) {
			queryClient.setQueryData(['basketByUserOrId'], null);
			queryClient.setQueryData(['userAndSystemBaskets'], null);
			const uid = generateUniqueUserHash();
			currentOwnerKeyRef.current = getOwnerKey({
				isLoggedIn: false,
				userId: null,
				anonymousUserId: uid.anonymousUserId,
			});

			storageService.setItem(LocalStorageKeys.ANONYMOUS_UID, uid);
			setAnonymousUID(uid);
			setVinistoUser(defaultVinistoUser);
			deletePriceLevelCookie();
			setIsLoggedIn(false);
			setBasketId(null);
			clearAllBasketErrorBuckets();
			storageService.removeItem(LocalStorageKeys.BASKET_ID);
			storageService.removeItem(LocalStorageKeys.VINISTO_AUTH);
			storageService.removeItem(LocalStorageKeys.VINISTO_ORDER_FORM);
			storageService.removeItem(LocalStorageKeys.VINISTO_ORDER_STATE);
			storageService.removeItem(LocalStorageKeys.CART_SHIPPING_DATA);
		}
	}, [isLoggedIn, queryClient, clearAllBasketErrorBuckets]);

	const syncUserFromStorage = useCallback(async () => {
		const syncedUser = getVinistoUserData();

		if (!syncedUser?.id) {
			applyForceLogOutState();
			return;
		}

		currentOwnerKeyRef.current = getOwnerKey({
			isLoggedIn: true,
			userId: syncedUser.id,
			anonymousUserId: null,
		});

		clearAllBasketErrorBuckets();
		storageService.removeItem(LocalStorageKeys.ANONYMOUS_UID);
		setAnonymousUID(defaultAnonymousUID);
		setVinistoUser(syncedUser);
		setPriceLevelCookie(syncedUser);
		setIsLoggedIn(true);
		storageService.setItem(LocalStorageKeys.VINISTO_AUTH, syncedUser);

		await Promise.all([
			queryClient.refetchQueries(['basketByUserOrId']),
			queryClient.refetchQueries(['userAndSystemBaskets']),
		]);
	}, [
		getVinistoUserData,
		applyForceLogOutState,
		clearAllBasketErrorBuckets,
		queryClient,
	]);

	const { broadcastMessage: broadcastAuthMessage } =
		useBroadcastChannel<AuthBroadcastMessage>({
			channelName: BROADCAST_CHANNELS.AUTH_SYNC,
			onMessage: async (event) => {
				if (
					event.data.type === AUTH_BROADCAST_MESSAGE_TYPES.LOGIN ||
					event.data.type === AUTH_BROADCAST_MESSAGE_TYPES.USER_UPDATED
				) {
					await syncUserFromStorage();
				}

				if (
					event.data.type === AUTH_BROADCAST_MESSAGE_TYPES.LOGOUT ||
					event.data.type === AUTH_BROADCAST_MESSAGE_TYPES.FORCE_LOGOUT
				) {
					applyForceLogOutState();
				}
			},
		});

	useEffect(() => {
		const webSocketURI = process.env.NEXT_PUBLIC_WEBSOCKET_BASKET_URI;
		if (!webSocketURI) return;

		connectToWebsocket({
			websocketId: wsConnectionId,
			wsClient,
			setWsClient,
			setWsConnectionId,
			updateContent: (message) => {
				updateContent(message);
				broadcastMessage(message);
			},
			webSocketClient,
			webSocketURI,
		});

		return () => {
			if (wsClient) {
				wsClient.disconnect();
			}
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const handleOnRegister = useCallback(
		(
			params: {
				email: string;
				password: string;
				isNewsletterActive: boolean;
				isAgreementCC?: boolean;
			},
			onSuccess?: () => void,
			onError?: () => void
		) => {
			const {
				email,
				password,
				isNewsletterActive,
				isAgreementCC = false,
			} = params;
			if (!isLoggedIn) {
				AuthenticationService.register(
					email,
					password,
					isNewsletterActive,
					isAgreementCC,
					countryOfSale
				)
					.then(async (user) => {
						storageContext.StorageService.removeItem(
							LocalStorageKeys.VINISTO_AUTH
						);
						storageContext.StorageService.removeItem(
							LocalStorageKeys.VINISTO_ORDER_FORM
						);
						storageContext.StorageService.removeItem(
							LocalStorageKeys.VINISTO_ORDER_STATE
						);

						const newVinistoUser = userAdapter.fromApi(user, {
							loginHash: user.loginHash,
						});

						currentOwnerKeyRef.current = getOwnerKey({
							isLoggedIn: true,
							userId: newVinistoUser.id,
							anonymousUserId: null,
						});
						clearAllBasketErrorBuckets();

						if (
							newVinistoUser.isNewsletterActive &&
							newVinistoUser.email !== null
						) {
							NewsletterService.subscribe({ email: newVinistoUser.email });
						}

						if (newVinistoUser.email !== null && newVinistoUser.id !== null) {
							sendEvent(GA_EVENT.SIGN_UP, {
								method: 'email',
								customer_type: 'b2c',
								user_email: newVinistoUser.email,
								user_id: newVinistoUser.id,
							});
						}

						await mergeBaskets({
							basketId,
							customerId: null,
							isCreatingBasketRef,
							currency,
							vinistoUser: newVinistoUser,
							setBasketId,
							wsConnectionId,
						}).catch(() => {
							notificationsContext.handleShowErrorNotification(
								'notification.message.basketMerge.error'
							);
						});

						setVinistoUser(newVinistoUser);
						setPriceLevelCookie(newVinistoUser);
						setIsLoggedIn(true);
						storageContext.StorageService.setItem(
							LocalStorageKeys.VINISTO_AUTH,
							newVinistoUser
						);
						modalContext.handleCloseModal();

						if (typeof onSuccess === 'function') {
							onSuccess();
						} else {
							setTimeout(() => {
								modalContext.handleOpenModal(REGISTRATION_CONFIRM_MODAL);
							}, SAFE_REOPEN_TIMEOUT);
						}
						await Promise.all([
							queryClient.refetchQueries(['basketByUserOrId']),
							queryClient.refetchQueries(['userAndSystemBaskets']),
						]);

						broadcastAuthMessage({
							type: AUTH_BROADCAST_MESSAGE_TYPES.LOGIN,
						});
					})
					.catch((error) => {
						if (get(error, 'message') === USER_REGISTER_ERROR_USER_EXIST) {
							notificationsContext.handleShowErrorNotification(
								'notification.message.userExist.error'
							);
						} else {
							notificationsContext.handleShowErrorNotification(
								'notification.message.registration.error'
							);
						}
						onError?.();
					});
			}
		},
		[
			isLoggedIn,
			countryOfSale,
			storageContext.StorageService,
			basketId,
			currency,
			wsConnectionId,
			modalContext,
			sendEvent,
			notificationsContext,
			queryClient,
			clearAllBasketErrorBuckets,
			broadcastAuthMessage,
		]
	);

	const handleOnLogOut = useCallback(() => {
		if (isLoggedIn) {
			queryClient.setQueryData(['basketByUserOrId'], null);
			queryClient.setQueryData(['userAndSystemBaskets'], null);
			preloaderContext.togglePreloader(true);
			AuthenticationService.logOut(vinistoUser.loginHash).finally(() => {
				setVinistoUser(defaultVinistoUser);
				deletePriceLevelCookie();
				setIsLoggedIn(false);
				storageContext.StorageService.removeItem(LocalStorageKeys.VINISTO_AUTH);
				storageContext.StorageService.removeItem(
					LocalStorageKeys.CART_SHIPPING_DATA
				);
				notificationsContext.handleShowSuccessNotification(
					'notification.message.logOut.success'
				);
				preloaderContext.togglePreloader();
				const uid = generateUniqueUserHash();
				currentOwnerKeyRef.current = getOwnerKey({
					isLoggedIn: false,
					userId: null,
					anonymousUserId: uid.anonymousUserId,
				});

				storageContext.StorageService.setItem(
					LocalStorageKeys.ANONYMOUS_UID,
					uid
				);
				setAnonymousUID(uid);
				storageService.removeItem(LocalStorageKeys.BASKET_ID);
				setBasketId(null);
				clearAllBasketErrorBuckets();
				preloaderContext.togglePreloader(false);

				broadcastAuthMessage({
					type: AUTH_BROADCAST_MESSAGE_TYPES.LOGOUT,
				});
			});
		}
	}, [
		isLoggedIn,
		preloaderContext,
		vinistoUser.loginHash,
		storageContext.StorageService,
		notificationsContext,
		queryClient,
		clearAllBasketErrorBuckets,
		broadcastAuthMessage,
	]);

	const handleResetBasketState = useCallback(() => {
		queryClient.setQueryData<BasketResponse | null>(['basketByUserOrId'], null);
		storageService.removeItem(LocalStorageKeys.CART_SHIPPING_DATA);
		storageService.removeItem(LocalStorageKeys.BASKET_ID);
		storageService.removeItem(LocalStorageKeys.BASKET_TIMER);
		setBasketId(null);
		clearAllBasketErrorBuckets();
	}, [clearAllBasketErrorBuckets, queryClient]);

	const saveVinistoUser = useCallback(
		(vinistoUser: User) => {
			setVinistoUser(vinistoUser);
			setPriceLevelCookie(vinistoUser);
			storageContext.StorageService.setItem(
				LocalStorageKeys.VINISTO_AUTH,
				vinistoUser
			);
			broadcastAuthMessage({
				type: AUTH_BROADCAST_MESSAGE_TYPES.USER_UPDATED,
			});
		},
		[storageContext.StorageService, broadcastAuthMessage]
	);

	const handleOnForceLogOut = useCallback(() => {
		applyForceLogOutState();
		broadcastAuthMessage({
			type: AUTH_BROADCAST_MESSAGE_TYPES.FORCE_LOGOUT,
		});
	}, [applyForceLogOutState, broadcastAuthMessage]);

	const handleOnOAuthLogIn = useCallback(
		async (
			user:
				| VinistoAuthDllModelsApiUserBaseBuyerUser
				| VinistoAuthDllModelsApiUserCompany
				| VinistoAuthDllModelsApiUserMerchant
				| VinistoAuthDllModelsApiUserUser
		) => {
			modalContext.handleCloseModal();
			notificationsContext.handleShowSuccessNotification(
				'notification.message.logIn.success'
			);

			const newVinistoUser = userAdapter.fromApi(user, {
				loginHash: user.loginHash,
			});

			currentOwnerKeyRef.current = getOwnerKey({
				isLoggedIn: true,
				userId: newVinistoUser.id,
				anonymousUserId: null,
			});
			clearAllBasketErrorBuckets();

			if (anonymousUID.anonymousUserId && user?.loginHash && user?.id) {
				await mergeBaskets({
					basketId,
					// TODO is this possible at all?
					customerId: null,
					isCreatingBasketRef,
					currency,
					vinistoUser: newVinistoUser,
					setBasketId,
					wsConnectionId,
				}).catch(() => {
					notificationsContext.handleShowErrorNotification(
						'notification.message.basketMerge.error'
					);
				});
			}

			storageContext.StorageService.removeItem(LocalStorageKeys.ANONYMOUS_UID);
			setAnonymousUID({
				anonymousUserId: null,
				initial_timestamp: null,
				expiresOn: null,
			});

			setVinistoUser(newVinistoUser);
			setPriceLevelCookie(newVinistoUser);
			setIsLoggedIn(true);
			storageContext.StorageService.setItem(
				LocalStorageKeys.VINISTO_AUTH,
				newVinistoUser
			);
			setIsLoggining(false);

			await Promise.all([
				queryClient.refetchQueries(['basketByUserOrId']),
				queryClient.refetchQueries(['userAndSystemBaskets']),
			]);

			broadcastAuthMessage({
				type: AUTH_BROADCAST_MESSAGE_TYPES.LOGIN,
			});
		},
		[
			modalContext,
			notificationsContext,
			anonymousUID.anonymousUserId,
			storageContext.StorageService,
			basketId,
			currency,
			wsConnectionId,
			queryClient,
			clearAllBasketErrorBuckets,
			broadcastAuthMessage,
		]
	);

	const handleOnLogIn = useCallback(
		(
			params: { email: string; password: string },
			onSuccess?: () => void,
			onError?: (error?: unknown) => void
		) => {
			const { email, password } = params;
			setIsLoggining(true);

			if (!isLoggedIn) {
				AuthenticationService.logIn(email, password, isB2b)
					.then(async (user) => {
						modalContext.handleCloseModal();
						notificationsContext.handleShowSuccessNotification(
							'notification.message.logIn.success'
						);

						const newVinistoUser = userAdapter.fromApi(user, {
							loginHash: user?.loginHash,
						});

						currentOwnerKeyRef.current = getOwnerKey({
							isLoggedIn: true,
							userId: newVinistoUser.id,
							anonymousUserId: null,
						});
						clearAllBasketErrorBuckets();

						storageService.removeItem(LocalStorageKeys.ANONYMOUS_UID);
						setAnonymousUID({
							anonymousUserId: null,
							initial_timestamp: null,
							expiresOn: null,
						});

						setVinistoUser(newVinistoUser);
						setPriceLevelCookie(newVinistoUser);
						setIsLoggedIn(true);
						setPriceLevelCookie(newVinistoUser);
						storageService.setItem(
							LocalStorageKeys.VINISTO_AUTH,
							newVinistoUser
						);

						setIsLoggining(false);

						await mergeBaskets({
							basketId,
							customerId: null,
							isCreatingBasketRef,
							currency,
							vinistoUser: newVinistoUser,
							setBasketId,
							wsConnectionId,
						}).catch(() => {
							notificationsContext.handleShowErrorNotification(
								'notification.message.basketMerge.error'
							);
						});
						await Promise.all([
							queryClient.refetchQueries(['basketByUserOrId']),
							queryClient.refetchQueries(['userAndSystemBaskets']),
						]);

						broadcastAuthMessage({
							type: AUTH_BROADCAST_MESSAGE_TYPES.LOGIN,
						});
						onSuccess?.();
					})
					.catch((error) => {
						// TO CONSIDER Maybe don't show the toast on user platform mismatch?
						notificationsContext.handleShowErrorNotification(
							'notification.message.logIn.error'
						);
						setIsLoggining(false);
						onError?.(error);
					});
			}
		},
		[
			isLoggedIn,
			isB2b,
			modalContext,
			notificationsContext,
			clearAllBasketErrorBuckets,
			basketId,
			currency,
			wsConnectionId,
			queryClient,
			broadcastAuthMessage,
		]
	);

	const handleOnForgottenPassword = useCallback(
		(email: string) => {
			if (!isLoggedIn) {
				AuthenticationService.forgottenPassword(email)
					.then(() => {
						modalContext.handleOpenModal(FORGOTTEN_PASSWORD_CONFIRM_MODAL);
					})
					.catch((error) => {
						if (get(error, 'message') === USER_WRONG_EMAIL) {
							modalContext.handleOpenModal(FORGOTTEN_PASSWORD_CONFIRM_MODAL);
							return;
						}
						notificationsContext.handleShowErrorNotification(
							'notification.message.forgottenPassword.error'
						);
					});
			}
		},
		[isLoggedIn, modalContext, notificationsContext]
	);

	const handleOnConfirmEmail = useCallback(
		(hash: string) => {
			AuthenticationService.confirmEmail(hash)
				.then(() => {
					notificationsContext.handleShowSuccessNotification(
						'notification.message.confirmEmail.success'
					);
				})
				.catch(() => {
					notificationsContext.handleShowErrorNotification(
						'notification.message.confirmEmail.error'
					);
				});
		},
		[notificationsContext]
	);

	const handleOnResetPassword = useCallback(
		(resetHash: string, newPassword: string) => {
			if (!isLoggedIn) {
				return AuthenticationService.resetPassword(resetHash, newPassword);
			}
		},
		[isLoggedIn]
	);

	const previousBasketId = usePrevious(basketId);

	useEffect(() => {
		if (previousBasketId !== basketId) {
			window.parent.postMessage(
				{ action: Actions.SET_BASKET_ID, basketId },
				'*'
			);
		}

		const handleMessage = (e: MessageEvent<MessageEventType>) => {
			if (e.data.action === Actions.LOGIN_FROM_ADMIN) {
				if (!e.data.vinistoUser) return;
				authUserWithLoginHash({
					loginHash: e.data.vinistoUser.loginHash,
					vinistoUser,
					setVinistoUser,
					onError: () => handleOnForceLogOut(),
				}).then((vinistoUser) => {
					storageService.removeItem(LocalStorageKeys.ANONYMOUS_UID);
					setAnonymousUID({
						anonymousUserId: null,
						initial_timestamp: null,
						expiresOn: null,
					});
					setIsLoggedIn(true);
					setIsLoggining(false);

					window.parent.postMessage(
						{
							action: Actions.LOGIN_FROM_ADMIN_SUCCESS,
							vinistoUser: vinistoUser,
						},
						'*'
					);
				});
			}
			if (e.data.action === Actions.DELETE_BASKET_FROM_ADMIN) {
				api
					.delete(
						`basket-api/Basket/${basketId}`,
						{
							basketId,
							userId: vinistoUser.id,
						},
						undefined,
						{ responseType: 'text' }
					)
					.then(() => {
						setBasketId(null);
						storageService.removeItem(LocalStorageKeys.BASKET_ID);
						queryClient.setQueryData<BasketResponse | null>(
							['basketByUserOrId'],
							null
						);
						window.parent.postMessage(
							{ action: Actions.DELETE_BASKET_FROM_ADMIN_SUCCESS },
							'*'
						);
					});
			}

			if (e.data.action === Actions.CREATE_NEW_BASKET_FROM_ADMIN) {
				// The handler is looking for a stored basket id (consider carefully removing it?)
				// needs to be removed first...
				storageService.removeItem(LocalStorageKeys.BASKET_ID);

				createBasket({
					userId: vinistoUser.id,
					userLoginHash: vinistoUser.loginHash,
					anonymousUserId: null,
					customerId,
					currency,
					isCreatingBasketRef,
					type: BasketType.Primary,
					platform: BasketPlatformType.B2B,
				})
					.then((response) => {
						queryClient.setQueryData<BasketResponse | null>(
							['basketByUserOrId'],
							null
						);
						setBasketId(response);
						storageService.setItem(LocalStorageKeys.BASKET_ID, response);
						window.parent.postMessage(
							{ action: Actions.SET_BASKET_ID, basketId: response },
							'*'
						);
					})
					.then(() => router.push(withB2bQueryParams('/kosik')));
			}
		};

		window.addEventListener('message', handleMessage);
		return () => {
			window.removeEventListener('message', handleMessage);
		};
	}, [
		basketId,
		handleOnForceLogOut,
		previousBasketId,
		queryClient,
		vinistoUser,
		customerId,
		currency,
		router,
		withB2bQueryParams,
	]);

	const authenticationContextValues: IAuthenticationContextValues = {
		isLoggedIn,
		isLoggining,
		saveVinistoUser,
		vinistoUser,
		handleOnForceLogOut,
		handleOnRegister,
		handleOnLogOut,
		handleResetBasketState,
		handleOnLogIn,
		handleOnForgottenPassword,
		handleOnConfirmEmail,
		handleOnResetPassword,
		setIsLoggedIn,
		setVinistoUser,
		anonymousUID,
		handleOnOAuthLogIn,
		basketId,
		setBasketId,
		isCreatingBasketRef,
		wsConnectionId,
		basketErrorMessages,
		clearBasketErrorCategory,
	};

	return (
		<AuthenticationContext.Provider value={authenticationContextValues}>
			{children}
		</AuthenticationContext.Provider>
	);
};

export const useAuthenticationContext = () => {
	const authenticationContext = useContext(AuthenticationContext);
	if (!authenticationContext)
		throw new Error(
			'Authentication context is not available. This component needs to be a child of <AuthenticationContext.Provider> component to be able to use the context.'
		);
	return authenticationContext;
};

export default AuthenticationProvider;
