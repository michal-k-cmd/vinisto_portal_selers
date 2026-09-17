import { useContext } from 'react';
import { get } from 'Helpers/lodash';
import { useRevalidator } from 'react-router-dom';
import {
	ADD_IMAGE_TO_BUNDLE,
	ADD_IMAGE_TO_CATEGORY,
	ADD_IMAGE_TO_PRODUCT,
} from 'Components/Modal/constants';
import useImageUpload from 'Hooks/useImageUpload';
import { apiServiceInstance } from 'Services/ApiService';
import { ModalContext } from 'Components/Modal/context';
import { AuthenticationContext } from 'Services/AuthenticationService/context';
import { NotificationsContext } from 'Services/NotificationService';
import { Form, InputCheckBox } from 'Components/Form';
import UploadImagePreview from 'Components/UploadImagePreview';
import { useQueryClient } from '@tanstack/react-query';
import { bundleQueryKeys } from 'Hooks/Queries/useBundleById';

import {
	allowedExtensions,
	ITEM_TYPE_BUNDLE,
	ITEM_TYPE_CATEGORY,
	ITEM_TYPE_PRODUCT,
} from './constants';

const UploadImageModal = () => {
	const queryClient = useQueryClient();
	const authenticationContext = useContext(AuthenticationContext);
	const modalContext = useContext(ModalContext);
	const notificationsContext = useContext(NotificationsContext);

	const revalidator = useRevalidator();

	const {
		handleOnUpload,
		imgInputRef,
		imgPreviewRef,
		selectedImage,
		imageError,
	} = useImageUpload(allowedExtensions);

	const handleOnSubmit = (formValues: Record<string, any>) => {
		if (!selectedImage)
			return notificationsContext.handleShowErrorNotification(
				'admin.modal.uploadImage.imageEmpty.error'
			);

		let itemType = '';
		let itemId = '';

		if (modalContext.modalType === ADD_IMAGE_TO_BUNDLE) {
			itemType = ITEM_TYPE_BUNDLE;
			itemId = modalContext.data?.bundle?.id;
		} else if (modalContext.modalType === ADD_IMAGE_TO_PRODUCT) {
			itemType = ITEM_TYPE_PRODUCT;
			itemId = modalContext.data?.product?.id;
		} else if (modalContext.modalType === ADD_IMAGE_TO_CATEGORY) {
			itemType = ITEM_TYPE_CATEGORY;
			itemId = modalContext.data?.category.id;
		}

		const formData = new FormData();
		formData.append('imageFile', selectedImage);

		const isMain = formValues.isMain ?? false;
		const removeBackground = formValues.removeBackground ?? false;
		const addBackground = formValues.addBackground ?? false;

		apiServiceInstance
			.upload(
				`image-api/images?UserLoginHash=${authenticationContext?.vinistoUser?.loginHash}&ItemType=${itemType}&ItemId=${itemId}&IsMain=${isMain}&RemoveBackground=${removeBackground}&AddBackground=${addBackground}`,
				formData,
				true
			)
			.then((payload) => {
				if (get(payload, 'data.isError')) throw new Error();
				notificationsContext.handleShowSuccessNotification(
					'admin.modal.uploadImage.upload.success'
				);
				if (modalContext.modalType === ADD_IMAGE_TO_BUNDLE) {
					const bundleId = modalContext.data?.bundle?.id;
					if (bundleId) {
						queryClient.invalidateQueries(bundleQueryKeys.byId(bundleId));
					}
				} else if (modalContext.modalType === ADD_IMAGE_TO_PRODUCT) {
					queryClient.invalidateQueries([
						'productDetail',
						modalContext.data?.product.id,
					]);
				} else if (modalContext.modalType === ADD_IMAGE_TO_CATEGORY) {
					revalidator.revalidate();
				}
				modalContext.handleCloseModal();
			})
			.catch(() => {
				notificationsContext.handleShowErrorNotification(
					'admin.modal.uploadImage.upload.error'
				);
			});
	};

	return (
		<Form
			submitCallback={handleOnSubmit}
			submitText="admin.modal.form.upload"
			initializationValues={{
				isMain: false,
				removeBackground: false,
				addBackground: false,
			}}
		>
			<InputCheckBox
				name="isMain"
				identifier="isMain"
				label="admin.modal.uploadImage.form.isMain"
			/>
			<div className="row">
				<InputCheckBox
					className="col"
					name="removeBackground"
					identifier="removeBackground"
					label="admin.modal.uploadImage.form.removeBackground"
				/>
				<InputCheckBox
					className="col"
					name="addBackground"
					identifier="addBackground"
					label="admin.modal.uploadImage.form.addBackground"
				/>
			</div>
			<UploadImagePreview
				{...{
					allowedExtensions,
					handleOnUpload,
					imgInputRef,
					imgPreviewRef,
					selectedImage,
					imageError,
				}}
			/>
		</Form>
	);
};
export default UploadImageModal;
