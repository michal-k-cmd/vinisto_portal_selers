'use client';

import { useContext, useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { GA_EVENT } from 'Hooks/useAnalytics/constants';
import useAnalytics from 'Hooks/useAnalytics';
import useDebounce from 'Hooks/useDebounce';
import useFormRefStore from 'Hooks/useFormRefPersist';
import useLocalizedValue from 'Hooks/useLocalizedValue';
import useDeliveryDetail from 'pages-spa/CartShippingPayment/Hooks/useDeliveryDetail';
import usePaymentDetail from 'pages-spa/CartShippingPayment/Hooks/usePaymentDetail';
import useChat from 'Hooks/useChat';
import {
	AddressesApiHooks,
	BillingInfoApiHooks,
} from 'Services/Addresses/hooks';
import AuthenticationService from 'Services/AuthenticationService';
import { AuthenticationContext } from 'Services/AuthenticationService/context';
import { BasketContext } from 'Services/BasketService';
import { LocalizationContext } from 'Services/LocalizationService';
import { NotificationsContext } from 'Services/NotificationService';
import { OrderContext } from 'Services/OrderService/context';
import { StorageContext } from 'Services/StorageService/context';
import { TrackEvent } from 'Services/FacebookPixel';
import Form from 'Components/Forms';
import { eHubService } from 'Services/eHub';
import { DEFAULT_CURRENCY } from 'vinisto_api_client/src/shared';
import BasketSummary from 'pages-spa/Basket/Components/BasketSummary';
import Container from 'Components/View/Container';
import BasketHeader from 'pages-spa/Basket/Components/BasketHeader';
//import BasketShare from 'pages-spa/Basket/Components/BasketShare';
import basketStyles from 'pages-spa/Basket/styles.module.css';
import { useGetDeliveriesByBasket } from 'Hooks/useGetDeliveries';
import { usePlatformContext } from 'Services/PlatformService';
import { updateApprovalState } from 'Services/BasketService/handlers';
import useIsFeeOverLimit from 'Services/BasketService/useIsFeeOverLimit';
import useGetB2bCustomer from 'Hooks/useGetB2bCustomer';
import { ObjectId } from 'bson';
import { LocalStorageKeys } from 'Services/StorageService/constants';

import { CartShippingDataFormSchema } from './schema';
import DeliveryAddresses from './Components/DeliveryAddresses';
import DeliveryForm from './Components/DeliveryForm';
import EmailForm from './Components/EmailForm';
import InvoiceAddresses from './Components/InvoiceAddresses';
import InvoiceForm from './Components/InvoiceForm';
import LoginMessage from './Components/LoginMessage';
import PickupPointForm from './Components/PickupPointForm';
import { SavedAddressesIds } from './interfaces';
import styles from './styles.module.css';
import DisabledCompanySaleInfo from './Components/DisabledCompanySaleInfo';
import OAuthLogin from './Components/OAuthLogin';

import { BasketApprovalState } from '@/api-types/basket-api';

const CartShippingData = () => {
	const { customerId, isB2b, withB2bQueryParams, getIsInAdminIframe } =
		usePlatformContext();
	const storageContext = useContext(StorageContext);
	const isAdminIframe = getIsInAdminIframe();
	const {
		deliveryMethod,
		utmPostData: orderContextUtmPostData,
		paymentMethod,
		formValues,
		createOrder,
		orderId,
		setOrderId,
		getOrderRequestStatus,
		isCreatingOrderRef,
	} = useContext(OrderContext);

	let { current: currentFormValues } = formValues;
	const { isLoggedIn, vinistoUser, basketId } = useContext(
		AuthenticationContext
	);
	const { isNewsletterActive, email: vinistoUserEmail } = vinistoUser;
	const {
		basketState,
		basketItemsGoogleAnalyticsData,
		handleOnRemoveCoupon,
		uxAddons,
		basketTotalsWithEffectivePackaging,
		handleOnClearBasket,
	} = useContext(BasketContext);

	const { items, coupons, currency, totalPrice } = basketState ?? {};
	const { useFormatMessage, activeCurrency, countryOfSale } =
		useContext(LocalizationContext);
	const notificationContext = useContext(NotificationsContext);

	const unappliedCoupons = (coupons ?? []).filter(
		(coupon) => coupon && !coupon?.isCouponApplied
	);

	const t = useFormatMessage();
	const router = useRouter();
	const getLocalizedValue = useLocalizedValue();
	const { sendEvent: sendAnalyticsEvent } = useAnalytics();
	const { hideWidget, showWidget } = useChat();

	const deliveryId = deliveryMethod?.id ?? null;
	const utmPostData = orderContextUtmPostData ?? null;
	const deliveryDetail = useDeliveryDetail(deliveryId ?? '');

	const paymentId = paymentMethod?.id ?? null;
	const paymentDetail = usePaymentDetail(paymentId ?? '');

	const isDeliveryLoading = !deliveryDetail.isLoaded;

	const [isAnalyticsSent, setIsAnalyticsSent] = useState<boolean>(false);

	const b2bCustomerQuery = useGetB2bCustomer({
		customerId: isB2b ? customerId : null,
	});

	useEffect(() => {
		if (
			basketItemsGoogleAnalyticsData.length === 0 ||
			isDeliveryLoading ||
			isAnalyticsSent
		)
			return;

		sendAnalyticsEvent(GA_EVENT.ADD_SHIPPING_INFO, {
			currency: String(currency) ?? DEFAULT_CURRENCY,
			value: totalPrice ?? 0,
			shipping_tier: getLocalizedValue(deliveryDetail.data?.name ?? []),
			items: basketItemsGoogleAnalyticsData,
		});
		setIsAnalyticsSent(true);
	}, [
		basketItemsGoogleAnalyticsData,
		isDeliveryLoading,
		isAnalyticsSent,
		basketState,
		deliveryDetail,
		sendAnalyticsEvent,
		setIsAnalyticsSent,
		totalPrice,
		getLocalizedValue,
		currency,
	]);

	const [isPaymentAnalyticsSent, setIsPaymentAnalyticsSent] =
		useState<boolean>(false);

	const paymentType = getLocalizedValue(paymentDetail.data?.name || []);

	const deliveriesByBasketQuery = useGetDeliveriesByBasket(
		{
			currency: activeCurrency.currency,
			allowedCountry: countryOfSale,
			basketId,
		},
		{
			enabled: Boolean(basketId),
		}
	);

	const selectedDeliveryPriceWithVat =
		deliveriesByBasketQuery?.data?.find(
			(delivery) => delivery.id === deliveryMethod?.id
		)?.prices?.[0]?.valueWithVat ?? 0;

	const isBasketPriceZeroOrNegative =
		basketState?.items?.length &&
		basketTotalsWithEffectivePackaging.totalDiscountedPriceWithVatWithGiftCoupons +
			selectedDeliveryPriceWithVat <=
			0;

	useEffect(() => {
		if (
			basketItemsGoogleAnalyticsData.length === 0 ||
			isDeliveryLoading ||
			isPaymentAnalyticsSent
		) {
			return;
		}

		TrackEvent('track', 'AddPaymentInfo', {
			content_type: 'product',
			content_ids: basketState?.items?.map((bundle) => bundle.itemId) ?? [],
			value: totalPrice ?? 0,
			currency: String(currency) ?? DEFAULT_CURRENCY,
		});

		sendAnalyticsEvent(GA_EVENT.ADD_PAYMENT_INFO, {
			currency: String(currency) ?? DEFAULT_CURRENCY,
			value: totalPrice ?? 0,
			payment_type: paymentType,
			items: basketItemsGoogleAnalyticsData,
		});
		setIsPaymentAnalyticsSent(true);
	}, [
		basketItemsGoogleAnalyticsData,
		isDeliveryLoading,
		isPaymentAnalyticsSent,
		basketState,
		paymentDetail,
		sendAnalyticsEvent,
		setIsPaymentAnalyticsSent,
		currency,
		totalPrice,
		paymentType,
	]);

	useEffect(() => {
		hideWidget();

		return () => showWidget();
	}, []);

	useEffect(() => {
		if (!basketState?.items?.length) {
			router.push(withB2bQueryParams(`/${t({ id: 'routes.cart.route' })}`));
			return;
		}
		if (
			!deliveryMethod?.id ||
			(!isBasketPriceZeroOrNegative && !paymentMethod?.id)
		) {
			router.push(
				withB2bQueryParams(
					`/${t({
						id: 'routes.cart.shippingPayment.route',
					})}?issue=unavailableMethods`
				)
			);
			return;
		}
	}, [
		basketState,
		t,
		router,
		deliveryMethod?.id,
		paymentMethod?.id,
		isBasketPriceZeroOrNegative,
		withB2bQueryParams,
	]);

	const invoiceAddresses = BillingInfoApiHooks.useGetAll({
		customerId,
		billingInfoId: '',
	});
	const deliveryAddresses = AddressesApiHooks.useGetAll({ customerId });

	const initialValues = currentFormValues ?? {};

	// Load from local storage only on mount
	const savedAddressesIds = useMemo(
		() =>
			storageContext.StorageService.getStorageItem(
				LocalStorageKeys.CART_SHIPPING_DATA
			) as SavedAddressesIds,
		[storageContext.StorageService]
	);

	const methods = useForm<CartShippingDataFormSchema>({
		mode: 'onTouched',
		defaultValues: {
			isNewsletterActive: isNewsletterActive ?? false,
			useBillingInfo: isB2b,
			specSymbol: '',
			userCustomOrderNumber: '',
			email: {
				delivery: vinistoUserEmail ?? '',
				billingInfo: '',
			},
			name: { delivery: '', billingInfo: '' },
			lastname: { delivery: '', billingInfo: '' },
			organization: { delivery: '', billingInfo: '' },
			phone: { delivery: '', billingInfo: '' },
			street: {
				delivery: {
					value: '',
					selectedItem: null,
				},
				billingInfo: {
					value: deliveryMethod?.pickupPoint?.street ?? '',
					selectedItem: null,
				},
			},
			landRegistryNumber: {
				delivery: deliveryMethod?.pickupPoint?.landRegistryNumber ?? '',
				billingInfo: '',
			},
			numberHouse: {
				delivery: deliveryMethod?.pickupPoint?.houseNumber ?? '',
				billingInfo: '',
			},
			city: {
				delivery: deliveryMethod?.pickupPoint?.city ?? '',
				billingInfo: '',
			},
			zip: {
				delivery: deliveryMethod?.pickupPoint?.zip ?? '',
				billingInfo: '',
			},
			ico: { billingInfo: '' },
			dic: { billingInfo: '' },
			accountNumber: { billingInfo: '' },
			useCompanyData: false,
			...initialValues,
			deliveryAddressId:
				initialValues?.deliveryAddressId ?? savedAddressesIds?.deliveryAddressId
					? savedAddressesIds?.deliveryAddressId
					: null,
			billingInfoId:
				initialValues?.billingInfoId ??
				(savedAddressesIds?.billingInfoId
					? savedAddressesIds?.billingInfoId
					: null),
			utm: {
				source: utmPostData ? utmPostData?.source : null,
				medium: utmPostData ? utmPostData?.medium : null,
				campaign: utmPostData ? utmPostData?.campaign : null,
				gad: utmPostData ? utmPostData?.gad : null,
				gclId: utmPostData ? utmPostData?.gclId : null,
			},
		},
	});

	const {
		register,
		watch,
		setFocus,
		handleSubmit,
		getValues,
		setValue,
		formState,
		reset,
	} = methods;

	// Save to order context ref
	useFormRefStore(formValues, { watch });

	useEffect(() => {
		if (!isLoggedIn) return;

		const current = getValues();

		reset(
			{
				...current,
				isNewsletterActive: isNewsletterActive ?? false,
				email: {
					delivery: vinistoUserEmail ?? '',
					billingInfo: current?.email?.billingInfo ?? '',
				},
			},
			{ keepDirty: true, keepTouched: true }
		);
	}, [isLoggedIn, vinistoUserEmail, isNewsletterActive, reset, getValues]);

	useEffect(() => {
		if (getValues('isDirty') === true) return;

		if (
			getValues('email.billingInfo') === '' &&
			isLoggedIn &&
			vinistoUserEmail
		) {
			setValue('email.billingInfo', vinistoUserEmail);
		}
	}, [isLoggedIn, vinistoUserEmail, getValues, setValue]);

	const useBillingInfo = watch('useBillingInfo');
	const email = watch('email.delivery');
	const debouncedEmail = useDebounce(email, 600);

	const isEmailValid = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email);
	const [isEmailInUse, setIsEmailInUse] = useState<boolean>(false);

	const canSubmitForm = !(
		formState?.isValid === false ||
		formState.isValidating ||
		formState.isSubmitting ||
		isCreatingOrderRef.current
	);

	const isFeeOverLimit = useIsFeeOverLimit();

	const handleOnSubmit = async (values: CartShippingDataFormSchema) => {
		if (!canSubmitForm) return;

		if (
			isB2b &&
			basketState?.approvalState !== BasketApprovalState.APPROVED &&
			!isFeeOverLimit &&
			vinistoUser.canCreateOrderAsMerchant
		) {
			await updateApprovalState({
				targetState: BasketApprovalState.WAITING_FOR_APPROVAL,
				userLoginHash: vinistoUser.loginHash,
				basketId,
			}).then(() =>
				updateApprovalState({
					targetState: BasketApprovalState.APPROVED,
					userLoginHash: vinistoUser.loginHash,
					basketId,
				})
			);
		}

		if (
			!deliveryAddresses?.data?.addresses?.find(
				({ id }) => values?.deliveryAddressId === id
			)
		) {
			values.deliveryAddressId = null;
		}
		if (
			!invoiceAddresses?.data?.billingInfos?.find(
				({ id }) => values?.billingInfoId === id
			)
		) {
			values.billingInfoId = null;
		}

		if (unappliedCoupons.length) {
			// TODO maybe the endpont is ready to accept multiple coupons?
			unappliedCoupons.forEach((coupon) => {
				handleOnRemoveCoupon(coupon);
			});
		}

		const resetForm = () => {
			currentFormValues = {};
			storageContext.StorageService.setItem(
				LocalStorageKeys.CART_SHIPPING_DATA,
				{
					deliveryAddressId: getValues('deliveryAddressId'),
					billingInfoId: getValues('billingInfoId'),
				}
			);
		};

		const ehub = storageContext.StorageService.getStorageItem(
			LocalStorageKeys.EHUB
		);

		if (!basketState?.id) {
			notificationContext.handleShowErrorNotification(
				'createOrder.error.basket.notFound'
			);
			return;
		}
		try {
			isCreatingOrderRef.current = true;
			await createOrder(values, basketState.id, resetForm)?.then(async () => {
				if (ehub) {
					const ehubdata = {
						orderId,
						couponDiscount:
							coupons?.map((coupon) => coupon.discountPrice ?? 0).join(',') ??
							'0',
						currency: activeCurrency.currency ?? '',
						orderAmount: String(basketTotalsWithEffectivePackaging.totalPrice),
						visitId: String(ehub),
					};
					await eHubService.sendEHubRequest(ehubdata).then(() => {
						storageContext.StorageService.removeItem(LocalStorageKeys.EHUB);
					});
					handleOnClearBasket();
				}
				const waitForOrderSent = () => {
					const checkStatus = () => {
						if (getOrderRequestStatus(orderId) === 'sent') {
							router.push(
								withB2bQueryParams('/potvrzeni-objednavky?orderId=' + orderId)
							);
						} else {
							setTimeout(checkStatus, 300);
						}
					};
					checkStatus();
				};
				waitForOrderSent();
			});
		} finally {
			// This is a slightly hacky safety feature that aims to really ensure that orders won't get duplicate
			setTimeout(() => {
				isCreatingOrderRef.current = false;
				setOrderId(new ObjectId().toString());
			}, 3000);
		}
	};

	useEffect(() => {
		if (isEmailValid && !isLoggedIn) {
			AuthenticationService.checkIfEmailIsAlreadyInUse(debouncedEmail).then(
				(res: any) => {
					setIsEmailInUse(res.result ?? false);
				}
			);
		}
	}, [debouncedEmail, isEmailValid, isLoggedIn]);

	useEffect(() => {
		if (isLoggedIn) {
			setFocus('name.delivery');
		} else {
			setFocus('email.delivery');
		}
	}, [isLoggedIn, setFocus]);

	useEffect(() => {
		if (formState?.isDirty) {
			setValue('isDirty', true);
		}
	}, [formState?.isDirty, setValue]);

	const isDisabledCompanySale = uxAddons?.some(
		(addon) => addon.isActive === true
	);

	const showFullForm = (!isLoggedIn && isEmailValid) || isLoggedIn;

	const isBillingAddressId = getValues('deliveryAddressId');

	// If creating B2b order and delivery can't use stored address,
	// use company email, not the merchant's one
	useEffect(() => {
		if (
			isB2b &&
			deliveryAddresses?.isFetched &&
			!deliveryAddresses?.data?.count &&
			b2bCustomerQuery.data?.companyEmail
		) {
			setValue('email.delivery', b2bCustomerQuery.data.companyEmail);
		}
	}, [
		b2bCustomerQuery.data?.companyEmail,
		deliveryAddresses?.data?.count,
		deliveryAddresses?.isFetched,
		isB2b,
		setValue,
	]);

	return (
		<section id="content-wrapper">
			<Form.Provider {...methods}>
				<Container className={basketStyles.basketContainer}>
					{/* <BasketShare /> */}
					<div className={basketStyles.mainBasketArea}>
						<div className={basketStyles.headerContainer}>
							{!isAdminIframe && (
								<BasketHeader
									step="deliveryDetail"
									basketItemsQuantity={items?.length ?? 0}
								/>
							)}
						</div>
						<div className={styles.formWrap}>
							<Form onSubmit={handleSubmit(handleOnSubmit)}>
								<>
									{!isLoggedIn && <EmailForm />}
									{!isLoggedIn && !isEmailValid && (
										<OAuthLogin
											title={t(
												{ id: 'oauth.text' },
												{
													logIn: (
														<span className="fw-bolder">
															{t({ id: 'oauth.text.logIn' })}
														</span>
													),
													register: (
														<span className="fw-bolder">
															{t({ id: 'oauth.text.register' })}
														</span>
													),
												}
											)}
										/>
									)}
									{showFullForm && (
										<>
											{isEmailInUse && !isLoggedIn && (
												<LoginMessage className="mb-3" />
											)}
											{deliveryAddresses?.isFetched &&
												deliveryAddresses?.data?.count === 0 && (
													<div className={styles.readOnlyEmailWrapper}>
														<label
															className={styles.readOnlyEmailLabel}
															htmlFor="readonly-email"
														>
															{t({
																id: 'form.input.email.label',
															})}
														</label>
														<Form.Input
															className={styles.readOnlyEmail}
															value={email}
															name="readonly-email"
															readOnly
															label={`${t({
																id: 'cartShippingData.form.specificField.label',
															})}`}
															id="readonly-email"
														/>
													</div>
												)}
											{!deliveryMethod?.pickupPoint ? (
												<div>
													{isLoggedIn &&
													deliveryAddresses?.isFetched &&
													deliveryAddresses?.data?.count !== 0 ? (
														<DeliveryAddresses />
													) : (
														<DeliveryForm />
													)}
													{isDisabledCompanySale ? (
														<DisabledCompanySaleInfo />
													) : isB2b ? null : ( //* B2b must ALWAYS has billing address - it's not an option!
														<Form.Checkbox {...register('useBillingInfo')}>
															{t({
																id: 'cartShippingData.useBillingInfo',
															})}
														</Form.Checkbox>
													)}
													{!isDisabledCompanySale && useBillingInfo && (
														<>
															{isLoggedIn &&
															invoiceAddresses?.data?.count !== 0 ? (
																<InvoiceAddresses />
															) : (
																<InvoiceForm />
															)}
															<Form.InputField
																id="specSymbol"
																name="specSymbol"
																inputMode="numeric"
																label={`${t({
																	id: 'cartShippingData.form.specificField.label',
																})}`}
																placeholder={`${t({
																	id: 'cartShippingData.form.specificField.placeholder',
																})}`}
															/>

															<Form.InputField
																id="userCustomOrderNumber"
																name="userCustomOrderNumber"
																inputMode="numeric"
																label={`${t({
																	id: 'cartShippingData.form.internalField.label',
																})}`}
																placeholder={`${t({
																	id: 'cartShippingData.form.internalField.placeholder',
																})}`}
															/>
														</>
													)}
												</div>
											) : isLoggedIn &&
											  invoiceAddresses?.data?.count !== 0 &&
											  !isDisabledCompanySale ? (
												<>
													<InvoiceAddresses />
													<Form.InputField
														id="specSymbol"
														name="specSymbol"
														inputMode="numeric"
														label={`${t({
															id: 'cartShippingData.form.specificField.label',
														})}`}
														placeholder={`${t({
															id: 'cartShippingData.form.specificField.placeholder',
														})}`}
													/>

													<Form.InputField
														id="userCustomOrderNumber"
														name="userCustomOrderNumber"
														inputMode="numeric"
														label={`${t({
															id: 'cartShippingData.form.internalField.label',
														})}`}
														placeholder={`${t({
															id: 'cartShippingData.form.internalField.placeholder',
														})}`}
													/>
												</>
											) : (
												<>
													<h1 className="mt-0 h5">
														{t({
															id: 'cartShippingData.billingInfo',
														})}
													</h1>
													<PickupPointForm />
												</>
											)}
										</>
									)}
								</>
							</Form>
						</div>

						<button
							type="button"
							className={basketStyles.goBackButton}
							onClick={() => history.back()}
						>
							&lt; {t({ id: 'basket.backToShipping' })}
						</button>
					</div>

					<BasketSummary
						isCheckout={true}
						withBasketItems={true}
						showNewsletterCheckbox={true}
						showAgreementCheckbox={true}
						buttonProps={{
							shippingDataButton: true,
							onClick: handleSubmit(handleOnSubmit),
							disabled: (isB2b && !isBillingAddressId) || !canSubmitForm,
						}}
					/>
				</Container>
			</Form.Provider>
		</section>
	);
};

export default CartShippingData;
