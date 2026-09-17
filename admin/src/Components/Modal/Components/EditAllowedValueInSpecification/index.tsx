import { useContext } from 'react';
import { ModalContext } from 'Components/Modal/context';
import { AuthenticationContext } from 'Services/AuthenticationService/context';
import { LocalizationContext } from 'Services/LocalizationService';
import {
	Form,
	Input,
	InputNumber,
	InputTextArea,
	LanguageSelect,
} from 'Components/Form';
import { UseMutationResult } from '@tanstack/react-query';
import { SpecificationType } from 'Services/Specification/constants';
import useImageUpload from 'Hooks/useImageUpload';
import ImageUpload from 'Components/Form/Components/ImageUpload';
import { VinistoImageDllModelsApiImageImage } from 'vinisto_api_client/src/api-types/user-api/';
import { VinistoImageDllModelsApiImageSvgImage } from 'vinisto_api_client/src/api-types/image-api/';
import ImagePreview from 'Components/ImagePreview';

import { ICON_FILE_TYPE, IMAGE_FILE_TYPE } from './constants';

interface EditSpecificationValueModalData {
	valueName: string;
	name: string;
	description: string;
	metaDescription: string;
	key: string;
	score: number;
	specificationType: SpecificationType;
	editSpecificationValueMutation: UseMutationResult<
		Promise<any>,
		unknown,
		Partial<EditComboBoxSpecificationAllowedValuesFormValues>,
		unknown
	>;
	images: VinistoImageDllModelsApiImageImage[] | undefined;
	icons: VinistoImageDllModelsApiImageSvgImage[] | undefined;
}

export interface EditComboBoxSpecificationAllowedValuesFormValues {
	userLoginHash: string;
	specificationType: SpecificationType;
	valueName: string;
	name: string;
	description: string;
	metaDescription: string;
	score: number;
}

const EditAllowedValueInSpecification = () => {
	const { handleOnUpload, imgInputRef, selectedImage, imageError } =
		useImageUpload();

	const {
		handleOnUpload: handleOnUploadIcon,
		imgInputRef: iconInputRef,
		selectedImage: selectedIcon,
		imageError: iconError,
	} = useImageUpload(ICON_FILE_TYPE);

	const modalContext = useContext(ModalContext);
	const modalData = modalContext?.data as EditSpecificationValueModalData;

	const authenticationContext = useContext(AuthenticationContext);
	const localizationContext = useContext(LocalizationContext);

	const handleOnEditSpecification = (
		formValues: Partial<EditComboBoxSpecificationAllowedValuesFormValues>
	) => {
		const requestData = {
			userLoginHash: authenticationContext.vinistoUser.loginHash,
			specificationType: modalData.specificationType,
			name: modalData.name,
			valueName: modalData.valueName,
			...formValues,
		};

		modalData.editSpecificationValueMutation.mutate(requestData);
		modalContext.handleCloseModal();
	};

	const imageToPreview =
		selectedImage || modalData?.images?.[0]?.domainUrls?.thumb_80x80;

	const iconToPreview = selectedIcon || modalData.icons?.[0]?.url;

	return (
		<Form
			submitCallback={handleOnEditSpecification}
			submitText={'admin.modal.form.editSpecification'}
			initializationValues={{
				language: localizationContext.activeLanguageKey,
				name: modalData.name,
				description: modalData.description,
				metaDescription: modalData.metaDescription,
				score: modalData.score,
			}}
		>
			<LanguageSelect
				name="language"
				identifier="language"
				disabled
			/>
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
			<InputNumber
				name="score"
				identifier="score"
				label="admin.modal.form.allowedValue.score"
			/>
			<div className="d-flex gap-3 mb-3 align-items-end">
				{iconToPreview && <ImagePreview image={iconToPreview} />}
				<div className="d-block">
					<ImageUpload
						name="icon"
						handleOnUpload={handleOnUploadIcon}
						imgInputRef={iconInputRef}
						selectedImage={selectedIcon}
						allowedTypes={ICON_FILE_TYPE}
						imageError={iconError}
						label={'admin.modal.banner.icon.label'}
						selectLabel={'admin.modal.banner.icon.select'}
						changeLabel={'admin.modal.banner.icon.change'}
					/>
				</div>
			</div>

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
export default EditAllowedValueInSpecification;
