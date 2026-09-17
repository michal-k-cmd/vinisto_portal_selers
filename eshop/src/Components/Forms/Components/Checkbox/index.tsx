import cx from 'classnames';
import {
	ChangeEvent,
	FormEvent,
	ForwardedRef,
	forwardRef,
	HTMLProps,
} from 'react';

import styles from './styles.module.css';

type TInputProps = Omit<HTMLProps<HTMLInputElement>, 'value'>;

const Checkbox = forwardRef(
	(
		{ className, children, onChange, id, name, ...props }: TInputProps,
		ref: ForwardedRef<HTMLInputElement>
	) => {
		const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
			if (typeof onChange === 'function') {
				onChange({
					...e,
					target: { ...e?.target, value: e?.target?.checked, name },
				} as FormEvent<HTMLInputElement>);
			}
		};

		return (
			<label
				className={cx(styles.wrapper, className)}
				htmlFor={id}
			>
				<input
					className={cx(styles.checkboxInput)}
					type="checkbox"
					id={id}
					name={name}
					onChange={handleOnChange}
					{...props}
					// Prevent changing given value to string
					value={undefined}
					ref={ref}
				/>
				<span className={styles.checkboxSpan}></span>
				<span className={styles.label}>{children}</span>
			</label>
		);
	}
);

Checkbox.displayName = 'Checkbox';

export default Checkbox;
