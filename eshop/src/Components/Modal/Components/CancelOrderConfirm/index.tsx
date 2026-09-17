import { FC, useContext } from 'react';
import { NotificationsContext } from 'Services/NotificationService';
import { LocalizationContext } from 'Services/LocalizationService';
import Button from 'Components/Button';
import { AuthenticationContext } from 'Services/AuthenticationService/context';
import api from 'vinisto_api_client/src/api';

import { ModalContext } from '../../context';

const CancelOrderConfirm: FC = () => {
	const { handleCloseModal, modalData: order } = useContext(ModalContext);
	const authenticationContext = useContext(AuthenticationContext);
	const notificationsContext = useContext(NotificationsContext);
	const localizationContext = useContext(LocalizationContext);
	const t = localizationContext.useFormatMessage();

	const handleCancelOrder = () => {
		api
			.put(`order-api/orders/${order?.id}/StornoOrder`, undefined, {
				userLoginHash: authenticationContext?.vinistoUser?.loginHash,
			})
			.then(() => {
				window.location.reload();
				notificationsContext.handleShowSuccessNotification(
					'modal.cancelOrderConfirm.success'
				);
			})
			.catch(() => {
				notificationsContext.handleShowErrorNotification(
					'modal.cancelOrderConfirm.error'
				);
			});
	};

	return (
		<>
			<div>{t({ id: 'modal.cancelOrderConfirm.modalText' })}</div>
			<div className="d-flex flex-direction-row justify-content-around mt-4 align-items-center">
				<Button onClick={handleCloseModal}>
					{t({ id: 'modal.cancelOrderConfirm.back' })}
				</Button>
				<Button
					onClick={handleCancelOrder}
					style={{ backgroundColor: '#FF6565' }}
				>
					{t({ id: 'modal.cancelOrderConfirm.cancelOrder' })}
				</Button>
			</div>
		</>
	);
};

export default CancelOrderConfirm;
