import { Fragment, useContext } from 'react';
import cx from 'classnames';
import BundleProducer from 'Components/ProductBox/Components/BundleProducer';
import Skeleton from 'react-loading-skeleton';
import { SHOW_EXACT_UNDER_COUNT } from 'Components/StockAvailability/constants';
import { LocalizationContext } from 'Services/LocalizationService';
import { DirectQuantityBox } from 'Components/QuantityBox';
import quantityBoxStyles from 'Components/QuantityBox/styles.module.css';
import { QuantityBoxPlusBtnTypes } from 'Components/QuantityBox/constants';
import { getLocalizedPrice } from 'vinisto_shared/src/price/get-localized-price';
import getFlagSpecification from 'Helpers/getFlagSpecification';
import { Bundle } from 'vinisto_api_client/src/domain/bundle';
import { useBundleMeta } from 'pages-spa/Bundle/hooks/use-bundle-detail';
import {
	useDiscountCoupons,
	useFindBundleInBasket,
} from 'pages-spa/Bundle/hooks';
import getBundleLimitPerOrder from 'Helpers/getBundleLimitPerOrder';
import ImageLocal from 'Components/View/ImageLocal';
import useShowVinistoPlusPrice from 'Hooks/use-show-vinisto-plus-price';
import useCanSeePrices from 'Hooks/use-can-see-prices';
import { useIsB2b } from 'Services/PlatformService';

import BundleBasketShortcut from '../ShopControls/Components/BundleBasketShortcut';

import styles from './styles.module.css';

interface Props {
	isVisible: boolean;
	bundle: Bundle;
	bundleMeta: ReturnType<typeof useBundleMeta>;
	availableQuantity: number;
	isLoading: boolean;
}

const FloatingShopControls = ({
	bundle,
	bundleMeta,
	availableQuantity,
	isLoading,
	...props
}: Props) => {
	const {
		shortVariety: bundleProducerName,
		varietyUrl: bundleProducerUrl,
		component: bundleFlag,
	} = getFlagSpecification(bundle?.specificationDetails ?? []);

	if (isLoading) {
		return (
			<div
				className={cx(styles.wrapper, { [styles.visible]: props.isVisible })}
			>
				<div className="container">
					<div>
						<img
							className={styles.productImage}
							src={bundleMeta.bundleImageSmall}
							alt={bundleMeta.bundleName}
						/>
						<div className={styles.productInfo}>
							<div>
								<span className={styles.productTitle}>
									{bundleMeta.bundleName}
								</span>
								<Skeleton
									width="80px"
									height="12px"
								/>
							</div>
							<Skeleton
								width="120px"
								height="12px"
							/>
						</div>
					</div>
					<div>
						<div>
							<Skeleton
								width="70px"
								height="12px"
							/>
							<Skeleton
								width="80px"
								height="20px"
							/>
							<Skeleton
								width="120px"
								height="12px"
							/>
						</div>
						<div
							style={{
								display: 'flex',
								gap: '0.5rem',
							}}
						>
							<Skeleton
								width="144px"
								height="48px"
							/>
							<Skeleton
								width="304px"
								height="48px"
							/>
						</div>
					</div>
				</div>
			</div>
		);
	}

	return (
		<div className={cx(styles.wrapper, { [styles.visible]: props.isVisible })}>
			<div className="container">
				<div>
					<img
						className={styles.productImage}
						src={bundleMeta.bundleImageSmall}
						alt={bundleMeta.bundleName}
					/>
					<div className={styles.productInfo}>
						<div>
							<span className={styles.productTitle}>
								{bundleMeta.bundleName}
							</span>
							<BundleProducer
								flag={bundleFlag}
								url={bundleProducerUrl}
								name={bundleProducerName}
							/>
						</div>
						<span className={styles.stock}>
							<StockAvailability
								availableQuantity={availableQuantity}
								isLoading={isLoading}
							/>
						</span>
					</div>
				</div>
				<div className={styles.quantityBoxWrapper}>
					<BundlePrice bundle={bundle} />
					<DirectQuantityBox
						className={cx(
							quantityBoxStyles.quantityBox,
							quantityBoxStyles.productDetail,
							quantityBoxStyles.fullWidth,
							quantityBoxStyles.stretchCountWrapper,
							styles.quantityBox,
							styles.floatingProductDetailQuantityBox
						)}
						plusBtnType={QuantityBoxPlusBtnTypes.EXTENDED}
						orderLimitation={bundle?.orderLimitation}
						bundle={bundle}
						isLoading={isLoading}
						popoverClassname={styles.quantityBoxPopover}
						shouldOpenCrossSellModal={true}
					/>
					<BundleBasketShortcut
						bundleId={bundle?.id}
						className={styles.basketShortcut}
						size="md"
					/>
				</div>
			</div>
		</div>
	);
};

export default FloatingShopControls;

interface BundlePriceProps {
	bundle: Bundle;
}

const BundlePrice = ({ bundle }: BundlePriceProps) => {
	const isB2b = useIsB2b();
	const canSeePrices = useCanSeePrices();
	const t = useContext(LocalizationContext).useFormatMessage();

	const {
		basePrice,
		discountedPrice,
		vinistoPlusPriceOrDiscount,
		isDiscounted,
		discountDifferenceAsPercentage,
	} = bundle.bundlePrices;

	const { isCouponAvailable, priceWhenCouponApplied } = useDiscountCoupons({
		bundle: bundle ?? null,
	});
	const itemInBasket = useFindBundleInBasket({ bundleId: bundle?.id });

	const bundleLimitPerOrder = getBundleLimitPerOrder(bundle?.orderLimitation);
	const wouldApplyingExceedOrderLimitation =
		typeof bundleLimitPerOrder === 'number' &&
		bundleLimitPerOrder <= (itemInBasket?.quantity ?? 0);

	const { canBuyForVinistoPlusPrice } = useShowVinistoPlusPrice({
		vinistoPlusPriceOrDiscount,
		priceWhenCouponApplied,
		canBeCouponApplied:
			isCouponAvailable && !wouldApplyingExceedOrderLimitation,
	});

	if (!canSeePrices) return null;

	if (vinistoPlusPriceOrDiscount && canBuyForVinistoPlusPrice) {
		return (
			<div className={cx(styles.bundlePriceWrapper, styles.vinistoPlusPrice)}>
				<ImageLocal
					fileName="plus.svg"
					className={styles.vinistoPlusImg}
				/>
				<div className={styles.mainPriceWrapper}>
					<span className={styles.mainPrice}>
						{getLocalizedPrice({
							price: vinistoPlusPriceOrDiscount.valueWithVat,
							currency: vinistoPlusPriceOrDiscount.currency,
						})}
					</span>
				</div>
				<span className={styles.priceWithoutVat}>
					{t(
						{ id: 'price.withoutVAT' },
						{
							priceWithCurrency: getLocalizedPrice({
								price: vinistoPlusPriceOrDiscount.value,
								currency: vinistoPlusPriceOrDiscount.currency,
							}),
						}
					)}
				</span>
			</div>
		);
	}

	if (isDiscounted && discountedPrice) {
		return (
			<div className={styles.bundlePriceWrapper}>
				{discountedPrice && (
					<span className={styles.oldPrice}>
						{getLocalizedPrice({
							price: isB2b ? basePrice.value : basePrice.valueWithVat,
							currency: basePrice.currency,
						})}
					</span>
				)}
				<div className={styles.mainPriceWrapper}>
					<span className={styles.mainPrice}>
						{getLocalizedPrice({
							price: isB2b
								? discountedPrice.value
								: discountedPrice.valueWithVat,
							currency: discountedPrice.currency,
						})}
					</span>
					<span className={styles.percentageDiscount}>
						{`${discountDifferenceAsPercentage.toFixed(0)} %`}
					</span>
				</div>
				<span className={styles.priceWithoutVat}>
					{t(
						{ id: isB2b ? 'price.withVAT' : 'price.withoutVAT' },
						{
							priceWithCurrency: getLocalizedPrice({
								price: isB2b
									? discountedPrice.valueWithVat
									: discountedPrice.value,
								currency: discountedPrice.currency,
							}),
						}
					)}
				</span>
			</div>
		);
	}

	return (
		<div className={styles.bundlePriceWrapper}>
			<div className={styles.mainPriceWrapper}>
				<span className={styles.mainPrice}>
					{getLocalizedPrice({
						price: isB2b ? basePrice.value : basePrice.valueWithVat,
						currency: basePrice.currency,
					})}
				</span>
			</div>
			<span className={styles.priceWithoutVat}>
				{t(
					{ id: isB2b ? 'price.withVAT' : 'price.withoutVAT' },
					{
						priceWithCurrency: getLocalizedPrice({
							price: isB2b ? basePrice.valueWithVat : basePrice.value,
							currency: basePrice.currency,
						}),
					}
				)}
			</span>
		</div>
	);
};

interface StockAvailabilityProps {
	availableQuantity: number;
	isLoading: boolean;
}

const StockAvailability = ({
	availableQuantity,
	isLoading,
}: StockAvailabilityProps) => {
	const t = useContext(LocalizationContext).useFormatMessage();

	return (
		<div className={styles.avaibilityDeliveryWrapper}>
			<span className={styles.availableCount}>
				{availableQuantity === undefined || isLoading ? (
					<Skeleton width="120px" />
				) : availableQuantity > SHOW_EXACT_UNDER_COUNT ? (
					t(
						{ id: 'bundleAvailability.inStock.moreThanCount2' },
						{
							valueWrap: (
								<span
									key="bp-bundleAvailability.inStock.moreThanCount2.valueWrap"
									className={cx({
										[styles.textGreen]: availableQuantity > 0,
									})}
								>
									{t(
										{
											id: 'bundleAvailability.inStock.moreThanCount2.valueWrap',
										},
										{
											value: (
												<Fragment
													key={
														'pbf-bundleAvailability.inStock.moreThanCount2.valueWrap'
													}
												>
													{t(
														{
															id: 'bundleAvailability.inStock.moreThanCount.info',
														},
														{
															count: SHOW_EXACT_UNDER_COUNT,
														}
													)}
												</Fragment>
											),
										}
									)}
								</span>
							),
						}
					)
				) : (
					t(
						{ id: 'bundle.warehouse.info.stock' },
						{
							value: (
								<span
									key="bundle.warehouse.info.stock"
									className={cx({
										[styles.textGreen]: availableQuantity > 0,
									})}
								>
									{t(
										{ id: 'bundle.warehouse.quantity' },
										{
											count: availableQuantity,
										}
									)}
								</span>
							),
						}
					)
				)}
				<span
					className={cx({
						[styles.textGreen]: availableQuantity > 0,
					})}
				>
					{', '}
					{t(
						{
							id: 'bundle.supplier.avaibility.available',
						},
						{
							value: t({
								id: 'bundle.supplier.avaibility.centralWarehouse',
							}),
						}
					)}
				</span>
			</span>
		</div>
	);
};
