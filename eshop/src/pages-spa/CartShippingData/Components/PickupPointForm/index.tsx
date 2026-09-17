import { ChangeEvent, useContext } from 'react';
import useFormatMessage from 'Hooks/useFormatMessage';
import { useFormContext } from 'react-hook-form';
import AresService from 'Services/AresService';
import { PreloaderContext } from 'Components/Preloader/context';
import { VinistoSmartformDllModelsResponsePostResponseAddress } from 'vinisto_api_client/src/api-types/services-api';
import Button from 'Components/Button';
import Form from 'Components/Forms';
import AddressSuggestionsAutocompleteField from 'Services/AddressSuggestions/Components/AutocompleteField';
import { BasketContext } from 'Services/BasketService';

import { DIC_PREFIX } from '../InvoiceForm/constants';
import DisabledCompanySaleInfo from '../DisabledCompanySaleInfo';

const PickupPointForm = () => {
	const { togglePreloader } = useContext(PreloaderContext);
	const t = useFormatMessage();
	const { uxAddons } = useContext(BasketContext);
	const { getValues, setValue, setError, watch } = useFormContext();

	const useCompanyData: boolean = watch('useCompanyData');

	const isDisabledCompanySale = uxAddons?.some(
		(addon) => addon.isActive === true
	);

	const loadDataFromAres = async () => {
		togglePreloader(true);
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
				if (getValues('street.billingInfo') === '') {
					setValue('street.billingInfo', aresData?.sidlo?.nazevUlice, {
						shouldValidate: true,
					});
				}
				if (getValues('landRegistryNumber.billingInfo') === '') {
					setValue(
						'landRegistryNumber.billingInfo',
						aresData?.sidlo?.cisloDomovni ?? '',
						{
							shouldValidate: true,
						}
					);
				}
				if (getValues('houseNumber.billingInfo') === '') {
					setValue(
						'houseNumber.billingInfo',
						aresData?.sidlo?.cisloOrientacni ?? '',
						{
							shouldValidate: true,
						}
					);
				}
				if (getValues('city.billingInfo') === '') {
					setValue('city.billingInfo', aresData?.sidlo?.nazevObce ?? '', {
						shouldValidate: true,
					});
				}
				if (getValues('zip.billingInfo') === '') {
					setValue('zip.billingInfo', aresData?.sidlo?.psc ?? '', {
						shouldValidate: true,
					});
				}
				setValue('organization.billingInfo', aresData?.obchodniJmeno ?? '', {
					shouldValidate: true,
				});
				setValue('dic.billingInfo', `${DIC_PREFIX}${ico}`, {
					shouldValidate: true,
				});
			}
		} catch (err) {
			setError('ico.billingInfo', { message: 'IČO nebylo nalezeno.' });
		}
		togglePreloader(false);
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
			const houseNumber = numbers?.[1];

			if (landRegistryNumber) {
				setValue('landRegistryNumber.billingInfo', landRegistryNumber, {
					shouldValidate: true,
				});
			}
			if (houseNumber) {
				setValue('houseNumber.billingInfo', houseNumber, {
					shouldValidate: true,
				});
			}
		} else {
			setValue('landRegistryNumber.billingInfo', '');
			setValue('houseNumber.billingInfo', '');
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

	const requiredMessage = `${t({ id: 'form.input.required' })}`;

	return (
		<>
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
				autocomplete="off"
				label={`${t({ id: 'cartShippingData.form.houseNumberField.label' })}`}
				placeholder={`${t({
					id: 'cartShippingData.form.houseNumberField.placeholder',
				})}`}
			/>
			<Form.InputField
				id="billingInfo.city"
				name="city.billingInfo"
				autocomplete="address-level2"
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
			{isDisabledCompanySale ? (
				<DisabledCompanySaleInfo />
			) : (
				<Form.Checkbox
					className="ms-0"
					checked={useCompanyData}
					onChange={() => setValue('useCompanyData', !useCompanyData)}
				>
					{t({ id: 'cartShippingData.useCompanyInfo' })}
				</Form.Checkbox>
			)}
			{!isDisabledCompanySale && useCompanyData && (
				<>
					<div className="ico-field">
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
							className="ico-btn"
							onClick={loadDataFromAres}
						>
							{t({ id: 'addInvoiceForm.ARESButton' })}
						</Button>
					</div>
					<Form.InputField
						id="billingInfo.dic"
						name="dic.billingInfo"
						label={`${t({ id: 'cartShippingData.form.dicField.label' })}`}
						placeholder={`${t({
							id: 'cartShippingData.form.dicField.placeholder',
						})}`}
					/>
					<Form.InputField
						id="billingInfo.company"
						name="organization.billingInfo"
						label={`${t({ id: 'cartShippingData.form.companyField.label' })}`}
						placeholder={`${t({
							id: 'cartShippingData.form.companyField.placeholder',
						})}`}
					/>
					<Form.BankField
						id="billingInfo.accountNumber"
						name="accountNumber.billingInfo"
						label={`${t({
							id: 'cartShippingData.form.accountNumberField.label',
						})}`}
					/>
					<Form.InputField
						id="specSymbol"
						name="specSymbol"
						label={`${t({
							id: 'cartShippingData.form.specificField.label',
						})}`}
						placeholder={`${t({
							id: 'cartShippingData.form.specificField.placeholder',
						})}`}
						inputMode="numeric"
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
		</>
	);
};

export default PickupPointForm;
