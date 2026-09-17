import { CSSProperties, ReactNode, useContext } from 'react';
import PercentageChange from 'Components/PercentageChange';
import { LocalizationContext } from 'Services/LocalizationService';
import formatDigits from 'Helpers/format-digits';

import styles from './styles.module.css';

interface StatisticsTileProps {
	label: ReactNode;
	value: number;
	valueFontSize?: string;
	unit?: string;
	percentageChange: number;
	daysCount: number;
	className?: string;
	style?: CSSProperties;
}

const StatisticsTile = ({
	label,
	value,
	valueFontSize,
	unit = '',
	percentageChange,
	daysCount,
	className,
	style,
}: StatisticsTileProps) => {
	const { useFormatMessage } = useContext(LocalizationContext);
	const t = useFormatMessage();

	return (
		<div
			className={className}
			style={style}
		>
			<div className={styles.label}>{label}</div>
			<div className={styles.wrapper}>
				<div
					className={styles.value}
					style={{ fontSize: valueFontSize }}
				>
					{formatDigits(value)} {unit}
				</div>
				<div className={styles.percentageWrap}>
					<PercentageChange value={percentageChange} />

					<div className={styles.days}>
						{t(
							{ id: 'dashboard.statisticstile.text' },
							{
								daysCount: daysCount,
							}
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

export default StatisticsTile;
