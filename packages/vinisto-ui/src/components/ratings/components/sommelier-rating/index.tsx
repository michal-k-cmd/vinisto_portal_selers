'use client';

import { type HTMLAttributes, type ReactNode, useState } from 'react';
import cx from 'classnames';

import styles from './styles.module.css';

interface HTMLDivProps extends HTMLAttributes<HTMLDivElement> {}

type TranslationKeys =
	| 'info'
	| 'explanation'
	| 'firstPoints'
	| 'firstDesc'
	| 'secondPoints'
	| 'secondDesc'
	| 'thirdPoints'
	| 'thirdDesc'
	| 'fourthPoints'
	| 'fourthDesc'
	| 'fifthPoints'
	| 'fifthDesc';

interface SommelierRatingProps extends HTMLDivProps {
	label: ReactNode;
	rating: number;
	separator?: string;
	maximum?: number;
	divProps?: HTMLDivProps;
	translations: { [key in TranslationKeys]: ReactNode | string };
}

const SommelierRating = ({
	label,
	rating,
	separator = '/',
	maximum = 100,
	translations,
	...divProps
}: SommelierRatingProps) => {
	const [isOpen, setIsOpen] = useState<boolean>(false);

	return (
		<div
			{...divProps}
			className={cx(styles.component, divProps?.className)}
		>
			<span className={styles.label}>{label}</span>
			<span className={styles.rating}>{rating}</span>
			<span>{separator}</span>
			<span>{maximum}</span>
			<div className={styles.infoWrap}>
				<button
					className={styles.infoOpenButton}
					onClick={() => setIsOpen(!isOpen)}
				>
					?
				</button>
				<div
					className={cx(styles.info, {
						[styles.isOpen]: isOpen,
					})}
				>
					<button
						className={styles.infoCloseButton}
						onClick={() => setIsOpen(false)}
					>
						x
					</button>
					<p className={styles.infoText}>{translations.info}</p>
					<p className={styles.highlighted}>{translations.explanation}:</p>
					<div className={styles.table}>
						<div>{translations.firstPoints}</div>
						<div>{translations.firstDesc}</div>
						<div>{translations.secondPoints}</div>
						<div>{translations.secondDesc}</div>
						<div>{translations.thirdPoints}</div>
						<div>{translations.thirdDesc}</div>
						<div>{translations.fourthPoints}</div>
						<div>{translations.fourthDesc}</div>
						<div>{translations.fifthPoints}</div>
						<div>{translations.fifthDesc}</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default SommelierRating;
