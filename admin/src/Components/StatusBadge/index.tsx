import { HTMLProps, ReactNode } from 'react';
import cx from 'classnames';

import styles from './styles.module.css';

import { VinistoHelperDllEnumsUserUserState } from '@/api-types/user-api';

interface Props extends HTMLProps<HTMLDivElement> {
	children: ReactNode;
	status: VinistoHelperDllEnumsUserUserState;
	className?: string;
}

const StatusBadge = ({ children, status, className }: Props) => {
	return (
		<div className={cx(styles.badge, styles[status], className && className)}>
			{children}
		</div>
	);
};

export default StatusBadge;
