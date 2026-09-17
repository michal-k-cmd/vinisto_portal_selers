import { CCol, CContainer, CForm, CRow } from '@coreui/react';
import { FC, useContext } from 'react';
import { Form } from 'react-final-form';
import SubmitButton from 'Components/Form/Components/Submit';
import useFileUpload from 'Hooks/useFileUpload';
import { ModalContext } from 'Components/Modal/context';
import { NotificationsContext } from 'Services/NotificationService';
import { AuthenticationContext } from 'Services/AuthenticationService/context';
import { StockingRequestService } from 'Services/SupplierService/StockingRequest';

import { ALLOWED_FILE_TYPES } from '../CompleteReceipt/FileUpload/constants';
import FileUpload from '../CompleteReceipt/FileUpload';

import { UploadReceiptForClosedRequestModalData } from './interfaces';

const UploadReceiptForClosedRequestModal: FC = () => {
	const notificationsContext = useContext(NotificationsContext);
	const {
		vinistoUser: { loginHash },
	} = useContext(AuthenticationContext);
	const { data, handleCloseModal } = useContext(ModalContext);

	const { stockRequestId, setRefetchKey } =
		data as UploadReceiptForClosedRequestModalData;

	const { handleOnUpload, fileInputRef, imageError, selectedFile } =
		useFileUpload(ALLOWED_FILE_TYPES);

	const handleSubmit = () => {
		StockingRequestService.uploadReceiptToClosedRequest(
			stockRequestId,
			{ receiptFile: selectedFile },
			loginHash
		)
			.then(() => {
				notificationsContext.handleShowSuccessNotification(
					'admin.modal.uploadReceiptForClosedRequest.submitSuccess'
				);
				handleCloseModal();
				setRefetchKey((prev: number) => prev + 1);
			})
			.catch(() => {
				notificationsContext.handleShowErrorNotification(
					'admin.modal.uploadReceiptForClosedRequest.submitError'
				);
			});
	};

	return (
		<Form
			onSubmit={handleSubmit}
			render={({ handleSubmit, submitting, pristine, valid }) => {
				return (
					<CContainer className="complete-receipt-modal__container">
						<CRow className="justify-content-center">
							<CCol
								md={6}
								className="admin-form-col"
							>
								<CForm
									onSubmit={handleSubmit}
									className="complete-receipt-modal__container--render-form"
								>
									<div className="complete-receipt-modal__container--render-form--file-upload">
										<FileUpload
											name="file"
											handleOnUpload={handleOnUpload}
											fileInputRef={fileInputRef}
											selectedFile={selectedFile}
											allowedTypes={ALLOWED_FILE_TYPES}
											fileError={imageError}
										/>
									</div>
									<SubmitButton
										isBackButton
										valid={valid}
										pristine={pristine}
										submitting={submitting}
										submitText="admin.modal.uploadReceiptForClosedRequest.submitButtonText"
									/>
								</CForm>
							</CCol>
						</CRow>
					</CContainer>
				);
			}}
		/>
	);
};

export default UploadReceiptForClosedRequestModal;
