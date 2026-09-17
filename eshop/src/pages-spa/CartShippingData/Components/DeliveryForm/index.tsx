import { ChangeEvent, useContext, useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import useFormatMessage from 'Hooks/useFormatMessage';
import { useRouter } from 'next/navigation';
import {
	VinistoHelperDllBaseBoolReturn,
	VinistoSmartformDllModelsResponsePostResponseAddress,
} from 'vinisto_api_client/src/api-types/services-api';
import { OrderContext } from 'Services/OrderService/context';
import Form from 'Components/Forms';
import AddressSuggestionsAutocompleteField from 'Services/AddressSuggestions/Components/AutocompleteField';
import useDebounce from 'Hooks/useDebounce';
import { TEST_IDS } from 'Constants/test-ids';
import { LocalizationContext } from 'Services/LocalizationService';
import api from 'vinisto_api_client/src/api';
import { validatePostalCode } from 'Components/Forms/hooks';
import { useGetDeliveriesByBasket } from 'Hooks/useGetDeliveries';
import { AuthenticationContext } from 'Services/AuthenticationService/context';

import styles from './styles.module.css';

import { VinistoHelperDllEnumsCountryCode } from '@/api-types/product-api';

const DeliveryForm = () => {
	const t = useFormatMessage();
	const orderContext = useContext(OrderContext);
	const {
		countryOfSale,
		activeCurrency: { currency },
	} = useContext(LocalizationContext);
	const { basketId } = useContext(AuthenticationContext);

	const requiredMessage = `${t({ id: 'form.input.required' })}`;
	const [canDeliveryToZip, setCanDeliveryToZip] = useState<boolean>(true);
	const { setValue, watch } = useFormContext();
	const zipFieldName = 'zip.delivery';
	const zipCode = watch(zipFieldName);
	const debouncedZipCode = useDebounce(zipCode, 600);
	const deliveryMethodId = orderContext?.deliveryMethod?.id;
	const router = useRouter();

	const deliveriesByBasketQuery = useGetDeliveriesByBasket(
		{
			currency,
			allowedCountry: countryOfSale,
			basketId,
		},
		{
			enabled: Boolean(basketId),
		}
	);

	const activeDeliveryMethodDetail = deliveriesByBasketQuery?.data?.find(
		(delivery) => delivery.id === deliveryMethodId
	);

	const supposedlyOnlyCountryForDelivery =
		activeDeliveryMethodDetail?.countries?.[0] ??
		VinistoHelperDllEnumsCountryCode.CZ;

	const handleGoToShippingPayment = () => {
		router.push(`/${t({ id: 'routes.cart.shippingPayment.route' })}`);
	};

	const validateZip = () => {
		if (!canDeliveryToZip || debouncedZipCode === '') return true;
		const isValid = validatePostalCode(debouncedZipCode, countryOfSale);

		return isValid
			? true
			: `${t({
					id: 'cartShippingData.form.zipField.countryErrorValidation',
			  })}`;
	};

	useEffect(() => {
		api
			.get<VinistoHelperDllBaseBoolReturn>(
				`order-api/deliveries/${deliveryMethodId}/CanDeliveryToZip`,
				{ zip: debouncedZipCode.replace(/\s+/, '') }
			)
			.then((response) => {
				setCanDeliveryToZip(response.result ?? false);
			})
			.catch(() => {
				setCanDeliveryToZip(true);
			});
	}, [debouncedZipCode, deliveryMethodId, countryOfSale]);

	const onAddressSelect = (
		address: VinistoSmartformDllModelsResponsePostResponseAddress
	) => {
		if (address?.values?.STREET) {
			setValue(
				'street.delivery',
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
			setValue('city.delivery', address?.values?.CITY, {
				shouldValidate: true,
			});
		} else {
			setValue('city.delivery', '');
		}
		if (typeof address?.values?.NUMBER === 'string') {
			const numbers = address?.values?.NUMBER?.split('/')?.map((number) =>
				number.trim()
			);
			const landRegistryNumber = numbers?.[0];
			const houseNumber = numbers?.[1];

			if (landRegistryNumber) {
				setValue('landRegistryNumber.delivery', landRegistryNumber, {
					shouldValidate: true,
				});
			}
			if (houseNumber) {
				setValue('numberHouse.delivery', houseNumber, {
					shouldValidate: true,
				});
			}
		} else {
			setValue('landRegistryNumber.delivery', '');
			setValue('numberHouse.delivery', '');
		}
		if (address?.values?.ZIP) {
			setValue('zip.delivery', address?.values?.ZIP, {
				shouldValidate: true,
			});
		} else {
			setValue('zip.delivery', '');
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
					setValue('landRegistryNumber.delivery', landRegistryNumber, {
						shouldValidate: true,
					});
				}
				if (houseNumber) {
					setValue('numberHouse.delivery', houseNumber, {
						shouldValidate: true,
					});
				}
				if (addressStreet) {
					setValue(
						'street.delivery',
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
				setValue('landRegistryNumber.delivery', '');
				setValue('numberHouse.delivery', '');
			}
		}
	};

	const { trigger } = useFormContext();

	useEffect(() => {
		if (debouncedZipCode) {
			trigger(zipFieldName);
		}
	}, [canDeliveryToZip, debouncedZipCode, trigger]);

	return (
		<>
			<Form.InputField
				id="delivery.name"
				name="name.delivery"
				label={`${t({ id: 'cartShippingData.form.nameField.label' })}`}
				placeholder={`${t({
					id: 'cartShippingData.form.nameField.placeholder',
				})}`}
				isRequired
				rules={{
					required: { message: requiredMessage, value: true },
				}}
				dataTestid={TEST_IDS.BASKET_ADDRESS_NAME}
			/>

			<Form.InputField
				id="delivery.lastname"
				name="lastname.delivery"
				label={`${t({ id: 'cartShippingData.form.surnameField.label' })}`}
				placeholder={`${t({
					id: 'cartShippingData.form.surnameField.placeholder',
				})}`}
				rules={{
					required: { message: requiredMessage, value: true },
				}}
				isRequired
				dataTestid={TEST_IDS.BASKET_ADDRESS_SURNAME}
			/>

			<Form.InputField
				id="delivery.organization"
				name="organization.delivery"
				label={`${t({ id: 'cartShippingData.form.companyField.label' })}`}
				placeholder={`${t({
					id: 'cartShippingData.form.companyField.placeholder',
				})}`}
				dataTestid={TEST_IDS.BASKET_ADDRESS_ORGANIZATION}
			/>

			<Form.PhoneField
				name="phone.delivery"
				label={`${t({ id: 'cartShippingData.form.phoneField.label' })}`}
				placeholder={`${t({
					id: 'cartShippingData.form.phoneField.placeholder',
				})}`}
				rules={{
					required: { message: requiredMessage, value: true },
				}}
				isRequired
				dataTestid={TEST_IDS.BASKET_ADDRESS_PHONE}
			/>

			{!orderContext?.deliveryMethod?.pickupPoint && (
				<>
					<AddressSuggestionsAutocompleteField
						label={`${t({ id: 'cartShippingData.form.streetField.label' })}`}
						name="street.delivery"
						placeholder={`${t({
							id: 'cartShippingData.form.streetField.placeholder',
						})}`}
						rules={{
							required: requiredMessage,
							validate: ({ value }) =>
								value?.length === 0 ? requiredMessage : true,
						}}
						onSelect={onAddressSelect}
						onChangeInput={onAddressAutofill}
						dataTestid={TEST_IDS.BASKET_ADDRESS_STREET}
					/>
					<Form.InputField
						id="delivery.landRegistryNumber"
						name="landRegistryNumber.delivery"
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
						dataTestid={TEST_IDS.BASKET_ADDRESS_LAND_REGISTRY_NUMBER}
					/>
					<Form.InputField
						id="delivery.houseNumber"
						name="numberHouse.delivery"
						autocomplete="off"
						inputMode="numeric"
						label={`${t({
							id: 'cartShippingData.form.houseNumberField.label',
						})}`}
						placeholder={`${t({
							id: 'cartShippingData.form.houseNumberField.placeholder',
						})}`}
						dataTestid={TEST_IDS.BASKET_ADDRESS_HOUSE_NUMBER}
					/>
					<Form.InputField
						id="delivery.city"
						name="city.delivery"
						label={`${t({ id: 'cartShippingData.form.cityField.label' })}`}
						placeholder={`${t({
							id: 'cartShippingData.form.cityField.placeholder',
						})}`}
						rules={{
							required: { message: requiredMessage, value: true },
						}}
						isRequired
						dataTestid={TEST_IDS.BASKET_ADDRESS_CITY}
					/>
					<Form.InputField
						id="delivery.zip"
						name="zip.delivery"
						label={`${t({ id: 'cartShippingData.form.zipField.label' })}`}
						placeholder={`${t({
							id: 'cartShippingData.form.zipField.placeholder',
						})}`}
						type="text"
						rules={{
							required: requiredMessage,
							validate: validateZip,
						}}
						isRequired
						inputMode="numeric"
						dataTestid={TEST_IDS.BASKET_ADDRESS_ZIP}
					/>
					{!canDeliveryToZip && debouncedZipCode && (
						<div className={styles.zipCodeValidationContainer}>
							{t(
								{ id: 'form.input.zip.validationMessage' },
								{
									value: (
										<button
											className={styles.buttonShippingPayment}
											onClick={handleGoToShippingPayment}
										>
											{t({ id: 'form.input.zip.validationMessage.button' })}
										</button>
									),
									city:
										supposedlyOnlyCountryForDelivery ===
										VinistoHelperDllEnumsCountryCode.CZ
											? 'Prahy'
											: 'Bratislavy',
								}
							)}
						</div>
					)}
					<Form.CountryCode
						label={`${t({ id: 'addressForm.countryCode.label' })}`}
						name="countryCode"
						onChange={() => {}}
						value={countryOfSale}
						readonly={true}
					/>
				</>
			)}
		</>
	);
};

export default DeliveryForm;
