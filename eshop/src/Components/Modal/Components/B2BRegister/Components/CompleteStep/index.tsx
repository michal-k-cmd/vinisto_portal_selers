import { useContext } from 'react';
import cx from 'classnames';
import Button from 'Components/Button';
import { LocalizationContext } from 'Services/LocalizationService';

import { CompleteStepProps } from '../../interfaces';
import styles from '../../styles.module.css';

const CompleteStep = ({ onLogin }: CompleteStepProps) => {
	const t = useContext(LocalizationContext).useFormatMessage();

	return (
		<section className={cx(styles.panel, styles.complete)}>
			<span className={styles.completeMark}>✓</span>
			<h4>{t({ id: 'modal.b2bRegistration.complete.title' })}</h4>
			<p>{t({ id: 'modal.b2bRegistration.complete.text' })}</p>
			<p className={styles.completeDetails}>
				{t({ id: 'modal.b2bRegistration.complete.details' })}
			</p>
			<Button
				type="button"
				className="vinisto-bg-green"
				onClick={onLogin}
			>
				{t({ id: 'modal.b2bRegistration.complete.close' })}
			</Button>
		</section>
	);
};

export default CompleteStep;
