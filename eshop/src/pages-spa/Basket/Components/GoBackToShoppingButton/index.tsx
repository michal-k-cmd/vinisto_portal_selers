import cx from 'classnames';
import { LocalizationContext } from 'Services/LocalizationService';
import { useContext } from 'react';
import { useRouter } from 'next/navigation';

import styles from './styles.module.css';

const GoBackToShoppingButton = ({ className }: { className?: string }) => {
	const t = useContext(LocalizationContext).useFormatMessage();

	const router = useRouter();

	const handleGoHome = () => {
		router.push(`/`);
	};

	return (
		<button
			type="button"
			className={cx(styles.goBackButton, className)}
			onClick={handleGoHome}
		>
			&lt; {t({ id: 'basket.goBack' })}
		</button>
	);
};

export default GoBackToShoppingButton;
