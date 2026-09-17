import { useContext, useMemo, useRef, useState } from 'react';
import cx from 'classnames';
import { CCol, CContainer, CForm, CFormLabel, CRow } from '@coreui/react';
import { invoke } from 'Helpers/lodash';
import { Form } from 'react-final-form';
import { Banner } from 'Services/Banner/interfaces';
import {
	ALLOWED_IMG_TYPES_MAP,
	POSITION,
	POSITION_LOCALIZATION_MAP,
} from 'Services/Banner/constants';
import useImageUpload from 'Hooks/useImageUpload';
import BannerService from 'Services/Banner';
import { ModalContext } from 'Components/Modal/context';
import { AuthenticationContext } from 'Services/AuthenticationService/context';
import { LocalizationContext } from 'Services/LocalizationService';
import {
	Input,
	InputRadio,
	InputSelect,
	InputTextArea,
	InputTimePicker,
	SubmitButton,
	Validators,
} from 'Components/Form';
import ImageUpload from 'Components/Form/Components/ImageUpload';
import { NotificationsContext } from 'Services/NotificationService';
import PlatformMultiselect from 'Components/Form/Components/PlatformMultiselect';

import { DEFAULT_LANGUAGE, recommendedImageSizes } from './constants';
import { BannerFormErrors, BannerFormValues } from './interfaces';
import BannerPreview from './Preview';
import styles from './styles.module.css';
import ctaStyles from './cta-styles.module.css';
import CollapsibleColorPicker from './Preview/CollapsibleColorPicker';

import { VinistoHelperDllEnumsSliderCarouselButtonStyle } from '@/api-types/cms-api';

const BannerModal = () => {
	const modalContext = useContext(ModalContext);
	const authenticationContext = useContext(AuthenticationContext);
	const notificationsContext = useContext(NotificationsContext);
	const localizationContext = useContext(LocalizationContext);

	const [position, setPosition] = useState<POSITION>(POSITION.TOP);

	const t = localizationContext.useFormatMessage();
	const { handleOnUpload, imgInputRef, selectedImage, imageError } =
		useImageUpload(
			ALLOWED_IMG_TYPES_MAP[position]
			// Currently commented out allowed width/height due to different business requirements
			// Can be implemented correctly later
			// position === POSITION.TOP
			// 	? { width: { min: 950 }, height: { min: 400 } }
			// 	: undefined
		);

	const formRef = useRef<HTMLFormElement>(null);
	const banner: Banner | undefined = modalContext.data?.banner;
	const isEdit = banner !== undefined;
	const bannerImage =
		selectedImage !== null ? selectedImage : banner?.image?.url || null;

	const validate = (values: BannerFormValues): BannerFormErrors => {
		const errors: BannerFormErrors = {};

		if (values.validFrom > values.validTo) {
			errors.validFrom =
				'admin.modal.banner.validFrom.error.greaterThanValidTo';
		}

		if (values.validTo && new Date(values.validTo) < new Date()) {
			errors.validTo =
				'admin.modal.banner.validTo.error.greaterThanCurrentDate';
		}

		return errors;
	};

	const handleOnSubmit = (formValues: BannerFormValues) => {
		if (selectedImage === null && !isEdit) {
			notificationsContext.handleShowErrorNotification(
				'admin.modal.uploadImage.empty.error'
			);
			return;
		}

		if (imageError) {
			notificationsContext.handleShowErrorNotification(imageError.message);
			return;
		}

		const apiRequest = isEdit
			? BannerService.update(
					banner,
					formValues,
					DEFAULT_LANGUAGE,
					authenticationContext.vinistoUser?.loginHash ?? '',
					notificationsContext
			  )
			: BannerService.create(
					formValues,
					DEFAULT_LANGUAGE,
					authenticationContext.vinistoUser?.loginHash ?? '',
					notificationsContext
			  );

		apiRequest
			.then(() => {
				notificationsContext.handleShowSuccessNotification(
					isEdit
						? 'admin.modal.banner.edit.success'
						: 'admin.modal.banner.create.success'
				);

				invoke(modalContext, 'data.resetList');

				modalContext.handleCloseModal();
			})
			//TODO: proper validation of error type, start with unknown
			.catch((error) => {
				if (typeof error !== 'object' || error === null) {
					return;
				}

				const errorData = error.response?.data;

				if (
					errorData &&
					errorData.isError === true &&
					Array.isArray(errorData.error) &&
					errorData.error.some(
						(err: { generalError: string }) =>
							err.generalError === 'ObjectAlreadyExists'
					)
				) {
					notificationsContext.handleShowErrorNotification(
						'admin.modal.banner.error.objectAlreadyExists'
					);
				} else {
					notificationsContext.handleShowErrorNotification(
						isEdit
							? 'admin.modal.banner.edit.error'
							: 'admin.modal.banner.create.error'
					);
				}
			});
	};

	const positionOptions = useMemo(() => {
		return Object.keys(POSITION_LOCALIZATION_MAP).map((key) => ({
			value: key as POSITION,
			label: `${t({
				id: POSITION_LOCALIZATION_MAP[key as keyof typeof POSITION],
			})}`,
		}));
	}, [t]);

	return (
		<Form<BannerFormValues>
			onSubmit={handleOnSubmit}
			initialValues={{
				position: banner?.position ?? positionOptions[0].value,
				title: banner?.title,
				titleColor: banner?.titleColor,
				subtitle: banner?.subtitle,
				subtitleColor: banner?.subtitleColor,
				ctaLabel: banner?.ctaLabel,
				buttonStyle:
					banner?.buttonStyle ??
					VinistoHelperDllEnumsSliderCarouselButtonStyle.Green,
				validFrom: banner?.validFrom,
				validTo: banner?.validTo,
				order: banner?.order,
				url: banner?.url,
				availableOnPlatforms: banner?.availableOnPlatforms,
			}}
			mutators={{
				setValue: ([field, value], state, { changeValue }) => {
					changeValue(state, field, () => value);
				},
			}}
			validate={validate}
			render={({ form, handleSubmit, pristine, valid, submitting, values }) => {
				return (
					<CContainer>
						<CForm
							onSubmit={handleSubmit}
							ref={formRef}
						>
							{!isEdit && (
								<InputSelect
									options={positionOptions}
									name="position"
									identifier="position"
									label="admin.modal.banner.position.label"
									onChange={(value) => {
										if (
											[POSITION.HP_USP, POSITION.PRODUCT_DETAIL_USP].includes(
												// @ts-expect-error value being string is not a serious issue
												value
											)
										) {
											form.mutators.setValue('titleColor', undefined);
											form.mutators.setValue('subtitleColor', undefined);
											form.mutators.setValue(
												'buttonStyle',
												VinistoHelperDllEnumsSliderCarouselButtonStyle.Green
											);
										}
										setPosition(value as POSITION);
									}}
								/>
							)}
							<PlatformMultiselect
								name="availableOnPlatforms"
								identifier="availableOnPlatforms"
								label="availableOnPlatform"
								validate={Validators.required}
							/>
							<Input
								identifier="title"
								name="title"
								label="admin.modal.banner.title.label"
								type="text"
								validate={Validators.required}
							/>
							{![POSITION.HP_USP, POSITION.PRODUCT_DETAIL_USP].includes(
								values.position
							) && (
								<CollapsibleColorPicker
									name="titleColor"
									label="admin.modal.banner.titleColor.label"
								/>
							)}
							<InputTextArea
								identifier="subtitle"
								name="subtitle"
								label="admin.modal.banner.subtitle.label"
							/>
							{![POSITION.HP_USP, POSITION.PRODUCT_DETAIL_USP].includes(
								values.position
							) && (
								<CollapsibleColorPicker
									name="subtitleColor"
									label="admin.modal.banner.subtitleColor.label"
								/>
							)}

							<ImageUpload
								name="image"
								label={{
									id: 'image.labelWithRecommendedSize',
									recommendedSize: `${
										recommendedImageSizes[values.position].width
									} × ${recommendedImageSizes[values.position].height}`,
								}}
								buttonWrapperClassname="d-flex"
								handleOnUpload={handleOnUpload}
								imgInputRef={imgInputRef}
								selectedImage={bannerImage}
								allowedTypes={ALLOWED_IMG_TYPES_MAP[values.position]}
								imageError={imageError}
							/>
							{![POSITION.HP_USP, POSITION.PRODUCT_DETAIL_USP].includes(
								values.position
							) && (
								<>
									<Input
										identifier="ctaLabel"
										name="ctaLabel"
										label="admin.modal.banner.ctaLabel.label"
										type="text"
									/>
									<InputRadio
										name="buttonStyle"
										label="admin.modal.banner.buttonStyle.label"
										className="mb-3"
										options={Object.values(
											VinistoHelperDllEnumsSliderCarouselButtonStyle
										).map((style) => ({
											label: `${style}`,
											value: `${style}`,
										}))}
										renderLabel={({ option, index }) => (
											<label
												htmlFor={`buttonStyle-${index}`}
												className={cx(
													ctaStyles.ctaStyle,
													ctaStyles[option.value]
												)}
											>
												{option.label}
											</label>
										)}
									/>
									<CFormLabel>
										{t({ id: 'admin.modal.banner.validity.label' })}
									</CFormLabel>
									<CRow>
										<CCol sm="6">
											<InputTimePicker
												name="validFrom"
												identifier="validFrom"
												label="admin.modal.banner.validFrom.label"
												validate={Validators.required}
											/>
										</CCol>
										<CCol sm="6">
											<InputTimePicker
												name="validTo"
												identifier="validTo"
												label="admin.modal.banner.validTo.label"
												validate={Validators.required}
											/>
										</CCol>
									</CRow>
								</>
							)}
							{[
								POSITION.BOTTOM,
								POSITION.TOP,
								POSITION.HP_USP,
								POSITION.PRODUCT_DETAIL_USP,
								POSITION.PRODUCT_LIST,
							].includes(values.position) && (
								<Input
									identifier="order"
									name="order"
									label="admin.modal.banner.order.label"
									type="number"
									validate={Validators.required}
								/>
							)}
							<Input
								identifier="url"
								name="url"
								label="admin.modal.banner.url.label"
								type="text"
								validate={
									[
										POSITION.HP_USP,
										POSITION.PRODUCT_DETAIL_USP,
										POSITION.PRODUCT,
									].includes(values.position)
										? undefined
										: Validators.required
								}
							/>
							<CFormLabel>
								{t({ id: 'admin.modal.banner.preview.label' })}
							</CFormLabel>
							{values && values.position === POSITION.TOP ? (
								<>
									<div>
										{t({ id: 'admin.modal.banner.preview.desktop' })}
										<BannerPreview
											selectedImage={bannerImage}
											values={values}
											className={styles.topBannerPreviewDesktop}
										/>
									</div>
									<div>
										{t({ id: 'admin.modal.banner.preview.mobile' })}
										<BannerPreview
											selectedImage={bannerImage}
											values={values}
											className="banner-image-preview--mobile"
										/>
									</div>
								</>
							) : (
								<CRow>
									<CCol>
										{t({ id: 'admin.modal.banner.preview.desktop' })}
										<BannerPreview
											selectedImage={bannerImage}
											values={values}
										/>
									</CCol>
									<CCol>
										{t({ id: 'admin.modal.banner.preview.mobile' })}
										<BannerPreview
											selectedImage={bannerImage}
											values={values}
											className="banner-image-preview--mobile"
										/>
									</CCol>
								</CRow>
							)}
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
		/>
	);
};

export default BannerModal;
