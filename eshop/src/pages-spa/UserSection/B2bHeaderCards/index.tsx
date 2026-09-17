import { ReactNode } from 'react';
import cx from 'classnames';

import styles from './styles.module.css';

const B2bHeaderCards = ({
	children,
	className,
}: {
	children: ReactNode;
	className?: string;
}) => {
	return <div className={cx(styles.b2bHeaderCards, className)}>{children}</div>;
};

export default B2bHeaderCards;
