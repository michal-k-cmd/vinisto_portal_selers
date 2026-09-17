import { CForm } from '@coreui/react';
import { useQuery } from '@tanstack/react-query';
import {
	CurrencySelect,
	Input,
	InputAutocomplete,
	InputCheckBox,
	InputDatePicker,
	InputMultiselect,
	InputNumber,
	InputSelect,
	InputTextArea,
	LanguageSelect,
	Validators,
} from 'Components/Form';
import { CURRENCIES } from 'Components/Form/Components/CurrencySelect/constants';
import Radio from 'Components/Form/Components/Radio';
import { VATS } from 'Components/Form/Components/VatSelect/constants';
import { ModalContext } from 'Components/Modal/context';
import useLocalizedValue from 'Hooks/useLocalizedValue';
import { apiServiceInstance } from 'Services/ApiService';
import {
	VinistoHelperDllEnumsDiscountCouponDiscountCouponType,
	VinistoOrderDllModelsApiReturnDataDiscountCouponReturn,
} from 'vinisto_api_client/src/api-types/order-api/';
import {
	VinistoHelperDllEnumsErrorSpecificError,
	VinistoProductDllModelsApiSpecificationSpecificationsReturn,
} from 'vinisto_api_client/src/api-types/product-api/';
import { AuthenticationContext } from 'Services/AuthenticationService/context';
import { LocalizationContext } from 'Services/LocalizationService';
import { NotificationsContext } from 'Services/NotificationService';
import {
	TYPE_COMBO_BOX,
	TYPE_DECIMAL_NUMBER,
	TYPE_DECIMAL_NUMBER_IMPERIAL,
	TYPE_MULTI_COMBO_BOX,
	TYPE_NUMBER,
	TYPE_NUMBER_IMPERIAL,
} from 'Services/Specification/constants';
import { useCallback, useContext, useRef, useState } from 'react';
import { Button } from 'react-bootstrap';
import { Form } from 'react-final-form';
import { dayjsInstance } from 'Services/Date';
import useSuppliers from 'Pages/UserDetail/Components/SupplierList/useSuppliers';
import { Supplier } from 'Pages/UserDetail/Components/SupplierList/types';
import sortSuppliersByNameWeb from 'Helpers/sortSuppliersByNameWeb';
import ImageUpload from 'Components/Form/Components/ImageUpload';
import useImageUpload from 'Hooks/useImageUpload';
import { uploadImage } from 'Services/DiscountCouponService';
import { discountCouponTypesTranslationMap } from 'Pages/DiscountCouponAutoList/constants';
import AutocompleteCategory from 'Components/Form/Components/AutocompleteCategory';

import {
	COUPON_LIMITATION_OPTIONS,
	COUPON_REUSABILITY_OPTIONS,
	LIMITATION_TYPE,
} from './constants';
import {
	CreateCouponFormValues,
	CreateCouponRequest,
	SupplierOption,
} from './interfaces';
import styles from './styles.module.css';

const CreateDiscountCouponModal = () => {
	const modalContext = useContext(ModalContext);
	const authenticationContext = useContext(AuthenticationContext);
	const notificationsContext = useContext(NotificationsContext);
	const localizationContext = useContext(LocalizationContext);
	const t = localizationContext.useFormatMessage();
	const getLocalizedValue = useLocalizedValue();

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

	const { handleOnUpload, imgInputRef, selectedImage, imageError } =
		useImageUpload(['image/png']);

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

	const currentdateRef = useRef(new Date());

	const [selectedSpecification, setSelectedSpecification] =
		useState<Record<any, any>>();
	const [selectedSupplierId, setSelectedSupplierId] = useState<string>('');

	const specificationOptions = specificationsData?.map((specification) => ({
		value: specification.id,
		label: getLocalizedValue(specification.name ?? []),
	}));

	const translatedCouponReusabilityOptions = COUPON_REUSABILITY_OPTIONS.map(
		(option) => ({
			value: option.value,
			label: String(t({ id: option.label })),
		})
	);

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

	const handleOnCreateCoupon = useCallback(
		(formValues: CreateCouponFormValues) => {
			const validFrom = dayjsInstance(formValues.validFrom).unix();
			const validTo = dayjsInstance(formValues.validTo).endOf('day').unix();

			if (imageError) {
				notificationsContext.handleShowErrorNotification(imageError.message);
				return;
			}

			const requestData: Partial<CreateCouponRequest> = {
				userLoginHash: authenticationContext.vinistoUser.loginHash,
				validFrom: validFrom,
				validTo: validTo,
				discountCouponType: formValues.discountCouponType,
				unit: {
					language: formValues.unitLanguage,
					value: formValues.unitValue,
				},
				code: formValues?.code,
				isReusable: formValues?.isReusable === 'true' ? true : false,
				isCombinable: formValues?.isCombinable,
				isForDiscountedItems:
					formValues.discountCouponType ===
					VinistoHelperDllEnumsDiscountCouponDiscountCouponType.PERCENTAGE
						? false
						: formValues?.isForDiscountedItems,
				isVisibleOnProductDetail: formValues?.isVisibleOnProductDetail,
				isSupplierDiscount: formValues?.isSupplierDiscount,
				name: [
					{
						language: formValues.unitLanguage,
						value: formValues.name ?? '',
					},
				],
				shortDescription: [
					{
						language: formValues.unitLanguage,
						value: formValues.shortDescription,
					},
				],
				description: [
					{
						language: formValues.unitLanguage,
						value: formValues.description,
					},
				],
				isVisibleInUsersSection: formValues?.isVisibleInUsersSection,
				isForRegisteredUsers: formValues?.isForRegisteredUsers,
			};
			if (
				formValues.discountCouponType ===
				VinistoHelperDllEnumsDiscountCouponDiscountCouponType.AMOUNT
			) {
				requestData.amountDiscount = {
					value: formValues.amountPrice,
					currency: formValues.amountCurrency,
				};
			} else if (
				formValues.discountCouponType ===
				VinistoHelperDllEnumsDiscountCouponDiscountCouponType.PERCENTAGE
			) {
				requestData.percentageDiscount = formValues.percentageDiscount;
			}
			if (formValues.isAllowedFrom) {
				requestData.allowedFrom = {
					value: formValues.allowedFromPrice,
					currency: formValues.allowedFromCurrency,
				};
			}
			if (formValues.limitationType === LIMITATION_TYPE.NO_LIMITATION) {
				requestData.limitationDefinition = {
					limitationType: formValues.limitationType,
				};
			} else if (
				formValues.limitationType === LIMITATION_TYPE.CATEGORY_LIMITATION
			) {
				requestData.limitationDefinition = {
					limitationType: formValues.limitationType,
					categoryId: formValues.categoryId,
				};
			} else if (
				formValues.limitationType === LIMITATION_TYPE.SPECIFICATION_LIMITATION
			) {
				requestData.limitationDefinition = {
					limitationType: formValues.limitationType,
					specification: {
						specificationDefinitionId: selectedSpecification?.id,
						specificationType: selectedSpecification?.specificationType,
						allowedValues: formValues?.allowedValues?.map(({ value }) =>
							[
								TYPE_DECIMAL_NUMBER,
								TYPE_DECIMAL_NUMBER_IMPERIAL,
								TYPE_NUMBER,
								TYPE_NUMBER_IMPERIAL,
							].includes(selectedSpecification?.specificationType)
								? Number(value)
								: value
						),
					},
				};
			} else if (
				formValues.limitationType === LIMITATION_TYPE.SUPPLIER_LIMITATION
			) {
				requestData.limitationDefinition = {
					limitationType: formValues.limitationType,
					supplierId: selectedSupplierId,
				};
			}

			return apiServiceInstance
				.post<VinistoOrderDllModelsApiReturnDataDiscountCouponReturn>(
					'order-api/discount-coupons/CreateDiscountCoupon',
					requestData,
					true
				)
				.then(async (response) => {
					if (!response.discountCoupon) {
						throw new Error();
					}

					if (selectedImage) {
						await uploadImage(
							response.discountCoupon.id,
							selectedImage,
							authenticationContext.vinistoUser.loginHash,
							notificationsContext
						);
					}

					modalContext.handleCloseModal();
					notificationsContext.handleShowSuccessNotification(
						'admin.createCoupon.success'
					);
					modalContext?.data?.resetCouponList();
				})
				.catch((e) => {
					if (
						e?.message ===
						VinistoHelperDllEnumsErrorSpecificError.DISCOUNT_COUPON_ACTIVE_CODE_ALREADY_EXISTS
					) {
						notificationsContext.handleShowErrorNotification(
							'admin.coupon.errorDuplicate'
						);
						return;
					}

					notificationsContext.handleShowErrorNotification(
						'admin.createCoupon.error'
					);
				});
		},
		[
			authenticationContext.vinistoUser.loginHash,
			modalContext,
			notificationsContext,
			selectedSpecification?.id,
			selectedSpecification?.specificationType,
			selectedSupplierId,
			selectedImage,
			imageError,
		]
	);

	return (
		<Form<CreateCouponFormValues>
			submitText={'admin.modal.form.createCoupon'}
			validate={(values) => {
				if (
					values.isVisibleOnProductDetail === true &&
					(values.isReusable === 'false' || values.isReusable === undefined)
				) {
					return {
						isReusable: 'admin.modal.form.isReusable.error',
						isVisibleOnProductDetail: 'admin.modal.form.isReusable.error',
					};
				}
				return {};
			}}
			initialValues={{
				discountCouponType:
					VinistoHelperDllEnumsDiscountCouponDiscountCouponType.AMOUNT,
				validFrom: currentdateRef.current,
				validTo: currentdateRef.current,
				amountCurrency: CURRENCIES[0].value,
				amountVat: VATS[0].value,
				amountPrice: 0,
				percentageDiscount: 0,
				allowedFromCurrency: CURRENCIES[0].value,
				allowedFromVat: VATS[0].value,
				allowedFromPrice: 0,
				isCombinable: false,
				isForDiscountedItems: false,
				isVisibleOnProductDetail: false,
				isSupplierDiscount: false,
				isVisibleInUsersSection: false,
				isForRegisteredUsers: false,
				unitLanguage: localizationContext.activeLanguageKey,
				unitValue: '',
				limitationType: LIMITATION_TYPE.NO_LIMITATION,
			}}
			onSubmit={handleOnCreateCoupon}
			render={({ form, values, handleSubmit, submitting }) => (
				<CForm
					onSubmit={handleSubmit}
					style={{ maxWidth: '615px', width: '100%' }}
				>
					<InputSelect
						options={translatedCouponReusabilityOptions}
						name="isReusable"
						identifier="isReusable"
						label="admin.modal.form.isReusable"
					/>
					<Input
						name="code"
						type="text"
						identifier="code"
						label="admin.modal.form.discountCodeName.label"
						placeholder="admin.modal.form.discountCodeName.placeholder"
						validate={Validators.cannotContainSpaces}
						prohibitedChars={[' ']}
					/>
					<InputDatePicker
						name="validFrom"
						identifier="validFrom"
						label="admin.modal.form.discountCoupon.validFrom"
						validate={Validators.required}
					/>
					<InputDatePicker
						name="validTo"
						identifier="validTo"
						label="admin.modal.form.discountCoupon.validTo"
						validate={Validators.required}
					/>
					<div className={styles.row}>
						<InputSelect
							options={Object.entries(discountCouponTypesTranslationMap).map(
								([key, value]) => ({
									value: key,
									label: `${t({ id: value })}`,
								})
							)}
							name="discountCouponType"
							identifier="discountCouponType"
							label="admin.modal.form.type"
						/>

						{values.discountCouponType ===
							VinistoHelperDllEnumsDiscountCouponDiscountCouponType.AMOUNT && (
							<>
								<InputNumber
									name="amountPrice"
									identifier="amountPrice"
									label="admin.modal.form.discount"
								/>

								<CurrencySelect
									name="amountCurrency"
									identifier="amountCurrency"
									label="admin.modal.form.currency"
								/>
							</>
						)}
					</div>
					{values.discountCouponType ===
						VinistoHelperDllEnumsDiscountCouponDiscountCouponType.PERCENTAGE && (
						<InputNumber
							name="percentageDiscount"
							identifier="percentageDiscount"
							label="admin.modal.form.percentageDiscount"
						/>
					)}
					<fieldset>
						<div className={styles.row}>
							<LanguageSelect
								name="unitLanguage"
								identifier="unitLanguage"
								label="admin.modal.form.language"
								disabled={true}
							/>
							<Input
								name="unitValue"
								identifier="unitValue"
								type="text"
								label="admin.modal.form.unit"
								placeholder="admin.modal.form.unit.placeholder"
							/>
						</div>
					</fieldset>
					<fieldset>
						<InputCheckBox
							identifier="isAllowedFrom"
							name="isAllowedFrom"
							label="admin.modal.form.allowedFrom"
						/>
						{values.isAllowedFrom && (
							<>
								<InputNumber
									name="allowedFromPrice"
									identifier="allowedFromPrice"
									label="admin.modal.form.discountFrom"
								/>
								<CurrencySelect
									name="allowedFromCurrency"
									identifier="allowedFromCurrency"
									label="admin.modal.form.currency"
								/>
							</>
						)}
					</fieldset>
					<fieldset>
						<InputCheckBox
							identifier="isCombinable"
							name="isCombinable"
							label="admin.modal.form.isCombinable"
						/>
					</fieldset>
					<fieldset>
						<InputCheckBox
							identifier="isForDiscountedItems"
							name="isForDiscountedItems"
							label="admin.modal.form.isForDiscountedItems"
							disabled={
								values.discountCouponType ===
									VinistoHelperDllEnumsDiscountCouponDiscountCouponType.PERCENTAGE &&
								true
							}
						/>
					</fieldset>
					<fieldset>
						<InputCheckBox
							identifier="isVisibleOnProductDetail"
							name="isVisibleOnProductDetail"
							label="admin.modal.form.isVisibleOnProductDetail"
						/>
					</fieldset>
					<fieldset>
						<InputCheckBox
							identifier="isSupplierDiscount"
							name="isSupplierDiscount"
							label="admin.modal.form.isSupplierDiscount"
						/>
					</fieldset>
					<fieldset>
						<Radio
							options={COUPON_LIMITATION_OPTIONS}
							name="limitationType"
							className={styles.radio}
						/>
						{values.limitationType === LIMITATION_TYPE.CATEGORY_LIMITATION && (
							<AutocompleteCategory
								name="categoryId"
								identifier="categoryId"
								label="admin.modal.addCategoryToBundle.autocomplete.label"
								placeholder="search.category.singular"
								validate={Validators.required}
								onChange={(option) => {
									form.change('categoryId', option[0]?.value);
								}}
							/>
						)}
						{values.limitationType ===
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
										name="specification"
										identifier="specification"
										onChange={handleOnSelectSpecification}
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
												name="allowedValues"
												identifier="allowedValues"
												options={getSpecificationMultiSelectOptions()}
												validate={Validators.required}
											/>
										)}
								</>
							))}
						{values.limitationType === LIMITATION_TYPE.SUPPLIER_LIMITATION &&
							(!suppliers ? (
								'loading…'
							) : (
								<InputAutocomplete
									options={mapSuppliersToAutocompleteOptions(suppliers)}
									label="admin.modal.addSupplierToBundle.autocomplete.label"
									placeholder="admin.modal.addSupplierToBundle.autocomplete.label"
									labelKey={'label'}
									name="supplierId"
									identifier="supplierId"
									onChange={(supplierId) => {
										setSelectedSupplierId(supplierId[0]?.value);
									}}
									validate={Validators.required}
								/>
							))}
					</fieldset>
					<h3 className={styles.vinisto_club}>
						{t({ id: 'admin.modal.form.createCoupon.vinistoClub' })}
					</h3>
					<Input
						name="name"
						type="text"
						identifier="name"
						label="admin.modal.form.createCoupon.name.label"
						placeholder="admin.modal.form.createCoupon.name.placeholder"
						validate={Validators.required}
					/>
					<Input
						name="shortDescription"
						type="text"
						identifier="shortDescription"
						label="admin.modal.form.createCoupon.shortDescription.label"
						placeholder="admin.modal.form.createCoupon.shortDescription.placeholder"
						validate={Validators.required}
					/>
					<InputTextArea
						name="description"
						identifier="description"
						label="admin.modal.form.createCoupon.description.label"
						placeholder="admin.modal.form.createCoupon.description.placeholder"
						validate={Validators.required}
					/>

					<ImageUpload
						name="image"
						label={{
							id: 'image.labelWithRecommendedSize',
							recommendedSize: '368 × 490',
						}}
						handleOnUpload={handleOnUpload}
						imgInputRef={imgInputRef}
						selectedImage={selectedImage}
						allowedTypes={['image/png']}
						imageError={imageError}
						labelClassname="vinisto-label--semibold"
						buttonWrapperClassname="mt-2"
					/>
					{selectedImage && (
						<img
							src={URL.createObjectURL(selectedImage)}
							alt=""
							style={{ objectFit: 'contain', maxWidth: '100%' }}
						/>
					)}
					<InputCheckBox
						identifier="isVisibleInUsersSection"
						name="isVisibleInUsersSection"
						label="admin.modal.form.createCoupon.isVisibleInUsersSection"
					/>
					<InputCheckBox
						identifier="isForRegisteredUsers"
						name="isForRegisteredUsers"
						label="admin.modal.form.createCoupon.isForRegisteredUsers"
					/>
					<Button
						type="submit"
						disabled={submitting}
					>
						{t({ id: 'admin.modal.form.createCoupon' })}
					</Button>
				</CForm>
			)}
		/>
	);
};
export default CreateDiscountCouponModal;
