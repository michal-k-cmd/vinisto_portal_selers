import { useCallback, useContext } from 'react';
import { CForm } from '@coreui/react';
import { Form } from 'react-final-form';
import { dayjsInstance as dayjs } from 'Services/Date';
import { useQueryClient } from '@tanstack/react-query';
import { AuthenticationContext } from 'Services/AuthenticationService/context';
import { NotificationsContext } from 'Services/NotificationService';
import { BundleTagService } from 'Services/BundleTags';
import {
	CountrySelect,
	Input,
	InputCheckBox,
	InputColor,
	InputDatePicker,
	InputNumber,
	InputSelect,
	InputTextArea,
	SubmitButton,
	Validators,
} from 'Components/Form';
import { useRevalidator } from 'react-router-dom';
import { FormApi, MutableState, Tools } from 'final-form';
import sanitizeHtml from 'sanitize-html';
import getUrlString from 'Helpers/getUrlString';
import { OBJECT_ALREADY_EXISTS_ERROR } from 'Services/ApiService/constants';
import { tagModalModes } from 'Pages/TagDetail/constants';
import { LocalizationContext } from 'Services/LocalizationService';

import {
	DEFAULT_COLOR,
	SANITIZE_HTML_OPTIONS,
	TAG_META_DESCRIPTION_LIMIT,
} from './constants';
import { ProductTagFormValues, TagModalData } from './interfaces';

import { VinistoHelperDllEnumsTagTagType } from '@/api-types/product-api';
import { VinistoHelperDllEnumsCountryCode } from '@/api-types/user-api';
import api from '@/api';

const TagModal = ({
	id,
	name,
	slugs,
	description,
	metaDescription,
	metaTitle,
	color: tagColor,
	validFrom,
	validTo,
	isVisibleInFilters,
	countryOfSale,
	orderInFilters,
	type,
	handleClose,
	resetTagList,
	mode,
}: TagModalData) => {
	const notificationsContext = useContext(NotificationsContext);
	const {
		vinistoUser: { loginHash },
	} = useContext(AuthenticationContext);
	const { create, update } = BundleTagService;

	const revalidator = useRevalidator();
	const queryClient = useQueryClient();

	const localizationContext = useContext(LocalizationContext);
	const t = localizationContext.useFormatMessage();

	const handleOnNameChange =
		(form: FormApi<ProductTagFormValues>) => (value: string) => {
			form.mutators.updateUrl(value);
		};
	const handleOnDescriptionChange =
		(form: FormApi<ProductTagFormValues>) => (value: string) => {
			form.mutators.updateMetaDescription(value);
		};

	const blogTagMutators = {
		updateUrl: (
			[name]: [name: string],
			state: MutableState<ProductTagFormValues>,
			tools: Tools<ProductTagFormValues>
		) => {
			if (state.fields['slugs'].modified) return;
			tools.changeValue(state, 'slugs', () => {
				if (!name) return; // need to update value when name is empty
				return getUrlString(name);
			});
		},
		updateMetaDescription: (
			[description]: [description: string],
			state: MutableState<ProductTagFormValues>,
			tools: Tools<ProductTagFormValues>
		) => {
			if (state.fields['metaDescription']?.modified) return;
			tools.changeValue(state, 'metaDescription', () => {
				if (!description) return; // need to update value when description is empty
				return sanitizeHtml(description, SANITIZE_HTML_OPTIONS).substring(
					0,
					TAG_META_DESCRIPTION_LIMIT
				);
			});
		},
		updateFormWithApiError: (
			[apiError]: [apiError: string],
			state: MutableState<ProductTagFormValues>
		) => {
			state.formState.submitErrors = {
				...state.formState.submitErrors,
				slugs: apiError,
			};
			state.fields.slugs.blur();
		},
	};

	const handleOnCreateProductTag = useCallback(
		(formValues: ProductTagFormValues, form: FormApi<ProductTagFormValues>) => {
			const { validFrom, validTo } = formValues;

			const requestData = {
				userLoginHash: loginHash,
				...formValues,
				slugs: [{ value: formValues.slugs, isMain: true }],
				validFrom: validFrom ? dayjs(validFrom).unix() : null,
				validTo: validTo ? dayjs(validTo).unix() : null,
				orderInFilters: formValues.orderInFilters ?? 0,
				description: sanitizeHtml(
					formValues.description ?? '',
					SANITIZE_HTML_OPTIONS
				),
				metaDescription: sanitizeHtml(
					formValues.metaDescription ?? '',
					SANITIZE_HTML_OPTIONS
				),
				color:
					typeof formValues.color === 'string'
						? formValues.color
						: formValues.color?.hex ?? DEFAULT_COLOR,
				type: formValues.type,
				isVisibleInFilters: !!formValues.isVisibleInFilters,
			};

			create(requestData)
				.then(() => {
					handleClose();
					notificationsContext.handleShowSuccessNotification(
						'admin.cmsBlogTag.success'
					);
					queryClient.invalidateQueries(['bundle-tag']);
					resetTagList();
				})
				.catch((specificError: Error) => {
					if (specificError.message === OBJECT_ALREADY_EXISTS_ERROR) {
						form.mutators.updateFormWithApiError(
							'admin.cmsBlogTag.error.alreadyExists'
						);
						return;
					}
					notificationsContext.handleShowErrorNotification(
						'admin.cmsBlogTag.create.error'
					);
				});
		},
		[
			loginHash,
			create,
			handleClose,
			notificationsContext,
			queryClient,
			resetTagList,
		]
	);

	const handleOnEditProductTag = useCallback(
		(formValues: ProductTagFormValues) => {
			const { validFrom, validTo } = formValues;

			const requestData = {
				userLoginHash: loginHash,
				...formValues,
				...(formValues.slugs && {
					// slugs are any[] in the request type
					slugs: [{ value: formValues.slugs, isMain: true }] as any,
				}),
				validFrom: validFrom ? dayjs(validFrom).unix() : null,
				validTo: validTo ? dayjs(validTo).unix() : null,
				color: formValues.color?.hex ?? tagColor?.hex ?? DEFAULT_COLOR,
			};
			update(id ?? '', requestData)
				.then(() => {
					handleClose();
					notificationsContext.handleShowSuccessNotification(
						'admin.editTag.success'
					);
					revalidator.revalidate();
					queryClient.invalidateQueries(['bundle-tag']);
					resetTagList();
				})
				.catch(() => {
					notificationsContext.handleShowErrorNotification(
						'admin.editTag.error'
					);
				});
		},
		[
			loginHash,
			update,
			handleClose,
			notificationsContext,
			queryClient,
			resetTagList,
			tagColor,
			id,
			revalidator,
		]
	);

	const handleOnAddCountryOfSale = useCallback(
		(formValues: ProductTagFormValues) => {
			const { validFrom, validTo } = formValues;

			const requestData = {
				userLoginHash: loginHash,
				...formValues,
				...(formValues.slugs && {
					// slugs are any[] in the request type
					slugs: [{ value: formValues.slugs, isMain: true }] as any,
				}),
				validFrom: validFrom ? dayjs(validFrom).unix() : null,
				validTo: validTo ? dayjs(validTo).unix() : null,
				color: formValues.color?.hex ?? tagColor?.hex ?? DEFAULT_COLOR,
			};
			api
				.post(
					`product-api/tags/${id}/create-tag-language-version`,
					undefined,
					requestData
				)
				.then(() => {
					handleClose();
					notificationsContext.handleShowSuccessNotification(
						'admin.addCountryOfSale.success'
					);
					revalidator.revalidate();
					queryClient.invalidateQueries(['bundle-tag']);
					resetTagList();
				})
				.catch(() => {
					notificationsContext.handleShowErrorNotification(
						'admin.addCountryOfSale.error'
					);
				});
		},
		[
			loginHash,
			tagColor?.hex,
			id,
			handleClose,
			notificationsContext,
			revalidator,
			queryClient,
			resetTagList,
		]
	);

	const tagTypeOptions = Object.values(VinistoHelperDllEnumsTagTagType)
		.filter((tagType) => tagType !== VinistoHelperDllEnumsTagTagType.System)
		.map((tagType) => ({
			label: `${t({ id: `tag.type.${tagType.toLowerCase()}` })}`,
			value: tagType,
		}));

	return (
		<Form<ProductTagFormValues>
			onSubmit={(() => {
				switch (mode) {
					case tagModalModes.CREATE:
						return handleOnCreateProductTag;
					case tagModalModes.EDIT:
						return handleOnEditProductTag;
					case tagModalModes.ADD_COUNTRY_OF_SALE:
						return handleOnAddCountryOfSale;
					default:
						return () => null;
				}
			})()}
			initialValues={{
				name,
				slugs: slugs?.[0]?.value ?? '',
				description,
				metaDescription,
				metaTitle,
				color: tagColor,
				...(validFrom && { validFrom }),
				...(validTo && { validTo }),
				isVisibleInFilters,
				countryOfSale: countryOfSale ?? VinistoHelperDllEnumsCountryCode.CZ,
				orderInFilters,
				type,
			}}
			mutators={blogTagMutators}
			render={({ handleSubmit, form, pristine, valid, submitting }) => (
				<CForm onSubmit={handleSubmit}>
					<Input
						type="text"
						name="name"
						identifier="name"
						label="admin.modal.form.cmsBlogTag.name"
						placeholder="admin.modal.form.cmsBlogTag.name"
						validate={Validators.required}
						onChange={
							mode === tagModalModes.CREATE
								? handleOnNameChange(form)
								: undefined
						}
					/>
					{type !== VinistoHelperDllEnumsTagTagType.System && (
						<>
							<Input
								type="text"
								name="slugs"
								identifier="slugs"
								label="admin.modal.form.url"
								placeholder="admin.modal.form.url"
								validate={Validators.required}
							/>

							<Input
								type="text"
								name="metaTitle"
								identifier="metaTitle"
								label="admin.modal.form.tag.metaTitle"
								placeholder="admin.modal.form.tag.metaTitle"
							/>

							<InputTextArea
								name="metaDescription"
								identifier="metaDescription"
								label="admin.modal.form.tag.metaDescription"
								placeholder="admin.modal.form.tag.metaDescription"
								maxLength={TAG_META_DESCRIPTION_LIMIT}
								className="modal-blogtag-meta"
							/>

							<InputTextArea
								name="description"
								identifier="description"
								label="admin.modal.form.cmsBlogTag.description"
								placeholder="admin.modal.form.cmsBlogTag.description"
								validate={Validators.required}
								onChange={
									mode === tagModalModes.CREATE
										? handleOnDescriptionChange(form)
										: undefined
								}
							/>

							<div className="d-flex gap-3">
								<InputDatePicker
									name="validFrom"
									identifier="validFrom"
									label="admin.modal.form.validFrom"
								/>

								<InputDatePicker
									name="validTo"
									identifier="validTo"
									label="admin.modal.form.validTo"
								/>
							</div>

							{(mode === tagModalModes.CREATE ||
								mode === tagModalModes.ADD_COUNTRY_OF_SALE) && (
								<CountrySelect
									name="countryOfSale"
									identifier="countryOfSale"
									label="countryOfSale"
									excludedCountries={[
										...(mode === tagModalModes.ADD_COUNTRY_OF_SALE &&
										countryOfSale
											? [countryOfSale]
											: []),
										VinistoHelperDllEnumsCountryCode.DE,
										VinistoHelperDllEnumsCountryCode.PL,
										VinistoHelperDllEnumsCountryCode.UK,
									]}
									validate={Validators.required}
								/>
							)}

							{mode === tagModalModes.CREATE && (
								<InputSelect
									options={tagTypeOptions}
									name="type"
									identifier="type"
									label="admin.modal.form.type"
									validate={Validators.required}
								/>
							)}

							<InputCheckBox
								name="isVisibleInFilters"
								identifier="isVisibleInFilters"
								label="admin.tagDetail.isShowInFilters.label"
							/>

							<InputNumber
								name="orderInFilters"
								identifier="orderInFilters"
								label="admin.tagDetail.orderInFilters.label"
								min={0}
								step={1}
								validate={Validators.required}
							/>
						</>
					)}

					<InputColor
						name="color"
						label="admin.modal.form.color"
					/>

					<div className="mt-3">
						<SubmitButton
							valid={valid}
							pristine={pristine}
							submitting={submitting}
							submitText={
								mode === tagModalModes.CREATE
									? 'admin.modal.createTag'
									: 'admin.modal.editTag'
							}
						/>
					</div>
				</CForm>
			)}
		/>
	);
};
export default TagModal;
