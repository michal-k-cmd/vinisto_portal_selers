import { FC, useCallback, useContext } from 'react';
import { CForm } from '@coreui/react';
import { Form } from 'react-final-form';
import { useQueryClient } from '@tanstack/react-query';
import { invoke } from 'Helpers/lodash';
import { ModalContext } from 'Components/Modal/context';
import { AuthenticationContext } from 'Services/AuthenticationService/context';
import { LocalizationContext } from 'Services/LocalizationService';
import { NotificationsContext } from 'Services/NotificationService';
import PostTagService from 'Services/CmsService/PostTag';
import {
	Input,
	InputTextArea,
	LanguageSelect,
	SubmitButton,
	Validators,
} from 'Components/Form';
import './styles.css';
import { useRevalidator } from 'react-router-dom';
import { FormApi, MutableState, Tools } from 'final-form';
import { LANGUAGES } from 'Components/Form/Components/LanguageSelect/constants';
import sanitizeHtml from 'sanitize-html';
import getUrlString from 'Helpers/getUrlString';
import { OBJECT_ALREADY_EXISTS_ERROR } from 'Services/ApiService/constants';

import {
	CMS_TAG_META_DESCRIPTION_LIMIT,
	SANITIZE_HTML_OPTIONS,
} from './constants';
import { CmsBlogTagFormValues, CmsBlogTagModalData } from './interfaces';

/**
 * @category Component create/edit Blog Tag Modal Content
 */
const CmsBlogTagModal: FC = () => {
	const modalContext = useContext(ModalContext);
	const { activeLanguageKey } = useContext(LocalizationContext);
	const notificationsContext = useContext(NotificationsContext);
	const {
		vinistoUser: { loginHash },
	} = useContext(AuthenticationContext);

	const { create, update } = PostTagService;

	const revalidator = useRevalidator();
	const queryClient = useQueryClient();

	const modalData = modalContext.data as CmsBlogTagModalData;

	const blogTagId = modalData.blogTagId;
	const translationData = modalData.translationData;
	const existingTranslations = modalData.existingTranslations;

	const isCreateBlogTag = blogTagId === undefined;
	const isCreateBlogTagTranslation = translationData === undefined;

	const languageOptions =
		existingTranslations === undefined
			? undefined
			: LANGUAGES.filter(
					(language) => !existingTranslations.includes(language.label)
			  );

	const handleOnNameChange =
		(form: FormApi<CmsBlogTagFormValues>) => (value: string) => {
			form.mutators.updateUrl(value);
		};
	const handleOnDescriptionChange =
		(form: FormApi<CmsBlogTagFormValues>) => (value: string) => {
			form.mutators.updateMeta(value);
		};

	const blogTagMutators = {
		updateUrl: (
			[name]: [name: string],
			state: MutableState<CmsBlogTagFormValues>,
			tools: Tools<CmsBlogTagFormValues>
		) => {
			if (state.fields['url'].modified) return;
			tools.changeValue(state, 'url', () => {
				if (!name) return; // need to update value when name is empty
				return getUrlString(name);
			});
		},
		updateMeta: (
			[description]: [description: string],
			state: MutableState<CmsBlogTagFormValues>,
			tools: Tools<CmsBlogTagFormValues>
		) => {
			if (state.fields['meta'].modified) return;
			tools.changeValue(state, 'meta', () => {
				if (!description) return; // need to update value when description is empty
				return sanitizeHtml(description, SANITIZE_HTML_OPTIONS).substring(
					0,
					CMS_TAG_META_DESCRIPTION_LIMIT
				);
			});
		},
		updateFormWithApiError: (
			[apiError]: [apiError: string],
			state: MutableState<CmsBlogTagFormValues>
		) => {
			state.formState.submitErrors = {
				...state.formState.submitErrors,
				url: apiError,
			};
			state.fields.url.blur();
		},
	};

	const handleOnCreateEditBlogTag = useCallback(
		(formValues: CmsBlogTagFormValues, form: FormApi<CmsBlogTagFormValues>) => {
			if (isCreateBlogTag) {
				const requestData = {
					userLoginHash: loginHash,
					...formValues,
					metaDescription: sanitizeHtml(
						formValues.metaDescription,
						SANITIZE_HTML_OPTIONS
					),
				};
				create(requestData)
					.then(() => {
						modalContext.handleCloseModal();
						notificationsContext.handleShowSuccessNotification(
							'admin.cmsBlogTag.success'
						);
						queryClient.invalidateQueries(['cmsBlogTag']);
						invoke(modalContext, 'data.resetBundleList');
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
			} else {
				const requestData = {
					userLoginHash: loginHash,
					...formValues,
				};
				update(blogTagId, requestData)
					.then(() => {
						modalContext.handleCloseModal();
						notificationsContext.handleShowSuccessNotification(
							isCreateBlogTagTranslation
								? 'admin.cmsBlogTag.translation.add.success'
								: 'admin.cmsBlogTag.translation.edit.success'
						);
						revalidator.revalidate();
						queryClient.invalidateQueries(['cmsBlogTag']);
					})
					.catch(() => {
						notificationsContext.handleShowErrorNotification(
							isCreateBlogTagTranslation
								? 'admin.cmsBlogTag.translation.add.error'
								: 'admin.cmsBlogTag.translation.edit.error'
						);
					});
			}
		},
		[loginHash, modalContext, notificationsContext, create, update]
	);

	return (
		<Form<CmsBlogTagFormValues>
			onSubmit={handleOnCreateEditBlogTag}
			initialValues={{
				language:
					Array.isArray(languageOptions) && languageOptions.length > 0
						? languageOptions[0].value
						: activeLanguageKey,
				...translationData,
			}}
			mutators={blogTagMutators}
			render={({ handleSubmit, form, pristine, valid, submitting }) => (
				<CForm onSubmit={handleSubmit}>
					<LanguageSelect
						name="language"
						identifier="language"
						label="admin.modal.form.cmsBlogTag.language"
						languages={languageOptions}
						disabled={translationData !== undefined}
					/>
					<Input
						type="text"
						name="name"
						identifier="name"
						label="admin.modal.form.cmsBlogTag.name"
						placeholder="admin.modal.form.cmsBlogTag.name"
						validate={Validators.required}
						onChange={
							isCreateBlogTagTranslation ? handleOnNameChange(form) : undefined
						}
					/>

					<Input
						type="text"
						name="url"
						identifier="url"
						label="admin.modal.form.url"
						placeholder="admin.modal.form.url"
						validate={Validators.required}
					/>

					<Input
						type="text"
						name="metaTitle"
						identifier="metaTitle"
						label="admin.modal.form.cmsBlogTag.metaTitle"
						placeholder="admin.modal.form.cmsBlogTag.metaTitle"
						className="modal-blogtag-meta"
					/>

					<InputTextArea
						name="metaDescription"
						identifier="metaDescription"
						label="admin.modal.form.cmsBlogTag.meta"
						placeholder="admin.modal.form.cmsBlogTag.meta"
						maxLength={CMS_TAG_META_DESCRIPTION_LIMIT}
						className="modal-blogtag-meta"
					/>

					<InputTextArea
						name="description"
						identifier="description"
						label="admin.modal.form.cmsBlogTag.description"
						placeholder="admin.modal.form.cmsBlogTag.description"
						validate={Validators.required}
						onChange={
							isCreateBlogTagTranslation
								? handleOnDescriptionChange(form)
								: undefined
						}
					/>

					<div className="mt-3">
						<SubmitButton
							valid={valid}
							pristine={pristine}
							submitting={submitting}
							submitText={
								modalData.submitButtonLabel ?? 'admin.modal.createTag'
							}
						/>
					</div>
				</CForm>
			)}
		/>
	);
};
export default CmsBlogTagModal;
