import cx from 'classnames';
import { IoAlertCircle } from 'react-icons/io5';
import { ReactNode } from 'react';

import styles from './styles.module.css';

const CredibilityIssue = ({ children }: { children: ReactNode }) => {
	return (
		<div
			className={cx('mb-2 align-items-center', styles.credibilityWarningItem)}
		>
			<IoAlertCircle
				className="me-1"
				style={{ width: '1.25em', height: 'auto' }}
			/>
			<span className={styles.credibilityWarningText}>{children}</span>
		</div>
	);
};

export default CredibilityIssue;
