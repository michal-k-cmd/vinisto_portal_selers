import { useContext, useState } from 'react';
import cx from 'classnames';
import { LocalizationContext } from 'Services/LocalizationService';

import styles from './styles.module.css';

const ExpeditionThanks = () => {
	const t = useContext(LocalizationContext).useFormatMessage();
	const [tip, setTip] = useState('3');

	const tipsOptions = [
		{
			id: '0',
			name: '30 Kč',
			price: 30,
		},
		{
			id: '1',
			name: '20 Kč',
			price: 20,
		},
		{
			id: '2',
			name: '10 Kč',
			price: 10,
		},
		{
			id: '3',
			name: t({ id: 'basket.expedition.thanks.noTip' }),
			price: 0,
		},
	];

	return (
		<div className={styles.container}>
			<div className={styles.heading}>
				{t({ id: 'basket.expedition.heading' })}
			</div>
			<p className={styles.description}>
				{t({ id: 'basket.expedition.description' })}
			</p>

			<div className={styles.tips}>
				{tipsOptions.map((tipOption) => {
					const inputId = `tip-option-${tipOption.id}`;
					return (
						<label
							className={cx(styles.tip, tip === tipOption.id && styles.chosen)}
							key={tipOption.id}
							htmlFor={inputId}
						>
							<input
								type="radio"
								name="tip"
								id={inputId}
								value={tipOption.id}
								checked={tip === tipOption.id}
								onChange={() => setTip(tipOption.id)}
								className={styles.hiddenRadio}
							/>
							<div
								className={cx(
									styles.radio,
									tip === tipOption.id && styles.checked
								)}
							></div>
							<div className={styles.name}>{tipOption.name}</div>
						</label>
					);
				})}
			</div>
		</div>
	);
};

export default ExpeditionThanks;
