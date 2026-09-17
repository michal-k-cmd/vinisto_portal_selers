import React, { useContext } from 'react';
import getBundleImage, { IMAGE_SIZE_THUMB_64x80 } from 'Helpers/getBundleImage';
import { LocalizationContext } from 'Services/LocalizationService';
import { getLocalizedValue } from 'Hooks/useLocalizedValue';
import getFlagSpecification from 'Helpers/getFlagSpecification';
import { getLocalizedPrice } from 'vinisto_shared/src/price/get-localized-price';
import { useIsB2b } from 'Services/PlatformService';

import { BasketItemProps } from '../../../BasketItem/interfaces';

import styles from './styles.module.css';

import { VinistoHelperDllEnumsPriceLevel } from '@/api-types/product-api';

const BasketItem = ({ item, currency }: BasketItemProps) => {
	const isB2b = useIsB2b();
	const { useFormatMessage } = useContext(LocalizationContext);
	const t = useFormatMessage();

	const { shortVariety: bundleProducerName, component: bundleFlag } =
		getFlagSpecification(item.bundle?.specificationDetails ?? []);

	const { basePrice } = item.bundle?.bundlePrices ?? {};

	const isVinistoPlusItem =
		// @ts-expect-error Types need update
		item.priceLevel === VinistoHelperDllEnumsPriceLevel.VinistoPlus;

	const isDiscounted = (() => {
		if (
			typeof item.discountPriceWithVat === 'number' &&
			typeof item.priceWithVat === 'number' &&
			item.discountPriceWithVat > 0
		) {
			// Allow a small margin for floating point precision issues
			return item.priceWithVat - item.discountPriceWithVat > 0.01;
		}
		return false;
	})();

	const hasVinistoPlusDiscount = (() => {
		if (isVinistoPlusItem && typeof basePrice?.valueWithVat === 'number') {
			return (
				basePrice?.valueWithVat -
					(item?.discountPriceWithVat ?? item?.priceWithVat ?? 0) >
				0.01
			);
		}
		return false;
	})();

	const originalPriceForB2CItem = isDiscounted ? item.priceWithVat : null;
	const originalPriceForB2BItem = isDiscounted ? item.price : null;

	const originalPriceForVinistoPlusItem = hasVinistoPlusDiscount
		? basePrice?.valueWithVat
		: null;

	const originalPrice = isB2b
		? originalPriceForB2BItem
		: isVinistoPlusItem
		? originalPriceForVinistoPlusItem
		: originalPriceForB2CItem;

	// BEWARE! Discounted price can be actually higher than the original price
	// If discounted price exists, it is always used for the total price calculation
	const priceWithoutVat = item.discountPrice ?? item.price;
	const priceWithVat = item.discountPriceWithVat ?? item.priceWithVat;
	const primaryPrice = isB2b ? priceWithoutVat : priceWithVat;
	const secondaryPrice = isB2b ? priceWithVat : priceWithoutVat;

	const quantity = item.quantity ?? 1;

	return (
		<div className={styles.wrapper}>
			<div className={styles.imageWrapper}>
				<img
					src={getBundleImage(
						item.bundle?.images ?? [],
						IMAGE_SIZE_THUMB_64x80
					)}
					alt={`${t({ id: 'alt.bundleImage' })}`}
				/>
				<span className={styles.quantity}>{quantity}x</span>
			</div>
			<div className={styles.itemInfo}>
				<span className={styles.title}>
					{getLocalizedValue(item.bundle?.name)}
				</span>
				<div className={styles.producer}>
					{bundleFlag}
					<span>{bundleProducerName}</span>
				</div>
				<div className={styles.supplier}>
					<span>
						{t(
							{ id: 'bundle.supplier.name' },
							{
								name: item.bundle?.supplier?.nameWeb,
							}
						)}
					</span>
				</div>
			</div>
			<div className={styles.priceWrapper}>
				<div>
					{originalPrice && (
						<del className={styles.originalPrice}>
							{getLocalizedPrice({
								price: originalPrice * quantity,
								currency,
							})}
						</del>
					)}
					<span className={styles.price}>
						{getLocalizedPrice({
							price: primaryPrice ? primaryPrice * quantity : 0,
							currency,
						})}
					</span>
				</div>
				<div className={styles.priceWithoutVat}>
					<span>
						{t({
							id: isB2b ? 'basket.priceWithVAT' : 'basket.priceWithoutVAT',
						})}{' '}
					</span>
					{getLocalizedPrice({
						price: secondaryPrice ? secondaryPrice * quantity : 0,
						currency,
					})}
				</div>
			</div>
		</div>
	);
};

export default BasketItem;
