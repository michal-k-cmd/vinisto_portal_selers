import { type ButtonHTMLAttributes, type ReactNode } from 'react';
import cx from 'classnames';

import CloseIcon from '../../../icons/Close';

import styles from './styles.module.css';

interface ResetButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	children: ReactNode;
}

const ResetButton = ({ onClick, className, children }: ResetButtonProps) => {
	return (
		<button
			onClick={onClick}
			className={cx('underline-effect', styles.component, className)}
		>
			<span>
				<CloseIcon className={styles.closeIcon} />
				{children}
			</span>
		</button>
	);
};

export default ResetButton;
