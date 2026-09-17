import { useContext, useState } from 'react';
import cx from 'classnames';
import { LocalizationContext } from 'Services/LocalizationService';

import GreenCheckbox from '../BasketItem/GreenCheckbox';

import styles from './styles.module.css';

const Additionals = () => {
	const t = useContext(LocalizationContext).useFormatMessage();
	const [isDedicationChosen, setIsDedicationChosen] = useState(false);
	const [isAssuranceChosen, setIsAssuranceChosen] = useState(false);

	return (
		<div className={styles.container}>
			<div className={styles.heading}>
				{t({ id: 'basket.additionals.heading' })}
			</div>

			<div className={styles.additionals}>
				<button
					className={cx(styles.additional, isDedicationChosen && styles.chosen)}
					key={'1'}
					onClick={() => setIsDedicationChosen(!isDedicationChosen)}
				>
					<div className={styles.additionalCheckbox}>
						<GreenCheckbox
							checked={isDedicationChosen}
							setChecked={setIsDedicationChosen}
							tabIndex={-1}
						/>
					</div>

					<div className={styles.additionalInfo}>
						<div className={styles.additionalTitle}>
							Dárková kartička s osobním věnováním
						</div>
						<div className={styles.additionalSubTitle}>
							<span className={styles.highlighted}>
								Po zaškrtnutí je možné do textového pole vložit vlastní text.
							</span>
							<br />V případě nevyplnění obdržíte{' '}
							<span className={styles.highlightedGreen}>kartičku</span>{' '}
							prázdnou, na kterou můžete věnování dopsat ručně. Kartu s osobním
							věnováním přidáme do balíku.
						</div>
					</div>
					<div className={styles.additionalPrice}>49 Kč</div>
				</button>
				<textarea
					className={cx(
						styles.additionalTextArea,
						!isDedicationChosen && styles.hidden
					)}
					placeholder={`${t({
						id: 'basket.additionals.textarea.placeholder',
					})}`}
					disabled={!isDedicationChosen}
					rows={3}
					maxLength={120}
				/>

				<button
					className={cx(styles.additional, isAssuranceChosen && styles.chosen)}
					key={'2'}
					onClick={() => setIsAssuranceChosen(!isAssuranceChosen)}
				>
					<div className={styles.additionalCheckbox}>
						<GreenCheckbox
							checked={isAssuranceChosen}
							setChecked={setIsAssuranceChosen}
							tabIndex={-1}
						/>
					</div>

					<div className={styles.additionalInfo}>
						<div className={styles.additionalTitle}>Pojištění zásilky</div>
						<div className={styles.additionalSubTitle}>
							V případě poškození či ztráty zásilky z důvodu přepravy, nečekáte
							na vyřešení situace v zákonné lhůtě! Stačí, když nám ztracenou
							nebo poškozenou zásilku nahlásíte a zdokumentujete, a my vám
							obratem pošleme úplně nové zboží.
						</div>
					</div>
					<div className={styles.additionalPrice}>49 Kč</div>
				</button>
			</div>
		</div>
	);
};

export default Additionals;
