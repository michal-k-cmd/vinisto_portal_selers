import { useCallback, useContext, useRef, useState } from 'react';
import { isEmpty } from 'Helpers/lodash';
import { Form } from 'react-final-form';
import { CCol, CContainer, CForm, CFormLabel, CRow } from '@coreui/react';
import { ModalContext } from 'Components/Modal/context';
import { LocalizationContext } from 'Services/LocalizationService';
import useAutomaticCoupon from 'Hooks/useAutomaticCoupon';
import {
	Condition,
	CurrencySelect,
	InputAutocomplete,
	InputCheckBox,
	InputMultiselect,
	InputNumber,
	InputSelect,
	InputTextArea,
	LanguageSelect,
	SubmitButton,
	Validators,
} from 'Components/Form';
import {
	COUPON_LIMITATION_OPTIONS,
	LIMITATION_TYPE,
} from 'Components/Modal/Components/CreateDiscountCoupon/constants';
import { AutomaticCoupon } from 'Services/ApiService/Adapters/AutomaticCouponAdapter';
import { VinistoHelperDllEnumsLanguage } from 'vinisto_api_client/src/api-types/cms-api/';
import {
	VinistoHelperDllEnumsAutomaticCouponTriggerType,
	VinistoHelperDllEnumsCurrency,
	VinistoHelperDllEnumsDiscountCouponDiscountCouponType,
	VinistoHelperDllEnumsDiscountCouponLimitationType,
} from 'vinisto_api_client/src/api-types/order-api/';
import { Option } from 'Components/Form/Components/Select/interfaces';
import Radio from 'Components/Form/Components/Radio';
import { useQuery } from '@tanstack/react-query';
import CategoryService from 'Services/Category';
import { apiServiceInstance } from 'Services/ApiService';
import useLocalizedValue from 'Hooks/useLocalizedValue';
import {
	TYPE_COMBO_BOX,
	TYPE_DECIMAL_NUMBER,
	TYPE_DECIMAL_NUMBER_IMPERIAL,
	TYPE_MULTI_COMBO_BOX,
	TYPE_NUMBER,
	TYPE_NUMBER_IMPERIAL,
} from 'Services/Specification/constants';
import useSuppliers from 'Pages/UserDetail/Components/SupplierList/useSuppliers';
import { Supplier } from 'Pages/UserDetail/Components/SupplierList/types';
import sortSuppliersByNameWeb from 'Helpers/sortSuppliersByNameWeb';
import { discountCouponTypesTranslationMap } from 'Pages/DiscountCouponAutoList/constants';

import { SupplierOption } from '../CreateDiscountCoupon/interfaces';
import styles from '../CreateDiscountCoupon/styles.module.css';

import { VinistoProductDllModelsApiSpecificationSpecificationsReturn } from '@/api-types/product-api';

const DiscountCouponAutoModal = () => {
	const modalContext = useContext(ModalContext);
	const localizationContext = useContext(LocalizationContext);

	const t = localizationContext.useFormatMessage();
	const { triggerOptions, create, update } = useAutomaticCoupon();
	const form = useRef<HTMLFormElement>(null);

	const [selectedSpecification, setSelectedSpecification] =
		useState<Record<any, any>>();

	const getLocalizedValue = useLocalizedValue();

	const { data: categories, isLoading: isCategoriesLoading } = useQuery<
		Awaited<ReturnType<typeof CategoryService.getAll>>
	>(['categories'], () => CategoryService.getAll());

	const { data: specificationsData, isLoading: isSpecificationsLoading } =
		useQuery(['specifications'], () =>
			apiServiceInstance
				.getCollection<VinistoProductDllModelsApiSpecificationSpecificationsReturn>(
					'product-api/admin/specifications',
					[
						{
							key: 'limit',
							value: 0,
						},
					]
				)
				.then((response) => response.specifications)
		);

	const automaticCoupon = modalContext.data?.automaticCoupon as AutomaticCoupon;
	const refetch = modalContext.data?.refetch as () => void;
	const isEdit = !isEmpty(automaticCoupon);

	const initialValues: AutomaticCoupon = {
		id: automaticCoupon?.id,
		trigger: automaticCoupon?.trigger,
		minOrderPrice: automaticCoupon?.minOrderPrice,
		maxOrderPrice: automaticCoupon?.maxOrderPrice,
		name: automaticCoupon?.name,
		discountType:
			automaticCoupon?.discountType ||
			VinistoHelperDllEnumsDiscountCouponDiscountCouponType.AMOUNT,
		discountValue: automaticCoupon?.discountValue,
		currency: automaticCoupon?.currency || VinistoHelperDllEnumsCurrency.CZK,
		language: automaticCoupon?.language || VinistoHelperDllEnumsLanguage.CZECH,
		expirationDays: automaticCoupon?.expirationDays || 0,
		applicableFrom: automaticCoupon?.applicableFrom,
		isCombinable: automaticCoupon?.isCombinable || false,
		isForDiscountedItems:
			isEdit &&
			automaticCoupon?.isForDiscountedItems &&
			automaticCoupon?.discountType ===
				VinistoHelperDllEnumsDiscountCouponDiscountCouponType.PERCENTAGE
				? automaticCoupon?.isForDiscountedItems
				: false,
		limitationDefinition: automaticCoupon?.limitationDefinition ?? {
			limitationType:
				VinistoHelperDllEnumsDiscountCouponLimitationType.NO_LIMITATION,
			specification: {
				allowedValues: [],
			},
		},
	};

	const handleOnSubmit = async (values: AutomaticCoupon) => {
		const requestData = {
			...values,
			specificationDefinitionId: selectedSpecification?.id,
			specificationType: selectedSpecification?.specificationType,
		};

		await (isEdit
			? update(requestData).then(() => modalContext.handleCloseModal())
			: create(requestData).then(() => modalContext.handleCloseModal()));

		refetch && refetch();
	};

	//hotfix - remove undefined values from triggerOptions
	const triggerOptionsProcessed = triggerOptions
		.filter((item) => item !== undefined)
		.map((item) => item as Option);

	const specificationOptions = specificationsData?.map((specification) => ({
		value: specification.id,
		label: getLocalizedValue(specification.name ?? []),
	}));

	const categoryOptions = categories?.map((category) => ({
		value: category.id,
		label: category.translations[localizationContext.activeLanguageKey].name,
	}));

	const handleOnSelectSpecification = useCallback(
		(specificationOption: any[] = []) => {
			const specificationById = specificationsData?.find(
				(elem) => elem.id === specificationOption[0]?.value
			);
			if (specificationById) {
				setSelectedSpecification(specificationById);
			}
		},
		[specificationsData]
	);

	const { suppliers } = useSuppliers();

	const mapSuppliersToAutocompleteOptions = (
		suppliers: Supplier[]
	): SupplierOption[] => {
		return suppliers.sort(sortSuppliersByNameWeb).map((supplier: Supplier) => {
			return {
				value: supplier.id,
				label: supplier.nameWeb,
			};
		});
	};

	const getSpecificationMultiSelectOptions = useCallback(() => {
		if (selectedSpecification?.allowedValues) {
			return Object.entries(selectedSpecification.allowedValues)
				.map(([key, value]) => ({
					value: key,
					// @ts-expect-error Can't be properly infered because it's mapping over 'any'
					label: getLocalizedValue(value.name ?? []).trim(),
				}))
				.sort((a, b) => a.label.localeCompare(b.label, navigator.language));
		}
		if (selectedSpecification?.availableValues) {
			return (selectedSpecification.availableValues as number[])
				.slice()
				.sort((a, b) => (a < b ? -1 : 1))
				.map((value) => ({
					value: String(value),
					label: String(value),
				}));
		}
		return [];
	}, [
		getLocalizedValue,
		selectedSpecification?.allowedValues,
		selectedSpecification?.availableValues,
	]);

	return (
		<Form<AutomaticCoupon>
			onSubmit={handleOnSubmit}
			initialValues={initialValues}
			mutators={{
				setValue: ([field, value], state, { changeValue }) => {
					changeValue(state, field, () => value);
				},
			}}
			render={({ handleSubmit, pristine, valid, submitting, values }) => {
				return (
					<CContainer>
						<CForm
							onSubmit={handleSubmit}
							ref={form}
						>
							<InputSelect
								options={triggerOptionsProcessed}
								name="trigger.type"
								identifier="trigger.type"
								label="admin.modal.couponAuto.trigger.type.label"
							/>
							<InputNumber
								name="trigger.delay"
								identifier="trigger.delay"
								label="admin.modal.couponAuto.trigger.delay.label"
							/>
							<Condition
								when="trigger.type"
								is={VinistoHelperDllEnumsAutomaticCouponTriggerType.NEXT_ORDER}
							>
								<CFormLabel className="vinisto-label--semibold">
									{t({ id: 'admin.modal.couponAuto.validity.label' })}
								</CFormLabel>
								<CRow>
									<CCol>
										<InputNumber
											name="minOrderPrice"
											identifier="minOrderPrice"
											label="admin.modal.couponAuto.minOrderPrice.label"
											validate={Validators.required}
										/>
									</CCol>
									<CCol>
										<InputNumber
											name="maxOrderPrice"
											identifier="maxOrderPrice"
											label="admin.modal.couponAuto.maxOrderPrice.label"
											validate={Validators.required}
										/>
									</CCol>
								</CRow>
							</Condition>

							<InputTextArea
								identifier="name"
								name="name"
								label="admin.modal.couponAuto.description.label"
								validate={Validators.required}
							/>

							<InputSelect
								options={Object.entries(discountCouponTypesTranslationMap).map(
									([key, value]) => ({
										value: key,
										label: `${t({ id: value })}`,
									})
								)}
								name="discountType"
								identifier="discountType"
								label="admin.modal.form.type"
							/>
							<Condition
								when="discountType"
								is={
									VinistoHelperDllEnumsDiscountCouponDiscountCouponType.AMOUNT
								}
							>
								<InputNumber
									name="discountValue"
									identifier="discountValue"
									label="admin.modal.couponAuto.discountValue.label"
									validate={Validators.required}
								/>
							</Condition>
							<Condition
								when="discountType"
								is={
									VinistoHelperDllEnumsDiscountCouponDiscountCouponType.PERCENTAGE
								}
							>
								<InputNumber
									name="discountValue"
									identifier="discountValue"
									label="admin.modal.form.percentageDiscount"
								/>
							</Condition>
							<CurrencySelect
								name="currency"
								identifier="currency"
								label="admin.modal.form.currency"
							/>
							<InputNumber
								name="applicableFrom"
								identifier="applicableFrom"
								label="admin.modal.couponAuto.applicableFrom.label"
							/>
							<LanguageSelect
								name="language"
								identifier="language"
								label="admin.modal.form.language"
								disabled={true}
							/>
							<InputNumber
								name="expirationDays"
								identifier="expirationDays"
								label="admin.modal.couponAuto.expirationDays.label"
							/>
							<InputCheckBox
								identifier="isCombinable"
								name="isCombinable"
								label="admin.modal.form.isCombinable"
							/>
							<InputCheckBox
								identifier="isForDiscountedItems"
								name="isForDiscountedItems"
								label="admin.modal.form.isForDiscountedItems"
								disabled={
									values.discountType ===
										VinistoHelperDllEnumsDiscountCouponDiscountCouponType.PERCENTAGE &&
									true
								}
							/>
							<fieldset>
								<Radio
									options={COUPON_LIMITATION_OPTIONS}
									name="limitationDefinition.limitationType"
									className={styles.radio}
								/>
								{values.limitationDefinition.limitationType ===
									LIMITATION_TYPE.CATEGORY_LIMITATION &&
									(isCategoriesLoading ? (
										'loading…'
									) : (
										<InputSelect
											name="limitationDefinition.categoryId"
											identifier="limitationDefinition.categoryId"
											label="admin.bundleDetail.categories.label"
											options={categoryOptions}
											validate={Validators.required}
										/>
									))}
								{values.limitationDefinition.limitationType ===
									LIMITATION_TYPE.SPECIFICATION_LIMITATION &&
									(isSpecificationsLoading ? (
										'loading…'
									) : (
										<>
											<InputAutocomplete
												options={specificationOptions as Record<any, any>[]}
												label="admin.modal.addSpecificationToBundle.autocomplete.label"
												placeholder="admin.modal.addSpecificationToBundle.autocomplete.label"
												labelKey={'label'}
												name="limitationDefinition.specification.specificationDefinitionId"
												identifier="limitationDefinition.specification.specificationDefinitionId"
												onChange={(selected) => {
													handleOnSelectSpecification(selected);
												}}
												validate={Validators.required}
											/>
											{selectedSpecification &&
												[
													TYPE_MULTI_COMBO_BOX,
													TYPE_COMBO_BOX,
													TYPE_NUMBER,
													TYPE_NUMBER_IMPERIAL,
													TYPE_DECIMAL_NUMBER,
													TYPE_DECIMAL_NUMBER_IMPERIAL,
												].includes(selectedSpecification.specificationType) && (
													<InputMultiselect
														name="specificationValues"
														identifier="specificationValues"
														options={getSpecificationMultiSelectOptions()}
														validate={Validators.required}
													/>
												)}
										</>
									))}
								{values.limitationDefinition.limitationType ===
									LIMITATION_TYPE.SUPPLIER_LIMITATION &&
									(!suppliers ? (
										'loading…'
									) : (
										<InputAutocomplete
											options={mapSuppliersToAutocompleteOptions(suppliers)}
											label="admin.modal.addSupplierToBundle.autocomplete.label"
											placeholder="admin.modal.addSupplierToBundle.autocomplete.label"
											labelKey={'label'}
											name="limitationDefinition.supplier"
											identifier="limitationDefinition.supplier"
											validate={Validators.required}
										/>
									))}
							</fieldset>
							<div className="mt-3">
								<SubmitButton
									valid={valid}
									pristine={pristine}
									submitting={submitting}
									submitText={
										isEdit
											? 'admin.modal.banner.edit.label'
											: 'admin.modal.banner.create.label'
									}
								/>
							</div>
						</CForm>
					</CContainer>
				);
			}}
		></Form>
	);
};

export default DiscountCouponAutoModal;
