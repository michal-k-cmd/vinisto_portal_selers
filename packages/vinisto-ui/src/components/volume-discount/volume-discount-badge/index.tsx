import { HTMLProps } from 'react';
import cx from 'classnames';

import styles from './styles.module.css';

interface VolumeDiscountBadgeProps extends HTMLProps<HTMLDivElement> {}

const VolumeDiscountBadge = ({
	children,
	className,
}: VolumeDiscountBadgeProps) => {
	return <div className={cx(styles.component, className)}>{children}</div>;
};

export default VolumeDiscountBadge;
