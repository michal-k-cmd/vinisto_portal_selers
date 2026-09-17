import React, { useContext } from 'react';
import getBundleImage, { IMAGE_SIZE_THUMB_64x80 } from 'Helpers/getBundleImage';
import { LocalizationContext } from 'Services/LocalizationService';
import { getCountryCode } from 'Helpers/getFlagSpecification';
import { getLocalizedPrice } from 'vinisto_shared/src/price/get-localized-price';
import Flag from 'Components/Flag';
import { getDiscountPriceValues } from 'vinisto_shared/src/price/get-discount-prices';
import { useIsB2b } from 'Services/PlatformService';

import styles from './styles.module.css';

import { VinistoOrderDllModelsApiOrderOrderItem } from '@/api-types/order-api';
import {
	VinistoHelperDllEnumsCurrency,
	VinistoHelperDllEnumsPriceLevel,
} from '@/api-types/product-api';

interface OrderItemProps {
	item: VinistoOrderDllModelsApiOrderOrderItem;
}

const OrderItem = ({ item }: OrderItemProps) => {
	const isB2b = useIsB2b();
	const { useFormatMessage } = useContext(LocalizationContext);
	const t = useFormatMessage();

	const bundle = item.bundle ?? {};

	const quantity = item.quantity ?? 1;

	const priceWithVat = bundle.price?.valueWithVat ?? null;
	const priceWithoutVat = bundle.price?.value ?? null;

	const calculatedPriceAfterB2bDiscount = item.calculatedPriceAfterB2bDiscount;

	const { discountedPriceWithVat, discountedPriceWithoutVat } =
		getDiscountPriceValues({
			quantityInBasket: quantity,
			basePrice: bundle.price,
			discountedPrice: calculatedPriceAfterB2bDiscount ?? bundle.discountPrice,
		});

	const basePrice = item.bundle.prices?.find(
		(price) =>
			price.platformId === 0 &&
			price.level === VinistoHelperDllEnumsPriceLevel.Level1
	);

	const isVinistoPlusItem =
		item.bundle.price.level === VinistoHelperDllEnumsPriceLevel.VinistoPlus;

	const isDiscounted = (() => {
		if (
			typeof discountedPriceWithVat === 'number' &&
			typeof priceWithVat === 'number' &&
			discountedPriceWithVat > 0
		) {
			// Allow a small margin for floating point precision issues
			return priceWithVat - discountedPriceWithVat > 0.01;
		}
		return false;
	})();

	const hasVinistoPlusDiscount = (() => {
		if (isVinistoPlusItem && typeof basePrice?.valueWithVat === 'number') {
			return (
				basePrice?.valueWithVat - (item?.bundle.price.valueWithVat ?? 0) > 0.01
			);
		}
		return false;
	})();

	const originalPriceForB2cItem = isDiscounted ? priceWithVat : null;
	const originalPriceForB2bItem = isDiscounted ? priceWithoutVat : null;

	const originalPriceForVinistoPlusItem = hasVinistoPlusDiscount
		? basePrice?.valueWithVat
		: null;

	const originalPriceForB2cOrVinistoPlusItem = isVinistoPlusItem
		? originalPriceForVinistoPlusItem
		: originalPriceForB2cItem;

	const originalPrice = isB2b
		? originalPriceForB2bItem
		: originalPriceForB2cOrVinistoPlusItem;

	const priceWithoutVatValue =
		discountedPriceWithoutVat ?? bundle.price?.value ?? 0;

	const priceWithVatValue =
		discountedPriceWithVat ?? bundle.price?.valueWithVat ?? 0;

	const currency = bundle.price?.currency as VinistoHelperDllEnumsCurrency;

	return (
		<div className={styles.wrapper}>
			<div className={styles.imageWrapper}>
				<img
					src={getBundleImage([bundle.mainImage ?? {}], IMAGE_SIZE_THUMB_64x80)}
					alt={`${t({ id: 'alt.bundleImage' })}`}
				/>
				<span className={styles.quantity}>{quantity}x</span>
			</div>
			<div className={styles.itemInfo}>
				<span className={styles.title}>{bundle.name}</span>
				<div className={styles.producer}>
					<Flag
						code={getCountryCode(bundle.countrySpecification ?? '')}
						width="19"
						height="14"
						className="vinisto-flag"
						loading="lazy"
					/>
					<span>{bundle.producerSpecification?.value}</span>
				</div>
				<div className={styles.supplier}>
					<span>
						{t(
							{ id: 'bundle.supplier.name' },
							{
								name: bundle.supplierDetail?.nameWeb,
							}
						)}
					</span>
				</div>
			</div>
			<span
				className={styles.printQuantity}
				aria-hidden="true"
			>
				{quantity}x
			</span>
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
							price:
								((isB2b ? priceWithoutVatValue : priceWithVatValue) ?? 0) *
								(item.quantity ?? 1),
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
						price:
							((isB2b ? priceWithVatValue : priceWithoutVatValue) ?? 0) *
							(item.quantity ?? 1),
						currency,
					})}
				</div>
			</div>
		</div>
	);
};

export default OrderItem;
