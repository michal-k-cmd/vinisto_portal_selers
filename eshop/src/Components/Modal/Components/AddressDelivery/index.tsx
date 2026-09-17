import { ChangeEvent, lazy, Suspense, useContext } from 'react';
import cx from 'classnames';
import { useForm } from 'react-hook-form';
import useFormatMessage from 'Hooks/useFormatMessage';
import { VinistoSmartformDllModelsResponsePostResponseAddress } from 'vinisto_api_client/src/api-types/services-api';
import {
	VinistoAuthDllModelsApiAddressAddress,
	VinistoHelperDllEnumsCountryCode,
} from 'vinisto_api_client/src/api-types/user-api';
import { AddressesApiHooks } from 'Services/Addresses/hooks';
import { ModalContext } from 'Components/Modal/context';
import { PreloaderContext } from 'Components/Preloader/context';
import { NotificationsContext } from 'Services/NotificationService';
import { LocalizationContext } from 'Services/LocalizationService';
import { usePlatformContext } from 'Services/PlatformService';
import Form from 'Components/Forms';
import AddressSuggestionsAutocompleteField from 'Services/AddressSuggestions/Components/AutocompleteField';
import Loader from 'Components/View/Loader';

const CloseIcon = lazy(() => import('Components/Icons/Close'));

import modalStyles from '../../styles.module.css';

import { ADDRESS_DELIVERY_MODAL_TYPE } from './constants';
import { FormValues, ModalData } from './interfaces';

const AddressDelivery = () => {
	const { customerId } = usePlatformContext();
	const modalContext = useContext(ModalContext);
	const notificationContext = useContext(NotificationsContext);
	const preloaderContext = useContext(PreloaderContext);
	const t = useFormatMessage();
	const { countryOfSale } = useContext(LocalizationContext);

	const modalData = (modalContext?.modalData as ModalData) ?? {};
	const modalType = modalData?.modalType ?? null;
	const address = modalData?.address ?? {};
	const onCreateCallback =
		typeof modalData.onCreateCallback === 'function'
			? modalData.onCreateCallback
			: () => null;

	const { mutateAsync: createAddress } = AddressesApiHooks.useCreate({
		onCreateCallback,
		customerId,
	});
	const { mutateAsync: updateAddress } = AddressesApiHooks.useUpdate({
		addressId: address?.id ?? '',
		customerId,
	});

	const formMethods = useForm<FormValues>({
		defaultValues: {
			title: address?.title ?? '',
			name: address?.name ?? '',
			lastname: address?.surname ?? '',
			organization: address?.company ?? '',
			email: address?.email ?? '',
			phone: (address?.phone ?? '').replace(/\s+/, ''),
			street: {
				value: address?.street ?? '',
				selectedItem: null,
			},
			landRegistryNumber: address?.landRegistryNumber ?? '',
			numberHouse: address?.houseNumber ?? '',
			city: address?.city ?? '',
			zip: address?.zip ?? '',
			countryCode: address?.countryCode ?? countryOfSale,
		},
		mode: 'onBlur',
	});

	const { handleSubmit, setValue, watch } = formMethods;
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
			const numberHouse = numbers?.[1];

			if (landRegistryNumber) {
				setValue('landRegistryNumber', landRegistryNumber, {
					shouldValidate: true,
				});
			}
			if (numberHouse) {
				setValue('numberHouse', numberHouse, { shouldValidate: true });
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

	const onSubmit = async (formValues: FormValues) => {
		try {
			// TODO: come up with a better type, omitting id property is a workaround
			const address: Omit<VinistoAuthDllModelsApiAddressAddress, 'id'> = {
				title: formValues?.title || null,
				name: formValues?.name,
				surname: formValues?.lastname,
				company: formValues?.organization || null,
				email: formValues?.email || null,
				phone: formValues?.phone,
				street: formValues?.street?.value,
				landRegistryNumber: formValues?.landRegistryNumber,
				houseNumber: formValues?.numberHouse || null,
				city: formValues?.city,
				zip: formValues?.zip,
				// CZ as default
				countryCode:
					formValues?.countryCode || VinistoHelperDllEnumsCountryCode.CZ,
			};

			preloaderContext.togglePreloader(true);

			switch (modalType) {
				case ADDRESS_DELIVERY_MODAL_TYPE.NEW:
					await createAddress(address);
					break;
				case ADDRESS_DELIVERY_MODAL_TYPE.UPDATE:
					await updateAddress(address);
					break;
				default:
					throw new Error('Invalid modal type');
			}

			notificationContext.handleShowSuccessNotification(
				'addAddressForm.success'
			);
			modalContext.handleCloseModal();
		} catch (err) {
			notificationContext.handleShowErrorNotification('addAddressForm.error');
		} finally {
			preloaderContext.togglePreloader(false);
		}
	};

	const isRequiredMessage = `${t({
		id: 'form.input.field.requiredValidation',
	})}`;

	return (
		<Form.Provider {...formMethods}>
			<Form onSubmit={handleSubmit(onSubmit)}>
				<Form.InputField
					label={`${t({ id: 'addDeliveryForm.titleField.label' })}`}
					name="title"
					placeholder={`${t({ id: 'addDeliveryForm.titleField.placeholder' })}`}
					rules={{
						required: isRequiredMessage,
					}}
					labelClassName={''}
				/>
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
				<Form.InputField
					label={`${t({ id: 'form.input.email.label' })}`}
					name="email"
					placeholder={`${t({
						id: 'form.input.email.placeholder',
					})}`}
					rules={{
						pattern: {
							value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
							message: `${t({
								id: 'form.input.email.badEmailValidation',
							})}`,
						},
					}}
					id="emailId"
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
					label={`${t({ id: 'addAddressForm.cityField.label' })}`}
					name="city"
					placeholder={`${t({
						id: 'addAddressForm.cityField.placeholder',
					})}`}
					rules={{
						required: isRequiredMessage,
					}}
				/>
				<Form.InputField
					label={`${t({ id: 'addAddressForm.zipField.label' })}`}
					name="zip"
					placeholder={`${t({
						id: 'addAddressForm.zipField.placeholder',
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
					readonly={modalType === ADDRESS_DELIVERY_MODAL_TYPE.UPDATE}
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
						{t({ id: 'addAddressForm.resetButton' })}
					</button>
					<button
						type="submit"
						className={cx(
							modalStyles.saveButton,
							'vinisto-btn vinisto-bg-green'
						)}
					>
						{t({ id: 'addAddressForm.submitButton' })}
					</button>
				</div>
			</Form>
		</Form.Provider>
	);
};

export default AddressDelivery;
