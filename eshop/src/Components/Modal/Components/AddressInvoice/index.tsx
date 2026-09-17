import { ChangeEvent, lazy, Suspense, useContext } from 'react';
import cx from 'classnames';
import { useForm } from 'react-hook-form';
import useFormatMessage from 'Hooks/useFormatMessage';
import {
	VinistoHelperDllEnumsCountryCode,
	VinistoSmartformDllModelsResponsePostResponseAddress,
} from 'vinisto_api_client/src/api-types/services-api';
import { VinistoAuthDllModelsApiBillingInfoBillingInfo } from 'vinisto_api_client/src/api-types/user-api';
import { DIC_PREFIX } from 'pages-spa/CartShippingData/Components/InvoiceForm/constants';
import { BillingInfoApiHooks } from 'Services/Addresses/hooks';
import { ModalContext } from 'Components/Modal/context';
import { PreloaderContext } from 'Components/Preloader/context';
import AresService from 'Services/AresService';
import { NotificationsContext } from 'Services/NotificationService';
import Button from 'Components/Button';
import Form from 'Components/Forms';
import AddressSuggestionsAutocompleteField from 'Services/AddressSuggestions/Components/AutocompleteField';
import Loader from 'Components/View/Loader';
import { LocalizationContext } from 'Services/LocalizationService';
import { usePlatformContext } from 'Services/PlatformService';

const CloseIcon = lazy(() => import('Components/Icons/Close'));

import modalStyles from '../../styles.module.css';

import styles from './styles.module.css';
import { ADDRESS_INVOICE_MODAL_TYPE } from './constants';
import { FormValues, ModalData } from './interfaces';

const AddressInvoice = () => {
	const { customerId, isB2b } = usePlatformContext();
	const modalContext = useContext(ModalContext);
	const notificationContext = useContext(NotificationsContext);
	const preloaderContext = useContext(PreloaderContext);
	const { countryOfSale } = useContext(LocalizationContext);

	const t = useFormatMessage();

	const modalData = (modalContext?.modalData as ModalData) ?? {};

	const modalType = modalData?.modalType ?? null;
	const billingInfo = modalData?.billingInfo ?? {};
	const onCreateCallback =
		typeof modalData.onCreateCallback === 'function'
			? modalData.onCreateCallback
			: () => null;

	const { mutateAsync: createBillingInfo } = BillingInfoApiHooks.useCreate({
		onCreateCallback,
		customerId,
	});
	const { mutateAsync: updateBillingInfo } = BillingInfoApiHooks.useUpdate({
		billingInfoId: billingInfo.id ?? '',
		customerId,
	});
	const formMethods = useForm<FormValues>({
		defaultValues: {
			title: billingInfo.title ?? '',
			ico: billingInfo.ico ?? '',
			name: billingInfo.name ?? '',
			lastname: billingInfo.surname ?? '',
			organization: billingInfo.company ?? '',
			email: billingInfo.email ?? '',
			phone: (billingInfo.phone ?? '').replace(/\s+/, ''),
			street: {
				value: billingInfo.street ?? '',
				selectedItem: null,
			},
			landRegistryNumber: billingInfo.landRegistryNumber ?? '',
			numberHouse: billingInfo.houseNumber ?? '',
			city: billingInfo.city ?? '',
			zip: billingInfo.zip ?? '',
			dic: billingInfo.dic ?? '',
			accountNumber: `${billingInfo?.accountNumber ?? ''}/${
				billingInfo?.bankCode ?? ''
			}`,
			countryCode:
				billingInfo?.countryCode ?? VinistoHelperDllEnumsCountryCode.CZ,
		},
		mode: 'onBlur',
	});

	const { handleSubmit, setValue, getValues, setError, watch } = formMethods;

	const onSubmit = async (formValues: FormValues) => {
		try {
			const billingInfo: Omit<
				VinistoAuthDllModelsApiBillingInfoBillingInfo,
				'id'
			> = {
				title: formValues.title || null,
				name: formValues.name,
				surname: formValues.lastname,
				company: formValues.organization || null,
				email: formValues.email || null,
				phone: formValues.phone,
				street: formValues.street?.value,
				landRegistryNumber: formValues.landRegistryNumber,
				houseNumber: formValues.numberHouse || null,
				city: formValues.city,
				zip: formValues.zip,
				ico: formValues.ico || null,
				dic: formValues.dic || null,
				accountNumber: formValues.accountNumber?.split('/')[0],
				bankCode: formValues.accountNumber?.split('/')[1],
				// CZ as default
				countryCode: formValues?.countryCode ?? countryOfSale,
			};

			preloaderContext.togglePreloader(true);

			switch (modalType) {
				case ADDRESS_INVOICE_MODAL_TYPE.NEW:
					await createBillingInfo(billingInfo);
					break;
				case ADDRESS_INVOICE_MODAL_TYPE.UPDATE:
					await updateBillingInfo(billingInfo);
					break;
				default:
					throw new Error('Unknown modal type');
			}

			notificationContext.handleShowSuccessNotification(
				'addInvoiceForm.success'
			);
			modalContext.handleCloseModal();
		} catch (err) {
			notificationContext.handleShowErrorNotification('addInvoiceForm.error');
		} finally {
			preloaderContext.togglePreloader(false);
		}
	};

	const loadDataFromAres = async () => {
		preloaderContext.togglePreloader(true);
		try {
			const ico = getValues('ico') as string;
			const aresData = await AresService.getDataByIco(ico);
			if (aresData) {
				//TODO: Fill in from aresData once BE sends it
				// setValue('name', aresData?.name ?? getValues('name'), {
				// 	shouldValidate: true,
				// });
				//TODO: Fill in from aresData once BE sends it
				// setValue('surname', aresData?.surname ?? getValues('surname'), {
				// 	shouldValidate: true,
				// });
				setValue('organization', aresData?.obchodniJmeno ?? '', {
					shouldValidate: true,
				});
				setValue(
					'street',
					{
						value: aresData?.sidlo?.nazevUlice ?? '',
						selectedItem: null,
					},
					{
						shouldValidate: true,
					}
				);
				setValue(
					'landRegistryNumber',
					aresData?.sidlo?.cisloDomovni
						? String(aresData?.sidlo?.cisloDomovni)
						: '',
					{
						shouldValidate: true,
					}
				);
				setValue(
					'numberHouse',
					aresData?.sidlo?.cisloOrientacni
						? String(aresData?.sidlo?.cisloOrientacni)
						: '',
					{
						shouldValidate: true,
					}
				);
				setValue('city', aresData?.sidlo.nazevObce ?? '', {
					shouldValidate: true,
				});
				setValue(
					'zip',
					aresData?.sidlo?.psc ? String(aresData?.sidlo?.psc) : '',
					{
						shouldValidate: true,
					}
				);
				setValue('dic', `${DIC_PREFIX}${ico}`, {
					shouldValidate: true,
				});
				setValue(
					'countryCode',
					(aresData?.sidlo?.kodStatu as VinistoHelperDllEnumsCountryCode) ??
						VinistoHelperDllEnumsCountryCode.CZ,
					{
						shouldValidate: true,
					}
				);
			}
		} catch (err) {
			setError('ico', { message: 'IČO nebylo nalezeno.' });
		}
		preloaderContext.togglePreloader(false);
	};

	const countryCode = watch('countryCode');

	const onAddressSelect = (
		address: VinistoSmartformDllModelsResponsePostResponseAddress
	) => {
		if (address?.values?.STREET) {
			setValue(
				'street',
				{
					value: address?.values?.STREET,
					selectedItem: null,
				},
				{
					shouldValidate: true,
				}
			);
		}
		if (address?.values?.CITY) {
			setValue('city', address?.values?.CITY, { shouldValidate: true });
		} else {
			setValue('city', '');
		}
		if (typeof address?.values?.NUMBER === 'string') {
			const numbers = address?.values?.NUMBER?.split('/')?.map((number) =>
				number.trim()
			);
			const landRegistryNumber = numbers?.[0];
			const houseNumber = numbers?.[1];

			if (landRegistryNumber) {
				setValue('landRegistryNumber', landRegistryNumber, {
					shouldValidate: true,
				});
			}
			if (houseNumber) {
				setValue('numberHouse', houseNumber, { shouldValidate: true });
			}
		} else {
			setValue('landRegistryNumber', '');
			setValue('numberHouse', '');
		}
		if (address?.values?.ZIP) {
			setValue('zip', address?.values?.ZIP, { shouldValidate: true });
		} else {
			setValue('zip', '');
		}
	};

	const onAddressAutofill = (
		event: ChangeEvent<HTMLInputElement>,
		fieldId: string
	) => {
		const address = event.target.value;
		if (document.activeElement === document.getElementById(fieldId)) return;
		if (event && 'data' in event.nativeEvent) return;

		const addressWithNumber = address.match(/ (?=\d)/);

		if (addressWithNumber) {
			const index = addressWithNumber.index ?? 0;
			const addressStreet = address.substring(0, index);
			const addressNumber = address.substring(index);

			if (typeof addressNumber === 'string') {
				const numbers = addressNumber
					?.split('/')
					?.map((number) => number.trim());
				const landRegistryNumber = numbers?.[0];
				const houseNumber = numbers?.[1];

				if (landRegistryNumber) {
					setValue('landRegistryNumber', landRegistryNumber, {
						shouldValidate: true,
					});
				}
				if (houseNumber) {
					setValue('numberHouse', houseNumber, {
						shouldValidate: true,
					});
				}
				if (addressStreet) {
					setValue(
						'street',
						{
							value: addressStreet,
							selectedItem: null,
						},
						{
							shouldValidate: true,
						}
					);
				}
			} else {
				setValue('landRegistryNumber', '');
				setValue('numberHouse', '');
			}
		}
	};

	const isRequiredMessage = `${t({
		id: 'form.input.field.requiredValidation',
	})}`;

	const AddressTitle = () => (
		<Form.InputField
			label={`${t({ id: 'addInvoiceForm.titleField.label' })}`}
			name="title"
			placeholder={`${t({ id: 'addInvoiceForm.titleField.placeholder' })}`}
			rules={{
				required: isRequiredMessage,
			}}
		/>
	);

	const AddressIco = () => (
		<div className="ico-field">
			<Form.InputField
				label={`${t({ id: 'addInvoiceForm.icoField.label' })}`}
				name="ico"
				placeholder={`${t({
					id: 'addInvoiceForm.icoField.placeholder',
				})}`}
				inputMode="numeric"
				rules={
					isB2b
						? {
								required: isRequiredMessage,
						  }
						: undefined
				}
			/>
			<Button
				onClick={loadDataFromAres}
				type="button"
				className={cx('ico-btn', styles.icoBtn)}
			>
				{t({ id: 'addInvoiceForm.ARESButton' })}
			</Button>
		</div>
	);

	return (
		<Form.Provider {...formMethods}>
			<Form onSubmit={handleSubmit(onSubmit)}>
				{isB2b ? (
					<>
						<AddressIco />
						<AddressTitle />
					</>
				) : (
					<>
						<AddressTitle />
						<AddressIco />
					</>
				)}
				<Form.InputField
					label={`${t({ id: 'addInvoiceForm.nameField.label' })}`}
					name="name"
					placeholder={`${t({ id: 'addInvoiceForm.nameField.placeholder' })}`}
					rules={{
						required: isRequiredMessage,
					}}
				/>
				<Form.InputField
					label={`${t({ id: 'addInvoiceForm.surnameField.label' })}`}
					name="lastname"
					placeholder={`${t({
						id: 'addInvoiceForm.surnameField.placeholder',
					})}`}
					rules={{
						required: isRequiredMessage,
					}}
				/>
				<Form.InputField
					label={`${t({ id: 'addInvoiceForm.companyField.label' })}`}
					name="organization"
					placeholder={`${t({
						id: 'addInvoiceForm.companyField.placeholder',
					})}`}
				/>
				<Form.PhoneField
					label={`${t({ id: 'addInvoiceForm.phoneField.label' })}`}
					name="phone"
					placeholder={`${t({ id: 'addInvoiceForm.phoneField.placeholder' })}`}
					rules={{
						required: { message: isRequiredMessage, value: true },
					}}
					// @ts-expect-error
					control={formMethods.control}
				/>
				<AddressSuggestionsAutocompleteField
					label={`${t({ id: 'addAddressForm.streetField.label' })}`}
					name="street"
					placeholder={`${t({ id: 'addAddressForm.streetField.placeholder' })}`}
					onSelect={onAddressSelect}
					onChangeInput={onAddressAutofill}
					rules={{
						required: isRequiredMessage,
						validate: ({ value }) =>
							value?.length === 0 ? isRequiredMessage : true,
					}}
				/>
				<Form.InputField
					label={`${t({ id: 'addAddressForm.landRegistryNumberField.label' })}`}
					name="landRegistryNumber"
					placeholder={`${t({
						id: 'addAddressForm.landRegistryNumberField.placeholder',
					})}`}
					rules={{
						required: isRequiredMessage,
					}}
					inputMode={'numeric'}
				/>
				<Form.InputField
					label={`${t({ id: 'addAddressForm.houseNumberField.label' })}`}
					name="numberHouse"
					placeholder={`${t({
						id: 'addAddressForm.houseNumberField.placeholder',
					})}`}
				/>
				<Form.InputField
					label={`${t({ id: 'addInvoiceForm.cityField.label' })}`}
					name="city"
					placeholder={`${t({
						id: 'addInvoiceForm.cityField.placeholder',
					})}`}
					rules={{
						required: isRequiredMessage,
					}}
				/>
				<Form.InputField
					label={`${t({ id: 'addInvoiceForm.zipField.label' })}`}
					name="zip"
					placeholder={`${t({
						id: 'addInvoiceForm.zipField.placeholder',
					})}`}
					rules={{
						required: isRequiredMessage,
					}}
					inputMode="numeric"
				/>
				<Form.CountryCode
					label={`${t({ id: 'addressForm.countryCode.label' })}`}
					name="countryCode"
					onChange={(value) => setValue('countryCode', value)}
					value={countryCode || VinistoHelperDllEnumsCountryCode.CZ}
				/>
				<Form.InputField
					label={`${t({ id: 'addInvoiceForm.dicField.label' })}`}
					name="dic"
					placeholder={`${t({
						id: 'addInvoiceForm.dicField.placeholder',
					})}`}
				/>
				<Form.BankField
					label={`${t({ id: 'addInvoiceForm.accountNumberField.label' })}`}
					name="accountNumber"
				/>
				<div className={modalStyles.footer}>
					<button
						type="button"
						className={cx(modalStyles.deleteButton, 'vinisto-btn')}
						onClick={modalContext.handleCloseModal}
					>
						<Suspense fallback={<Loader blank />}>
							<CloseIcon
								alt={`${t({
									id: 'addAddressForm.resetButton.alt',
								})}`}
								className={modalStyles.closeIcon}
							/>
						</Suspense>
						{t({ id: 'addInvoiceForm.button.discard' })}
					</button>
					<button
						type="submit"
						className={cx(
							modalStyles.saveButton,
							'vinisto-btn vinisto-bg-green'
						)}
					>
						{t({ id: 'addInvoiceForm.button.save' })}
					</button>
				</div>
			</Form>
		</Form.Provider>
	);
};

export default AddressInvoice;
