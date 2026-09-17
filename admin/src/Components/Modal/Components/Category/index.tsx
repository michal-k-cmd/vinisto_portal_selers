import { useContext } from 'react';
import { CContainer, CForm, CFormLabel } from '@coreui/react';
import { FormApi, MutableState, Tools } from 'final-form';
import { invoke } from 'Helpers/lodash';
import { Form } from 'react-final-form';
import { useRevalidator } from 'react-router-dom';
import sanitizeHtml from 'sanitize-html';
import { LANGUAGES } from 'Components/Form/Components/LanguageSelect/constants';
import { META_MAX_LENGTH } from 'Pages/CategoryDetail/Components/CategoryTranslation/constants';
import { OBJECT_ALREADY_EXISTS_ERROR } from 'Services/ApiService/constants';
import { ProductSelectionType } from 'Services/Category/constants';
import { CategoryBundleDiscountFilter } from 'Services/Category/interfaces';
import getUrlString from 'Helpers/getUrlString';
import CategoryService from 'Services/Category';
import { ModalContext } from 'Components/Modal/context';
import { AuthenticationContext } from 'Services/AuthenticationService/context';
import { LocalizationContext } from 'Services/LocalizationService';
import { NotificationsContext } from 'Services/NotificationService';
import {
	Input,
	InputSelect,
	InputTextArea,
	LanguageSelect,
	SubmitButton,
	Validators,
} from 'Components/Form';
import parseCsvToArray from 'Helpers/parse-csv-to-array';

import { SANITIZE_HTML_OPTIONS } from './constants';
import { CategoryFormValues, CategoryModalData } from './interfaces';

const CategoryModal = () => {
	const modalContext = useContext(ModalContext);
	const notificationsContext = useContext(NotificationsContext);
	const authenticationContext = useContext(AuthenticationContext);
	const { activeLanguageKey, useFormatMessage } =
		useContext(LocalizationContext);

	const t = useFormatMessage();
	const revalidator = useRevalidator();

	const modalData = modalContext.data as CategoryModalData;

	const categoryId = modalData.categoryId;
	const translationData = modalData.translationData;
	const existingTranslations = modalData.existingTranslations as string[];

	const isCreateCategory = categoryId === undefined;
	const isCreateTranslation = translationData === undefined;

	const languageOptions =
		existingTranslations === undefined
			? undefined
			: LANGUAGES.filter(
					(language) => !existingTranslations.includes(language.label)
			  );

	const handleOnNameChange =
		(form: FormApi<CategoryFormValues>) => (value: string) => {
			form.mutators.updateUrl(value);
		};
	const handleOnDescriptionChange =
		(form: FormApi<CategoryFormValues>) => (value: string) => {
			form.mutators.updateMetaDescription(value);
		};

	const categoryMutators = {
		updateUrl: (
			[name]: [name: string],
			state: MutableState<CategoryFormValues>,
			tools: Tools<CategoryFormValues>
		) => {
			if (state.fields['url'].modified) return;
			tools.changeValue(state, 'url', () => {
				if (!name) return; // need to update value when name is empty
				return getUrlString(name);
			});
		},
		updateMetaDescription: (
			[description]: [description: string],
			state: MutableState<CategoryFormValues>,
			tools: Tools<CategoryFormValues>
		) => {
			if (state.fields['metaDescription']?.modified) return;
			tools.changeValue(state, 'metaDescription', () => {
				if (!description) return; // need to update value when description is empty
				return sanitizeHtml(description, SANITIZE_HTML_OPTIONS).substring(
					0,
					META_MAX_LENGTH
				);
			});
		},
		updateFormWithApiError: (
			[apiError]: [apiError: string],
			state: MutableState<CategoryFormValues>
		) => {
			state.formState.submitErrors = {
				...state.formState.submitErrors,
				url: apiError,
			};
			state.fields.url.blur();
		},
	};

	const handleOnSubmit = (
		formValues: CategoryFormValues,
		form: FormApi<CategoryFormValues>
	) => {
		if (isCreateCategory) {
			CategoryService.addCategory({
				userLoginHash: authenticationContext.vinistoUser.loginHash,
				...formValues,
				metaDescription: sanitizeHtml(
					formValues.metaDescription,
					SANITIZE_HTML_OPTIONS
				),
				keywords: parseCsvToArray(formValues?.keywords ?? ''),
			})
				.then(() => {
					modalContext.handleCloseModal();
					notificationsContext.handleShowSuccessNotification(
						'admin.modal.category.create.success'
					);
					invoke(modalContext, 'data.resetCategoryList');
				})
				.catch((specificError: Error) => {
					if (specificError.message === OBJECT_ALREADY_EXISTS_ERROR) {
						form.mutators.updateFormWithApiError(
							'admin.modal.category.error.alreadyExists'
						);
						return;
					}
					notificationsContext.handleShowErrorNotification(
						'admin.modal.category.create.error'
					);
				});
		} else {
			CategoryService.updateTranslation(categoryId, {
				userLoginHash: authenticationContext.vinistoUser.loginHash,
				...formValues,
				keywords: parseCsvToArray(formValues?.keywords ?? ''),
			})
				.then(() => {
					modalContext.handleCloseModal();
					notificationsContext.handleShowSuccessNotification(
						isCreateTranslation
							? 'admin.modal.category.translation.add.success'
							: 'admin.modal.category.translation.edit.success'
					);
					revalidator.revalidate();
				})
				.catch((specificError: Error) => {
					if (specificError.message === OBJECT_ALREADY_EXISTS_ERROR) {
						form.mutators.updateFormWithApiError(
							'admin.modal.category.error.alreadyExists'
						);
						return;
					}
					notificationsContext.handleShowErrorNotification(
						isCreateTranslation
							? 'admin.modal.category.translation.add.error'
							: 'admin.modal.category.translation.edit.error'
					);
				});
		}
	};

	return (
		<Form<CategoryFormValues>
			onSubmit={handleOnSubmit}
			initialValues={{
				language:
					Array.isArray(languageOptions) && languageOptions.length > 0
						? languageOptions[0].value
						: activeLanguageKey,
				...(isCreateCategory ? { type: ProductSelectionType.STATIC } : {}),
				...(isCreateCategory
					? { bundleDiscountFilter: CategoryBundleDiscountFilter.ALL }
					: {}),
				...translationData,
				keywords: modalData?.keywords?.join(', '),
			}}
			mutators={categoryMutators}
			render={({ handleSubmit, form, pristine, valid, submitting }) => {
				return (
					<CContainer>
						<CForm onSubmit={handleSubmit}>
							<LanguageSelect
								name="language"
								identifier="language"
								label="admin.modal.form.language"
								validate={Validators.required}
								languages={languageOptions}
								disabled={translationData !== undefined}
							/>
							<Input
								name="name"
								identifier="name"
								label="admin.modal.category.name"
								validate={Validators.required}
								onChange={
									isCreateTranslation ? handleOnNameChange(form) : undefined
								}
							/>
							<Input
								name="url"
								identifier="url"
								label="admin.modal.form.url"
								validate={Validators.required}
							/>
							<CFormLabel htmlFor="keywords">
								{t({ id: 'admin.modal.category.keywords.prompt' })}
							</CFormLabel>
							<InputTextArea
								name="keywords"
								identifier="keywords"
								label="admin.modal.category.keywords"
							/>
							<InputTextArea
								name="metaTitle"
								identifier="metaTitle"
								label="admin.modal.category.metaTitle"
							/>
							<InputTextArea
								name="metaDescription"
								identifier="metaDescription"
								label="admin.modal.category.meta"
								maxLength={META_MAX_LENGTH}
							/>
							<InputTextArea
								name="description"
								identifier="description"
								label="admin.modal.category.description"
								validate={Validators.required}
								onChange={
									isCreateTranslation
										? handleOnDescriptionChange(form)
										: undefined
								}
							/>
							{isCreateCategory && (
								<>
									<InputSelect
										name="type"
										identifier="type"
										label="admin.modal.category.productSelectionType.label"
										options={[
											{
												value: ProductSelectionType.STATIC,
												label: `${t({
													id: 'admin.modal.category.productSelectionType.static',
												})}`,
											},
											{
												value: ProductSelectionType.DYNAMIC,
												label: `${t({
													id: 'admin.modal.category.productSelectionType.dynamic',
												})}`,
											},
										]}
										validate={Validators.required}
									/>
									<InputSelect
										name="bundleDiscountFilter"
										identifier="bundleDiscountFilter"
										label="admin.category.bundleDiscountFilter.label"
										options={[
											{
												value: String(CategoryBundleDiscountFilter.ALL),
												label: `${t({
													id: 'admin.category.bundleDiscountFilter.all',
												})}`,
											},
											{
												value: String(
													CategoryBundleDiscountFilter.DISCOUNTED_ONLY
												),
												label: `${t({
													id: 'admin.category.bundleDiscountFilter.discountedOnly',
												})}`,
											},
											{
												value: String(
													CategoryBundleDiscountFilter.NON_DISCOUNTED_ONLY
												),
												label: `${t({
													id: 'admin.category.bundleDiscountFilter.nonDiscountedOnly',
												})}`,
											},
										]}
										validate={Validators.required}
									/>
								</>
							)}
							<div className="mt-3">
								<SubmitButton
									valid={valid}
									pristine={pristine}
									submitting={submitting}
									submitText={
										modalData.submitButtonLabel ??
										'admin.modal.category.create.submit'
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

export default CategoryModal;
