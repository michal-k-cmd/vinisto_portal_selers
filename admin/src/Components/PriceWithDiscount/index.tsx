import formatPrice from 'Helpers/format-price';
import { LocalizationContext } from 'Services/LocalizationService';
import { useContext } from 'react';

import styles from './styles.module.css';

const PriceWithDiscount = ({
	price,
	discountPrice,
	quantity = 1,
	percentageDiscount,
}: {
	price: number;
	discountPrice: number;
	quantity?: number;
	percentageDiscount?: number | null;
}) => {
	const t = useContext(LocalizationContext).useFormatMessage();

	return (
		<>
			{percentageDiscount ? (
				<div>
					<div className={styles.percentageDiscount}>
						<span>{t({ id: 'admin.basket.additionalDiscount.label' })}</span>
						<span className={styles.discountPercentage}>
							{percentageDiscount}%
						</span>
					</div>
					<div className={styles.price}>{formatPrice(price * quantity)}</div>
				</div>
			) : (
				<div className={styles.price}>{formatPrice(price * quantity)}</div>
			)}
			<div className={styles.discountPrice}>
				{formatPrice(discountPrice * quantity)}
			</div>
		</>
	);
};

export default PriceWithDiscount;
