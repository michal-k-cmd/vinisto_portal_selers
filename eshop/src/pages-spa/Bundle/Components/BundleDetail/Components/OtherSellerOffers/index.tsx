import FilterDropdownArrowIcon from 'Components/Icons/FilterDropdownArrow';
import FilterDropdownArrowOpenedIcon from 'Components/Icons/FilterDropdownArrowOpened';
import Loader from 'Components/View/Loader';
import { DeviceServiceContext } from 'Services/DeviceService';
import { LocalizationContext } from 'Services/LocalizationService';
import { Suspense, useContext, useMemo, useState } from 'react';
import { Bundle } from 'vinisto_api_client/src/domain/bundle';

import BundleItem from '../ShopControls/Components/BundleItem';
import {
	BundleItemQuantityBoxStyleVariants,
	BundleItemVariants,
	QuantityBoxVariants,
} from '../ShopControls/Components/BundleItem/constants';

import styles from './styles.module.css';

interface OtherSellerOffersProps {
	otherOffers: Bundle[];
}

const OtherSellerOffers = ({ otherOffers }: OtherSellerOffersProps) => {
	const t = useContext(LocalizationContext).useFormatMessage();
	const { isMobile } = useContext(DeviceServiceContext);
	const currency = useContext(LocalizationContext).activeCurrency?.title;

	const [isExpanded, setIsExpanded] = useState(false);

	const identicalBundlesPriceRange = useMemo(() => {
		const allOtherSellersPrices: number[] = [];
		otherOffers.forEach((bundle) => {
			const price = bundle.bundlePrices.isDiscounted
				? bundle.bundlePrices.discountedPrice
				: bundle.bundlePrices.basePrice;
			allOtherSellersPrices.push(price?.valueWithVat ?? 0);
		});

		return [
			Math.round(Math.min(...allOtherSellersPrices)),
			Math.round(Math.max(...allOtherSellersPrices)),
		] as const;
	}, [otherOffers]);

	const arePricesEqual = useMemo(() => {
		return identicalBundlesPriceRange[0] === identicalBundlesPriceRange[1];
	}, [identicalBundlesPriceRange]);

	return (
		<div className={styles.identicalBundlesWrap}>
			<div className={styles.identicalBundles}>
				<div className={styles.otherSellersHeading}>
					{t(
						{
							id: 'productDetail.otherSellersOffers',
						},
						{ count: otherOffers.length ?? '' }
					)}
				</div>
				{isExpanded ? (
					<div className="vinisto-product-detail-other-sellers-offers">
						{otherOffers.map((bundle) => (
							<BundleItem
								key={'otsobid' + bundle.id}
								bundle={bundle}
								variant={BundleItemVariants.STANDARD}
								quantityBox={
									isMobile
										? QuantityBoxVariants.DIRECT
										: QuantityBoxVariants.STANDARD
								}
								displayBargainPriceBadge={false}
								quantityBoxStyleVariant={
									BundleItemQuantityBoxStyleVariants.PRODUCT_DETAIL
								}
							/>
						))}
					</div>
				) : (
					<div className={styles.otherSellersPriceRange}>
						{arePricesEqual ? (
							<>
								{identicalBundlesPriceRange[0]} {currency}
							</>
						) : (
							<>
								{identicalBundlesPriceRange[0]} -{' '}
								{identicalBundlesPriceRange[1]} {currency}
							</>
						)}
					</div>
				)}
				<button
					className={styles.identicalBundlesButton}
					onClick={() => setIsExpanded((prev) => !prev)}
				>
					{t({
						id: isExpanded
							? 'productDetail.otherSellersOffers.collapse'
							: 'productDetail.otherSellersOffers.expand',
					})}
					{!isExpanded ? (
						<Suspense fallback={<Loader blank />}>
							<FilterDropdownArrowIcon className={styles.arrow} />
						</Suspense>
					) : (
						<Suspense fallback={<Loader blank />}>
							<FilterDropdownArrowOpenedIcon className={styles.arrow} />
						</Suspense>
					)}
				</button>
			</div>
		</div>
	);
};

export default OtherSellerOffers;
