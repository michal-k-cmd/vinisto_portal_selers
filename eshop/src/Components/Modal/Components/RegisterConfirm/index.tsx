import * as React from 'react';
import { LocalizationContext } from 'Services/LocalizationService';

import { ModalContext } from '../../context';

/**
 * @category Component Registration Confirmation Modal Content
 */
const RegistrationConfirmModal: React.FunctionComponent = (): JSX.Element => {
	const modalContext = React.useContext(ModalContext);
	const localizationContext = React.useContext(LocalizationContext);
	const t = localizationContext.useFormatMessage();

	const handleOnCloseRegisterConfirmModal = React.useCallback(() => {
		modalContext.handleCloseModal();
	}, [modalContext]);

	return (
		<div>
			<div>{t({ id: 'modal.registrationConfirm.infoMessage' })}</div>
			<br />
			<button
				className="vinisto-btn vinisto-popup__btn"
				onClick={handleOnCloseRegisterConfirmModal}
				type="button"
				style={{
					cursor: 'pointer',
				}}
			>
				{t({ id: 'modal.registrationConfirm.button' })}
			</button>
		</div>
	);
};

export default RegistrationConfirmModal;
