import { HTMLProps } from 'react';
import cx from 'classnames';

import styles from './styles.module.css';

type TMessageProps = HTMLProps<HTMLParagraphElement> & {
	variant?: 'info' | 'success' | 'error';
};

const Message = ({ children, className, variant = 'info' }: TMessageProps) => {
	return (
		<p className={cx(styles.message, styles?.[variant], className)}>
			{children}
		</p>
	);
};

export default Message;
