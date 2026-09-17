import { useContext } from 'react';
import { LocalizationContext } from 'Services/LocalizationService';

import styles from './styles.module.css';

const IsGiftInfo = () => {
	const t = useContext(LocalizationContext).useFormatMessage();
	return (
		<div className={styles.wrapper}>
			<div className={styles.title}>
				{t({ id: 'bundle.isGift.productDetail.title' })}
			</div>
		</div>
	);
};

export default IsGiftInfo;
