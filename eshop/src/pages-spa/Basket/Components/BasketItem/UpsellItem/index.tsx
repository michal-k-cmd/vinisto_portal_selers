import { useContext } from 'react';
import cx from 'classnames';
import { DirectQuantityBox } from 'Components/QuantityBox';
import { getLocalizedValue } from 'Hooks/useLocalizedValue';
import getBundleImage, { IMAGE_SIZE_THUMB_64x80 } from 'Helpers/getBundleImage';
import { LocalizationContext } from 'Services/LocalizationService';
import { getLocalizedPrice } from 'vinisto_shared/src/price/get-localized-price';
import { BasketContext } from 'Services/BasketService';
import { getBundleMetaForAnalytics } from 'Services/BasketService/helpers';

import GreenCheckbox from '../GreenCheckbox';

import styles from './styles.module.css';

import { Bundle } from '@/domain/bundle';
import { BasketItem } from '@/api-types/basket-api';

interface UpsellItemProps {
	parentItem: BasketItem & {
		bundle?: Bundle;
	};
	relatedBundle: Bundle;
	baseQuantity: number;
}

const UpsellItem = ({
	parentItem,
	relatedBundle,
	baseQuantity,
}: UpsellItemProps) => {
	const localizationContext = useContext(LocalizationContext);
	const {
		activeCurrency: { currency },
	} = localizationContext;
	const t = localizationContext.useFormatMessage();

	const { handleOnChangeItemQuantity, basketState } = useContext(BasketContext);

	const bundleMetaForAnalytics = getBundleMetaForAnalytics(relatedBundle);
	const parentItemId = parentItem.itemId;

	const parentBasketItem = basketState?.items?.find(
		(item) =>
			item?.itemId === relatedBundle.id &&
			item.relatedOnProductItems?.some(
				(relatedItem) => relatedItem.itemId === parentItemId
			)
	);

	const relativeQuantityInBasket =
		parentBasketItem?.relatedOnProductItems?.find(
			(item) => item.itemId === parentItemId
		)?.quantity ?? 0;

	const bundlePrices = relatedBundle?.bundlePrices ?? null;

	const { basePrice, discountedPrice, isDiscounted } = bundlePrices ?? {};

	const bundlePriceWithVat = isDiscounted
		? discountedPrice?.valueWithVat
		: basePrice.valueWithVat;

	if (!parentItemId) return null;

	return (
		<div
			className={cx(
				styles.upSellItemWrap,
				relativeQuantityInBasket > 0 && styles.selectedItem
			)}
		>
			<div className={styles.emptyImageSpace}></div>
			<button
				className={styles.upSellItem}
				onClick={() => {
					const isRemoving = relativeQuantityInBasket > 0;
					handleOnChangeItemQuantity({
						quantity: isRemoving ? 0 : baseQuantity,
						bundleId: relatedBundle.id,
						bundleMetaForAnalytics,
						relatedOnProductItems: {
							quantity: isRemoving ? 0 : baseQuantity,
							itemId: parentItemId,
						},
					});
				}}
			>
				<div className={styles.infoWrap}>
					<div className={styles.checkboxWrap}>
						<GreenCheckbox
							checked={relativeQuantityInBasket > 0}
							setChecked={() => null}
							tabIndex={-1}
						/>
					</div>
					<div className={styles.imageWrap}>
						<img
							src={getBundleImage(
								relatedBundle?.images ?? [],
								IMAGE_SIZE_THUMB_64x80
							)}
							alt={`${t({ id: 'alt.bundleImage' })}`}
							className={styles.image}
						/>
					</div>
					<div className={styles.namePriceWrap}>
						<div className={styles.name}>
							{getLocalizedValue(relatedBundle.name)}{' '}
							{baseQuantity > 1 &&
								`(${t(
									{ id: 'bundle.warehouse.quantity' },
									{ count: baseQuantity }
								)})`}
						</div>
						{!relativeQuantityInBasket && (
							<div className={styles.price}>
								{getLocalizedPrice({
									price: bundlePriceWithVat ?? 0,
									currency,
								})}
							</div>
						)}
					</div>
				</div>
			</button>
			{!!relativeQuantityInBasket && (
				<div className={styles.shopControls}>
					<div className={cx(styles.price, styles.unitPrice)}>
						{getLocalizedPrice({ price: bundlePriceWithVat ?? 0, currency })}
					</div>
					<div className={styles.quantityWrap}>
						<DirectQuantityBox
							bundle={relatedBundle}
							isBasket={true}
							parentItemId={parentItemId}
							baseQuantity={baseQuantity}
						/>
					</div>
					<div className={cx(styles.price, styles.totalPrice)}>
						{getLocalizedPrice({
							price: (bundlePriceWithVat ?? 0) * relativeQuantityInBasket,
							currency,
						})}
					</div>
				</div>
			)}
		</div>
	);
};

export default UpsellItem;
