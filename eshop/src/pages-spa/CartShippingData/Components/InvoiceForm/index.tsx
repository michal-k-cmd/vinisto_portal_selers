import { ChangeEvent, useContext } from 'react';
import useFormatMessage from 'Hooks/useFormatMessage';
import { useFormContext } from 'react-hook-form';
import AresService from 'Services/AresService';
import { PreloaderContext } from 'Components/Preloader/context';
import { VinistoSmartformDllModelsResponsePostResponseAddress } from 'vinisto_api_client/src/api-types/services-api';
import Button from 'Components/Button';
import Form from 'Components/Forms';
import AddressSuggestionsAutocompleteField from 'Services/AddressSuggestions/Components/AutocompleteField';
import { LocalizationContext } from 'Services/LocalizationService';
import { VinistoHelperDllEnumsCountryCode } from 'vinisto_api_client/src/api-types/product-api';

import { DIC_PREFIX } from './constants';
import styles from './styles.module.css';

const InvoiceForm = () => {
	const preloaderContext = useContext(PreloaderContext);
	const t = useFormatMessage();
	const { getValues, setValue, setError, watch } = useFormContext();
	const { countryOfSale } = useContext(LocalizationContext);

	const loadDataFromAres = async () => {
		preloaderContext.togglePreloader(true);
		try {
			const ico = getValues('ico.billingInfo') as string;
			const aresData = await AresService.getDataByIco(ico);
			if (aresData) {
				//TODO: Fill in from aresData once BE sends it
				// if (getValues('billingInfo.name') === '') {
				// 	setValue('billingInfo.name', aresData?.name, {
				// 		shouldValidate: true,
				// 	});
				// }
				//TODO: Fill in from aresData once BE sends it
				// if (getValues('billingInfo.surname') === '') {
				// 	setValue('billingInfo.surname', aresData?.surname, {
				// 		shouldValidate: true,
				// 	});
				// }
				setValue('organization.billingInfo', aresData?.obchodniJmeno ?? '', {
					shouldValidate: true,
				});
				setValue(
					'street.billingInfo',
					{
						value: aresData?.sidlo?.nazevUlice ?? '',
						selectedItem: null,
					},
					{
						shouldValidate: true,
					}
				);
				setValue(
					'landRegistryNumber.billingInfo',
					aresData?.sidlo?.cisloDomovni ?? '',
					{
						shouldValidate: true,
					}
				);
				setValue(
					'numberHouse.billingInfo',
					aresData?.sidlo?.cisloOrientacni ?? '',
					{
						shouldValidate: true,
					}
				);
				setValue('city.billingInfo', aresData?.sidlo?.nazevObce ?? '', {
					shouldValidate: true,
				});
				setValue('zip.billingInfo', aresData?.sidlo?.psc ?? '', {
					shouldValidate: true,
				});
				setValue('dic.billingInfo', `${DIC_PREFIX}${ico}`, {
					shouldValidate: true,
				});
			}
		} catch (err) {
			setError('ico.billingInfo', { message: 'IČO nebylo nalezeno.' });
		}
		preloaderContext.togglePreloader(false);
	};

	const onAddressSelect = (
		address: VinistoSmartformDllModelsResponsePostResponseAddress
	) => {
		if (address?.values?.STREET) {
			setValue(
				'street.billingInfo',
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
			setValue('city.billingInfo', address?.values?.CITY, {
				shouldValidate: true,
			});
		} else {
			setValue('city.billingInfo', '');
		}
		if (typeof address?.values?.NUMBER === 'string') {
			const numbers = address?.values?.NUMBER?.split('/')?.map((number) =>
				number.trim()
			);
			const landRegistryNumber = numbers?.[0];
			const numberHouse = numbers?.[1];

			if (landRegistryNumber) {
				setValue('landRegistryNumber.billingInfo', landRegistryNumber, {
					shouldValidate: true,
				});
			}
			if (numberHouse) {
				setValue('numberHouse.billingInfo', numberHouse, {
					shouldValidate: true,
				});
			}
		} else {
			setValue('landRegistryNumber.billingInfo', '');
			setValue('numberHouse.billingInfo', '');
		}
		if (address?.values?.ZIP) {
			setValue('zip.billingInfo', address?.values?.ZIP, {
				shouldValidate: true,
			});
		} else {
			setValue('zip.billingInfo', '');
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
				const numberHouse = numbers?.[1];

				if (landRegistryNumber) {
					setValue('landRegistryNumber.billingInfo', landRegistryNumber, {
						shouldValidate: true,
					});
				}
				if (numberHouse) {
					setValue('numberHouse.billingInfo', numberHouse, {
						shouldValidate: true,
					});
				}
				if (addressStreet) {
					setValue(
						'street.billingInfo',
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
				setValue('landRegistryNumber.billingInfo', '');
				setValue('numberHouse.billingInfo', '');
			}
		}
	};

	const countryCode = watch('countryCode');

	const requiredMessage = `${t({ id: 'form.input.required' })}`;

	return (
		<>
			<div className={styles.vatNumber}>
				<Form.InputField
					id="billingInfo.ico"
					name="ico.billingInfo"
					label={`${t({ id: 'cartShippingData.form.icoField.label' })}`}
					placeholder={`${t({
						id: 'cartShippingData.form.icoField.placeholder',
					})}`}
					inputMode="numeric"
				/>
				<Button
					type="button"
					className={styles.aresBtn}
					onClick={loadDataFromAres}
				>
					{t({ id: 'addInvoiceForm.ARESButton' })}
				</Button>
			</div>
			<Form.InputField
				id="billingInfo.name"
				name="name.billingInfo"
				label={`${t({ id: 'cartShippingData.form.nameField.label' })}`}
				placeholder={`${t({
					id: 'cartShippingData.form.nameField.placeholder',
				})}`}
				isRequired
				rules={{
					required: { message: requiredMessage, value: true },
				}}
			/>
			<Form.InputField
				id="billingInfo.surname"
				name="lastname.billingInfo"
				label={`${t({ id: 'cartShippingData.form.surnameField.label' })}`}
				placeholder={`${t({
					id: 'cartShippingData.form.surnameField.placeholder',
				})}`}
				rules={{
					required: { message: requiredMessage, value: true },
				}}
				isRequired
			/>
			<Form.InputField
				id="billingInfo.company"
				name="organization.billingInfo"
				label={`${t({ id: 'cartShippingData.form.companyField.label' })}`}
				placeholder={`${t({
					id: 'cartShippingData.form.companyField.placeholder',
				})}`}
			/>
			<Form.InputField
				id="billingInfo.email"
				name="email.billingInfo"
				type="string"
				label={`${t({ id: 'form.input.email.label' })}`}
				placeholder={`${t({ id: 'form.input.email.label' })}`}
				rules={{
					pattern: {
						value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
						message: `${t({
							id: 'form.input.email.badEmailValidation',
						})}`,
					},
				}}
			/>
			<Form.PhoneField
				label={`${t({ id: 'cartShippingData.form.phoneField.label' })}`}
				placeholder={`${t({
					id: 'cartShippingData.form.phoneField.placeholder',
				})}`}
				name="phone.billingInfo"
				rules={{
					required: { message: requiredMessage, value: true },
				}}
				isRequired
			/>
			<AddressSuggestionsAutocompleteField
				label={`${t({ id: 'cartShippingData.form.streetField.label' })}`}
				name="street.billingInfo"
				placeholder={`${t({
					id: 'cartShippingData.form.streetField.placeholder',
				})}`}
				onSelect={onAddressSelect}
				onChangeInput={onAddressAutofill}
				rules={{
					required: requiredMessage,
					validate: ({ value }) =>
						value?.length === 0 ? requiredMessage : true,
				}}
			/>
			<Form.InputField
				id="billingInfo.landRegistryNumber"
				name="landRegistryNumber.billingInfo"
				label={`${t({
					id: 'cartShippingData.form.landRegistryNumberField.label',
				})}`}
				placeholder={`${t({
					id: 'cartShippingData.form.landRegistryNumberField.placeholder',
				})}`}
				rules={{
					required: { message: requiredMessage, value: true },
				}}
				isRequired
				inputMode={'numeric'}
			/>
			<Form.InputField
				id="billingInfo.houseNumber"
				name="numberHouse.billingInfo"
				inputMode="numeric"
				label={`${t({ id: 'cartShippingData.form.houseNumberField.label' })}`}
				placeholder={`${t({
					id: 'cartShippingData.form.houseNumberField.placeholder',
				})}`}
			/>
			<Form.InputField
				id="billingInfo.city"
				name="city.billingInfo"
				label={`${t({ id: 'cartShippingData.form.cityField.label' })}`}
				placeholder={`${t({
					id: 'cartShippingData.form.cityField.placeholder',
				})}`}
				rules={{
					required: { message: requiredMessage, value: true },
				}}
				isRequired
			/>
			<Form.InputField
				id="billingInfo.zip"
				name="zip.billingInfo"
				label={`${t({ id: 'cartShippingData.form.zipField.label' })}`}
				placeholder={`${t({
					id: 'cartShippingData.form.zipField.placeholder',
				})}`}
				rules={{
					required: { message: requiredMessage, value: true },
				}}
				isRequired
				inputMode="numeric"
			/>
			<Form.CountryCode
				label={`${t({ id: 'addressForm.countryCode.label' })}`}
				name="countryCode"
				onChange={(value) => setValue('countryCode', value)}
				value={
					countryCode || countryOfSale || VinistoHelperDllEnumsCountryCode.CZ
				}
			/>
			<Form.InputField
				id="billingInfo.dic"
				name="dic.billingInfo"
				label={`${t({ id: 'cartShippingData.form.dicField.label' })}`}
				placeholder={`${t({
					id: 'cartShippingData.form.dicField.placeholder',
				})}`}
			/>
			<Form.BankField
				id="billingInfo.accountNumber"
				name="accountNumber.billingInfo"
				label={`${t({ id: 'cartShippingData.form.accountNumberField.label' })}`}
			/>
		</>
	);
};

export default InvoiceForm;
