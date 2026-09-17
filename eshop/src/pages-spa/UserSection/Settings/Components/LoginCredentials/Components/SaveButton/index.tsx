import { useContext } from 'react';
import { LocalizationContext } from 'Services/LocalizationService';

import styles from './styles.module.css';

const SaveButton = () => {
	const t = useContext(LocalizationContext).useFormatMessage();

	return (
		<button
			className={styles.saveButton}
			type="submit"
		>
			{t({ id: 'userSection.settings.loginCredentials.saveChanges' })}
		</button>
	);
};

export default SaveButton;
