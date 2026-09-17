import { Button } from 'react-bootstrap';
import { useContext } from 'react';
import { ModalContext } from 'Components/Modal/context';
import { LocalizationContext } from 'Services/LocalizationService';
import { NotificationsContext } from 'Services/NotificationService';
import { AuthenticationContext } from 'Services/AuthenticationService/context';
import { StockingRequestService } from 'Services/SupplierService/StockingRequest';

import { RemoveBundleFromStockRequestModalData } from './interfaces';

import './styles.css';

const RemoveBundleFromStockRequestModal = () => {
	const notificationsContext = useContext(NotificationsContext);

	const { handleCloseModal, data } = useContext(ModalContext);
	const { bundleId, stockingRequestId, bundleName, setRefetchKey } =
		data as RemoveBundleFromStockRequestModalData;

	const authenticationContext = useContext(AuthenticationContext);
	const { loginHash } = authenticationContext.vinistoUser;

	const localizationContext = useContext(LocalizationContext);
	const t = localizationContext.useFormatMessage();

	const handleConfirmRemove = () => {
		StockingRequestService.modifyBundleInRequest(stockingRequestId, {
			bundleId,
			userLoginHash: loginHash,
			requestedCount: 0,
			note: '',
		}).then(() => {
			setRefetchKey?.((prev) => prev + 1);
			notificationsContext.handleShowSuccessNotification(
				'admin.removeBundleFromStockRequest.success'
			);
		});
	};

	return (
		<div>
			<p>{t({ id: 'admin.removeBundleFromStockRequest.text' })}</p>
			<div className="remove-stock-bundle-modal__content">
				<strong>{bundleName ?? ''}</strong>
				<div className="d-flex flex-row gap-2">
					<Button onClick={handleCloseModal}>
						{t({ id: 'admin.removeBundleFromStockRequest.cancel' })}
					</Button>
					<Button
						onClick={() => {
							handleConfirmRemove();
							handleCloseModal();
						}}
					>
						{t({ id: 'admin.removeBundleFromStockRequest.confirm' })}
					</Button>
				</div>
			</div>
		</div>
	);
};

export default RemoveBundleFromStockRequestModal;
