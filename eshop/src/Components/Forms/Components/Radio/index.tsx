import cx from 'classnames';
import { HTMLProps } from 'react';

import styles from './styles.module.css';

type TInputProps = HTMLProps<HTMLInputElement>;

const Radio = ({ className, children, id, ...props }: TInputProps) => {
	return (
		<label
			className={cx(styles.wrapper, className)}
			htmlFor={id}
		>
			<input
				className={cx(styles.radioInput)}
				type="radio"
				id={id}
				{...props}
			/>
			<span className={styles.radioSpan}></span>
			<span className={styles.label}>{children}</span>
		</label>
	);
};

export default Radio;
