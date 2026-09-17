import { useContext, useRef, useState } from 'react';
import cx from 'classnames';
import { ModalContext } from 'Components/Modal/context';
import { Button, buttonVariants } from 'vinisto_ui';
import CheckIcon from 'vinisto_ui/src/components/icons/check-simple';

import styles from './styles.module.css';

const BasketShareModal = () => {
	const [showConfirmText, setShowConfirmText] = useState(false);
	const modalContext = useContext(ModalContext);
	const modalData = modalContext.modalData;
	const shareUrl = modalData?.shareUrl ?? '';
	const inputRef = useRef<HTMLInputElement | null>();

	const selectInputValue = () => {
		const input = inputRef.current;
		input?.focus();
		input?.select();
	};

	return (
		<div>
			<div className={styles.basketShareWrapper}>
				<input
					className={styles.basketShareInput}
					defaultValue={shareUrl}
					ref={(element) => {
						inputRef.current = element;
					}}
					readOnly
					onBlur={() => {
						setShowConfirmText(false);
					}}
				/>
				<Button
					variant={buttonVariants.CTA}
					onClick={() => {
						navigator.clipboard.writeText(shareUrl);
						selectInputValue();
						setShowConfirmText(true);
					}}
				>
					Kopírovat
				</Button>
			</div>

			<div
				className={cx(styles.confirmMessage, showConfirmText && styles.visible)}
				aria-hidden={!showConfirmText}
			>
				<CheckIcon className={styles.confirmMessageIcon} />
				<span>Zkopírováno do schránky</span>
			</div>
		</div>
	);
};

export default BasketShareModal;
