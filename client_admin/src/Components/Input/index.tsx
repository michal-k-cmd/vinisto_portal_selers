import React, { Dispatch, SetStateAction } from 'react';
import cx from 'classnames';

import styles from './styles.module.css';

interface Props extends React.HTMLProps<HTMLInputElement> {
	value: string;
	setValue: Dispatch<SetStateAction<string>>;
}

const Input = ({ value, setValue, ...props }: Props) => {
	const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setValue(e.target.value);
		props.onChange?.(e);
	};

	return (
		<input
			{...props}
			value={value}
			onChange={onChange}
			className={cx(styles.input, props.className)}
		/>
	);
};

export default Input;
