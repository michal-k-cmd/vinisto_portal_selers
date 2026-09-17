import useLocalizedValue from 'Hooks/useLocalizedValue';
import { getLocalizedPrice } from 'vinisto_shared/src/price/get-localized-price';
import { LocalizationContext } from 'Services/LocalizationService';
import { useContext } from 'react';

import styles from './styles.module.css';

import { BasketItemB2B, Currency } from '@/api-types/basket-api';
import { Bundle } from '@/domain/bundle';
import { VinistoHelperDllEnumsCurrency } from '@/api-types/product-api';

interface Props {
	mergedBasketItem: BasketItemB2B & { bundle: Bundle | undefined };
	basketCurrency: Currency | VinistoHelperDllEnumsCurrency;
}

const ItemToApprove = ({ mergedBasketItem, basketCurrency }: Props) => {
	const t = useContext(LocalizationContext).useFormatMessage();
	const getLocalizedValue = useLocalizedValue();

	const bundleName = getLocalizedValue(mergedBasketItem.bundle?.name);
	const quantity = mergedBasketItem.quantity ?? 1;
	const imgSrc =
		mergedBasketItem.bundle?.images?.[0]?.domainUrls[`thumb_64x80`] ?? '';

	return (
		<div className={styles.itemToApprove}>
			<div className={styles.thumbnail}>
				{!!imgSrc && (
					<img
						src={imgSrc}
						alt=""
						width="32"
						height="40"
					/>
				)}
			</div>
			<span>{bundleName}</span>
			<div className="text-end">
				<div className={styles.originalPrice}>
					{getLocalizedPrice({
						price:
							mergedBasketItem.discountPrice ?? mergedBasketItem.price ?? 0,
						currency: basketCurrency,
					})}
				</div>
				<div className={styles.price}>
					{getLocalizedPrice({
						price:
							mergedBasketItem.discountPriceAdditionalPercentageDiscount ?? 0,
						currency: basketCurrency,
					})}
				</div>
				<div className={styles.priceWithVat}>
					{`(${getLocalizedPrice({
						price:
							mergedBasketItem.discountPriceWithVatAdditionalPercentageDiscount ??
							0,
						currency: basketCurrency,
					})}	vč. DPH)`}
				</div>
			</div>
			<div className="text-end">
				{/*eslint-disable-next-line no-irregular-whitespace*/}
				{quantity} {t({ id: 'pcs' })}
			</div>
			<div className="text-end">
				<div className={styles.originalPrice}>
					{getLocalizedPrice({
						price:
							(mergedBasketItem.discountPrice ?? mergedBasketItem.price ?? 0) *
							quantity,
						currency: basketCurrency,
					})}
				</div>
				<div className={styles.price}>
					{getLocalizedPrice({
						price:
							(mergedBasketItem.discountPriceAdditionalPercentageDiscount ??
								0) * quantity,
						currency: basketCurrency,
					})}
				</div>
				<div className={styles.priceWithVat}>
					{`(${getLocalizedPrice({
						price:
							(mergedBasketItem.discountPriceWithVatAdditionalPercentageDiscount ??
								0) * quantity,
						currency: basketCurrency,
					})}	vč. DPH)`}
				</div>
			</div>
			{/*<span>
				{getLocalizedPrice({
					price: (mergedBasketItem.feeLoss ?? 0) * quantity,
					currency: basketCurrency,
				})}
			</span>*/}
		</div>
	);
};

export default ItemToApprove;
