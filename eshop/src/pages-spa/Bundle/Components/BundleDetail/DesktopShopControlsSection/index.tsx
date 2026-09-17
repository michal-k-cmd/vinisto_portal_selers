'use client';

import { useContext, useMemo, useRef } from 'react';
import { useHideHeaderOnScroll } from 'Hooks/use-hide-header-on-scroll';
import useFormatMessage from 'Hooks/useFormatMessage';
import { DeviceServiceContext } from 'Services/DeviceService';
import { WarehouseContext } from 'Services/WarehouseService';
import { BundleMeta } from 'pages-spa/Bundle/interfaces';
import { Bundle } from 'vinisto_api_client/src/domain/bundle';
import { type VolumeDiscount as VolumeDiscountType } from 'vinisto_api_client/src/domain/price';
import { BundleMetaForAnalytics } from 'Services/BasketService/interfaces';

import BundleItem from '../Components/ShopControls/Components/BundleItem';
import VolumeDiscount from '../Components/VolumeDiscount';
import {
	BundleItemQuantityBoxStyleVariants,
	BundleItemVariants,
	QuantityBoxVariants,
} from '../Components/ShopControls/Components/BundleItem/constants';
import FloatingShopControls from '../Components/FloatingShopControls';
import BundleInSets from '../Components/BundleInSetsTop';

import styles from './styles.module.css';

import { BasketItem } from '@/api-types/basket-api';

interface Props {
	bundleLimitPerOrder: number | null;
	itemInBasket: BasketItem | undefined;
	isQuantityLoading: boolean;
	isIdenticalBundlesDataLoading: boolean;
	availableQuantity: number;
	volumeDiscount: VolumeDiscountType | null;
	cheapestAvailableBundle: Bundle;
	bundleMeta: BundleMeta;
	bundleMetaForAnalytics: BundleMetaForAnalytics;
	unavailableReason?: 'temporary' | 'saleOver';
}

const DesktopShopControlsSection = ({
	bundleLimitPerOrder,
	itemInBasket,
	isQuantityLoading,
	isIdenticalBundlesDataLoading,
	availableQuantity,
	volumeDiscount,
	cheapestAvailableBundle,
	bundleMeta,
	bundleMetaForAnalytics,
	unavailableReason,
}: Props) => {
	const { isDesktop } = useContext(DeviceServiceContext);
	const { getQuantity } = useContext(WarehouseContext);
	const t = useFormatMessage();
	const shopControlsRef = useRef<HTMLDivElement>(null);
	const { isGift, isForLogged, isSaleOver, isTemporaryUnavailable } =
		cheapestAvailableBundle.flags;

	const isMaximumQuantityReached =
		(typeof bundleLimitPerOrder === 'number' &&
			bundleLimitPerOrder <= (itemInBasket?.quantity ?? 0)) ||
		availableQuantity <= (itemInBasket?.quantity ?? 0);

	const hideHeaderOptions = useMemo(
		() => ({
			enabled:
				(isQuantityLoading || availableQuantity > 0) &&
				!isGift &&
				!isSaleOver &&
				!isTemporaryUnavailable &&
				!isMaximumQuantityReached,
			isDesktop,
			threshold: 0,
		}),
		[
			availableQuantity,
			isDesktop,
			isGift,
			isMaximumQuantityReached,
			isQuantityLoading,
			isSaleOver,
			isTemporaryUnavailable,
		]
	);

	const isHeaderHidden = useHideHeaderOnScroll(
		shopControlsRef,
		hideHeaderOptions
	);

	return (
		<>
			<div ref={shopControlsRef}>
				<div className={styles.mainShopControls}>
					<BundleItem
						key={'bddsccheap' + cheapestAvailableBundle.id}
						bundle={cheapestAvailableBundle}
						variant={BundleItemVariants.STANDARD}
						isQuantityLoading={isQuantityLoading}
						quantityBox={QuantityBoxVariants.DIRECT}
						showBasketShortcut={true}
						quantityBoxStyleVariant={
							BundleItemQuantityBoxStyleVariants.PRODUCT_DETAIL
						}
						countInputLabel={t({ id: 'quantityBox.inBasketLabel' })}
						unavailableReason={unavailableReason}
					/>
				</div>
				<BundleInSets bundleId={cheapestAvailableBundle.id} />
				{volumeDiscount !== null &&
					!isTemporaryUnavailable &&
					!isGift &&
					!isSaleOver && (
						<VolumeDiscount
							bundleId={cheapestAvailableBundle.id}
							bundleUrl={cheapestAvailableBundle.url}
							isForLogged={isForLogged}
							volumeDiscount={volumeDiscount}
							discountedPrice={
								cheapestAvailableBundle.bundlePrices?.discountedPrice
							}
							warehouseCount={getQuantity(cheapestAvailableBundle.id) ?? 0}
							bundleLimitPerOrder={bundleLimitPerOrder}
							bundleMetaForAnalytics={bundleMetaForAnalytics}
						/>
					)}
			</div>
			{unavailableReason === undefined && (
				<FloatingShopControls
					isVisible={isHeaderHidden}
					bundle={cheapestAvailableBundle}
					bundleMeta={bundleMeta}
					availableQuantity={availableQuantity}
					isLoading={isQuantityLoading || isIdenticalBundlesDataLoading}
				/>
			)}
		</>
	);
};

export default DesktopShopControlsSection;
