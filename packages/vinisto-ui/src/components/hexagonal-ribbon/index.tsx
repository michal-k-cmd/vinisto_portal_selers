import { ReactNode } from 'react';
import cx from 'classnames';

import HexagonIcon from '../icons/hexagon';

import styles from './styles.module.css';

interface HexagonalRibbonProps {
	children: ReactNode;
	className?: string;
	hasRightHexagon?: boolean;
	hasLeftHexagon?: boolean;
	backgroundColor: string;
}

const HexagonalRibbon = ({
	children,
	className,
	hasRightHexagon = false,
	hasLeftHexagon = false,
	backgroundColor,
	...props
}: HexagonalRibbonProps) => {
	return (
		<div
			{...props}
			className={cx(styles.component, className)}
		>
			{hasLeftHexagon && (
				<HexagonIcon
					className={styles.left}
					fill={backgroundColor}
				/>
			)}
			{children}
			{hasRightHexagon && (
				<HexagonIcon
					className={styles.right}
					fill={backgroundColor}
				/>
			)}
		</div>
	);
};

export default HexagonalRibbon;
