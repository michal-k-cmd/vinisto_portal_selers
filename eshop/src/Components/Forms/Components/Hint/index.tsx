import { ReactNode } from 'react';
import cx from 'classnames';

import styles from './styles.module.css';

interface HintProps {
	children: ReactNode;
	hintClassName?: string;
}

const Hint = ({ children, hintClassName }: HintProps) => {
	return <div className={cx(styles.hint, hintClassName)}>{children}</div>;
};

export default Hint;
