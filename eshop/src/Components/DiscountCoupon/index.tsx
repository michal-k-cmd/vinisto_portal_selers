import { useContext } from 'react';
import cx from 'classnames';
import { LocalizationContext } from 'Services/LocalizationService';
import {
	DiscountCouponPageType,
	DiscountCouponProps,
} from 'Components/DiscountCoupon/interfaces';
import { getLocalizedPrice } from 'vinisto_shared/src/price/get-localized-price';

import styles from './styles.module.css';

const DiscountCoupon = ({
	discountCoupon,
	discountCouponPage: couponPage,
	className,
	orderCurrency,
}: DiscountCouponProps) => {
	const localizationContext = useContext(LocalizationContext);
	const t = localizationContext.useFormatMessage();

	const amountDiscountWithVAT = discountCoupon.discountValueWithVat;

	return (
		<div
			className={cx(styles.discountCouponItem, className, {
				[styles.discountCouponItemOrderSummary]:
					couponPage === DiscountCouponPageType.ORDER_SUMMARY,
			})}
		>
			<div
				className={cx(styles.discountCouponCodeItem, {
					[styles.discountCouponCodeItemOrderSummary]:
						couponPage === DiscountCouponPageType.ORDER_SUMMARY,
				})}
			>
				{`${t({
					id: 'basket.discountCoupon.label',
				})} "${discountCoupon.code}"`}
			</div>

			<div
				className={cx(styles.discountCouponAmountItem, {
					[styles.discountCouponAmountItemOrderSummary]:
						couponPage === DiscountCouponPageType.ORDER_SUMMARY,
				})}
			>
				<div
					className={cx(styles.discountCouponAmountItemValue, {
						[styles.discountCouponAmountItemValueOrderSummary]:
							couponPage === DiscountCouponPageType.ORDER_SUMMARY,
					})}
				>
					{amountDiscountWithVAT &&
						orderCurrency !== undefined &&
						`−${getLocalizedPrice({
							price: amountDiscountWithVAT,
							currency: orderCurrency,
						})}`}
				</div>
			</div>
		</div>
	);
};

export default DiscountCoupon;
