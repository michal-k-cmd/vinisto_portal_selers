import * as React from 'react';
import { LocalizationContext } from 'Services/LocalizationService';

import { ModalContext } from '../../context';

/**
 * @category Component Forgotten Password Confirmation Modal Content
 */
const ForgottenConfirmModal: React.FunctionComponent = (): JSX.Element => {
	const modalContext = React.useContext(ModalContext);
	const localizationContext = React.useContext(LocalizationContext);
	const t = localizationContext.useFormatMessage();

	const handleOnCloseForgottenConfirmModal = React.useCallback(() => {
		modalContext.handleCloseModal();
	}, [modalContext]);

	return (
		<div>
			<div>{t({ id: 'modal.forgottenPasswordConfirm.infoMessage' })}</div>
			<br />
			<button
				className="vinisto-btn vinisto-bg vinisto-popup__btn"
				onClick={handleOnCloseForgottenConfirmModal}
				type="button"
				style={{
					cursor: 'pointer',
				}}
			>
				{t({ id: 'modal.forgottenPasswordConfirm.button' })}
			</button>
		</div>
	);
};

export default ForgottenConfirmModal;
