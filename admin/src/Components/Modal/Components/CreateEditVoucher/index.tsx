import { CForm } from '@coreui/react';
import {
	CurrencySelect,
	Input,
	InputDatePicker,
	InputNumber,
	InputTextArea,
	LanguageSelect,
	Validators,
} from 'Components/Form';
import { ModalContext } from 'Components/Modal/context';
import { apiServiceInstance } from 'Services/ApiService';
import {
	VinistoHelperDllEnumsDiscountCouponDiscountCouponType,
	VinistoOrderDllModelsApiDiscountCouponDefinitionParametersDiscountCouponCreateParameters,
	VinistoOrderDllModelsApiReturnDataDiscountCouponReturn,
} from 'vinisto_api_client/src/api-types/order-api/';
import { VinistoHelperDllEnumsErrorSpecificError } from 'vinisto_api_client/src/api-types/product-api/';
import { AuthenticationContext } from 'Services/AuthenticationService/context';
import { LocalizationContext } from 'Services/LocalizationService';
import { NotificationsContext } from 'Services/NotificationService';
import { useCallback, useContext, useMemo, useRef } from 'react';
import { Button } from 'react-bootstrap';
import { Form } from 'react-final-form';
import { dayjsInstance } from 'Services/Date';
import ImageUpload from 'Components/Form/Components/ImageUpload';
import useImageUpload from 'Hooks/useImageUpload';
import { uploadImage } from 'Services/DiscountCouponService';
import { B2C_NUMERIC_CODE } from 'Services/IntergationService/constants';
import { noop } from 'Helpers/lodash';

import { CreateVoucherFormValues } from './interfaces';
import styles from './styles.module.css';

import {
	VinistoHelperDllEnumsCountryCode,
	VinistoHelperDllEnumsCurrency,
	VinistoHelperDllEnumsPriceLevel,
} from '@/api-types/user-api';
import { VinistoHelperDllEnumsVatRate } from '@/api-types/cms-api';

const CreateEditVoucherModal = () => {
	const modalContext = useContext(ModalContext);
	const authenticationContext = useContext(AuthenticationContext);
	const notificationsContext = useContext(NotificationsContext);
	const localizationContext = useContext(LocalizationContext);
	const t = localizationContext.useFormatMessage();

	const modalData = modalContext.data ?? {};
	const refetchVoucherList =
		typeof modalData.refetchVoucherList === 'function'
			? modalData.refetchVoucherList
			: noop;

	const { handleOnUpload, imgInputRef, selectedImage, imageError } =
		useImageUpload(['image/png']);

	const currentdateRef = useRef(new Date());

	const handleOnCreateVoucher = useCallback(
		(formValues: CreateVoucherFormValues) => {
			const validFrom = dayjsInstance(formValues.validFrom).unix();
			const validTo = dayjsInstance(formValues.validTo).endOf('day').unix();

			if (imageError) {
				notificationsContext.handleShowErrorNotification(imageError.message);
				return;
			}

			const requestData: Partial<VinistoOrderDllModelsApiDiscountCouponDefinitionParametersDiscountCouponCreateParameters> =
				{
					...formValues,
					countryOfSale:
						formValues.amountDiscount.currency ===
						VinistoHelperDllEnumsCurrency.CZK
							? VinistoHelperDllEnumsCountryCode.CZ
							: VinistoHelperDllEnumsCountryCode.SK,
					currency: formValues.amountDiscount.currency,
					userLoginHash: authenticationContext.vinistoUser.loginHash,
					validFrom: validFrom,
					validTo: validTo,
					name: [
						{
							language: formValues.unit.language,
							value: formValues.name ?? '',
						},
					],
					shortDescription: [
						{
							language: formValues.unit.language,
							value: formValues.shortDescription,
						},
					],
					description: [
						{
							language: formValues.unit.language,
							value: formValues.description,
						},
					],
				};

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
						'admin.voucher.create.success'
					);
					refetchVoucherList();
				})
				.catch((e) => {
					if (
						e?.message ===
						VinistoHelperDllEnumsErrorSpecificError.DISCOUNT_COUPON_ACTIVE_CODE_ALREADY_EXISTS
					) {
						notificationsContext.handleShowErrorNotification(
							'admin.voucher.create.alreadyExistsError'
						);
						return;
					}

					notificationsContext.handleShowErrorNotification(
						'admin.voucher.create.error'
					);
				});
		},
		[
			imageError,
			authenticationContext.vinistoUser.loginHash,
			notificationsContext,
			selectedImage,
			modalContext,
			refetchVoucherList,
		]
	);

	const stableInitialValues = useMemo(
		() => ({
			discountCouponType:
				VinistoHelperDllEnumsDiscountCouponDiscountCouponType.GIFT,
			validFrom: currentdateRef.current,
			validTo: currentdateRef.current,
			amountDiscount: {
				value: undefined,
				vat: VinistoHelperDllEnumsVatRate.BaseVat,
				currency: VinistoHelperDllEnumsCurrency.CZK,
				level: VinistoHelperDllEnumsPriceLevel.Level1,
				platformId: B2C_NUMERIC_CODE,
			},
			unit: { language: localizationContext.activeLanguageKey, value: '' },
		}),
		[localizationContext.activeLanguageKey]
	);

	return (
		<Form<CreateVoucherFormValues>
			initialValues={stableInitialValues}
			onSubmit={handleOnCreateVoucher}
			render={({ handleSubmit, submitting }) => (
				<CForm
					onSubmit={handleSubmit}
					style={{ maxWidth: '615px', width: '100%' }}
				>
					<Input
						name="code"
						type="text"
						identifier="code"
						label="admin.voucher.discountCodeName.label"
						placeholder="admin.modal.form.discountCodeName.placeholder"
						validate={Validators.cannotContainSpaces}
						prohibitedChars={[' ']}
					/>
					<InputDatePicker
						name="validFrom"
						identifier="validFrom"
						label="admin.voucher.validFrom.label"
						validate={Validators.required}
					/>
					<InputDatePicker
						name="validTo"
						identifier="validTo"
						label="admin.voucher.validTo.label"
						validate={Validators.required}
					/>
					<div className={styles.row}>
						<InputNumber
							name="amountDiscount.value"
							identifier="amountDiscount.value"
							label="admin.modal.form.discount"
						/>

						<CurrencySelect
							name="amountDiscount.currency"
							identifier="amountDiscount.currency"
							label="admin.modal.form.currency"
						/>
					</div>

					<fieldset>
						<div className={styles.row}>
							<LanguageSelect
								name="unit.language"
								identifier="unit.language"
								label="admin.modal.form.language"
								disabled={true}
							/>
							<Input
								name="unit.value"
								identifier="unit.value"
								type="text"
								label="admin.modal.form.unit"
								placeholder="admin.modal.form.unit.placeholder"
							/>
						</div>
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
						buttonWrapperClassname={styles.imageUploadButton}
					/>
					{selectedImage && (
						<img
							src={URL.createObjectURL(selectedImage)}
							alt=""
							style={{ objectFit: 'contain', maxWidth: '100%' }}
						/>
					)}

					<Button
						type="submit"
						disabled={submitting}
					>
						{t({ id: 'admin.voucherList.createVoucher' })}
					</Button>
				</CForm>
			)}
		/>
	);
};
export default CreateEditVoucherModal;
