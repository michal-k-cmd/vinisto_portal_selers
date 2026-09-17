import cx from 'classnames';
import GrowArrowIcon from 'Components/Icons/GrowArrow';

import { PERCENTAGE_CHANGE_POSITIONS } from './constants';
import styles from './styles.module.css';

type PercentageChangePosition = keyof typeof PERCENTAGE_CHANGE_POSITIONS;

interface PercentageChangeProps {
	position?: PercentageChangePosition;
	value: number;
	className?: string;
}

const PercentageChange = ({
	position = PERCENTAGE_CHANGE_POSITIONS.RIGHT,
	value,
	className,
}: PercentageChangeProps) => {
	const isNegative = value < 0;

	return (
		<div
			className={cx(
				styles.wrapper,
				className,
				position === PERCENTAGE_CHANGE_POSITIONS.BOTTOM && styles.bottom
			)}
		>
			<div className={styles.arrowWrap}>
				<GrowArrowIcon className={isNegative ? styles.negative : ''} />
			</div>
			<div className={styles.value}>
				{!isNegative && '+'}
				{value}%
			</div>
		</div>
	);
};

export default PercentageChange;
