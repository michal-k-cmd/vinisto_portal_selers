import { HTMLProps, ReactNode } from 'react';
import cx from 'classnames';

import styles from './styles.module.css';

interface VolumeDiscountListItemProps extends HTMLProps<HTMLLIElement> {
	text: ReactNode;
	cta: ReactNode;
}

interface EmphasizedProps {
	children: ReactNode;
}

export const Emphasized = ({ children }: EmphasizedProps) => (
	<span className={styles.emphasized}>{children}</span>
);
export const DoubleEmphasized = ({ children }: EmphasizedProps) => (
	<span className={styles.doubleEmphasized}>{children}</span>
);

const VolumeDiscountListItem = ({
	text,
	cta,
	className,
}: VolumeDiscountListItemProps) => {
	return (
		<li className={cx(styles.component, className)}>
			<div>{text}</div>
			<div>{cta}</div>
		</li>
	);
};

export default VolumeDiscountListItem;
