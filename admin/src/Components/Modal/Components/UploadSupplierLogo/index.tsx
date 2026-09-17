import { useCallback, useContext } from 'react';
import useImageUpload from 'Hooks/useImageUpload';
import { apiServiceInstance } from 'Services/ApiService';
import { ModalContext } from 'Components/Modal/context';
import { AuthenticationContext } from 'Services/AuthenticationService/context';
import { NotificationsContext } from 'Services/NotificationService';
import { Form } from 'Components/Form';
import UploadImagePreview from 'Components/UploadImagePreview';

import { allowedExtensions } from './constants';

const UploadSupplierLogoModal = () => {
	const modalContext = useContext(ModalContext);
	const authenticationContext = useContext(AuthenticationContext);
	const notificationsContext = useContext(NotificationsContext);

	const { supplierData, refetch } = modalContext.data ?? {};

	const {
		handleOnUpload,
		imgInputRef,
		imgPreviewRef,
		selectedImage,
		imageError,
	} = useImageUpload(allowedExtensions);

	const handleOnSubmit = useCallback(() => {
		if (!selectedImage)
			return notificationsContext.handleShowErrorNotification(
				'admin.modal.uploadImage.imageEmpty.error'
			);

		const formData = new FormData();
		formData.append('imageFile', selectedImage);

		const itemId = supplierData.id;

		apiServiceInstance
			.upload(
				`image-api/images?UserLoginHash=${authenticationContext?.vinistoUser?.loginHash}&ItemType=Supplier&ItemId=${itemId}&IsMain=true&RemoveBackground=false&AddBackground=false`,
				formData,
				true
			)
			.then(() => {
				refetch();
				notificationsContext.handleShowSuccessNotification(
					'admin.modal.uploadImage.upload.success'
				);
				modalContext.handleCloseModal();
			})
			.catch(() => {
				notificationsContext.handleShowErrorNotification(
					'admin.modal.uploadImage.upload.error'
				);
			});
	}, [
		selectedImage,
		notificationsContext,
		supplierData.id,
		authenticationContext?.vinistoUser?.loginHash,
		refetch,
		modalContext,
	]);

	return (
		<Form
			submitCallback={handleOnSubmit}
			submitText="admin.modal.form.upload"
		>
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
export default UploadSupplierLogoModal;
