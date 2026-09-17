import { useContext } from 'react';
import { LocalizationContext } from 'Services/LocalizationService';
import ImageLocal from 'Components/View/ImageLocal';
import { ModalContext } from 'Components/Modal/context';
import { GUARANTEE_PRICE_MODAL } from 'Components/Modal/constants';

import { PriceGuaranteeProps } from './interfaces';
import styles from './styles.module.css';

const PriceGuarantee = ({ bundle, isLoading }: PriceGuaranteeProps) => {
	const t = useContext(LocalizationContext).useFormatMessage();
	const { handleOpenModal } = useContext(ModalContext);

	if (isLoading || !bundle) return;

	return (
		<div className={styles.priceGuarantee}>
			<button
				onClick={() =>
					handleOpenModal(GUARANTEE_PRICE_MODAL, {
						bundle,
					})
				}
				className={styles.openGuaranteeModal}
			>
				<ImageLocal
					fileName="hectagon-check.svg"
					className={styles.guaranteeImg}
				/>
				{t({ id: 'bundle.priceGuarantee.openModal' })}
			</button>
		</div>
	);
};

export default PriceGuarantee;
