import cx from 'classnames';
import { HTMLProps } from 'react';

import styles from './styles.module.css';

interface GreenCheckboxProps extends HTMLProps<HTMLDivElement> {
	checked: boolean;
	setChecked: (checked: boolean) => void;
	className?: string;
}

const GreenCheckbox = ({
	checked,
	setChecked,
	className,
	...props
}: GreenCheckboxProps) => {
	return (
		<div
			className={cx(styles.checkbox, className, checked && styles.checked)}
			onClick={() => setChecked(!checked)}
			role="checkbox"
			aria-checked={checked}
			tabIndex={0}
			onKeyDown={(e) => {
				if (e.key === 'Enter' || e.key === ' ') {
					setChecked(!checked);
					e.preventDefault();
				}
			}}
			{...props}
		>
			{checked && (
				<svg
					className={styles.checkmark}
					viewBox="0 0 24 24"
				>
					<path
						d="M4.5 12.5l5 5 10-10"
						fill="none"
						stroke="rgb(var(--vinisto-color-green))"
						strokeWidth="3"
					/>
				</svg>
			)}
		</div>
	);
};

export default GreenCheckbox;
