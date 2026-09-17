import { getLocalizedPrice } from 'vinisto_shared/src/price/get-localized-price';
import { useIsB2b } from 'Services/PlatformService';
import { LocalizationContext } from 'Services/LocalizationService';
import { useContext } from 'react';

import { PriceInfoProps } from './interfaces';
import styles from './styles.module.css';

const PriceInfo = ({
	originalPrice,
	priceWithoutVat,
	priceWithVat,
	currency,
	quantity = 1,
}: PriceInfoProps) => {
	const isB2b = useIsB2b();
	const t = useContext(LocalizationContext).useFormatMessage();

	const originalPriceFormatted = getLocalizedPrice({
		price: (originalPrice ?? 0) * quantity,
		currency,
	});

	const priceWithoutVatFormatted = getLocalizedPrice({
		price: (priceWithoutVat ?? 0) * quantity,
		currency,
	});

	const priceWithVatFormatted = getLocalizedPrice({
		price: (priceWithVat ?? 0) * quantity,
		currency,
	});

	return (
		<>
			<div className={styles.prices}>
				{originalPrice && (
					<span className={styles.originalPrice}>{originalPriceFormatted}</span>
				)}
				<span className={styles.priceWithVat}>{priceWithVatFormatted}</span>
			</div>
			<div className={styles.priceWithoutVat}>
				{t({ id: isB2b ? 'basket.priceWithVAT' : 'basket.priceWithoutVAT' })}{' '}
				{priceWithoutVatFormatted}
			</div>
		</>
	);
};
export default PriceInfo;
