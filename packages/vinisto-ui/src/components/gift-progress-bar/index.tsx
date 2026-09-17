import cx from 'classnames';
import ReactSlider from 'rc-slider';

import { GiftProgressBarProps } from './types';

import './styles.css';

const GiftProgressBar = ({
	progressMarks,
	maxValue,
	totalMoneySpent,
	className,
}: GiftProgressBarProps) => {
	return (
		<div className="freeGiftsProgressBarWrapper">
			<ReactSlider
				className={cx(className, 'freeGiftsProgressBar')}
				min={0}
				max={maxValue}
				value={totalMoneySpent}
				marks={progressMarks}
				disabled={true}
				allowCross={false}
			/>
		</div>
	);
};

export default GiftProgressBar;
