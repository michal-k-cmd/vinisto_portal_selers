'use client';

import { useCallback, useContext, useRef } from 'react';
import { get } from 'lodash-es';
import { Modal } from 'react-bootstrap';
import { LocalizationContext } from 'Services/LocalizationService';

import { getModalComponent, getModalTitleLocalization } from './helpers';
import { ModalContext } from './context';
import ModalCloseIcon from './Components/ModalCloseIcon';
import ModalPreloader from './Components/ModalPreloader';

import './styles.css';

const ModalComponent = () => {
	const modalContext = useContext(ModalContext);
	const { handleCloseModal, isOpened, modalConfig, setModalRef } = modalContext;
	const localizationContext = useContext(LocalizationContext);
	const t = localizationContext.useFormatMessage();

	const {
		closeOnBackdropClick,
		closeButton,
		bodyClassName,
		modalClassName,
		...modalConfigProps
	} = modalConfig;

	const ModalContentComponent = getModalComponent(modalContext.modalType);

	const isShowPreloader = get(modalContext, 'showModalPreloader', false);
	const showModal = get(modalContext, 'isOpened', false) || isShowPreloader;

	let title = get(modalContext, 'modalData.title', '');
	if (!title) {
		const titleFromConfig = getModalTitleLocalization(modalContext.modalType);
		if (titleFromConfig) title = t({ id: titleFromConfig })?.toString() ?? '';
	}
	const onCloseCallback = modalContext?.modalData?.onCloseCallback;

	const showCloseButton: boolean =
		modalContext?.modalData?.showCloseButton ?? closeButton ?? true;

	const handleOnCloseModal = useCallback(() => {
		if (handleCloseModal && isOpened) {
			handleCloseModal();
			if (typeof onCloseCallback === 'function') {
				onCloseCallback();
			}
		}
	}, [handleCloseModal, isOpened, onCloseCallback]);

	const handleOnBackdropClick = () => {
		if (closeOnBackdropClick !== true) return;
		onCloseCallback();
		handleCloseModal();
	};

	const modalRef = useRef<HTMLDivElement | null>(null);

	if (setModalRef) {
		setModalRef(modalRef);
	}

	return (
		<Modal
			show={showModal}
			onHide={handleOnBackdropClick}
			className={modalClassName}
			{...modalConfigProps}
		>
			{isShowPreloader && <ModalPreloader />}
			{get(modalContext, 'isOpened', false) && (
				<Modal.Body
					className={bodyClassName}
					ref={modalRef}
				>
					{(showCloseButton || !!title) && (
						<>
							<div className="vinisto-popup__heading-wrap">
								{!!title && <h2 className="vinisto-popup__heading">{title}</h2>}
								{showCloseButton && (
									<button
										type="button"
										className="vinisto-popup__close"
										onClick={handleOnCloseModal}
									>
										<ModalCloseIcon />
									</button>
								)}
							</div>
							<br />
						</>
					)}
					{!!ModalContentComponent && <ModalContentComponent />}
				</Modal.Body>
			)}
		</Modal>
	);
};

export default ModalComponent;
