import { useCallback, useContext, useEffect } from 'react';
import { get } from 'Helpers/lodash';
import { Modal, ModalProps } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
import { LocalizationContext } from 'Services/LocalizationService';
import useKeyPress from 'Hooks/useKeyPress';
import usePrevious from 'Hooks/usePrevious';

import { MODAL_TITLE_COMPONENT } from './constants';
import { ModalContext } from './context';
import { getModalConfigByType } from './helpers';
import ModalCloseIcon from './Components/ModalCloseIcon';

import './styles.css';

/**
 * @deprecated use VinistoAdminModal instead. This singleton context-accessible modal should be removed.
 */
const ModalComponent = () => {
	const location = useLocation();
	const currentPathName: string = get(location, 'pathname', '');
	const previousPathName: string = usePrevious(currentPathName);
	const modalContext = useContext(ModalContext);
	const { handleCloseModal, isOpened, modalType, isEscapable } = modalContext;
	const localizationContext = useContext(LocalizationContext);
	const t = localizationContext.useFormatMessage();

	const isEscPressed = useKeyPress('Escape', isEscapable);

	const handleOnCloseModal = useCallback(() => {
		if (handleCloseModal && isOpened) {
			handleCloseModal();
		}
	}, [modalContext]);

	useEffect(() => {
		if (currentPathName !== previousPathName && isOpened) {
			handleCloseModal();
		}
	}, [modalContext, currentPathName, previousPathName]);

	useEffect(() => {
		if (isEscPressed && isEscapable) {
			handleOnCloseModal();
		}
	}, [isEscPressed, handleOnCloseModal]);

	if (!modalType) {
		return <></>;
	}

	const [modalTitleLocalization, ModalContentComponent] =
		MODAL_TITLE_COMPONENT[modalType];
	const modalConfig = getModalConfigByType(modalType);

	return (
		<Modal
			show={isOpened}
			{...modalConfig}
			enforceFocus={false}
		>
			<Modal.Body>
				<div className="vinisto-popup__heading-wrap">
					<h2 className="vinisto-popup__heading">
						{modalTitleLocalization ? t({ id: modalTitleLocalization }) : ''}
					</h2>
					{isEscapable && (
						<div
							className="vinisto-popup__close"
							onClick={handleOnCloseModal}
						>
							<ModalCloseIcon />
						</div>
					)}
				</div>
				<br />
				{!!ModalContentComponent && <ModalContentComponent />}
			</Modal.Body>
		</Modal>
	);
};

export default ModalComponent;

interface VinistoAdminModalProps extends ModalProps {
	handleClose: () => void;
	title?: string;
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
	return (
		<Modal
			show={show}
			{...rest}
			enforceFocus={false}
		>
			<Modal.Body>
				<div className="vinisto-popup__heading-wrap">
					<h2 className="vinisto-popup__heading">{title ? title : ''}</h2>
					{isEscapable && (
						<div
							className="vinisto-popup__close"
							onClick={handleClose}
						>
							<ModalCloseIcon />
						</div>
					)}
				</div>
				<br />
				{children}
			</Modal.Body>
		</Modal>
	);
};

export { VinistoAdminModal as Modal };
