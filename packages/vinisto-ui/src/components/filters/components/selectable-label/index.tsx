import type { HTMLAttributes, ReactNode } from 'react';
import cx from 'classnames';
import Skeleton from 'react-loading-skeleton';

import styles from './styles.module.css';

export interface SelectableOptionLabelProps
	extends Omit<HTMLAttributes<HTMLDivElement>, 'prefix'> {
	prefix?: ReactNode;
	value?: ReactNode;
	placeholder?: ReactNode;
	suffix?: ReactNode;
	isLoading?: boolean;
	order?: number;
}

const SelectableOptionLabel = ({
	prefix = '',
	value,
	placeholder = '',
	suffix = '',
	className,
	isLoading,
	order = 0,
	...props
}: SelectableOptionLabelProps) =>
	isLoading ? (
		<Skeleton
			containerClassName={cx(styles.component, 'flex-fill', className)}
			style={{ marginInlineEnd: `${order * 15}%` }}
		/>
	) : (
		<div
			{...props}
			className={cx(styles.component, className)}
		>
			{prefix && <span>{prefix}</span>}
			<span>{value ?? placeholder}</span>
			{suffix && <span className={styles.suffix}>{suffix}</span>}
		</div>
	);

export default SelectableOptionLabel;
