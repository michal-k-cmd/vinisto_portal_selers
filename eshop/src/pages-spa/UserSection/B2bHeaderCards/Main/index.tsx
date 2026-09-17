import { ReactNode } from 'react';
import cx from 'classnames';

import styles from './styles.module.css';

const Main = ({
	children,
	className,
}: {
	children: ReactNode;
	className?: string;
}) => {
	return <div className={cx(styles.main, className)}>{children}</div>;
};

export default Main;
