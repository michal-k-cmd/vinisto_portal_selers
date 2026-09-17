import { useContext } from 'react';
import { LocalizationContext } from 'Services/LocalizationService';

import { SummarySectionProps } from '../../interfaces';
import styles from '../../styles.module.css';

const SummarySection = ({ titleId, children }: SummarySectionProps) => {
	const t = useContext(LocalizationContext).useFormatMessage();

	return (
		<section className={styles.summarySection}>
			<h5>{t({ id: titleId })}</h5>
			{children}
		</section>
	);
};

export default SummarySection;
