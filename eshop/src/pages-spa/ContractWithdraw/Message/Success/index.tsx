import { useContext } from 'react';
import cx from 'classnames';
import { LocalizationContext } from 'Services/LocalizationService';
import CheckIconX from 'vinisto_ui/src/components/icons/check-simple';

import styles from '../styles.module.css';

const SuccessMessage = () => {
	const t = useContext(LocalizationContext).useFormatMessage();

	return (
		<div className={cx(styles.container, styles.success)}>
			<h2 className={cx(styles.title, styles.success)}>
				<CheckIconX /> {t({ id: 'contractWithdraw.submit.success.title' })}
			</h2>
			<p>{t({ id: 'contractWithdraw.submit.success.message' })}</p>
		</div>
	);
};

export default SuccessMessage;
