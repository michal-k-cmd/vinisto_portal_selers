import {
	createContext,
	useCallback,
	useContext,
	useEffect,
	useRef,
	useState,
} from 'react';
import { dayjsInstance as dayjs } from 'Services/Date';
import { useQueryClient } from '@tanstack/react-query';
import { CartShippingDataFormSchema } from 'pages-spa/CartShippingData/schema';
import { PAYMENT_MODAL } from 'Components/Modal/constants';
import {
	DELIVERY_ADDRESSES_QUERY_KEY,
	INVOICE_ADDRESSES_QUERY_KEY,
} from 'Services/Addresses/constants';
import {
	COUPON_USED_ERROR,
	NOT_ENOUGH_ITEMS_IN_WAREHOUSE_ERROR,
} from 'Services/BasketService/constants';
import {
	AddressesApiHooks,
	BillingInfoApiHooks,
} from 'Services/Addresses/hooks';
import { ModalContext } from 'Components/Modal/context';
import { AddressesApi, BillingInfoApi } from 'Services/Addresses';
import {
	VinistoHelperDllEnumsCountryCode,
	VinistoHelperDllEnumsCurrency,
	VinistoHelperDllEnumsOrderPaymentType,
	VinistoOrderDllModelsApiOrderOrdersCreateParameters,
	VinistoOrderDllModelsApiReturnDataDeliveriesReturn,
	VinistoOrderDllModelsApiReturnDataOrderReturn,
} from 'vinisto_api_client/src/api-types/order-api';
import { AuthenticationContext } from 'Services/AuthenticationService/context';
import { LocalizationContext } from 'Services/LocalizationService';
import NewsletterService from 'Services/NewsletterService';
import { NotificationsContext } from 'Services/NotificationService';
import { StorageContext } from 'Services/StorageService/context';
import UserService from 'Services/UserService';
import api from 'vinisto_api_client/src/api';
import webSocketClient from 'WebSocketClient';
import { ObjectId } from 'bson';
import connectToWebsocket from 'Services/AuthenticationService/connectToWebsocket';
import { usePlatformContext } from 'Services/PlatformService';
import { useRouter } from 'next/navigation';
import { GopayPaymentModalData } from 'Components/Modal/Components/Payment';
import { LocalStorageKeys } from 'Services/StorageService/constants';

import {
	DEFAULT_COUNTRY_CODE,
	DEFAULT_CURRENCY,
	DEFAULT_LANGUAGE,
	DELIVERIES_LIMIT,
	DELIVERIES_URI,
} from './constants';
import {
	DeliveryMethod,
	IOrderServiceModel,
	IOrderServiceProps,
	OrderRequestStatus,
	OrderUtmParameters,
	PaymentMethod,
} from './interfaces';

import {
	VinistoAuthDllModelsApiAddressAddress,
	VinistoAuthDllModelsApiBillingInfoBillingInfo,
} from '@/api-types/user-api';
import { VinistoHelperDllBaseError } from '@/api-types/product-api';

const defaultOrderServiceModel: IOrderServiceModel = {
	formValues: { current: {} },
	createOrder: () => Promise.resolve(),
	clearDeliveryPayment: () => null,
	deliveryMethod: null,
	setDeliveryMethod: () => null,
	paymentMethod: null,
	setPaymentMethod: () => null,
	utmPostData: {},
	wsConnectionId: null,
	orderId: new ObjectId().toString(),
	setOrderId: () => '',
	getOrderRequestStatus: () => 'none',
	orderRequestStatus: [],
	isCreatingOrderRef: { current: false },
	orderErrorsFromWs: {},
};

export const OrderContext = createContext(defaultOrderServiceModel);

const OrderServiceProvider = (props: IOrderServiceProps) => {
	const { isB2b, customerId, withB2bQueryParams } = usePlatformContext();
	const router = useRouter();
	const queryClient = useQueryClient();
	const localizationContext = useContext(LocalizationContext);
	const authenticationContext = useContext(AuthenticationContext);
	const modalContext = useContext(ModalContext);
	const notificationContext = useContext(NotificationsContext);
	const storageContext = useContext(StorageContext);

	const deliveryAddresses = AddressesApiHooks.useGetAll({ customerId });
	const invoiceAddresses = BillingInfoApiHooks.useGetAll({
		customerId,
		billingInfoId: '',
	});

	const t = useContext(LocalizationContext).useFormatMessage();

	const [wsClient, setWsClient] = useState(webSocketClient.get());
	const [wsConnectionId, setWsConnectionId] = useState('');
	const [orderId, setOrderId] = useState(new ObjectId().toString());
	const [orderRequestStatus, setOrderRequestStatus] = useState<
		OrderRequestStatus[]
	>([
		{
			orderId: orderId,
			status: 'none',
			basketId: authenticationContext?.basketId || null,
		},
	]);

	const [orderErrorsFromWs, setOrderErrorsFromWs] = useState<
		Record<string, VinistoHelperDllBaseError[]>
	>({});

	const handleOrderError = (error: VinistoHelperDllBaseError[]) => {
		setOrderErrorsFromWs((prev) => ({ ...prev, [orderId]: error }));

		setOrderRequestStatus((prev) =>
			prev.map((req) =>
				req.orderId === orderId ? { ...req, status: 'none' } : req
			)
		);
	};

	const getOrderRequestStatus = useCallback(
		(orderId: string) => {
			const status = orderRequestStatus.find((req) => req.orderId === orderId);
			return status ? status.status : 'none';
		},
		[orderRequestStatus]
	);

	// Update orderRequestStatus when orderId changes (new order)
	useEffect(() => {
		setOrderRequestStatus((prev = []) => {
			return [
				...prev.filter((req) => req.orderId !== orderId),
				{
					orderId: orderId,
					status: 'none',
					basketId: authenticationContext?.basketId || null,
				},
			];
		});
	}, [orderId, authenticationContext?.basketId]);

	const updateContent = useCallback(async (message: string) => {
		const parsedMessage = JSON.parse(message);

		const orderErrors = parsedMessage?.errors || [];

		if (orderErrors) {
			handleOrderError(orderErrors);
			return;
		}

		try {
			queryClient.setQueryData<VinistoOrderDllModelsApiReturnDataOrderReturn | null>(
				[
					'orderQuery',
					authenticationContext?.vinistoUser?.id,
					authenticationContext?.anonymousUID?.anonymousUserId,
					orderId,
				],
				parsedMessage?.response ?? null
			);

			setOrderRequestStatus((prev) => {
				return prev.map((req) =>
					req.orderId === parsedMessage.response?.id
						? { ...req, status: 'received' }
						: req
				);
			});
			// TO CONSIDER This is one of the places where it makes sense to clear the basket
		} catch (error) {
			/* eslint-disable-next-line no-console */
			console.error('Failed to parse message or update order:', error);
		}
	}, []);

	useEffect(() => {
		const websocketId = new ObjectId().toString();

		const webSocketURI = process.env.NEXT_PUBLIC_WEBSOCKET_ORDER_URI!;

		connectToWebsocket({
			websocketId,
			wsClient,
			setWsClient,
			setWsConnectionId,
			updateContent,
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

	useEffect(() => {
		return () => {
			if (wsClient) {
				wsClient.disconnect();
			}
		};
	}, []);

	const formValues = useRef<CartShippingDataFormSchema | Record<string, never>>(
		{}
	);
	const [deliveryMethod, setDeliveryMethod] = useState<null | DeliveryMethod>(
		null
	);
	const [paymentMethod, setPaymentMethod] = useState<null | PaymentMethod>(
		null
	);

	const utmData = storageContext.StorageService.getStorageItem(
		LocalStorageKeys.UTM_CAMPAIGN_DATA
	) as OrderUtmParameters;

	const utmPostData =
		dayjs()
			.add(1, 'm')
			.isAfter(utmData?.expires ?? dayjs()) === false
			? {
					source: utmData?.source,
					medium: utmData?.medium,
					campaign: utmData?.campaign,
					gad: utmData?.gad,
					gclId: utmData?.gclId,
			  }
			: null;

	const isCreatingOrderRef = useRef(false);

	const createOrder = async (
		storedOrderForm: CartShippingDataFormSchema,
		basketId: string,
		resetForm: () => void
	) => {
		// TODO handle this elsewhere (in the data form submit?)
		//if (!basketId) {
		//	notificationContext.handleShowErrorNotification(
		//		'createOrder.error.basket.notFound'
		//	);
		//	return;
		//}

		const isLoggedIn = !!authenticationContext?.vinistoUser?.loginHash;

		// Handle address creation for logged-in users (similar to old createSignedOrder logic)
		let deliveryAddressId = storedOrderForm.deliveryAddressId ?? null;
		let deliveryAddress: VinistoAuthDllModelsApiAddressAddress | null = null;
		let billingAddressId = storedOrderForm?.billingInfoId ?? null;
		let billingAddress: VinistoAuthDllModelsApiBillingInfoBillingInfo | null =
			null;

		if (isLoggedIn) {
			// Existing address handling logic for signed users
			const existingDeliveryAddress =
				deliveryAddresses.data?.addresses?.find(
					(address) => address?.id === deliveryAddressId
				) ?? null;

			if (existingDeliveryAddress && !existingDeliveryAddress.email) {
				existingDeliveryAddress.email = authenticationContext.vinistoUser.email;
			}

			// Create new delivery address if needed
			if (!existingDeliveryAddress) {
				try {
					const requestData = {
						id: '',
						title: 'Adresa #1',
						userLoginHash: authenticationContext?.vinistoUser?.loginHash,
						email:
							storedOrderForm?.email?.delivery ??
							authenticationContext.vinistoUser.email,
						name: storedOrderForm?.name.delivery,
						surname: storedOrderForm?.lastname?.delivery,
						company: storedOrderForm?.organization.delivery || null,
						phone: storedOrderForm?.phone.delivery,
						street: storedOrderForm?.street?.delivery?.value,
						landRegistryNumber: storedOrderForm?.landRegistryNumber?.delivery,
						houseNumber: storedOrderForm?.numberHouse?.delivery || null,
						city: storedOrderForm?.city?.delivery,
						zip: storedOrderForm?.zip.delivery,
						countryCode:
							localizationContext.countryOfSale as VinistoHelperDllEnumsCountryCode,
					};
					if (deliveryMethod?.pickupPoint) {
						deliveryAddress = requestData;
					} else {
						const data = await AddressesApi.create({
							userId:
								// On b2b - save address for customer, not for merchant/support
								(isB2b ? customerId : authenticationContext?.vinistoUser?.id) ??
								'',
							...requestData,
						});
						queryClient.invalidateQueries([DELIVERY_ADDRESSES_QUERY_KEY]);
						deliveryAddress = data?.address ?? null;
						deliveryAddressId = data?.address?.id ?? null;
					}
				} catch (err) {
					return notificationContext.handleShowErrorNotification(
						'createOrder.error.response'
					);
				}
			} else {
				deliveryAddress = existingDeliveryAddress;
			}

			// Handle billing address for signed users
			const existingBillingAddress =
				invoiceAddresses.data?.billingInfos?.find(
					(address) => address?.id === billingAddressId
				) ?? null;

			const shouldUseBillingAddress =
				(storedOrderForm?.useBillingInfo && !billingAddressId) ||
				(deliveryMethod?.pickupPoint && !billingAddressId);

			const shouldUseCompanyData =
				(deliveryMethod?.pickupPoint && storedOrderForm?.useCompanyData) ||
				!deliveryMethod?.pickupPoint;

			if (!storedOrderForm?.email?.billingInfo) {
				storedOrderForm.email.billingInfo =
					authenticationContext.vinistoUser.email ?? '';
			}

			// Create new billing address if needed
			if (shouldUseBillingAddress) {
				try {
					const billingRequestData = {
						title: 'Adresa #1',
						userLoginHash: authenticationContext?.vinistoUser?.loginHash,
						ico: shouldUseCompanyData
							? storedOrderForm?.ico?.billingInfo || null
							: null,
						name: storedOrderForm?.name?.billingInfo,
						surname: storedOrderForm?.lastname?.billingInfo,
						email:
							storedOrderForm?.email?.billingInfo ??
							authenticationContext.vinistoUser.email ??
							'',
						phone: storedOrderForm?.phone.billingInfo,
						street: storedOrderForm?.street?.billingInfo?.value,
						landRegistryNumber:
							storedOrderForm?.landRegistryNumber?.billingInfo,
						houseNumber: storedOrderForm?.numberHouse?.billingInfo || null,
						city: storedOrderForm?.city?.billingInfo,
						zip: storedOrderForm?.zip?.billingInfo,
						dic: shouldUseCompanyData
							? storedOrderForm?.dic?.billingInfo || null
							: null,
						company: shouldUseCompanyData
							? storedOrderForm?.organization?.billingInfo || null
							: null,
						accountNumber: shouldUseCompanyData
							? storedOrderForm?.accountNumber?.billingInfo
									?.split('/')?.[0]
									?.trim()
									?.replace(/^[-]+/, '')
									?.trim() || null
							: null,
						countryCode:
							localizationContext.countryOfSale as VinistoHelperDllEnumsCountryCode,
					};
					const data = await BillingInfoApi.create({
						userId: authenticationContext?.vinistoUser?.id ?? '',
						...billingRequestData,
					});
					billingAddressId = data?.billingInfo?.id ?? null;
					billingAddress = data?.billingInfo ?? null;
					queryClient.invalidateQueries([INVOICE_ADDRESSES_QUERY_KEY]);
				} catch (err) {
					return notificationContext.handleShowErrorNotification(
						'createOrder.error.response'
					);
				}
			} else {
				billingAddress = existingBillingAddress;
			}
		} else {
			// Handle unregistered user addresses (similar to old createUnregisteredOrder logic)
			deliveryAddress = {
				id: '',
				email: storedOrderForm?.email.delivery || null,
				name: storedOrderForm?.name.delivery,
				surname: storedOrderForm?.lastname.delivery,
				company: storedOrderForm?.organization.delivery || null,
				phone: storedOrderForm?.phone.delivery,
				street: storedOrderForm?.street?.delivery?.value,
				landRegistryNumber: storedOrderForm?.landRegistryNumber.delivery,
				houseNumber: storedOrderForm?.numberHouse?.delivery || null,
				city: storedOrderForm?.city?.delivery,
				zip: storedOrderForm?.zip.delivery,
				countryCode:
					localizationContext.countryOfSale as VinistoHelperDllEnumsCountryCode,
			};
		}

		// Build unified request data
		const shouldUseBillingAddress =
			(!deliveryMethod?.pickupPoint && storedOrderForm?.useBillingInfo) ||
			deliveryMethod?.pickupPoint;

		const shouldUseCompanyData =
			(deliveryMethod?.pickupPoint && storedOrderForm?.useCompanyData) ||
			!deliveryMethod?.pickupPoint;

		const requestData: VinistoOrderDllModelsApiOrderOrdersCreateParameters = {
			wsId: wsConnectionId,
			basketId: basketId,
			currency: (localizationContext.activeCurrency?.currency ??
				DEFAULT_CURRENCY) as VinistoHelperDllEnumsCurrency,
			language: localizationContext.activeLanguageKey ?? DEFAULT_LANGUAGE,
			deliveryId: (deliveryMethod?.id as string) ?? null,
			paymentId: paymentMethod?.id ?? null,
			isNewsletterActive: storedOrderForm?.isNewsletterActive ?? false,
			orderId: orderId,
			pickupPoint: deliveryMethod?.pickupPoint
				? {
						addressee: isLoggedIn
							? `${billingAddress?.name} ${billingAddress?.surname}`
							: `${storedOrderForm?.name?.billingInfo} ${storedOrderForm?.lastname?.billingInfo}` ||
							  '',
						code: deliveryMethod?.pickupPoint?.code || '',
						email: isLoggedIn
							? billingAddress?.email ??
							  authenticationContext?.vinistoUser?.email ??
							  ''
							: storedOrderForm?.email?.delivery ?? '',
						phone: isLoggedIn
							? billingAddress?.phone ?? ''
							: storedOrderForm?.phone?.billingInfo || '',
						type: deliveryMethod?.pickupPoint?.type,
						address: {
							city: deliveryMethod?.pickupPoint?.city,
							countryCode: deliveryMethod?.pickupPoint
								?.countryCode as VinistoHelperDllEnumsCountryCode,
							houseNumber: deliveryMethod?.pickupPoint?.houseNumber,
							landRegistryNumber:
								deliveryMethod?.pickupPoint?.landRegistryNumber,
							street: deliveryMethod?.pickupPoint?.street,
							zip: deliveryMethod?.pickupPoint?.zip,
						},
				  }
				: undefined,
			utm: {
				source: utmPostData ? utmPostData?.source : null,
				medium: utmPostData ? utmPostData?.medium : null,
				campaign: utmPostData ? utmPostData?.campaign : null,
				gad: utmPostData ? utmPostData?.gad : null,
				gclId: utmPostData ? utmPostData?.gclId : null,
			},
		};

		// Add conditional fields based on user type
		if (isLoggedIn) {
			// Logged-in user specific fields
			requestData.authorizationParameters = {
				userLoginHash: authenticationContext?.vinistoUser?.loginHash,
			};

			if (deliveryAddressId) {
				requestData.deliveryAddressId = deliveryAddressId;
			}

			if (
				billingAddressId &&
				(storedOrderForm?.useBillingInfo || deliveryMethod?.pickupPoint)
			) {
				requestData.billingAddressId = billingAddressId;
			} else if (deliveryAddress) {
				requestData.billingAddress = deliveryAddress;
			}
		} else {
			// Anonymous user specific fields
			requestData.anonymousUserId = authenticationContext?.anonymousUID
				?.anonymousUserId as string;
			requestData.userEmail = storedOrderForm?.email?.delivery;

			if (!deliveryMethod?.pickupPoint) {
				requestData.deliveryAddress = deliveryAddress;
			}

			if (shouldUseBillingAddress) {
				requestData.billingAddress = {
					ico: shouldUseCompanyData
						? storedOrderForm?.ico?.billingInfo || null
						: null,
					name: storedOrderForm?.name.billingInfo,
					surname: storedOrderForm?.lastname?.billingInfo,
					company: shouldUseCompanyData
						? storedOrderForm?.organization?.billingInfo || null
						: null,
					email: deliveryMethod?.pickupPoint
						? storedOrderForm?.email?.delivery || null
						: storedOrderForm?.email?.billingInfo || null,
					phone: storedOrderForm?.phone?.billingInfo,
					street: storedOrderForm?.street?.billingInfo?.value,
					landRegistryNumber: storedOrderForm?.landRegistryNumber?.billingInfo,
					houseNumber: storedOrderForm?.numberHouse?.billingInfo || null,
					city: storedOrderForm?.city?.billingInfo,
					zip: storedOrderForm?.zip.billingInfo,
					dic: shouldUseCompanyData
						? storedOrderForm?.dic?.billingInfo || null
						: null,
					bankCode: shouldUseCompanyData
						? storedOrderForm?.accountNumber?.billingInfo
								?.split('/')?.[1]
								?.trim() || null
						: null,
					accountNumber: shouldUseCompanyData
						? storedOrderForm?.accountNumber?.billingInfo
								?.split('/')?.[0]
								?.trim()
								?.replace(/^[-]+/, '')
								?.trim() || null
						: null,
					countryCode:
						localizationContext.countryOfSale as VinistoHelperDllEnumsCountryCode,
				};
			} else {
				requestData.billingAddress = deliveryAddress;
			}
		}

		// Add optional fields if they exist
		const shouldUseSpecificSymbolAndCustomOrderNumber =
			(!deliveryMethod?.pickupPoint && storedOrderForm?.useBillingInfo) ||
			(deliveryMethod?.pickupPoint &&
				(storedOrderForm?.useCompanyData || storedOrderForm?.billingInfoId));

		if (shouldUseSpecificSymbolAndCustomOrderNumber) {
			if (storedOrderForm?.specSymbol) {
				requestData.specSymbol = storedOrderForm?.specSymbol;
			}
			if (storedOrderForm?.userCustomOrderNumber) {
				requestData.userCustomOrderNumber =
					storedOrderForm?.userCustomOrderNumber;
			}
		}

		// Setting orderRequestStatus to 'sent' we sent order to BE
		setOrderRequestStatus((prev) => {
			return prev.map((req) =>
				req.orderId === orderId ? { ...req, status: 'sent' } : req
			);
		});

		//if answer dont come set status to received after 2 seconds
		// this is to prevent UI from showing 'sending' status for too long
		const setStatusToRecievedTimeout = setTimeout(() => {
			setOrderRequestStatus((prev) => {
				return prev.map((req) =>
					req.orderId === orderId ? { ...req, status: 'received' } : req
				);
			});
		}, 3000);

		// Call the unified API endpoint
		return api
			.post<VinistoOrderDllModelsApiReturnDataOrderReturn>(
				'order-api/orders',
				undefined,
				requestData
			)
			.then((payload) => {
				return new Promise<VinistoOrderDllModelsApiReturnDataOrderReturn>(
					(resolve) => {
						if (
							storedOrderForm?.isNewsletterActive === true &&
							(isLoggedIn
								? authenticationContext?.vinistoUser?.isNewsletterActive ===
								  false
								: true)
						) {
							const emailToSubscribe = isLoggedIn
								? authenticationContext?.vinistoUser?.email ?? ''
								: storedOrderForm?.email?.delivery ?? '';

							if (emailToSubscribe) {
								NewsletterService.subscribe({ email: emailToSubscribe })
									.then((result) => {
										if (!result as boolean) return;
										if (isLoggedIn) {
											UserService.update(
												authenticationContext?.vinistoUser?.id ?? '',
												{
													userLoginHash:
														authenticationContext?.vinistoUser?.loginHash,
													email:
														authenticationContext?.vinistoUser?.email ??
														authenticationContext.vinistoUser.email ??
														'',
													isNewsletterActive: true,
												}
											).then((newVinistoUser) => {
												authenticationContext.saveVinistoUser(newVinistoUser);
											});
										}
									})
									.finally(() => resolve(payload));
							} else {
								resolve(payload);
							}
						} else {
							resolve(payload);
						}
					}
				);
			})
			.then(async (payload) => {
				resetForm();

				if (
					paymentMethod?.paymentType ===
					VinistoHelperDllEnumsOrderPaymentType.GO_PAY
				) {
					modalContext.handleOpenModal(PAYMENT_MODAL, {
						orderId,
						orderType: 'ORDER',
					} satisfies GopayPaymentModalData);
				} else {
					await router.push(
						withB2bQueryParams(
							`/${t({
								id: 'routes.cart.confirmation.route',
							})}?oid=${orderId}`
						)
					);
				}

				return payload;
			})
			.catch((error: Error) => {
				clearTimeout(setStatusToRecievedTimeout);
				// on error reset status to 'none'
				setOrderRequestStatus((prev) =>
					prev.map((req) =>
						req.orderId === orderId ? { ...req, status: 'none' } : req
					)
				);

				// TODO: At least some of this is not working anymore, since most of errors are being currently sent via websocket
				if (
					error.message === NOT_ENOUGH_ITEMS_IN_WAREHOUSE_ERROR ||
					error.message === COUPON_USED_ERROR
				) {
					throw error;
				}
				if (error.message.includes('Name: ')) {
					const regex = /Name: (.*)(?= does not have assigned supplier\.)/;
					const match = error.message.match(regex);
					const extractedText = match?.[1];
					const errorMessage = (
						t(
							{ id: 'createOrder.error.response.productError' },
							{
								bundleName: extractedText,
							}
						) ?? ''
					).toString();
					notificationContext.handleShowErrorNotification(errorMessage);
					return;
				}
				notificationContext.handleShowErrorNotification(
					'createOrder.error.response'
				);
			});
	};

	const clearDeliveryPayment = useCallback(() => {
		setDeliveryMethod(null);
		setPaymentMethod(null);
	}, []);

	const getDeliveries = (
		isForCustomerDelivery: boolean,
		isForStocking: boolean
	) =>
		api
			.get<VinistoOrderDllModelsApiReturnDataDeliveriesReturn>(DELIVERIES_URI, {
				Language: DEFAULT_LANGUAGE,
				Currency: DEFAULT_CURRENCY,
				AllowedCountry: DEFAULT_COUNTRY_CODE,
				Limit: DELIVERIES_LIMIT,
				isForCustomerDelivery: isForCustomerDelivery,
				isForStocking: isForStocking,
			})
			.then((payload) => payload);

	const orderServiceModel: IOrderServiceModel = {
		formValues,
		createOrder,
		clearDeliveryPayment,
		deliveryMethod,
		setDeliveryMethod,
		paymentMethod,
		setPaymentMethod,
		utmPostData,
		getDeliveries,
		wsConnectionId,
		orderId,
		setOrderId,
		getOrderRequestStatus,
		orderRequestStatus,
		isCreatingOrderRef,
		orderErrorsFromWs,
	};

	return (
		<OrderContext.Provider value={orderServiceModel}>
			{props.children}
		</OrderContext.Provider>
	);
};

export default OrderServiceProvider;
