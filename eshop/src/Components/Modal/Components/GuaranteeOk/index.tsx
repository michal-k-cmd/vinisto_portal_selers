import { lazy, Suspense, useContext } from 'react';
import { LocalizationContext } from 'Services/LocalizationService';
import { ModalContext } from 'Components/Modal/context';
import Loader from 'Components/View/Loader';
const LazyBigGreenOk = lazy(() => import('Components/Icons/BigGreenOk'));

import styles from './styles.module.css';

const BigGreenOkIcon = ({ className }: { className?: string }) => (
	<Suspense fallback={<Loader />}>
		<LazyBigGreenOk className={className} />
	</Suspense>
);

const GuaranteeOkModal = () => {
	const t = useContext(LocalizationContext).useFormatMessage();
	const { handleCloseModal } = useContext(ModalContext);

	return (
		<div className={styles.modal}>
			<BigGreenOkIcon className={styles.okIcon} />
			<p className={styles.heading}>
				{t({ id: 'bundle.priceGuarantee.okHeading' })}
			</p>
			<p className={styles.text}>
				{t({
					id: 'bundle.priceGuarantee.okText',
				})}
			</p>
			<button
				className={styles.closeButton}
				onClick={() => handleCloseModal()}
			>
				{t({ id: 'bundle.priceGuarantee.close' })}
			</button>
		</div>
	);
};

export default GuaranteeOkModal;
