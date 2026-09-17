import { UseMutationResult } from '@tanstack/react-query';
import { Form, Input, InputTextArea, LanguageSelect } from 'Components/Form';
import ImageUpload from 'Components/Form/Components/ImageUpload';
import { ModalContext } from 'Components/Modal/context';
import useImageUpload from 'Hooks/useImageUpload';
import {
	VinistoHelperDllEnumsLanguage,
	VinistoImageDllModelsApiImageImage,
} from 'vinisto_api_client/src/api-types/user-api/';
import { AuthenticationContext } from 'Services/AuthenticationService/context';
import { SpecificationType } from 'Services/Specification/constants';
import { useContext } from 'react';
import { TranslationMode } from 'Pages/SpecificationDetail/Components/Translations';
import ImagePreview from 'Components/ImagePreview';

import { IMAGE_FILE_TYPE } from './constants';

interface EditSpecificationModalData {
	valueName: string;
	name: string;
	description: string;
	metaDescription: string;
	key: string;
	score: number;
	specificationType: SpecificationType;
	language: VinistoHelperDllEnumsLanguage;
	editSpecificationMutation: UseMutationResult<
		Promise<any>,
		unknown,
		Partial<EditSpecificationTranslationFormValues>,
		unknown
	>;
	mode: TranslationMode;
	image: VinistoImageDllModelsApiImageImage | undefined;
}

export interface EditSpecificationTranslationFormValues {
	userLoginHash: string;
	specificationType: SpecificationType;
	valueName: string;
	name: string;
	description: string;
	metaDescription: string;
	score: number;
	language: VinistoHelperDllEnumsLanguage;
}

const EditSpecificationTranslationModal = () => {
	const { handleOnUpload, imgInputRef, selectedImage, imageError } =
		useImageUpload();

	const modalContext = useContext(ModalContext);
	const modalData = modalContext?.data as EditSpecificationModalData;
	const mode = modalData.mode;

	const authenticationContext = useContext(AuthenticationContext);

	const handleOnEditSpecificationTranslation = (
		formValues: Partial<EditSpecificationTranslationFormValues>
	) => {
		const requestData = {
			userLoginHash: authenticationContext.vinistoUser.loginHash,
			specificationType: modalData.specificationType,
			name: modalData.name,
			valueName: modalData.valueName,
			...formValues,
		};

		modalData.editSpecificationMutation.mutate(requestData);
		modalContext.handleCloseModal();
	};

	const imageToPreview =
		selectedImage || modalData?.image?.domainUrls?.thumb_80x80;

	return (
		<Form
			submitCallback={handleOnEditSpecificationTranslation}
			submitText={'admin.modal.form.editSpecification'}
			initializationValues={{
				language: modalData.language,
				name: modalData.name,
				description: modalData.description,
				metaDescription: modalData.metaDescription,
				score: modalData.score,
			}}
		>
			{mode === TranslationMode.ADD ? (
				<LanguageSelect
					name="language"
					identifier="language"
				/>
			) : (
				<Input
					type="text"
					name="language"
					identifier="language"
					label="language"
					disabled
				/>
			)}
			<Input
				type="text"
				name="name"
				identifier="name"
				label="admin.modal.form.allowedValue"
				placeholder="admin.modal.form.allowedValue"
			/>
			<InputTextArea
				name="description"
				identifier="description"
				label="admin.modal.form.allowedValue.description"
			/>
			<InputTextArea
				name="metaDescription"
				identifier="metaDescription"
				label="admin.modal.form.allowedValue.metaDescription"
			/>
			<div className="d-flex gap-3 mb-3 align-items-end">
				{imageToPreview && <ImagePreview image={imageToPreview} />}
				<div className="d-block">
					<ImageUpload
						name="image"
						handleOnUpload={handleOnUpload}
						imgInputRef={imgInputRef}
						selectedImage={selectedImage}
						allowedTypes={IMAGE_FILE_TYPE}
						imageError={imageError}
					/>
				</div>
			</div>
		</Form>
	);
};

export default EditSpecificationTranslationModal;
