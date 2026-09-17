import { ChangeEvent, useContext } from 'react';
import Form from 'Components/Forms';
import AddressSuggestionsAutocompleteField from 'Services/AddressSuggestions/Components/AutocompleteField';
import { LocalizationContext } from 'Services/LocalizationService';
import { UseFormReturn } from 'react-hook-form';

import { FormValues } from './interfaces';
import styles from './styles.module.css';
import { billingFormMode, BillingFormMode } from './constants';

import { VinistoSmartformDllModelsResponsePostResponseAddress } from '@/api-types/services-api';

const BillingAddressForm = ({
	formMethods,
	onSubmit,
	mode,
}: {
	formMethods: UseFormReturn<FormValues, any, undefined>;
	onSubmit: (values: FormValues) => void;
	mode: BillingFormMode;
}) => {
	const t = useContext(LocalizationContext).useFormatMessage();
	const { handleSubmit, setValue } = formMethods;

	const isRequiredMessage = `${t({
		id: 'form.input.field.requiredValidation',
	})}`;

	// TODO extract those
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

	return (
		<Form.Provider {...formMethods}>
			<Form onSubmit={handleSubmit(onSubmit)}>
				{mode === billingFormMode.CREATE && (
					<Form.InputField
						label={`${t({ id: 'vinistoPlus.quickPurchaseModal.inputEmail' })}`}
						name="email"
						placeholder={`${t({
							id: 'form.input.email.placeholder',
						})}`}
						rules={{
							required: isRequiredMessage,
							pattern: {
								value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
								message: `${t({
									id: 'form.input.email.badEmailValidation',
								})}`,
							},
						}}
						labelClassName={styles.headingStyledLabel}
					/>
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
					inputMode="numeric"
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
					onChange={(code) => setValue('countryCode', code)}
				/>
			</Form>
		</Form.Provider>
	);
};

export default BillingAddressForm;
