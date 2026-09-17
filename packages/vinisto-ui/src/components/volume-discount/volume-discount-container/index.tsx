import { HTMLProps, ReactNode } from 'react';
import cx from 'classnames';

import styles from './styles.module.css';

interface VolumeDiscountContainerProps
	extends Omit<HTMLProps<HTMLDivElement>, 'title'> {
	title: ReactNode;
	children: ReactNode;
}

const VolumeDiscountContainer = ({
	title,
	className,
	children,
}: VolumeDiscountContainerProps) => {
	return (
		<div className={cx(styles.component, className)}>
			{title}
			{children}
		</div>
	);
};

export default VolumeDiscountContainer;
