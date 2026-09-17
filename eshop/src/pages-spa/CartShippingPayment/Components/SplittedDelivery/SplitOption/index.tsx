import React from 'react';
import cx from 'classnames';

import { SplitOptions } from '..';

import styles from './styles.module.css';

type Props = {
	isSelected: boolean;
	option: SplitOptions;
	setChosenOption: (option: SplitOptions) => void;
	title: string;
	description: string;
	icon?: string;
};

const SplitOption = ({
	isSelected,
	option,
	setChosenOption,
	icon = '/assets/checkout-icons/doruceni-kuryrem-vinisto-cz.svg',
	title,
	description,
}: Props) => {
	return (
		<button
			className={cx(styles.option, isSelected && styles.selected)}
			key={SplitOptions.ONE_PACKAGE}
			onClick={() => setChosenOption(option)}
		>
			<div className={styles.radio}></div>
			<div className={styles.optionIconWrapper}>
				<img
					src={icon}
					className={styles.optionIcon}
				/>
			</div>
			<div className={styles.optionInfo}>
				<div className={styles.optionTitle}>{title}</div>
				<div className={styles.optionDescription}>{description}</div>
			</div>
		</button>
	);
};

export default SplitOption;
