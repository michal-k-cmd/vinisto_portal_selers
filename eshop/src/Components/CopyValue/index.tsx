'use client';

import React, { useContext, useEffect, useState } from 'react';
import CopyIcon from 'vinisto_ui/src/components/icons/Copy';
import { LocalizationContext } from 'Services/LocalizationService';

import styles from './styles.module.css';

type Props = {
	value: string;
	children: React.ReactNode;
};

const CopyValue = (props: Props) => {
	const t = useContext(LocalizationContext).useFormatMessage();

	const handleCopyValue = () => {
		navigator.clipboard.writeText(props.value);
		setIsCopied(true);
		setIsInitialColor(true);
	};

	const [isCopied, setIsCopied] = useState(false);
	const [isInitialColor, setIsInitialColor] = useState(false);

	useEffect(() => {
		if (isCopied) {
			const colorTimeout = setTimeout(() => {
				setIsInitialColor(false);
			}, 250);

			const hideTimeout = setTimeout(() => {
				setIsCopied(false);
			}, 1500);

			return () => {
				clearTimeout(colorTimeout);
				clearTimeout(hideTimeout);
			};
		}
	}, [isCopied]);

	return (
		<div className={styles.wrapper}>
			{props.children}
			<span className={styles.buttonWrapper}>
				{isCopied ? (
					<span
						className={`${styles.copied} ${
							isInitialColor ? styles.initial : ''
						}`}
					>
						{t({ id: 'copyValue.copied' })}
					</span>
				) : (
					<button
						className={styles.button}
						onClick={handleCopyValue}
					>
						<CopyIcon className={styles.icon} />
					</button>
				)}
			</span>
		</div>
	);
};

export default CopyValue;
