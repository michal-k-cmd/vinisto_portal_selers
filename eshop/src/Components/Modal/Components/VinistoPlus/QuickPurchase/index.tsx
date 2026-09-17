import { useContext, useEffect, useMemo, useState } from 'react';
import {
	AddressesApiHooks,
	BillingInfoApiHooks,
} from 'Services/Addresses/hooks';
import { LocalizationContext } from 'Services/LocalizationService';
import { Button, buttonVariants } from 'vinisto_ui';
import GreenCheckbox from 'pages-spa/Basket/Components/BasketItem/GreenCheckbox';
import { ModalContext } from 'Components/Modal/context';
import { PAYMENT_MODAL } from 'Components/Modal/constants';
import { getLocalizedPrice } from 'vinisto_shared/src/price/get-localized-price';
import { AuthenticationContext } from 'Services/AuthenticationService/context';
import { useForm } from 'react-hook-form';
import { FormValues } from 'Components/BillingAddressForm/interfaces';
import BillingAddressForm from 'Components/BillingAddressForm';
import { ObjectId } from 'bson';
import { useMutation } from '@tanstack/react-query';
import { NotificationsContext } from 'Services/NotificationService';
import { storageServiceInstance as storageService } from 'Services/StorageService';
import { OrderContext } from 'Services/OrderService/context';
import Form from 'Components/Forms';
import { LocalStorageKeys } from 'Services/StorageService/constants';

import { GopayPaymentModalData } from '../../Payment';

import styles from './styles.module.css';
import BillingAddressBox from './AddressBox';
import {
	PAYMENT_ID_CZ,
	PAYMENT_ID_SK,
	QuickPurchaseMode,
	quickPurchaseMode,
} from './constants';

import { ActionType, AddonResponse } from '@/api-types/addons-api';
import {
	VinistoHelperDllEnumsCountryCode,
	VinistoHelperDllEnumsCurrency,
} from '@/api-types/product-api';
import api from '@/api';
import {
	VinistoOrderDllModelsApiOrderOrderCreateAcceleratedSubscriptionParameters,
	VinistoOrderDllModelsApiReturnDataOrderReturn,
} from '@/api-types/order-api';

const orderId = new ObjectId().toString();

const QuickPurchaseModal = () => {
	const { handleShowErrorNotification } = useContext(NotificationsContext);
	const modalContext = useContext(ModalContext);
	const subscription: AddonResponse | undefined =
		modalContext.modalData?.subscription;

	const localizationContext = useContext(LocalizationContext);
	const t = localizationContext.useFormatMessage();
	const { activeLanguageKey, countryOfSale } = localizationContext;
	const { loginHash: userLoginHash, email: userEmail } = useContext(
		AuthenticationContext
	).vinistoUser;

	const { wsConnectionId, setOrderId } = useContext(OrderContext);

	const billingInfosData = BillingInfoApiHooks.useGetAll();
	const deliveryInfosData = AddressesApiHooks.useGetAll();

	const createBillingAddressMutation = BillingInfoApiHooks.useCreate({
		onCreateCallback: () => null,
	});

	useEffect(() => {
		setOrderId(orderId);
	}, [setOrderId]);

	const maybeStoredBillingAddressId = useMemo(() => {
		const storedDeliveryAndBillingInfo = storageService.getStorageItem(
			LocalStorageKeys.CART_SHIPPING_DATA
		);
		if (!storedDeliveryAndBillingInfo) return null;
		return typeof storedDeliveryAndBillingInfo === 'object' &&
			!Array.isArray(storedDeliveryAndBillingInfo)
			? {
					billingInfoId:
						typeof storedDeliveryAndBillingInfo.billingInfoId === 'string'
							? storedDeliveryAndBillingInfo.billingInfoId
							: null,
					deliveryInfoId:
						typeof storedDeliveryAndBillingInfo.deliveryInfoId === 'string'
							? storedDeliveryAndBillingInfo.deliveryInfoId
							: null,
			  }
			: null;
	}, []);

	const storedBillingInfo =
		billingInfosData.data?.billingInfos?.find(
			(billingInfo) =>
				billingInfo.id === maybeStoredBillingAddressId?.billingInfoId
		) ?? billingInfosData.data?.billingInfos?.[0];

	const storedDeliveryInfo =
		deliveryInfosData.data?.addresses?.find(
			(deliveryInfo) =>
				deliveryInfo.id === maybeStoredBillingAddressId?.deliveryInfoId
		) ?? deliveryInfosData.data?.addresses?.[0];

	const storedBillingOrDeliveryAddress =
		storedBillingInfo ?? storedDeliveryInfo;

	const defaultValues = {
		// 'id' is required in interface, but unused here ¯\_(ツ)_/¯
		id: '',
		title: storedBillingOrDeliveryAddress?.title ?? '',
		name: storedBillingOrDeliveryAddress?.name ?? '',
		lastname: storedBillingOrDeliveryAddress?.surname ?? '',
		organization: storedBillingOrDeliveryAddress?.company ?? '',
		email: storedBillingOrDeliveryAddress?.email ?? userEmail ?? '',
		phone: (storedBillingOrDeliveryAddress?.phone ?? '').replace(/\s+/, ''),
		street: {
			value: storedBillingOrDeliveryAddress?.street ?? '',
			selectedItem: null,
		},
		landRegistryNumber:
			storedBillingOrDeliveryAddress?.landRegistryNumber ?? '',
		numberHouse: storedBillingOrDeliveryAddress?.houseNumber ?? '',
		city: storedBillingOrDeliveryAddress?.city ?? '',
		zip: storedBillingOrDeliveryAddress?.zip ?? '',
		dic: (storedBillingOrDeliveryAddress as any)?.dic ?? '',
		accountNumber: `${
			(storedBillingOrDeliveryAddress as any)?.accountNumber ?? ''
		}/${(storedBillingOrDeliveryAddress as any)?.bankCode ?? ''}`,
		countryCode: storedBillingOrDeliveryAddress?.countryCode ?? countryOfSale,
	};

	const formMethods = useForm<FormValues>({
		values: defaultValues,
		mode: 'onBlur',
	});

	const [mode, setMode] = useState<QuickPurchaseMode>(
		quickPurchaseMode.INITIAL
	);

	const subscriptionMutation = useMutation({
		mutationFn: async (formValues: FormValues) => {
			// eslint-disable-next-line @typescript-eslint/no-unused-vars
			const { id, ...restValues } = formValues;

			const billingAddressFromForm = {
				...restValues,
				title: `${t({
					id: 'userSection.vinistoplus.becomeMember.info.vinistoplus',
				})}`,
				surname: restValues.lastname,
				street: restValues.street.value,
				countryCode: restValues.countryCode ?? countryOfSale,
				accountNumber:
					restValues.accountNumber === '/' ? '' : restValues.accountNumber,
			};

			const billingInfoId =
				mode === quickPurchaseMode.EDIT || !storedBillingInfo
					? await createBillingAddressMutation
							.mutateAsync(billingAddressFromForm)
							.then((res) => res.billingInfo?.id)
					: storedBillingInfo.id;

			return api.post<VinistoOrderDllModelsApiReturnDataOrderReturn>(
				`order-api/orders/accelerated-subscription`,
				undefined,
				{
					wsId: wsConnectionId,
					orderId,
					// @ts-expect-error Uncompatible enums TODO force BE to fix this!
					currency: subscription.currency,
					language: activeLanguageKey,
					subscriptionAddonId: subscription?.id ?? '',
					billingAddressId: billingInfoId,
					paymentId: getPaymentId(countryOfSale),
					authorizationParameters: {
						userLoginHash,
					},
				} satisfies VinistoOrderDllModelsApiOrderOrderCreateAcceleratedSubscriptionParameters
			);
		},

		onSuccess: () => {
			modalContext.handleOpenModal(PAYMENT_MODAL, {
				orderId,
				orderType: 'SUBSCRIPTION',
			} satisfies GopayPaymentModalData);
		},
		onError: () => {
			handleShowErrorNotification('createOrder.error.response');
		},
	});

	if (subscription == undefined) return null;

	const subscriptionPrice = subscription?.actions?.find(
		(action) => action.actionType === ActionType.SetPrice
	)?.price;

	const getPaymentId = (CountryOfSale: VinistoHelperDllEnumsCountryCode) => {
		if (CountryOfSale === VinistoHelperDllEnumsCountryCode.CZ)
			return PAYMENT_ID_CZ;
		if (CountryOfSale === VinistoHelperDllEnumsCountryCode.SK)
			return PAYMENT_ID_SK;
		throw new Error('Unsupported county of sale for vinisto plus');
	};

	return (
		<div className={styles.wrapper}>
			<div className={styles.addonInfo}>
				<img src="/assets/images/vinisto-plus-logo.svg"></img>
				<span className={styles.addonName}>{subscription?.name}</span>
				<span className={styles.addonPrice}>
					{getLocalizedPrice({
						price: subscriptionPrice?.valueWithVat ?? 0,
						currency:
							subscription.currency ?? VinistoHelperDllEnumsCurrency.CZK,
					})}
				</span>
			</div>

			<div className={styles.section}>
				<h3 className={styles.heading}>
					{t({ id: 'vinistoPlus.quickPurchaseModal.paymentMethod' })}
				</h3>
				<div className={styles.deliveryOrPaymentMethodWrapper}>
					<GreenCheckbox
						checked={true}
						setChecked={() => null}
						className={styles.checkbox}
					/>
					<img
						className={styles.deliveryOrPaymentMethodIcon}
						src="/assets/checkout-icons/platebni-kartou-online.svg"
						alt=""
					/>
					<span className={styles.deliveryOrPaymentMethodName}>
						Platební kartou online
					</span>
					<span className={styles.deliveryOrPaymentMethodPrice}>Zdarma</span>
				</div>
			</div>

			<div className={styles.section}>
				<h3 className={styles.heading}>
					{t({ id: 'vinistoPlus.quickPurchaseModal.deliveryMethod' })}
				</h3>
				<div className={styles.deliveryOrPaymentMethodWrapper}>
					<GreenCheckbox
						checked={true}
						setChecked={() => null}
						className={styles.checkbox}
					/>
					<img
						className={styles.deliveryOrPaymentMethodIcon}
						src="/assets/images/email.svg"
						alt=""
					/>
					<span className={styles.deliveryOrPaymentMethodName}>E-mailem</span>
					<span className={styles.deliveryOrPaymentMethodPrice}>Zdarma</span>
				</div>
			</div>

			<div className={styles.section}>
				{!!billingInfosData.data?.billingInfos?.length && (
					<h3 className={styles.heading}>
						{t({ id: 'vinistoPlus.quickPurchaseModal.billingData' })}
					</h3>
				)}

				{mode === quickPurchaseMode.INITIAL &&
					storedBillingOrDeliveryAddress && (
						<BillingAddressBox
							billingAddress={storedBillingOrDeliveryAddress}
							handleOnEdit={() => setMode(quickPurchaseMode.EDIT)}
						/>
					)}

				{(!storedBillingOrDeliveryAddress ||
					mode === quickPurchaseMode.EDIT) && (
					<BillingAddressForm
						formMethods={formMethods}
						onSubmit={subscriptionMutation.mutate}
						mode={mode === quickPurchaseMode.EDIT ? 'EDIT' : 'CREATE'}
					/>
				)}
			</div>

			<Form.Provider {...formMethods}>
				<Form.InputField
					label={
						<>
							Souhlasím se založením opakované platby za členství{' '}
							<b>Vinisto PLUS+</b> a&nbsp;s&nbsp;
							<a
								href="/podminky-vinisto-plus"
								target="_blank"
								className={styles.link}
							>
								podmínkami Vinisto PLUS+
							</a>
							.
						</>
					}
					wrapperClassName={styles.terms}
					name="repeatedPaymentTermsAgreement"
					type="checkbox"
					rules={{
						required: `${t({
							id: 'modal.registration.isAgreementCC.requiredValidation',
						})}`,
					}}
				/>
				<Form.InputField
					label={
						<>
							Souhlasím s uložením platebních údajů. GoPay zpracovává údaje
							o&nbsp;kartě v&nbsp;souladu s&nbsp;PCI-DSS Level 1.
						</>
					}
					wrapperClassName={styles.terms}
					name="savePaymentCardtermsAgreement"
					type="checkbox"
					rules={{
						required: `${t({
							id: 'modal.registration.isAgreementCC.requiredValidation',
						})}`,
					}}
				/>
			</Form.Provider>

			<Button
				variant={buttonVariants.CTA}
				disabled={subscriptionMutation.isLoading}
				className={styles.cta}
				// @ts-expect-error This works, but TS does not like that
				onClick={() => formMethods.handleSubmit(subscriptionMutation.mutate)()}
			>
				{t(
					{ id: 'vinistoPlus.quickPurchaseModal.cta' },
					{
						subscriptionName: t({
							id: 'userSection.vinistoplus.becomeMember.info.vinistoplus',
						}),
					}
				)}
			</Button>
			<p className={styles.legalNote}>
				{t({ id: 'vinistoPlus.quickPurchaseModal.digitalContentLegalInfo' })}
			</p>
		</div>
	);
};

export default QuickPurchaseModal;
