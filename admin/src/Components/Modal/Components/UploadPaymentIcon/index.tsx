import { FC, useCallback, useContext } from 'react';
import useImageUpload from 'Hooks/useImageUpload';
import { apiServiceInstance } from 'Services/ApiService';
import { ModalContext } from 'Components/Modal/context';
import { AuthenticationContext } from 'Services/AuthenticationService/context';
import { NotificationsContext } from 'Services/NotificationService';
import { Form } from 'Components/Form';
import UploadImagePreview from 'Components/UploadImagePreview';

import { allowedExtensions } from './constants';

/**
 * @category Component Upload Supplier Logo Modal Content
 */
const UploadPaymentIconModal: FC = () => {
	const modalContext = useContext(ModalContext);
	const authenticationContext = useContext(AuthenticationContext);
	const notificationsContext = useContext(NotificationsContext);

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

		const itemId =
			modalContext.data?.paymentDetailState.paymentDetailData.id ?? null;

		if (itemId === null) {
			return;
		}
		apiServiceInstance
			.upload(
				`image-api/images?UserLoginHash=${authenticationContext.vinistoUser.loginHash}&ItemType=Payment&ItemId=${itemId}&IsMain=true&RemoveBackground=false&AddBackground=false`,
				formData,
				true
			)
			.then(() => {
				const setPaymentDetailState =
					modalContext.data?.setPaymentDetailState ?? (() => null);
				setPaymentDetailState((paymentDetailState: Record<any, any>) => ({
					...paymentDetailState,
					loaded: false,
					loading: false,
				}));
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
	}, [selectedImage, modalContext]);

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
export default UploadPaymentIconModal;
