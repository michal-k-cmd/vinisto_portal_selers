import { useContext } from 'react';
import { LocalizationContext } from 'Services/LocalizationService';

import { StepPanelProps } from '../../interfaces';
import styles from '../../styles.module.css';

const StepPanel = ({ titleId, subtitleId, children }: StepPanelProps) => {
	const t = useContext(LocalizationContext).useFormatMessage();

	return (
		<section className={styles.panel}>
			<div className={styles.sectionHeading}>
				<h4>{t({ id: titleId })}</h4>
				<p>{t({ id: subtitleId })}</p>
			</div>
			{children}
		</section>
	);
};

export default StepPanel;
