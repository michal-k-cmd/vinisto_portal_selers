import cx from 'classnames';
import LoadingSpinner from 'Components/Preloader/Components/LoadingSpinner';
import { LocalizationContext } from 'Services/LocalizationService';
import { useContext } from 'react';

import styles from './styles.module.css';

const BasketLoading = () => {
	const t = useContext(LocalizationContext).useFormatMessage();

	return (
		<div
			className={styles.loading}
			suppressHydrationWarning
		>
			<LoadingSpinner
				height={24}
				width={24}
				strokeWidth={3}
				wrapperClass={cx(styles.loadingSpinner)}
			/>
			{t({ id: 'basket.loading' })}
		</div>
	);
};

export default BasketLoading;
