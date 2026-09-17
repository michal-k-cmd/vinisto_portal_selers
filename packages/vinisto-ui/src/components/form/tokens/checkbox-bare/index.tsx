import { type HTMLAttributes } from 'react';
import cx from 'classnames';
import Skeleton from 'react-loading-skeleton';

import styles from './styles.module.css';

interface CheckboxBareProps extends HTMLAttributes<HTMLInputElement> {
	name: string;
	checked?: boolean;
	size?: number;
	disabled?: boolean;
	isLoading?: boolean;
}

const CheckboxBare = ({
	name,
	className,
	checked,
	size = 20,
	disabled,
	isLoading,
	...props
}: CheckboxBareProps) => {
	if (isLoading)
		return (
			<Skeleton
				containerClassName={styles.component}
				width={16}
			/>
		);
	return (
		<span className={cx(styles.wrapper, className)}>
			<input
				{...props}
				name={name}
				checked={checked}
				className={cx('visually-hidden', styles.input)}
				disabled={disabled}
				type="checkbox"
			/>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width={size}
				height={size}
				viewBox="0 0 20 20"
				className={styles.input_icon}
			>
				<rect
					width="20"
					height="20"
				/>
				<path
					className={cx(styles.checkmark)}
					d="M2.664,7.374l3.442,3.764,6.7-7.474"
					strokeLinecap="round"
					strokeLinejoin="round"
					strokeWidth="3"
					transform="translate(2.336 2.263)"
				/>
			</svg>
		</span>
	);
};

export default CheckboxBare;
