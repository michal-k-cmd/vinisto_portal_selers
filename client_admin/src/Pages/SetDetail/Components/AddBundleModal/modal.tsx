import { Modal } from 'Components/Modal';
import { LocalizationContext } from 'Services/LocalizationService';
import { useContext } from 'react';

import styles from './styles.module.css';

interface AddBundleModalProps {
	handleClose: () => void;
	isOpen: boolean;
	children: React.ReactNode;
}

const AddBundleModal = ({
	handleClose,
	isOpen,
	children,
}: AddBundleModalProps) => {
	const t = useContext(LocalizationContext).useFormatMessage();

	return (
		<Modal
			handleClose={handleClose}
			show={isOpen}
			title={t({
				id: 'set.detail.modal.addBundle.title',
				defaultMessage: 'Zalistované produkty',
			})}
			onEscapeKeyDown={handleClose}
			dialogClassName={styles.modalDialog}
		>
			{children}
		</Modal>
	);
};

export default AddBundleModal;
