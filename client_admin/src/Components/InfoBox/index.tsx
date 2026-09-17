import React, { CSSProperties, ReactNode, useState } from 'react';
import cx from 'classnames';

import { OPEN_POSITION } from './constants';
import styles from './styles.module.css';

type InfoBoxPosition = keyof typeof OPEN_POSITION;

interface InfoBoxProps {
	content: ReactNode;
	position?: InfoBoxPosition;
	className?: string;
	contentClassName?: string;
	style?: CSSProperties;
}

const InfoBox = ({
	content,
	position = OPEN_POSITION.BOTTOM_RIGHT,
	className,
	contentClassName,
	style,
}: InfoBoxProps) => {
	const [isOpened, setIsOpened] = useState(false);

	const handleOpen = () => {
		setIsOpened(true);
	};

	const handleClose = () => {
		setIsOpened(false);
	};

	return (
		<div
			className={cx(styles.infoBox, className)}
			style={style}
		>
			<InfoButton
				onMouseOver={handleOpen}
				onMouseOut={handleClose}
			/>
			{/* eslint-disable-next-line jsx-a11y/no-static-element-interactions */}
			<div
				className={cx(styles.content, contentClassName, {
					[styles.open]: isOpened,
					[styles.topRight]: position === OPEN_POSITION.TOP_RIGHT,
					[styles.bottomRight]: position === OPEN_POSITION.BOTTOM_RIGHT,
					[styles.bottomLeft]: position === OPEN_POSITION.BOTTOM_LEFT,
					[styles.topLeft]: position === OPEN_POSITION.TOP_LEFT,
				})}
				onMouseOver={handleOpen}
				onMouseOut={handleClose}
			>
				{content}
			</div>
		</div>
	);
};

export default InfoBox;

type InfoButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
	className?: string;
};

const InfoButton = ({ className, ...props }: InfoButtonProps) => {
	return (
		<button
			type="button"
			className={cx(styles.button, className)}
			{...props}
		>
			i
		</button>
	);
};

export { InfoButton };
