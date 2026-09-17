import React from 'react';
import { get } from 'Helpers/lodash';
import { apiServiceInstance } from 'Services/ApiService';
import { AuthenticationContext } from 'Services/AuthenticationService/context';
import { NotificationsContext } from 'Services/NotificationService';
import { Form } from 'Components/Form';

import { ModalContext } from '../../context';

const UploadSupplierCertificateModal = () => {
	const modalContext = React.useContext(ModalContext);
	const authenticationContext = React.useContext(AuthenticationContext);
	const notificationsContext = React.useContext(NotificationsContext);
	const pdfInputRef = React.useRef<HTMLInputElement>(null);

	const { supplierData, refetch } = modalContext.data ?? {};

	const supplierId = supplierData.id;

	const handleOnSubmit = React.useCallback(() => {
		if (!pdfInputRef.current) return;
		const pdfFile = get(pdfInputRef.current, 'files[0]', null);
		if (!pdfFile)
			return notificationsContext.handleShowErrorNotification(
				'admin.modal.uploadCertificate.empty.error'
			);
		if (get(pdfFile, 'type') !== 'application/pdf')
			return notificationsContext.handleShowErrorNotification(
				'admin.modal.uploadCertificate.extension.error'
			);
		const formData = new FormData();
		formData.append('certificateFile', pdfFile);

		apiServiceInstance
			.upload(
				`supplier-api/suppliers/${supplierId}/certificate/AddSupplierCertificate?UserLoginHash=${get(
					authenticationContext,
					'vinistoUser.loginHash'
				)}`,
				formData,
				true
			)
			.then(() => {
				refetch();
				notificationsContext.handleShowSuccessNotification(
					'admin.modal.uploadCertificate.upload.success'
				);
				modalContext.handleCloseModal();
			})
			.catch(() => {
				notificationsContext.handleShowErrorNotification(
					'admin.modal.uploadCertificate.upload.error'
				);
			});
	}, [
		authenticationContext,
		modalContext,
		notificationsContext,
		refetch,
		supplierId,
	]);

	return (
		<Form
			submitCallback={handleOnSubmit}
			submitText="admin.modal.form.upload"
		>
			<input
				ref={pdfInputRef}
				className="upload-btn"
				type="file"
				accept="application/pdf"
			/>
		</Form>
	);
};
export default UploadSupplierCertificateModal;
