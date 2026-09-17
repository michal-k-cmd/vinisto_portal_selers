'use client';

import ModalCloseIcon from 'Components/Modal/Components/ModalCloseIcon';
import { useRouter } from 'next/navigation';
import { Modal } from 'react-bootstrap';
import RegistrationModal from 'Components/Modal/Components/Register';
import config from 'Components/Modal/config';
import { useContext } from 'react';
import { LocalizationContext } from 'Services/LocalizationService';

const Page = () => {
	const router = useRouter();
	const t = useContext(LocalizationContext).useFormatMessage();

	const { ...modalConfigProps } = config['REGISTRATION_MODAL'];

	const handleOnCloseModal = () => {
		router.back();
	};

	return (
		<Modal
			show={true}
			onHide={() => router.back()}
			{...modalConfigProps}
		>
			<Modal.Body>
				<>
					<div className="vinisto-popup__heading-wrap">
						<h2 className="vinisto-popup__heading">
							{t({ id: 'modal.registration.modalTitle' })}
						</h2>

						<button
							type="button"
							className="vinisto-popup__close"
							onClick={handleOnCloseModal}
						>
							<ModalCloseIcon />
						</button>
					</div>
					<br />
				</>
				<RegistrationModal />
			</Modal.Body>
		</Modal>
	);
};

export default Page;
