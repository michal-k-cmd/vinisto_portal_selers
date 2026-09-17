import { FC, useCallback, useContext, useEffect, useRef } from 'react';
import { Modal, ModalProps } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
import usePrevious from 'Hooks/usePrevious';
import { LocalizationContext } from 'Services/LocalizationService';
import { CloseIcon } from 'Components/Icons';
import useOnClickOutside from 'Hooks/useOnClickOutside';

import { ModalContext } from './context';
import { MODAL_CONFIGURATION } from './constants';

import './styles.css';

/**
 * @deprecated use VinistoAdminModal instead. This singleton context-accessible modal should be removed.
 */
const ModalComponent: FC = () => {
	const { handleCloseModal, isOpened, modalType } = useContext(ModalContext);
	const { useFormatMessage } = useContext(LocalizationContext);

	const t = useFormatMessage();
	const { pathname: currentPathName } = useLocation();

	const previousPathName: string = usePrevious(currentPathName);

	const handleOnCloseModal = useCallback(() => {
		if (handleCloseModal && isOpened) {
			handleCloseModal();
		}
	}, [handleCloseModal, isOpened]);

	useEffect(() => {
		if (currentPathName !== previousPathName && isOpened) {
			handleCloseModal();
		}
	}, [isOpened, handleCloseModal, currentPathName, previousPathName]);

	if (!modalType) {
		return <></>;
	}

	const [modalTitleLocalization, ModalContentComponent, modalConfig] =
		MODAL_CONFIGURATION[modalType];

	return (
		<Modal
			show={isOpened}
			onHide={handleOnCloseModal}
			{...modalConfig}
		>
			<Modal.Body>
				<div className="vinisto-popup__heading-wrap">
					<h2 className="vinisto-popup__heading">
						{modalTitleLocalization ? t({ id: modalTitleLocalization }) : ''}
					</h2>
					<div
						className="vinisto-popup__close"
						onClick={handleOnCloseModal}
					>
						<CloseIcon />
					</div>
				</div>
				<ModalContentComponent />
			</Modal.Body>
		</Modal>
	);
};

export default ModalComponent;

interface VinistoAdminModalProps extends ModalProps {
	handleClose: () => void;
	title?: React.ReactNode;
	children?: React.ReactNode;
	isEscapable?: boolean;
}

const VinistoAdminModal = ({
	isEscapable = true,
	show,
	title,
	children,
	handleClose,
	...rest
}: VinistoAdminModalProps) => {
	const modalBodyRef = useRef<HTMLDivElement>(null);
	useOnClickOutside([modalBodyRef], () => {
		if (isEscapable) handleClose();
	});

	return (
		<Modal
			show={show}
			{...rest}
			enforceFocus={false}
		>
			<Modal.Body ref={modalBodyRef}>
				<div className="vinisto-popup__heading-wrap">
					<h2 className="vinisto-popup__heading">{title ?? ''}</h2>
					{isEscapable && (
						<div
							className="vinisto-popup__close"
							onClick={handleClose}
						>
							<CloseIcon />
						</div>
					)}
				</div>
				{children}
			</Modal.Body>
		</Modal>
	);
};

export { VinistoAdminModal as Modal };
