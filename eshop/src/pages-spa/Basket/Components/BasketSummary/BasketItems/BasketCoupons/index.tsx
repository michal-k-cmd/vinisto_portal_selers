import { useContext } from 'react';
import { LocalizationContext } from 'Services/LocalizationService';
import { getLocalizedPrice } from 'vinisto_shared/src/price/get-localized-price';

import styles from './styles.module.css';

import { VinistoHelperDllEnumsCurrency } from '@/api-types/product-api';
import { BasketCoupon, DiscountCouponType } from '@/api-types/basket-api';

interface BasketCouponsProps {
	coupons?: BasketCoupon[];
	currency?: VinistoHelperDllEnumsCurrency;
}

const BasketCoupons = ({
	coupons = [],
	currency = VinistoHelperDllEnumsCurrency.CZK,
}: BasketCouponsProps) => {
	const t = useContext(LocalizationContext).useFormatMessage();

	const filteredCoupons = coupons.filter(
		(coupon) => coupon.isCouponApplied || (coupon.discountPriceWithVat ?? 0) > 0
	);

	if (filteredCoupons.length === 0) {
		return null;
	}

	return filteredCoupons.map((coupon, index) => {
		const isGiftVoucher = coupon.type === DiscountCouponType.GIFT;

		return (
			<div
				key={index}
				className={styles.coupon}
			>
				<div className={styles.code}>
					{`${t({
						id: isGiftVoucher
							? 'basket.giftVoucher.label'
							: 'basket.discountCoupon.label',
					})} "${coupon.code}"`}
				</div>
				<div className={styles.discount}>
					−
					{getLocalizedPrice({
						price: coupon.discountPriceWithVat ?? 0,
						currency: currency,
					})}
				</div>
			</div>
		);
	});
};
export default BasketCoupons;
