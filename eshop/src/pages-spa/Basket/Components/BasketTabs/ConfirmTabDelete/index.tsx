'use client';

import { Button, buttonVariants } from 'vinisto_ui';
import { ReactNode } from 'react';
import { MessageDescriptor } from 'react-intl';

import styles from './styles.module.css';

const ConfirmTabDelete = ({
	onClose,
	onConfirm,
	onFocusOnList,
	translationFn,
}: {
	onClose: () => void;
	onConfirm: () => void;
	onFocusOnList: () => void;
	translationFn: (props: MessageDescriptor, values?: any) => ReactNode;
}) => {
	return (
		<div className={styles.component}>
			<img
				className={styles.questionMarkIcon}
				src="/assets/images/question-mark-in-hexagon.png"
				alt=""
			/>
			<h1 className={styles.title}>
				{translationFn(
					{ id: 'basket.lists.confirmDeletion' },
					{
						emphasized: (
							<strong>
								{translationFn({
									id: 'basket.lists.confirmDeletionEmphasized',
								})}
							</strong>
						),
					}
				)}
			</h1>
			<div className={styles.buttons}>
				<Button
					variant={buttonVariants.GREEN_OUTLINE}
					onClick={onClose}
					className={styles.declineButton}
				>
					{translationFn({ id: 'modal.confirmDialog.button.no' })}
				</Button>
				<Button
					variant={buttonVariants.CTA}
					onClick={() => {
						onConfirm();
						onClose();
					}}
					className={styles.confirmButton}
				>
					{translationFn({ id: 'modal.confirmDialog.button.yes' })}
				</Button>
			</div>
			<button
				onClick={() => {
					onFocusOnList();
					onClose();
				}}
				className={styles.link}
			>
				Přejít na seznam
			</button>
		</div>
	);
};

export default ConfirmTabDelete;
