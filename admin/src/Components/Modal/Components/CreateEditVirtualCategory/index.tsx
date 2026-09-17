import {
	Input,
	LanguageSelect,
	RichTextEditor,
	Validators,
} from 'Components/Form';
import { ModalContext } from 'Components/Modal/context';
import { useContext } from 'react';
import { Button } from 'react-bootstrap';
import { Form } from 'react-final-form';
import { AuthenticationContext } from 'Services/AuthenticationService/context';
import { LocalizationContext } from 'Services/LocalizationService';
import useLocalizedValue from 'Hooks/useLocalizedValue';
import { useMutation } from '@tanstack/react-query';
import { NotificationsContext } from 'Services/NotificationService';

import { Mode, modes } from './constants';

import api from '@/api';
import {
	VinistoHelperDllEnumsLanguage,
	VinistoProductDllModelsApiVirtualCategoryVirtualCategoryCreateParameters,
	VinistoProductDllModelsApiVirtualCategoryVirtualCategoryReturn,
} from '@/api-types/product-api';

interface CreateEditVirtualCategoryModalData {
	mode: Mode;
	entity?: Record<any, any>;
	refetch: () => void;
}
interface CreateOrUpdateVirtualCategoryFormValues {
	group: string;
	url: string;
	titleH1: string;
	seoTitle: string;
	seoDescription: string;
	contentHtml?: string;
	userLoginHash: string;
	language: VinistoHelperDllEnumsLanguage;
}

const CreateEditVirtualCategory = () => {
	const modalContext = useContext(ModalContext);
	const { handleCloseModal } = modalContext;
	const {
		mode,
		entity = {},
		refetch,
	} = (modalContext.data as CreateEditVirtualCategoryModalData) ?? {};
	const { loginHash: userLoginHash } = useContext(
		AuthenticationContext
	).vinistoUser;
	const { activeLanguageKey } = useContext(LocalizationContext);
	const t = useContext(LocalizationContext).useFormatMessage();
	const { handleShowSuccessNotification, handleShowErrorNotification } =
		useContext(NotificationsContext);

	const getActiveLanguageValue = useLocalizedValue();

	const createVirtualCategory = (
		formValues: CreateOrUpdateVirtualCategoryFormValues
	) =>
		api.post<
			VinistoProductDllModelsApiVirtualCategoryVirtualCategoryReturn,
			VinistoProductDllModelsApiVirtualCategoryVirtualCategoryCreateParameters
		>(`product-api/virtual-categories`, undefined, {
			...formValues,
			url: formValues.url?.startsWith('/')
				? formValues.url
				: `/${formValues.url}`,
			titleH1: [{ value: formValues.titleH1, language: formValues.language }],
			seoTitle: [{ value: formValues.seoTitle, language: formValues.language }],
			seoDescription: [
				{ value: formValues.seoDescription, language: formValues.language },
			],
			contentHtml: [
				{ value: formValues.contentHtml, language: formValues.language },
			],
			userLoginHash,
		});

	const updateVirtualCategory = (
		formValues: CreateOrUpdateVirtualCategoryFormValues
	) =>
		api.put(`product-api/virtual-categories/${entity.id}`, undefined, {
			...formValues,
			url: formValues.url?.startsWith('/')
				? formValues.url
				: `/${formValues.url}`,
			titleH1: [{ value: formValues.titleH1, language: formValues.language }],
			seoTitle: [{ value: formValues.seoTitle, language: formValues.language }],
			seoDescription: [
				{ value: formValues.seoDescription, language: formValues.language },
			],
			contentHtml: [
				{ value: formValues.contentHtml, language: formValues.language },
			],
			userLoginHash,
		});

	const createVirtualCategoryMutation = useMutation({
		mutationFn: createVirtualCategory,
		onSuccess: () => {
			handleShowSuccessNotification(
				'admin.virtualCategory.create.successMessage'
			);
			refetch();
			handleCloseModal();
		},
		onError: () => {
			handleShowErrorNotification('admin.virtualCategory.create.errorMessage');
		},
	});

	const updateVirtualCategoryMutation = useMutation({
		mutationFn: updateVirtualCategory,
		onSuccess: () => {
			handleShowSuccessNotification(
				'admin.virtualCategory.edit.successMessage'
			);
			refetch();
			handleCloseModal();
		},
		onError: () => {
			handleShowErrorNotification('admin.virtualCategory.edit.errorMessage');
		},
	});

	const onSubmit = (formValues: CreateOrUpdateVirtualCategoryFormValues) => {
		if (mode === modes.CREATE)
			return createVirtualCategoryMutation.mutate(formValues);
		if (mode === modes.EDIT)
			return updateVirtualCategoryMutation.mutate(formValues);
	};

	return (
		<Form<CreateOrUpdateVirtualCategoryFormValues>
			initialValues={
				mode === modes.CREATE
					? {
							language: activeLanguageKey,
					  }
					: {
							...entity,
							language: activeLanguageKey,
							titleH1: getActiveLanguageValue(entity.titleH1),
							seoTitle: getActiveLanguageValue(entity.seoTitle),
							seoDescription: getActiveLanguageValue(entity.seoDescription),
							contentHtml: getActiveLanguageValue(entity.contentHtml),
					  }
			}
			onSubmit={onSubmit}
			render={({ handleSubmit }) => {
				return (
					<form onSubmit={handleSubmit}>
						<LanguageSelect
							name="language"
							identifier="language"
							validate={Validators.required}
							disabled
						/>
						<Input
							name="group"
							identifier="group"
							label="admin.virtualCategory.group.label"
							validate={Validators.required}
						/>
						<Input
							name="url"
							identifier="url"
							label="admin.virtualCategory.url.label"
							validate={[Validators.required, Validators.isRelativeUrl]}
						/>
						<Input
							name="titleH1"
							identifier="titleH1"
							label="admin.virtualCategory.titleH1.label"
							validate={Validators.required}
						/>
						<Input
							name="seoTitle"
							identifier="seoTitle"
							label="admin.virtualCategory.seoTitle.label"
							validate={Validators.required}
						/>
						<Input
							name="seoDescription"
							identifier="seoDescription"
							label="admin.virtualCategory.seoDescription.label"
							validate={Validators.required}
						/>

						<RichTextEditor
							name="contentHtml"
							identifier="contentHtml"
							label="admin.virtualCategory.contentHtml.label"
							validate={Validators.required}
						/>

						<Button type="submit">
							{t({
								id:
									mode === modes.CREATE
										? 'admin.virtualCategory.create.label'
										: 'admin.virtualCategory.edit.label',
							})}
						</Button>
					</form>
				);
			}}
		></Form>
	);
};

export default CreateEditVirtualCategory;
