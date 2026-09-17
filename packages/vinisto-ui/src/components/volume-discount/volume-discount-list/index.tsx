import { HTMLProps } from 'react';
import cx from 'classnames';

import styles from './styles.module.css';

interface VolumeDiscountListProps extends HTMLProps<HTMLDivElement> {}

const VolumeDiscountList = ({
	children,
	className,
}: VolumeDiscountListProps) => {
	return <ul className={cx(styles.component, className)}>{children}</ul>;
};

export default VolumeDiscountList;
