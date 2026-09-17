import { useContext } from 'react';
import { BasketContext } from 'Services/BasketService';
import { getLocalizedPrice } from 'vinisto_shared/src/price/get-localized-price';
import { LocalizationContext } from 'Services/LocalizationService';

import styles from './styles.module.css';

const FeeInfo = () => {
	const {
		activeCurrency: { currency },
	} = useContext(LocalizationContext);
	const { basketState } = useContext(BasketContext);

	if (!basketState) return null;
	return (
		<div className={styles.feeInfo}>
			<div className={styles.feeTitle}>Vaše provize</div>
			<div className={styles.feeTotalValue}>
				{getLocalizedPrice({
					price: basketState.totalFee ?? 0,
					currency: basketState?.currency ?? currency,
				})}
			</div>
			{!!basketState.totalFeeLoss && (
				<div className={styles.feeDetails}>
					{!!basketState.totalFeeLoss && (
						<div className="d-flex justify-content-between">
							<span>Ztráta:</span>
							<span>
								−
								{getLocalizedPrice({
									price: basketState.totalFeeLoss,
									currency: basketState.currency ?? currency,
								})}
							</span>
						</div>
					)}
				</div>
			)}
		</div>
	);
};

export default FeeInfo;
