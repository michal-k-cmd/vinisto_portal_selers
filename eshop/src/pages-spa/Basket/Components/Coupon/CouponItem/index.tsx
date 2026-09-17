import { useContext, useMemo } from 'react';
import { BasketContext } from 'Services/BasketService';
import { LocalizationContext } from 'Services/LocalizationService';
import { getLocalizedPrice } from 'vinisto_shared/src/price/get-localized-price';
import CloseIcon from 'Components/Icons/Close';
import cx from 'classnames';
import Warning from 'Components/Icons/Warning';
import { DeviceServiceContext } from 'Services/DeviceService';

import styles from './styles.module.css';

import { BasketCoupon, DiscountCouponType } from '@/api-types/basket-api';

const CouponItem = ({ data }: { data: BasketCoupon }) => {
	const t = useContext(LocalizationContext).useFormatMessage();
	const { basketState, handleOnRemoveCoupon } = useContext(BasketContext);
	const { isDesktop } = useContext(DeviceServiceContext);
	const {
		activeCurrency: { currency },
	} = useContext(LocalizationContext);

	const message = useMemo(() => {
		if (data.notAppliedReason) {
			return t({ id: `basket.coupon.specificError.${data.notAppliedReason}` });
		}
		if (data.notForDiscountedItemsMessage) {
			return t({
				id: `basket.coupon.specificError.${data.notForDiscountedItemsMessage}`,
			});
		}
		return null;
	}, [data.notAppliedReason, data.notForDiscountedItemsMessage, t]);

	const isGiftVoucher = data.type === DiscountCouponType.GIFT;

	return (
		<div
			className={cx(styles.wrapper, {
				[styles.notApplied]: data.notAppliedReason,
			})}
		>
			<div className={styles.content}>
				<div className={styles.couponInfo}>
					<div className={styles.iconWrapper}>
						{!data.isCouponApplied && <Warning />}
					</div>
					<span className={styles.codeText}>
						<span className={styles.couponLabel}>
							{t({
								id: isGiftVoucher
									? 'basket.giftVoucher.label'
									: 'basket.discountCoupon.label',
							})}{' '}
						</span>
						<span className={styles.couponCode}>&quot;{data.code}&quot;</span>
					</span>
				</div>
				{isDesktop && message && (
					<span className={styles.message}>{message}</span>
				)}
			</div>
			<div className={styles.youSaveWrapper}>
				{data.isCouponApplied && data.discountPriceWithVat && (
					<span className={styles.youSave}>
						{t(
							{ id: 'basket.coupon.youSave' },
							{
								value: (
									<span
										className={styles.youSaveValue}
										key="basket.coupon.youSave.value"
									>
										{getLocalizedPrice({
											price: data.discountPriceWithVat ?? 0,
											currency: basketState?.currency ?? currency,
										})}
									</span>
								),
							}
						)}
					</span>
				)}
				<button
					className={styles.removeCoupon}
					onClick={() => handleOnRemoveCoupon(data)}
				>
					<CloseIcon
						width={10}
						height={10}
					/>
				</button>
			</div>
			{!isDesktop && message && (
				<span className={styles.message}>{message}</span>
			)}
		</div>
	);
};

export default CouponItem;
