import Dropzone, { Document } from 'vinisto_ui/src/components/dropzone';
import { OrderService } from 'vinisto_api_client';
import { useContext } from 'react';
import { AuthenticationContext } from 'Services/AuthenticationService/context';
import { NotificationsContext } from 'Services/NotificationService';

type OrderDetailProps = {
	orderId: string;
	onSubmit: () => void;
};

const DocumentUpload = ({ orderId, onSubmit }: OrderDetailProps) => {
	const { loginHash } = useContext(AuthenticationContext).vinistoUser;
	const { handleShowErrorNotification } = useContext(NotificationsContext);

	const handleSubmit = (files: Document[]) => {
		OrderService.uploadOrderDocuments(
			{
				orderId,
				UserLoginHash: loginHash,
			},
			{
				documents: files,
			}
		)
			.then(() => {
				onSubmit();
			})
			.catch(() => {
				handleShowErrorNotification('orderDetail.uploadDocument.error');
			});
	};

	return (
		<div>
			<Dropzone onSubmit={handleSubmit} />
		</div>
	);
};

export default DocumentUpload;
