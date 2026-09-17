import { useContext } from 'react';
import Skeleton from 'react-loading-skeleton';
import { LocalizationContext } from 'Services/LocalizationService';
import { DiscountPercentage } from 'vinisto_ui';
import {
	useDiscountCoupons,
	useFindBundleInBasket,
} from 'pages-spa/Bundle/hooks';
import getBundleLimitPerOrder from 'Helpers/getBundleLimitPerOrder';
import dayjs from 'dayjs';
import { Bundle } from 'vinisto_api_client/src/domain/bundle';
import { getLocalizedPrice } from 'vinisto_shared/src/price/get-localized-price';
import useShowVinistoPlusPrice from 'Hooks/use-show-vinisto-plus-price';
import { useIsB2b } from 'Services/PlatformService';

import styles from './styles.module.css';
import VinistoPlusPrice from './VinistoPlusPrice';

interface ProductBoxPricesProps {
	bundleData: Bundle | null;
	isLoading?: boolean;
}

const ProductBoxPrices = ({
	bundleData,
	isLoading = false,
}: ProductBoxPricesProps) => {
	const isB2b = useIsB2b();
	const localizationContext = useContext(LocalizationContext);

	const t = localizationContext.useFormatMessage();
	const { currency } = localizationContext.activeCurrency;

	const bundle = bundleData ?? null;

	const {
		isCouponAvailable,
		priceWhenCouponApplied,
		priceWhenCouponAppliedWithoutVat,
		mostValuableDiscountCouponCode,
	} = useDiscountCoupons({ bundle: bundle ?? null });
	const itemInBasket = useFindBundleInBasket({ bundleId: bundle?.id });

	const bundleLimitPerOrder = getBundleLimitPerOrder(bundle?.orderLimitation);
	const wouldApplyingExceedOrderLimitation =
		typeof bundleLimitPerOrder === 'number' &&
		bundleLimitPerOrder <= (itemInBasket?.quantity ?? 0);

	const bundlePrices = bundle?.bundlePrices ?? null;

	const {
		basePrice,
		discountedPrice,
		isDiscounted,
		vinistoPlusPriceOrDiscount,
	} = bundlePrices ?? {};

	const isDiscountEndingSoon =
		discountedPrice?.validTo &&
		dayjs(discountedPrice.validTo).isBefore(dayjs().add(3, 'day'));

	const formattedValidTo = discountedPrice?.validTo
		? dayjs(discountedPrice.validTo).format('D. M.')
		: null;

	const { showPossibleVinistoPlusPrice, canBuyForVinistoPlusPrice } =
		useShowVinistoPlusPrice({
			vinistoPlusPriceOrDiscount,
			priceWhenCouponApplied,
			canBeCouponApplied:
				isCouponAvailable && !wouldApplyingExceedOrderLimitation,
		});

	return isCouponAvailable && !wouldApplyingExceedOrderLimitation ? (
		<div>
			{showPossibleVinistoPlusPrice && (
				<VinistoPlusPrice
					canBuyForVinistoPlusPrice={canBuyForVinistoPlusPrice}
					className={styles.plusPriceCouponNotLogged}
					isLoading={isLoading}
					price={vinistoPlusPriceOrDiscount ?? null}
				/>
			)}
			<div className={styles.originalPrices}>
				<div className={styles.originalPriceWithVat}>
					{getLocalizedPrice({
						price: isB2b ? basePrice?.value : basePrice?.valueWithVat,
						currency,
					})}
				</div>
				<div className={styles.originalPrice}>
					{`${t({
						id: isB2b ? 'basket.priceWithVAT' : 'basket.priceWithoutVAT',
					})} `}{' '}
					{getLocalizedPrice({
						price: isB2b ? basePrice?.valueWithVat : basePrice?.value,
						currency,
					})}
				</div>
			</div>
			<div className={styles.couponHeading}>
				{`${t({ id: 'productbox.priceWithCoupon' })} `}{' '}
				{mostValuableDiscountCouponCode}
			</div>
			<div className={styles.couponWrap}>
				<div className={styles.discountPriceWrap}>
					<span className={styles.discountPriceWithVat}>
						{getLocalizedPrice({
							price: isB2b
								? priceWhenCouponAppliedWithoutVat
								: priceWhenCouponApplied,
							currency,
						})}
					</span>
					<DiscountPercentage
						discountedPriceWithVat={priceWhenCouponApplied ?? 0}
						standardPriceWithVat={basePrice?.valueWithVat ?? 0}
						className={styles.discountPercentage}
					/>
				</div>
				<div className={styles.discountPrice}>
					{t({ id: isB2b ? 'basket.priceWithVAT' : 'basket.priceWithoutVAT' })}{' '}
					{getLocalizedPrice({
						price: isB2b
							? priceWhenCouponApplied
							: priceWhenCouponAppliedWithoutVat,
						currency,
					})}
				</div>
				<div className={styles.couponInfo}>
					{t({ id: 'productbox.couponInfo' })}
				</div>
			</div>
			{canBuyForVinistoPlusPrice && (
				<VinistoPlusPrice
					canBuyForVinistoPlusPrice={canBuyForVinistoPlusPrice}
					className={styles.plusPriceCoupon}
					isLoading={isLoading}
					price={vinistoPlusPriceOrDiscount ?? null}
				/>
			)}
		</div>
	) : isDiscountEndingSoon ? (
		<div className={styles.limited}>
			{showPossibleVinistoPlusPrice && (
				<VinistoPlusPrice
					canBuyForVinistoPlusPrice={canBuyForVinistoPlusPrice}
					className={styles.plusPriceEndingCouponNotLogged}
					isLoading={isLoading}
					price={vinistoPlusPriceOrDiscount ?? null}
				/>
			)}
			<div className={styles.limitedHeading}>
				{`${t({ id: 'productbox.limited' })} ${formattedValidTo}`}
			</div>
			<div className={styles.limitedWrap}>
				<div className={styles.originalLimitedPrices}>
					<div className={styles.originalPriceWithVat}>
						{getLocalizedPrice({
							price: isB2b ? basePrice?.value : basePrice?.valueWithVat,
							currency,
						})}
					</div>
				</div>
				<div className={styles.discountPriceWrap}>
					<span className={styles.discountPriceWithVat}>
						{getLocalizedPrice({
							price: isB2b
								? discountedPrice.value
								: discountedPrice.valueWithVat,
							currency,
						})}
					</span>
					<DiscountPercentage
						discountedPriceWithVat={discountedPrice.valueWithVat ?? 0}
						standardPriceWithVat={basePrice?.valueWithVat ?? 0}
						className={styles.discountPercentage}
					/>
				</div>
				<div className={styles.discountPrice}>
					{t({ id: isB2b ? 'basket.priceWithVAT' : 'basket.priceWithoutVAT' })}{' '}
					{getLocalizedPrice({
						price: isB2b ? discountedPrice.valueWithVat : discountedPrice.value,
						currency,
					})}
				</div>
			</div>
			{canBuyForVinistoPlusPrice && (
				<VinistoPlusPrice
					canBuyForVinistoPlusPrice={canBuyForVinistoPlusPrice}
					className={styles.plusPriceCoupon}
					isLoading={isLoading}
					price={vinistoPlusPriceOrDiscount ?? null}
				/>
			)}
		</div>
	) : canBuyForVinistoPlusPrice ? (
		<>
			<span className={styles.basePrice}>
				{getLocalizedPrice({
					price: isB2b ? basePrice?.value : basePrice?.valueWithVat,
					currency,
				})}
			</span>
			<VinistoPlusPrice
				canBuyForVinistoPlusPrice={canBuyForVinistoPlusPrice}
				isLoading={isLoading}
				price={vinistoPlusPriceOrDiscount ?? null}
			/>
		</>
	) : (
		<>
			<div className="vinisto-wine__price">
				{showPossibleVinistoPlusPrice && (
					<VinistoPlusPrice
						canBuyForVinistoPlusPrice={canBuyForVinistoPlusPrice}
						isLoading={isLoading}
						price={vinistoPlusPriceOrDiscount ?? null}
					/>
				)}
				{isLoading ? (
					<Skeleton
						width="100%"
						inline
					/>
				) : (
					<>
						{isDiscounted && (
							<span className="vinisto-wine__price--original">
								{getLocalizedPrice({
									price: isB2b ? basePrice?.value : basePrice?.valueWithVat,
									currency,
								})}
							</span>
						)}
						<div className={styles.discountPriceWrap}>
							{isDiscounted
								? getLocalizedPrice({
										price: isB2b
											? discountedPrice?.value
											: discountedPrice?.valueWithVat,
										currency,
								  })
								: getLocalizedPrice({
										price: isB2b ? basePrice?.value : basePrice?.valueWithVat,
										currency,
								  })}
							{isDiscounted && (
								<DiscountPercentage
									discountedPriceWithVat={discountedPrice?.valueWithVat ?? 0}
									standardPriceWithVat={basePrice?.valueWithVat ?? 0}
									className={styles.discountPercentage}
								/>
							)}
						</div>
					</>
				)}
			</div>
			<div className="vinisto-wine__price--no-vat">
				{isLoading ? (
					<Skeleton
						width="100%"
						inline
					/>
				) : (
					t(
						{
							id: isB2b ? 'carousel.info.withVAT' : 'carousel.info.withoutVAT',
						},
						{
							priceWithCurrency: isDiscounted
								? getLocalizedPrice({
										price: isB2b
											? discountedPrice?.valueWithVat
											: discountedPrice?.value,
										currency,
								  })
								: getLocalizedPrice({
										price: isB2b ? basePrice?.valueWithVat : basePrice?.value,
										currency,
								  }),
						}
					)
				)}
			</div>
		</>
	);
};

export default ProductBoxPrices;
