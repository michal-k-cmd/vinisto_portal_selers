import cx from 'classnames';
import AlertIcon from 'Components/Icons/Alert';

import { MessageProps } from './interfaces';
import styles from './styles.module.css';

const Message = ({
	variant = 'success',
	className,
	children,
}: MessageProps) => {
	return (
		<div
			className={cx(
				styles.message,
				{
					[styles.success]: variant === 'success',
					[styles.info]: variant === 'info',
					[styles.warning]: variant === 'warning',
					[styles.alert]: variant === 'alert',
				},
				className
			)}
		>
			<div className={styles.iconWrap}>
				{variant === 'success' && <AlertIcon />}
				{variant === 'info' && <AlertIcon />}
				{variant === 'warning' && <AlertIcon />}
				{variant === 'alert' && <AlertIcon />}
			</div>
			<div className={styles.messageContent}>{children}</div>
		</div>
	);
};

export default Message;
