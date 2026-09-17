import { FC, useContext } from 'react';
import { CCol, CContainer, CRow } from '@coreui/react';
import { Button } from 'react-bootstrap';
import { ModalContext } from 'Components/Modal/context';
import { LocalizationContext } from 'Services/LocalizationService';
import useChat from 'Hooks/useChat';

const BillingInfoModal: FC = () => {
	const { useFormatMessage } = useContext(LocalizationContext);
	const { handleCloseModal } = useContext(ModalContext);

	const t = useFormatMessage();
	const { openChat } = useChat();

	const startChat = () => {
		openChat();
		handleCloseModal();
	};

	return (
		<CContainer>
			<CRow className="mb-4">
				{t({ id: 'modal.billing.billingQuote.body' })}
			</CRow>
			<CRow className="d-flex justify-content-center">
				<CCol sm={4}>
					<Button onClick={handleCloseModal}>
						{t({ id: 'admin.btn.back' })}
					</Button>
				</CCol>
				<CCol sm={4}>
					<Button
						className="btn-ok"
						onClick={startChat}
					>
						{t({ id: 'chat.start' })}
					</Button>
				</CCol>
			</CRow>
		</CContainer>
	);
};

export default BillingInfoModal;
