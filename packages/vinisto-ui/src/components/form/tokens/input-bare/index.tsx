import { forwardRef, type InputHTMLAttributes } from 'react';
import cx from 'classnames';

import styles from './styles.module.css';

export const Alignment = {
	LEFT: 'left',
	CENTER: 'center',
	RIGHT: 'right',
} as const;

interface ThemedInputProps extends InputHTMLAttributes<HTMLInputElement> {
	align?: (typeof Alignment)[keyof typeof Alignment];
}

const InputBare = forwardRef<HTMLInputElement, ThemedInputProps>(
	({ className, type = 'text', align = Alignment.LEFT, ...props }, ref) => {
		return (
			<input
				{...props}
				type={type}
				className={cx(styles.component, className, styles[align])}
				ref={ref}
			/>
		);
	}
);

InputBare.displayName = 'InputBare';

export default InputBare;
