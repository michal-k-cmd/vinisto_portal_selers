import { useContext } from 'react';
import cx from 'classnames';
import { LocalizationContext } from 'Services/LocalizationService';
import { getLocalizedPrice } from 'vinisto_shared/src/price/get-localized-price';

import styles from './styles.module.css';

import { VinistoHelperDllEnumsCurrency } from '@/api-types/product-api';
import { Currency } from '@/api-types/basket-api';

interface VolumeDiscountProps {
	isVinistoPlusDiscount: boolean;
	volumeDiscountVolume: number;
	totalCouponsDiscount: number;
	finalDiscount: number;
	currency: VinistoHelperDllEnumsCurrency | Currency;
	badgesCount: number;
}

const DiscountBadge = ({
	isVinistoPlusDiscount,
	volumeDiscountVolume,
	totalCouponsDiscount,
	finalDiscount,
	currency,
	badgesCount,
}: VolumeDiscountProps) => {
	const t = useContext(LocalizationContext).useFormatMessage();

	if (!volumeDiscountVolume && !totalCouponsDiscount && finalDiscount <= 0) {
		return null;
	}

	return (
		<div className={cx(styles.volumeDiscount, badgesCount >= 2 && styles.big)}>
			{Boolean(isVinistoPlusDiscount) && (
				<>
					{t({ id: 'userSection.vinistoplus.becomeMember.info.vinistoplus' })}
					<br />
				</>
			)}
			{Boolean(volumeDiscountVolume) && (
				<>
					{t(
						{ id: 'volumeDiscount.cartItem.firstLine' },
						{
							amount: t({ id: 'amount.pcs' }, { count: volumeDiscountVolume }),
						}
					)}
					<br />
				</>
			)}
			{Boolean(totalCouponsDiscount) && (
				<>
					{t({ id: 'volumeDiscount.cartItem.discountCoupon' })}
					<br />
				</>
			)}

			{t(
				{ id: 'volumeDiscount.cartItem.secondLine' },
				{
					savings: (
						<span
							className={styles.saved}
							key="savings"
						>
							{getLocalizedPrice({
								price: finalDiscount,
								currency,
							})}
						</span>
					),
				}
			)}
		</div>
	);
};

export default DiscountBadge;
