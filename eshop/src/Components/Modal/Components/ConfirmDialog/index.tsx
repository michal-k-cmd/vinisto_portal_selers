import * as React from 'react';
import { get } from 'lodash-es';
import { ModalContext } from 'Components/Modal/context';
import { LocalizationContext } from 'Services/LocalizationService';

import './styles.css';

/**
 * @category Component Confirm Dialog Content
 */
const ConfirmDialog: React.FunctionComponent = (): JSX.Element => {
	const localizationContext = React.useContext(LocalizationContext);
	const modalContext = React.useContext(ModalContext);
	const t = localizationContext.useFormatMessage();

	const { handleCloseModal } = modalContext;
	const onConfirm = get(modalContext, 'modalData.onConfirm', () => {});
	const onReject = get(modalContext, 'modalData.onReject', () => {});
	const text = get(modalContext, 'modalData.text');

	const handleOnConfirm = React.useCallback(() => {
		onConfirm();
		handleCloseModal();
	}, [onConfirm, handleCloseModal]);

	const handleOnReject = React.useCallback(() => {
		onReject();
		handleCloseModal();
	}, [onReject, handleCloseModal]);

	return (
		<>
			{text && <p>{t({ id: text })}</p>}
			<div className="vinisto-confirm-dialog__footer">
				<button
					className="vinisto-btn vinisto-popup__btn"
					onClick={handleOnConfirm}
					type="button"
				>
					{t({ id: 'modal.confirmDialog.button.yes' })}
				</button>
				<button
					className="vinisto-btn vinisto-popup__btn"
					onClick={handleOnReject}
					type="button"
				>
					{t({ id: 'modal.confirmDialog.button.no' })}
				</button>
			</div>
		</>
	);
};

export default ConfirmDialog;
