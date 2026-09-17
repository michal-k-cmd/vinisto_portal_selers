import { useCallback, useContext } from 'react';
import { LocalizationContext } from 'Services/LocalizationService';
import CloseIcon from 'Components/Icons/Close';

import { IDiscardButtonProps } from './interfaces';
import styles from './styles.module.css';

const DiscardButton = ({ onClick }: IDiscardButtonProps) => {
	const localizationContext = useContext(LocalizationContext);
	const t = localizationContext.useFormatMessage();

	const handleOnDiscardButtonClick = useCallback(() => {
		onClick();
	}, []);

	return (
		<button
			className={styles.discardButton}
			onClick={handleOnDiscardButtonClick}
		>
			<CloseIcon className={styles.discardX} />
			{t({ id: 'userSection.settings.loginCredentials.discardChanges' })}
		</button>
	);
};

export default DiscardButton;
