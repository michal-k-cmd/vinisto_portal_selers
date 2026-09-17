import React from 'react';

import styles from './styles.module.css';

export interface RadioOptionProps {
	title: string;
	value: string;
	groupName: string;
	checked: boolean;
	onChange: (bundleId: string) => void;
}

const RadioOption = ({
	title,
	value,
	groupName,
	onChange,
	checked,
}: RadioOptionProps) => {
	const handleChange = () => {
		onChange(value);
	};

	return (
		<label
			htmlFor={value}
			className={styles.radioLabel}
			aria-label={title}
		>
			<div className={styles.radioTitleGroup}>
				<div className={styles.radioInputWrapper}>
					<div className={styles.radioOuterCircle}>
						<input
							type="radio"
							id={value}
							name={groupName}
							value={value}
							className={styles.radioInput}
							checked={checked}
							onChange={handleChange}
						/>
						<div className={styles.radioInnerCircle} />
					</div>
				</div>
				<strong className={styles.radioTitle}>{title}</strong>
			</div>
		</label>
	);
};

export default RadioOption;
