import { useContext, useEffect, useState } from 'react';
import { filter, get, head, includes, invoke, map } from 'Helpers/lodash';
import { useNavigate } from 'react-router-dom';
import { AutocompleteOption } from 'Components/Form/Components/AutocompleteAsync/interfaces';
import { CURRENCIES } from 'Components/Form/Components/CurrencySelect/constants';
import { VATS } from 'Components/Form/Components/VatSelect/constants';
import useLocalizedValue from 'Hooks/useLocalizedValue';
import { apiServiceInstance } from 'Services/ApiService';
import { ModalContext } from 'Components/Modal/context';
import { AuthenticationContext } from 'Services/AuthenticationService/context';
import { LocalizationContext } from 'Services/LocalizationService';
import { NotificationsContext } from 'Services/NotificationService';
import {
	CurrencySelect,
	Form,
	Input,
	InputAutocomplete,
	InputAutocompleteAsync,
	InputMultiselect,
	InputNumber,
	InputTextArea,
	LanguageSelect,
	RichTextEditor,
	Validators,
	VatSelect,
} from 'Components/Form';
import sortSuppliersByNameWeb from 'Helpers/sortSuppliersByNameWeb';
import { CFormLabel } from '@coreui/react';
import parseCsvToArray from 'Helpers/parse-csv-to-array';
import { VinistoProductDllModelsApiBundleBundleReturn } from 'vinisto_api_client/src/api-types/product-api/';
import { VinistoSupplierDllModelsApiSupplierSuppliersReturn } from 'vinisto_api_client/src/api-types/supplier-api/';
import { IntegrationContext } from 'Services/IntergationService';

import { VinistoHelperDllEnumsVatRate } from '@/api-types/cms-api';
import { VinistoHelperDllEnumsCurrency } from '@/api-types/user-api';

const CreateBundleModal = () => {
	const modalContext = useContext(ModalContext);
	const authenticationContext = useContext(AuthenticationContext);
	const localizationContext = useContext(LocalizationContext);
	const notificationsContext = useContext(NotificationsContext);
	const navigate = useNavigate();

	const t = localizationContext.useFormatMessage();
	const getLocalizedValue = useLocalizedValue();

	const { integrations } = useContext(IntegrationContext);

	const [autocompleteOptions, setAutocompleteOptions] = useState<
		AutocompleteOption[]
	>([]);
	const [autocompleteSuppliers, setAutocompleteSuppliers] = useState<
		AutocompleteOption[]
	>([]);

	const handleOnCreateBundle = (formValues: Record<any, any>) => {
		const requestData = {
			userLoginHash: authenticationContext.vinistoUser.loginHash,
			language: get(formValues, 'language', ''),
			name: get(formValues, 'name', ''),
			description: get(formValues, 'description', ''),
			metaDescription: get(formValues, 'metaDescription', ''),
			shortDescription: get(formValues, 'shortDescription', ''),
			text: get(formValues, 'text', ''),
			url: formValues.url?.trim() ? formValues.url.trim() : null,
			supplier: get(head(get(formValues, 'supplier', [])), 'value'),
			items: [
				{
					itemId: get(head(get(formValues, 'productName', [])), 'value'),
					amount: 1,
				},
			],
			price: {
				value: get(formValues, 'price', 0),
				vat: get(formValues, 'vat', VATS[0].value),
				currency: get(formValues, 'currency', CURRENCIES[0].value),
			},
			scoringAdmin: get(formValues, 'scoringAdmin', 1),
			keywords: parseCsvToArray(get(formValues, 'keywords', '')),
			piecesPerPackage: get(formValues, 'piecesPerPackage', ''),
			packagesOnPallet: get(formValues, 'packagesOnPallet', ''),
			availableOnPlatforms: get(formValues, 'availableOnPlatforms', []).map(
				(platform: { label: string; value: string }) => Number(platform.value)
			),
		};
		apiServiceInstance
			.post<VinistoProductDllModelsApiBundleBundleReturn>(
				`product-api/bundles`,
				requestData,
				true
			)
			.then((payload) => {
				modalContext.handleCloseModal();
				notificationsContext.handleShowSuccessNotification(
					'admin.createBundle.success'
				);
				if (payload?.bundle?.id) {
					// TODO should display detail for all entities?
					navigate(`/bundle-detail/${payload?.bundle?.id}`);
				} else {
					invoke(modalContext, 'data.resetBundleList');
				}
			})
			.catch(() => {
				notificationsContext.handleShowErrorNotification(
					'admin.createBundle.error'
				);
			});
	};

	const handleOnSearch = (searchingNameString: string) => {
		apiServiceInstance
			.getCollection(
				`product-api/products/GetAutocompleteNames`,
				[
					{
						key: 'searchingNameString',
						value: searchingNameString,
					},
					{
						key: 'limit',
						value: 1000,
					},
				],
				true
			)
			.then((response) => {
				const searchOptions = [
					...map(get(response, 'products', []), (bundle) => ({
						value: get(bundle, 'id', ''),
						label: getLocalizedValue(get(bundle, 'name', [])),
					})),
				];
				setAutocompleteOptions(searchOptions);
			})
			.catch(() => {
				notificationsContext.handleShowErrorNotification(
					'admin.modal.createBundle.product.autocomplete.error'
				);
				setAutocompleteOptions([]);
			});
	};

	useEffect(() => {
		apiServiceInstance
			.getCollection<VinistoSupplierDllModelsApiSupplierSuppliersReturn>(
				'supplier-api/suppliers',
				[
					{
						key: 'userLoginHash',
						value: authenticationContext.vinistoUser.loginHash,
					},
					{ key: 'limit', value: 1 },
					{ key: 'offset', value: 0 },
				],
				true
			)
			.then((payload) => {
				apiServiceInstance
					.getCollection<VinistoSupplierDllModelsApiSupplierSuppliersReturn>(
						'supplier-api/suppliers',
						[
							{
								key: 'userLoginHash',
								value: authenticationContext.vinistoUser.loginHash,
							},
							{ key: 'limit', value: get(payload, 'count', 0) },
							{ key: 'offset', value: 0 },
						],
						true
					)
					.then((pay) => {
						let preparedCategories = map(
							(pay?.suppliers ?? []).sort(sortSuppliersByNameWeb),
							(supplier) => {
								return {
									value: supplier.id,
									label: supplier.nameWeb ?? '',
								};
							}
						);
						preparedCategories = filter(
							preparedCategories,
							(preparedCategory) => {
								const productCategoryIds: string[] = get(
									modalContext,
									'data.suppliers',
									[]
								);

								return !includes(
									productCategoryIds,
									get(preparedCategory, 'value')
								);
							}
						);
						setAutocompleteSuppliers(preparedCategories);
					});
			})
			.catch(() => {
				notificationsContext.handleShowErrorNotification(
					'admin.modal.createBundle.supplier.autocomplete.error'
				);
				setAutocompleteSuppliers([]);
			});
	}, [
		authenticationContext.vinistoUser.loginHash,
		modalContext,
		notificationsContext,
	]);

	return (
		<Form
			submitCallback={handleOnCreateBundle}
			submitText={'admin.modal.form.createBundle'}
			initializationValues={{
				language: localizationContext.activeLanguageKey,
				price: 0,
				scoringAdmin: 1,
				currency: VinistoHelperDllEnumsCurrency.CZK,
				vat: VinistoHelperDllEnumsVatRate.BaseVat,
			}}
		>
			<LanguageSelect
				name="language"
				identifier="language"
				disabled={true}
				validate={Validators.required}
			/>

			<Input
				name="name"
				identifier="name"
				label="admin.modal.form.name"
				placeholder="admin.modal.form.name"
				validate={Validators.required}
			/>

			<InputTextArea
				name="metaDescription"
				identifier="metaDescription"
				label="admin.modal.form.metaDescription"
				placeholder="admin.modal.form.metaDescription"
				rows={2}
			/>

			<InputTextArea
				name="shortDescription"
				identifier="shortDescription"
				label="admin.modal.form.shortDescription"
				placeholder="admin.modal.form.shortDescription"
				rows={2}
			/>

			<CFormLabel htmlFor="keywords">
				{t({ id: 'admin.modal.form.keywords.prompt' })}
			</CFormLabel>
			<InputTextArea
				name="keywords"
				identifier="keywords"
				label="admin.modal.form.keywords"
			/>

			<InputTextArea
				name="text"
				identifier="text"
				label="admin.modal.form.text"
				placeholder="admin.modal.form.text"
			/>

			<RichTextEditor
				name="description"
				identifier="description"
				label="admin.modal.form.description"
				validate={Validators.required}
			/>

			<Input
				type="text"
				name="url"
				identifier="url"
				label="admin.modal.form.url"
				placeholder="admin.modal.form.url"
			/>

			<InputAutocomplete
				options={autocompleteSuppliers}
				label="admin.modal.form.supplier"
				placeholder="admin.modal.form.findSupplier"
				labelKey={'label'}
				name="supplier"
				identifier="supplier"
				validate={Validators.required}
			/>

			<fieldset>
				<CFormLabel
					htmlFor="productName"
					customClassName="form-label vinisto-label--semibold"
				>
					{t({ id: 'admin.modal.addProductToBundle' })}
				</CFormLabel>
				<InputAutocompleteAsync
					placeholder="admin.modal.addProductToBundle.autocomplete.placeholder"
					labelKey={'label'}
					name="productName"
					identifier="productName"
					onSearchCallback={handleOnSearch}
					options={autocompleteOptions}
					validate={Validators.required}
				/>
				<InputNumber
					name="price"
					identifier="price"
					label="admin.modal.form.priceWithoutVAT"
				/>
				<CurrencySelect
					name="currency"
					identifier="currency"
					label="admin.modal.form.currency"
				/>
				<VatSelect
					name="vat"
					identifier="vat"
					label="admin.modal.form.vat"
				/>
				<InputNumber
					name="scoringAdmin"
					identifier="scoringAdmin"
					label="admin.modal.form.scoringAdmin.label"
					min={1}
					max={50}
					validate={Validators.required}
				/>
				<InputMultiselect
					name="availableOnPlatforms"
					identifier="availableOnPlatforms"
					label="admin.modal.form.availableOnPlatforms.label"
					options={
						integrations?.map((platform) => ({
							value: `${platform.integrationId}`,
							label: `${platform.integrationName}`,
						})) ?? []
					}
					validate={Validators.required}
				/>
			</fieldset>
			<fieldset>
				<InputNumber
					name="piecesPerPackage"
					identifier="piecesPerPackage"
					label="admin.modal.form.piecesPerPackage.label"
					min={0}
					max={2000}
				/>
				<InputNumber
					name="packagesOnPallet"
					identifier="packagesOnPallet"
					label="admin.modal.form.packagesOnPallet.label"
					min={0}
					max={2000}
				/>
			</fieldset>
		</Form>
	);
};
export default CreateBundleModal;
