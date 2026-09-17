import { useCallback, useContext, useState } from 'react';
import { invoke } from 'Helpers/lodash';
import { Form } from 'react-final-form';
import { COUNTRIES } from 'Components/Form/Components/CountrySelect/constants';
import { LANGUAGES } from 'Components/Form/Components/LanguageSelect/constants';
import { apiServiceInstance } from 'Services/ApiService';
import { ModalContext } from 'Components/Modal/context';
import { AuthenticationContext } from 'Services/AuthenticationService/context';
import { LocalizationContext } from 'Services/LocalizationService';
import { NotificationsContext } from 'Services/NotificationService';
import {
	CountrySelect,
	Input,
	InputCheckBox,
	InputEmail,
	InputMultiselect,
	InputSelect,
	InputTextArea,
	LanguageSelect,
	Validators,
} from 'Components/Form';
import { useQuery } from '@tanstack/react-query';
import useLocalizedValue from 'Hooks/useLocalizedValue';
import { Button } from 'react-bootstrap';
import {
	useAttachTagToSupplier,
	useCreateSupplierTag,
} from 'Services/SupplierTags';
import { Option } from 'Components/Multiselect/interfaces';
import { supplierTypeTranslationsMap } from 'Pages/SupplierDetail/constants';

import {
	VinistoSupplierDllModelsApiSupplierSupplierCreateAuthParameters,
	VinistoSupplierDllModelsApiSupplierSupplierReturn,
} from '@/api-types/supplier-api';
import { VinistoMongoConnectorModelsSupplierAddress } from '@/api-types/order-api';
import supplierTagService from '@/supplier-service/tag';
import { VinistoHelperDllEnumsSupplierSupplierType } from '@/api-types/user-api';

const CreateSupplierModal = () => {
	const authenticationContext = useContext(AuthenticationContext);
	const { loginHash: userLoginHash } = authenticationContext.vinistoUser;
	const modalContext = useContext(ModalContext);
	const notificationsContext = useContext(NotificationsContext);

	const localizationContext = useContext(LocalizationContext);
	const { activeLanguageKey } = localizationContext;
	const t = localizationContext.useFormatMessage();
	const getLocalizedValue = useLocalizedValue();
	const attachTagToSupplierMutation = useAttachTagToSupplier();

	interface CreateSupplierFormValues
		extends VinistoSupplierDllModelsApiSupplierSupplierCreateAuthParameters {
		address: VinistoMongoConnectorModelsSupplierAddress;
		pickupAddress: VinistoMongoConnectorModelsSupplierAddress;
		tags: Option[];
	}

	const handleOnCreateSupplier = useCallback(
		(formValues: CreateSupplierFormValues) => {
			const tags = formValues.tags ?? [];
			apiServiceInstance
				.post<VinistoSupplierDllModelsApiSupplierSupplierReturn>(
					'supplier-api/suppliers/CreateSupplier',
					{
						userLoginHash,
						nameBilling: formValues.nameBilling,
						ico: formValues.ico,
						dic: formValues.dic,
						countryCode: formValues.countryCode,
						supplierType: formValues.supplierType,
						isShipping: formValues.isShipping,
						language: formValues.language,
						web: formValues.web,
						nameWeb: formValues.nameWeb,
						companyDescription: formValues.companyDescription,
						mainProfile: formValues.mainProfile,
						wineRegion: formValues.wineRegion,
						couponPrefix: formValues.couponPrefix,
						abbreviationInFlexibee: formValues.abbreviationInFlexibee,
						pickupAddress: {
							street: formValues.pickupAddress.street,
							landRegistryNumber: formValues.pickupAddress.landRegistryNumber,
							houseNumber: formValues.pickupAddress.houseNumber,
							zip: formValues.pickupAddress.zip,
							city: formValues.pickupAddress.city,
							phone: formValues.pickupAddress.phone,
							email: formValues.pickupAddress.email,
							note: formValues.pickupAddress.note,
							title: formValues.pickupAddress.title,
							countryCode: formValues.pickupAddress.countryCode,
							addressee: formValues.pickupAddress.addressee,
						},
						address: {
							street: formValues.address.street,
							landRegistryNumber: formValues.address.landRegistryNumber,
							houseNumber: formValues.address.houseNumber,
							zip: formValues.address.zip,
							city: formValues.address.city,
							phone: formValues.address.phone,
							email: formValues.address.email,
							note: formValues.address.note,
							title: formValues.address.title,
							countryCode: formValues.address.countryCode,
							addressee: formValues.address.addressee,
						},
					},
					true
				)
				.then((response) => {
					modalContext.handleCloseModal();
					notificationsContext.handleShowSuccessNotification(
						'admin.modal.createSupplier.success'
					);
					return response;
				})
				.then(async (response) => {
					if (!tags.length) return;
					await attachTagToSupplierMutation.mutateAsync({
						tagIds: tags.map((tag) => tag.value),
						supplierId: `${response?.supplier?.id}`,
						userLoginHash,
					});
				})
				.catch(() => {
					notificationsContext.handleShowErrorNotification(
						'admin.modal.createSupplier.error'
					);
				})
				.finally(() => {
					invoke(modalContext, 'data.resetSupplierList');
				});
		},
		[
			attachTagToSupplierMutation,
			modalContext,
			notificationsContext,
			userLoginHash,
		]
	);

	const SelectOrCreateTagsInput = () => {
		const params = { userLoginHash, limit: 99 };
		const { data, refetch: refetchTags } = useQuery(
			['supplier-tags', params],
			() => supplierTagService.getAll(params)
		);

		const createSupplierTagMutation = useCreateSupplierTag({
			onSuccessCallback: (response) => {
				setNewTag({ id: String(response.id), name: response.name });
				refetchTags();
			},
		});

		const [newTag, setNewTag] = useState<{ id: string; name: string }>();

		return (
			<InputMultiselect
				options={
					data?.supplierTags?.map((tag) => ({
						value: `${tag.id}`,
						label: getLocalizedValue(tag.name ?? []),
					})) ?? []
				}
				name="tags"
				identifier="tags"
				label="tags"
				onAddNewItem={(item) =>
					createSupplierTagMutation.mutateAsync({
						name: item.label,
						activeLanguageKey,
						userLoginHash,
					})
				}
				newItem={{
					label: newTag?.name ?? '',
					value: newTag?.id ?? '',
				}}
			/>
		);
	};

	return (
		<Form<CreateSupplierFormValues>
			onSubmit={handleOnCreateSupplier}
			initialValues={{
				language: LANGUAGES[0].value,
				supplierType: VinistoHelperDllEnumsSupplierSupplierType.PRODUCER,
				isShipping: false,
				countryCode: COUNTRIES[0].value,
				address: {
					countryCode: COUNTRIES[0].value,
				},
				pickupAddress: {
					countryCode: COUNTRIES[0].value,
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
						name="nameWeb"
						identifier="nameWeb"
						label="admin.modal.supplier.nameWeb"
						placeholder="admin.modal.supplier.nameWeb"
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

					<SelectOrCreateTagsInput />

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
						<legend>{t({ id: 'admin.modal.supplier.address' })}</legend>

						<Input
							type="text"
							name="address.title"
							identifier="address.title"
							label="admin.modal.supplier.title"
							placeholder="admin.modal.supplier.title"
							validate={Validators.required}
						/>

						<Input
							type="text"
							name="address.addressee"
							identifier="address.addressee"
							label="admin.modal.supplier.addressee"
							placeholder="admin.modal.supplier.addressee"
							validate={Validators.required}
						/>

						<Input
							type="text"
							name="address.street"
							identifier="address.street"
							label="admin.modal.supplier.street"
							placeholder="admin.modal.supplier.street"
							validate={Validators.required}
						/>

						<Input
							type="text"
							name="address.landRegistryNumber"
							identifier="address.landRegistryNumber"
							label="admin.modal.supplier.landRegistryNumber"
							placeholder="admin.modal.supplier.landRegistryNumber"
							validate={Validators.required}
						/>

						<Input
							type="text"
							name="address.houseNumber"
							identifier="address.houseNumber"
							label="admin.modal.supplier.houseNumber"
							placeholder="admin.modal.supplier.houseNumber"
						/>

						<Input
							type="text"
							name="address.zip"
							identifier="address.zip"
							label="admin.modal.supplier.zip"
							placeholder="admin.modal.supplier.zip"
							validate={Validators.required}
						/>

						<Input
							type="text"
							name="address.city"
							identifier="address.city"
							label="admin.modal.supplier.city"
							placeholder="admin.modal.supplier.city"
							validate={Validators.required}
						/>

						<CountrySelect
							name="address.countryCode"
							identifier="address.countryCode"
							label="admin.modal.supplier.countryCode"
							placeholder="admin.modal.supplier.countryCode"
						/>

						<Input
							type="address.phone"
							name="address.phone"
							identifier="phone"
							label="admin.modal.supplier.phone"
							placeholder="admin.modal.supplier.phone"
							validate={Validators.required}
						/>

						<InputEmail
							name="address.email"
							identifier="address.email"
							validate={Validators.required}
						/>

						<InputTextArea
							name="address.note"
							identifier="address.note"
							label="admin.modal.supplier.note"
							placeholder="admin.modal.supplier.note"
						/>
					</fieldset>
					<fieldset>
						<legend>{t({ id: 'admin.modal.supplier.pickup.address' })}</legend>
						<InputCheckBox
							identifier="isShipping"
							name="isShipping"
							label="admin.modal.supplier.isShipping"
						/>

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
							name="pickupAddress.addressCountryCode"
							identifier="pickupAddress.addressCountryCode"
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
					</fieldset>
					<Button type="submit">
						{t({ id: 'admin.modal.createSupplier.submit' })}
					</Button>
				</form>
			)}
		/>
	);
};

export default CreateSupplierModal;
