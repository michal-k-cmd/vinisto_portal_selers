import { useCallback, useContext } from 'react';
import { Form } from 'react-final-form';
import { get } from 'Helpers/lodash';
import { COUNTRIES } from 'Components/Form/Components/CountrySelect/constants';
import { ModalContext } from 'Components/Modal/context';
import useLocalizedValue from 'Hooks/useLocalizedValue';
import { AuthenticationContext } from 'Services/AuthenticationService/context';
import { LocalizationContext } from 'Services/LocalizationService';
import { NotificationsContext } from 'Services/NotificationService';
import {
	Condition,
	CountrySelect,
	Input,
	InputCheckBox,
	InputEmail,
	InputSelect,
	InputTextArea,
	LanguageSelect,
	Validators,
} from 'Components/Form';
import { Button } from 'react-bootstrap';
import { supplierTypeTranslationsMap } from 'Pages/SupplierDetail/constants';

import SupplierService from '@/supplier-service';
import {
	VinistoHelperDllEnumsCountryCode,
	VinistoHelperDllEnumsSupplierSupplierType,
} from '@/api-types/supplier-api';

const EditSupplierModal = () => {
	const modalContext = useContext(ModalContext);
	const { vinistoUser } = useContext(AuthenticationContext);
	const { handleShowSuccessNotification, handleShowErrorNotification } =
		useContext(NotificationsContext);
	const { activeLanguageKey, useFormatMessage } =
		useContext(LocalizationContext);
	const t = useFormatMessage();
	const getLocalizedValue = useLocalizedValue();

	const { supplierData, refetch } = modalContext.data ?? {};

	const onEdit = useCallback(
		(formValues: Record<any, any>) => {
			// eslint-disable-next-line @typescript-eslint/no-unused-vars
			const { tags, ...restValues } = formValues;

			const requestData = {
				userLoginHash: vinistoUser.loginHash,
				...restValues,
				isShipping: !get(formValues, 'isShipping'),
				pickupAddress: get(formValues, 'isShipping')
					? get(formValues, 'pickupAddress', {})
					: undefined,
				nameWeb: formValues.nameWeb,
				web: getLocalizedValue(formValues.web ?? []),
				companyDescription: getLocalizedValue(
					formValues.companyDescription ?? []
				),
				mainProfile: getLocalizedValue(formValues.mainProfile ?? []),
				wineRegion: getLocalizedValue(formValues.wineRegion ?? []),
				countryCode:
					formValues.countryCode ?? VinistoHelperDllEnumsCountryCode.CZ,
				supplierType:
					formValues.supplierType ??
					VinistoHelperDllEnumsSupplierSupplierType.PRODUCER,
				nameBilling: formValues.nameBilling,
				ico: formValues.ico,
			};

			SupplierService.updateSupplier(get(supplierData, 'id'), requestData)
				.then((response) => {
					modalContext.handleCloseModal();
					handleShowSuccessNotification('admin.modal.editSupplier.success');
					return response;
				})
				.catch(() => {
					handleShowErrorNotification('admin.modal.editSupplier.error');
				})
				.finally(() => {
					refetch();
				});
		},
		[
			vinistoUser.loginHash,
			getLocalizedValue,
			supplierData,
			modalContext,
			handleShowSuccessNotification,
			handleShowErrorNotification,
			refetch,
		]
	);

	return (
		<Form
			onSubmit={onEdit}
			initialValues={{
				language: activeLanguageKey,
				nameBilling: get(supplierData, 'nameBilling', ''),
				ico: get(supplierData, 'ico', ''),
				dic: get(supplierData, 'dic', ''),
				countryCode: get(supplierData, 'countryCode', COUNTRIES[0].value),
				supplierType: get(supplierData, 'supplierType', 'PRODUCER'),
				isShipping: !get(supplierData, 'isShipping', false),
				nameWeb: get(supplierData, 'nameWeb', ''),
				web: getLocalizedValue(get(supplierData, 'web', [])),
				companyDescription: getLocalizedValue(
					get(supplierData, 'companyDescription', [])
				),
				mainProfile: getLocalizedValue(get(supplierData, 'mainProfile', [])),
				wineRegion: getLocalizedValue(get(supplierData, 'wineRegion', [])),
				couponPrefix: supplierData?.couponPrefix ?? '',
				abbreviationInFlexibee: supplierData?.abbreviationInFlexibee ?? '',
				pickupAddress: {
					street: get(supplierData, 'pickupAddress.street', ''),
					landRegistryNumber: get(
						supplierData,
						'pickupAddress.landRegistryNumber',
						''
					),
					houseNumber: get(supplierData, 'pickupAddress.houseNumber', ''),
					zip: get(supplierData, 'pickupAddress.zip', ''),
					city: get(supplierData, 'pickupAddress.city', ''),
					phone: get(supplierData, 'pickupAddress.phone', ''),
					email: get(supplierData, 'pickupAddress.email', ''),
					note: get(supplierData, 'pickupAddress.note', ''),
					title: get(supplierData, 'pickupAddress.title', ''),
					countryCode: get(
						supplierData,
						'pickupAddress.countryCode',
						COUNTRIES[0].value
					),
					addressee: get(supplierData, 'pickupAddress.addressee', ''),
				},
			}}
			render={({ handleSubmit }) => (
				<form onSubmit={handleSubmit}>
					<LanguageSelect
						name="language"
						identifier="language"
						disabled
					/>

					<Input
						type="text"
						name="nameBilling"
						identifier="nameBilling"
						label="admin.modal.supplier.name"
						placeholder="admin.modal.supplier.name"
						validate={Validators.required}
					/>

					<Input
						type="text"
						name="ico"
						identifier="ico"
						label="admin.modal.supplier.regNumber"
						placeholder="admin.modal.supplier.regNumber"
						validate={Validators.required}
					/>

					<Input
						type="text"
						name="dic"
						identifier="dic"
						label="admin.modal.supplier.vatNumber"
						placeholder="admin.modal.supplier.vatNumber"
					/>

					<CountrySelect
						name="countryCode"
						identifier="countryCode"
						label="admin.modal.supplier.countryCode"
					/>

					<InputSelect
						options={Object.entries(supplierTypeTranslationsMap).map(
							([key, value]) => ({
								value: key,
								label: `${t({ id: value })}`,
							})
						)}
						name="supplierType"
						identifier="supplierType"
						label="admin.modal.supplier.supplierType"
					/>

					<Input
						type="text"
						name="nameWeb"
						identifier="nameWeb"
						label="admin.modal.supplier.nameWeb"
						placeholder="admin.modal.supplier.nameWeb"
						validate={Validators.required}
					/>

					<Input
						type="text"
						name="web"
						identifier="web"
						label="admin.modal.supplier.web"
						placeholder="admin.modal.supplier.web"
					/>

					<InputTextArea
						name="companyDescription"
						identifier="companyDescription"
						label="admin.modal.supplier.companyDescription"
						placeholder="admin.modal.supplier.companyDescription"
					/>

					<InputTextArea
						name="mainProfile"
						identifier="mainProfile"
						label="admin.modal.supplier.mainProfile"
						placeholder="admin.modal.supplier.mainProfile"
					/>

					<Input
						type="text"
						name="wineRegion"
						identifier="wineRegion"
						label="admin.modal.supplier.wineRegion"
						placeholder="admin.modal.supplier.wineRegion"
					/>

					<Input
						type="text"
						name="couponPrefix"
						identifier="couponPrefix"
						label="admin.modal.supplier.couponPrefix"
						placeholder="admin.modal.supplier.couponPrefix"
					/>

					<Input
						type="text"
						name="abbreviationInFlexibee"
						identifier="abbreviationInFlexibee"
						label="admin.supplierDetail.flexi.label"
						placeholder="admin.supplierDetail.flexi.label"
					/>

					<fieldset>
						<legend>{t({ id: 'admin.modal.supplier.pickup.address' })}</legend>
						<InputCheckBox
							identifier="isShipping"
							name="isShipping"
							label="admin.modal.supplier.isShipping"
						/>

						<Condition
							when="isShipping"
							is={true}
						>
							<Input
								type="text"
								name="pickupAddress.title"
								identifier="pickupAddress.title"
								label="admin.modal.supplier.title"
								placeholder="admin.modal.supplier.title"
							/>

							<Input
								type="text"
								name="pickupAddress.addressee"
								identifier="pickupAddress.addressee"
								label="admin.modal.supplier.addressee"
								placeholder="admin.modal.supplier.addressee"
							/>

							<Input
								type="text"
								name="pickupAddress.street"
								identifier="pickupAddress.street"
								label="admin.modal.supplier.street"
								placeholder="admin.modal.supplier.street"
							/>

							<Input
								type="text"
								name="pickupAddress.landRegistryNumber"
								identifier="pickupAddress.landRegistryNumber"
								label="admin.modal.supplier.landRegistryNumber"
								placeholder="admin.modal.supplier.landRegistryNumber"
							/>

							<Input
								type="text"
								name="pickupAddress.houseNumber"
								identifier="pickupAddress.houseNumber"
								label="admin.modal.supplier.houseNumber"
								placeholder="admin.modal.supplier.houseNumber"
							/>

							<Input
								type="text"
								name="pickupAddress.zip"
								identifier="pickupAddress.zip"
								label="admin.modal.supplier.zip"
								placeholder="admin.modal.supplier.zip"
							/>

							<Input
								type="text"
								name="pickupAddress.city"
								identifier="pickupAddress.city"
								label="admin.modal.supplier.city"
								placeholder="admin.modal.supplier.city"
							/>

							<CountrySelect
								name="pickupAddress.countryCode"
								identifier="pickupAddress.countryCode"
								label="admin.modal.supplier.countryCode"
							/>

							<Input
								type="phone"
								name="pickupAddress.phone"
								identifier="pickupAddress.phone"
								label="admin.modal.supplier.phone"
								placeholder="admin.modal.supplier.phone"
							/>

							<InputEmail
								name="pickupAddress.email"
								identifier="pickupAddress.email"
							/>

							<InputTextArea
								name="pickupAddress.note"
								identifier="pickupAddress.note"
								label="admin.modal.supplier.note"
								placeholder="admin.modal.supplier.note"
							/>
						</Condition>
					</fieldset>
					<Button type="submit">
						{t({ id: 'admin.modal.editSupplier.submit' })}
					</Button>
				</form>
			)}
		/>
	);
};
export default EditSupplierModal;
