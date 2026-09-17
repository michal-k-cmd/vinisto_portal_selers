import { useContext } from 'react';
import { UseQueryResult } from '@tanstack/react-query';
import { LocalizationContext } from 'Services/LocalizationService';
import { getLocalizedPrice } from 'vinisto_shared/src/price/get-localized-price';

import styles from '../../BasketItems/BasketCoupons/styles.module.css';

import { Order } from '@/domain/order';
import { VinistoHelperDllEnumsCurrency } from '@/api-types/product-api';
import { DiscountCouponType } from '@/api-types/basket-api';

interface OrderCouponsProps {
	orderQuery: UseQueryResult<void | Order | null, unknown>;
}

const OrderCoupons = ({ orderQuery }: OrderCouponsProps) => {
	const t = useContext(LocalizationContext).useFormatMessage();

	const coupons = orderQuery.data?.discountCoupons ?? [];
	const currency =
		orderQuery.data?.orderCurrency ?? VinistoHelperDllEnumsCurrency.CZK;

	if (coupons.length === 0) {
		return null;
	}

	return coupons.map((coupon, index) => {
		const isGiftVoucher =
			'type' in coupon && coupon.type === DiscountCouponType.GIFT;

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
						price: coupon.discountValueWithVat ?? 0,
						currency: currency,
					})}
				</div>
			</div>
		);
	});
};
export default OrderCoupons;
