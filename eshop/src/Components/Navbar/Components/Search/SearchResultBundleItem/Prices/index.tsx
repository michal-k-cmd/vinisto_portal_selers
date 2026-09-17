import { useContext } from 'react';
import cx from 'classnames';
import { LocalizationContext } from 'Services/LocalizationService';
import { getLocalizedPrice } from 'vinisto_shared/src/price/get-localized-price';
import { DiscountPercentage } from 'vinisto_ui';
import { BundlePrice } from 'vinisto_api_client/src/domain/price';
import { useIsB2b } from 'Services/PlatformService';

import styles from '../styles.module.css';

export const Prices = ({
	bundlePrices,
	isSet,
	couponData,
}: {
	bundlePrices: BundlePrice;
	isSet: boolean;
	couponData: {
		isCouponAvailable: boolean;
		priceWhenCouponApplied: number | null;
		priceWhenCouponAppliedWithoutVat: number | null;
	};
}) => {
	const isB2b = useIsB2b();
	const localizationContext = useContext(LocalizationContext);
	const t = localizationContext.useFormatMessage();
	const {
		activeCurrency: { currency },
	} = localizationContext;

	const { isDiscounted, basePrice, discountedPrice } = bundlePrices ?? {};

	const {
		isCouponAvailable,
		priceWhenCouponApplied,
		priceWhenCouponAppliedWithoutVat,
	} = couponData;

	if (
		isCouponAvailable &&
		priceWhenCouponApplied &&
		priceWhenCouponAppliedWithoutVat
	) {
		// NOTE: Should coupons be available in B2b, VAT and noVAT prices would have to be swapped here
		return (
			<div className={styles.prices}>
				<div className={styles.pricesWithVAT}>
					<span className={cx(styles.basePrice, styles.hasDiscount)}>
						{getLocalizedPrice({
							price: isB2b ? basePrice.value : basePrice.valueWithVat,
							currency,
						})}
					</span>
					<span className={styles.discountedPrice}>
						{getLocalizedPrice({
							price: isB2b
								? priceWhenCouponAppliedWithoutVat
								: priceWhenCouponApplied,
							currency,
						})}
					</span>
					<DiscountPercentage
						className={styles.percentageDiscount}
						standardPriceWithVat={
							discountedPrice?.valueWithVat ?? basePrice.valueWithVat ?? 0
						}
						discountedPriceWithVat={priceWhenCouponApplied}
					/>
				</div>
				<span className={styles.priceWithoutVAT}>
					{`${t({
						id: isB2b ? 'basket.priceWithVAT' : 'basket.priceWithoutVAT',
					})} `}
					<span className={styles.value}>
						{getLocalizedPrice({
							price: isB2b
								? priceWhenCouponApplied
								: priceWhenCouponAppliedWithoutVat,
							currency,
						})}
					</span>
				</span>
			</div>
		);
	}

	if (isSet && !isDiscounted) {
		return (
			<div className={styles.prices}>
				<div className={styles.pricesWithVAT}>
					<span className={styles.basePrice}>
						{getLocalizedPrice({
							price: isB2b
								? discountedPrice?.value
								: discountedPrice?.valueWithVat,
							currency,
						})}
					</span>
				</div>
				<span className={styles.priceWithoutVAT}>
					{`${t({
						id: isB2b ? 'basket.priceWithVAT' : 'basket.priceWithoutVAT',
					})} `}
					<span className={styles.value}>
						{getLocalizedPrice({
							price: isB2b
								? discountedPrice?.valueWithVat
								: discountedPrice?.value,
							currency,
						})}
					</span>
				</span>
			</div>
		);
	}

	if (!isDiscounted) {
		return (
			<div className={styles.prices}>
				<div className={styles.pricesWithVAT}>
					<span className={styles.basePrice}>
						{getLocalizedPrice({
							price: isB2b ? basePrice.value : basePrice.valueWithVat,
							currency,
						})}
					</span>
				</div>
				<span className={styles.priceWithoutVAT}>
					{`${t({
						id: isB2b ? 'basket.priceWithVAT' : 'basket.priceWithoutVAT',
					})} `}
					<span className={styles.value}>
						{getLocalizedPrice({
							price: isB2b ? basePrice.valueWithVat : basePrice.value,
							currency,
						})}
					</span>
				</span>
			</div>
		);
	}

	return (
		<div className={styles.prices}>
			<div className={styles.pricesWithVAT}>
				<span className={cx(styles.basePrice, styles.hasDiscount)}>
					{getLocalizedPrice({
						price: isB2b ? basePrice.value : basePrice.valueWithVat,
						currency,
					})}
				</span>
				<span className={styles.discountedPrice}>
					{getLocalizedPrice({
						price: isB2b
							? discountedPrice?.value
							: discountedPrice?.valueWithVat,
						currency,
					})}
				</span>
				<DiscountPercentage
					className={styles.percentageDiscount}
					standardPriceWithVat={basePrice.valueWithVat}
					discountedPriceWithVat={discountedPrice?.valueWithVat ?? 0}
				/>
			</div>
			<span className={styles.priceWithoutVAT}>
				{`${t({
					id: isB2b ? 'basket.priceWithVAT' : 'basket.priceWithoutVAT',
				})} `}
				<span className={styles.value}>
					{getLocalizedPrice({
						price: isB2b
							? discountedPrice?.valueWithVat
							: discountedPrice?.value,
						currency,
					})}
				</span>
			</span>
		</div>
	);
};

export default Prices;
