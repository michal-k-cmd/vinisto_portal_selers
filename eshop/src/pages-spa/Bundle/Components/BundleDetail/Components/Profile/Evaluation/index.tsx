import { useContext } from 'react';
import cx from 'classnames';
import { LocalizationContext } from 'Services/LocalizationService';
import Skeleton from 'react-loading-skeleton';
import ReactSlider from 'react-slider';

import { IEvaluationProps } from './interfaces';
import styles from './styles.module.css';

const Evaluation = ({
	minLabel,
	maxLabel,
	value,
	isProfileInfoOpen,
	order,
	isLoading,
}: IEvaluationProps) => {
	const localizationContext = useContext(LocalizationContext);
	const t = localizationContext.useFormatMessage();

	return (
		<>
			<div className={styles.header}>
				<span>
					{isLoading ? <Skeleton width="80px" /> : t({ id: minLabel })}
				</span>
				<span>
					{isLoading ? <Skeleton width="80px" /> : t({ id: maxLabel })}
				</span>
			</div>
			{isLoading ? (
				<Skeleton />
			) : (
				<ReactSlider
					className={styles.slider}
					thumbClassName="vinisto-thumb"
					trackClassName="vinisto-track"
					disabled
					{...{ value }}
				/>
			)}
			<div className={cx(styles.hint, isProfileInfoOpen && styles.hintShow)}>
				{t({ id: `bundle.profile.helpBox.${order}` })}
			</div>
		</>
	);
};

export default Evaluation;
