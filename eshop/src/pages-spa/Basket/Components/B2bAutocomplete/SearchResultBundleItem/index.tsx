import { useContext, useMemo } from 'react';
import cx from 'classnames';
import useLocalizedValue from 'Hooks/useLocalizedValue';
import getBundleImage, { IMAGE_SIZE_THUMB_64x80 } from 'Helpers/getBundleImage';
import { LocalizationContext } from 'Services/LocalizationService';
import BundleProducer from 'Components/ProductBox/Components/BundleProducer';
import getFlagSpecification from 'Helpers/getFlagSpecification';
import StockAvailability from 'Components/StockAvailability';
import { WarehouseContext } from 'Services/WarehouseService';
import { DirectQuantityBox } from 'Components/QuantityBox';
import Skeleton from 'react-loading-skeleton';
import { useDiscountCoupons } from 'pages-spa/Bundle/hooks';
import { getLocalizedPrice } from 'vinisto_shared/src/price/get-localized-price';
import { DiscountPercentage } from 'vinisto_ui';
import { BundlePrice } from 'vinisto_api_client/src/domain/price';
import { Bundle } from 'vinisto_api_client/src/domain/bundle';
import Link from 'next/link';
import { useIsB2b, usePlatformContext } from 'Services/PlatformService';
import removeDiacritics from 'Helpers/removeDiacritics';
import CustomHighlighter from 'Components/CustomHighlighter';

import styles from './styles.module.css';

type Props = {
	bundle: Bundle;
	searchString?: string | null;
	className?: string;
	displayCta?: boolean;
};

const SearchResultBundleItem = ({
	bundle,
	searchString,
	className,
	displayCta = false,
}: Props) => {
	const warehouseContext = useContext(WarehouseContext);
	const localizationContext = useContext(LocalizationContext);
	const { getIsInAdminIframe } = usePlatformContext();

	const getLocalizedValue = useLocalizedValue();
	const t = localizationContext.useFormatMessage();

	const name = getLocalizedValue(bundle.name);

	const couponData = useDiscountCoupons({ bundle });

	const availableQuantity = [warehouseContext.getQuantity(bundle.id)].filter(
		(x): x is number => x !== undefined
	);

	const { shortVariety: producerName, component: flag } = getFlagSpecification(
		bundle?.specificationDetails ?? []
	);

	const bundlePrices = bundle.bundlePrices;

	const warehouseId = bundle.warehouseId.join(', ');

	const isInAdminIframe = getIsInAdminIframe();

	const search = useMemo(
		() => (searchString ? [searchString] : []),
		[searchString]
	);

	return (
		<div className={cx(styles.wrapper, className)}>
			<Link
				className={styles.image}
				href={
					isInAdminIframe
						? ''
						: `/${t({ id: 'routes.product.route' })}/${getLocalizedValue(
								bundle.url
						  )}`
				}
			>
				<img
					src={getBundleImage(bundle.images ?? [], IMAGE_SIZE_THUMB_64x80)}
					alt={`${t({ id: 'alt.bundleImage' })}`}
				/>
			</Link>
			<div className={styles.info}>
				<Link
					className={styles.name}
					href={
						isInAdminIframe
							? ''
							: `/${t({ id: 'routes.product.route' })}/${getLocalizedValue(
									bundle.url
							  )}`
					}
				>
					<CustomHighlighter
						searchWords={search}
						textToHighlight={name}
						sanitize={removeDiacritics}
						autoEscape
					/>
				</Link>
				{warehouseId && (
					<span className={styles.warehouseId}>
						{t(
							{ id: 'warehouseId' },
							{
								id: (
									<strong>
										<CustomHighlighter
											searchWords={search}
											textToHighlight={warehouseId}
											autoEscape
										/>
									</strong>
								),
							}
						)}
					</span>
				)}
				{producerName && (
					<BundleProducer
						flag={flag}
						name={producerName}
						className={styles.producer}
						searchString={searchString}
					/>
				)}
			</div>
			<div className={styles.metadata}>
				<div className={styles.stock}>
					<StockAvailability
						availableQuantity={availableQuantity}
						deliveryDate={warehouseContext.deliveryDate}
						fallback={<Skeleton width="130px" />}
					/>
				</div>
				<Prices
					bundlePrices={bundlePrices}
					isSet={bundle?.flags.isSet ?? false}
					couponData={couponData}
				/>
				{displayCta && (
					<div
						onClick={(e) => e.stopPropagation()}
						className={styles.cta}
						role="button"
						tabIndex={0}
					>
						<DirectQuantityBox bundle={bundle} />
					</div>
				)}
			</div>
		</div>
	);
};

export default SearchResultBundleItem;

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
		priceWhenCouponAppliedWithoutVat &&
		!isB2b
	) {
		return (
			<div className={styles.prices}>
				<div className={styles.pricesWithVAT}>
					<span className={cx(styles.basePrice, styles.hasDiscount)}>
						{getLocalizedPrice({
							price: basePrice.valueWithVat,
							currency,
						})}
					</span>
					<span className={styles.discountedPrice}>
						{getLocalizedPrice({ price: priceWhenCouponApplied, currency })}
					</span>
					<DiscountPercentage
						className={styles.percentageDiscount}
						standardPriceWithVat={
							discountedPrice?.valueWithVat ?? basePrice?.valueWithVat ?? 0
						}
						discountedPriceWithVat={priceWhenCouponApplied}
					/>
				</div>
				<span className={styles.priceWithoutVAT}>
					{`${t({ id: 'basket.priceWithoutVAT' })} `}
					<span className={styles.value}>
						{getLocalizedPrice({
							price: priceWhenCouponAppliedWithoutVat,
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
						{!!discountedPrice &&
							getLocalizedPrice({
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
						{!!discountedPrice &&
							getLocalizedPrice({
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
					{!!discountedPrice &&
						getLocalizedPrice({
							price: isB2b
								? discountedPrice.value
								: discountedPrice.valueWithVat,
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
					{!!discountedPrice &&
						getLocalizedPrice({
							price: isB2b
								? discountedPrice.valueWithVat
								: discountedPrice.value,
							currency,
						})}
				</span>
			</span>
		</div>
	);
};
