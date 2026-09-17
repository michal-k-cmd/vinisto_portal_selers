import cx from 'classnames';
import { ReactNode } from 'react';

import styles from './styles.module.css';

interface SortingTabsProps {
	children:
		| React.ReactElement<SortingTabProps>
		| React.ReactElement<SortingTabProps>[];
	className?: string;
}

interface SortingTabProps {
	label: string;
	isActive: boolean;
	onClick: () => void;
	className?: string;
	children?: ReactNode | ((label: ReactNode) => ReactNode);
}

export const SortingTabs = ({ children, className }: SortingTabsProps) => {
	return <div className={cx(styles.sorting, className)}>{children}</div>;
};

export const SortingTab = ({
	label,
	isActive,
	onClick,
	className,
	children,
}: SortingTabProps) => {
	return (
		<button
			data-content={label}
			onClick={onClick}
			className={cx(styles.sortingButton, className, {
				[styles.active]: isActive,
			})}
		>
			{typeof children === 'function' ? children(label) : label}
		</button>
	);
};
