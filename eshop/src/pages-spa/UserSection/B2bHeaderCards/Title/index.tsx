import { ReactNode } from 'react';
import cx from 'classnames';

import styles from './styles.module.css';

const Title = ({
	children,
	className,
}: {
	children: ReactNode;
	className?: string;
}) => {
	return <div className={cx(styles.title, className)}>{children}</div>;
};

export default Title;
