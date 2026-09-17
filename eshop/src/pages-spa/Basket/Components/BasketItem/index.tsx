import { lazy, Suspense, useContext, useRef, useState } from 'react';
import cx from 'classnames';
import { DirectQuantityBox } from 'Components/QuantityBox';
import { getLocalizedValue } from 'Hooks/useLocalizedValue';
import Loader from 'Components/View/Loader';
const FilterDropdownArrowIcon = lazy(
	() => import('Components/Icons/FilterDropdownArrow')
);
import getBundleImage, { IMAGE_SIZE_THUMB_64x80 } from 'Helpers/getBundleImage';
import Link from 'next/link';
import { LocalizationContext } from 'Services/LocalizationService';
import {
	getBundleMetaForAnalytics,
	getBundleProducerNames,
} from 'Services/BasketService/helpers';
import { BasketContext } from 'Services/BasketService';
import AvailabilityFomo from 'Components/QuantityBox/Components/AvailabilityFomo';
import { WarehouseContext } from 'Services/WarehouseService';
import { Button, buttonVariants } from 'vinisto_ui';
import {
	useFindBundleInBasket,
	useIsBasketLockedForEdit,
} from 'pages-spa/Bundle/hooks';
import useOnClickOutside from 'Hooks/useOnClickOutside';
import getFlagSpecification from 'Helpers/getFlagSpecification';
import { usePlatformContext } from 'Services/PlatformService';
import { AuthenticationContext } from 'Services/AuthenticationService/context';

import Upsells from '../Upsells';

import { BasketItemProps } from './interfaces';
import styles from './styles.module.css';
import PriceInfo from './PriceInfo';
import ActionsList from './ActionsList';
import DiscountBadge from './DiscountBadge';
import { getRoundedDiscount } from './hooks';
import AdditionalPercentageDiscountSelect from './AdditionalPercentageDiscountSelect';

import { BasketType, PriceLevel } from '@/api-types/basket-api';
import { VinistoHelperDllEnumsUserUserType } from '@/api-types/user-api';

const BasketItem = ({
	item,
	basketType,
	userOrSystemBasketId,
}: BasketItemProps) => {
	const { isB2b, getIsInAdminIframe } = usePlatformContext();
	const [isActionsOpen, setIsActionsOpen] = useState(false);
	const {
		activeCurrency: { currency },
	} = useContext(LocalizationContext);
	const { basketState, handleOnChangeItemQuantity } = useContext(BasketContext);
	const basketCurrency = basketState?.currency;
	const t = useContext(LocalizationContext).useFormatMessage();
	const vinistoUser = useContext(AuthenticationContext).vinistoUser;
	const isUserCompany =
		vinistoUser.type === VinistoHelperDllEnumsUserUserType.Company;

	const bundleName = getLocalizedValue(item.bundle?.name);
	const { basePrice } = item.bundle?.bundlePrices ?? {};
	const bundleId = item.bundle?.id ?? '';

	const itemInPrimaryBasket = useFindBundleInBasket({ bundleId });
	const quantity = item.quantity ?? 0;
	const supplier = item.bundle?.supplier;
	const supplierName = supplier?.nameWeb;
	const producerNames = getBundleProducerNames(item.bundle ?? null).join(', ');
	const warehouseId = item.bundle?.warehouseId.join(', ');

	const isVinistoPlusItem = item.priceLevel === PriceLevel.VinistoPlus;

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

	const volumeDiscountVolume = item.volumeDiscountVolume ?? null;

	const originalPriceForB2cItem = isDiscounted ? item.priceWithVat : null;
	const originalPriceForB2bItem = item.additionalPercentageDiscount
		? item.price
		: null;

	const originalPriceForVinistoPlusItem = hasVinistoPlusDiscount
		? basePrice?.valueWithVat
		: null;

	const originalPriceForB2cOrVinistoPlusItem = isVinistoPlusItem
		? originalPriceForVinistoPlusItem
		: originalPriceForB2cItem;

	const originalPrice = isB2b
		? originalPriceForB2bItem
		: originalPriceForB2cOrVinistoPlusItem;

	// BEWARE! Discounted price can be actually higher than the original price
	// If discounted price exists, it is always used for the total price calculation
	const priceWithoutVat = isB2b
		? item.discountPriceAdditionalPercentageDiscount
		: item.discountPrice ?? item.price;
	const priceWithVat = isB2b
		? item.discountPriceWithVatAdditionalPercentageDiscount
		: item.discountPriceWithVat ?? item.priceWithVat;

	const bundleBasePrice = isB2b
		? basePrice?.value ?? 0
		: basePrice?.valueWithVat ?? 0;
	const basketItemPrice = isB2b
		? item.discountPrice ?? item.price ?? 0
		: item.discountPriceWithVat ?? item.priceWithVat ?? 0;

	const totalBundleBasePrice = bundleBasePrice * (item.quantity ?? 1);

	const totalBasketItemPrice = basketItemPrice * quantity;

	const totalSavings = Math.max(totalBundleBasePrice - totalBasketItemPrice, 0);

	const totalCouponsDiscount =
		item.coupons?.reduce(
			(sum, discount) =>
				sum +
				(isB2b
					? discount.discountPrice ?? 0
					: discount.discountPriceWithVat ?? 0),
			0
		) ?? 0;

	const finalDiscount =
		totalSavings >= 0
			? totalSavings + totalCouponsDiscount
			: totalCouponsDiscount;

	const bundleImageSrc = getBundleImage(
		item.bundle?.images ?? [],
		IMAGE_SIZE_THUMB_64x80
	);

	const bundlleDetailLink = `/${t({
		id: 'routes.product.route',
	})}/${getLocalizedValue(item.bundle?.url)}`;

	const { getQuantity } = useContext(WarehouseContext);

	const isUserDefinedBasketItem = basketType === BasketType.UserDefined;

	const bundleMetaForAnalytics = getBundleMetaForAnalytics(item.bundle ?? null);

	const actionsListRef = useRef<HTMLDivElement | null>(null);

	useOnClickOutside([actionsListRef], () => setIsActionsOpen(false));

	const quantityOfRelatedProducts =
		item?.relatedOnProductItems?.reduce(
			(acc, item) => acc + (item.quantity ?? 0),
			0
		) ?? 0;

	const standaloneQuantityInBasket =
		(item?.quantity ?? 0) - quantityOfRelatedProducts;

	const finalRoundedDiscount = getRoundedDiscount(finalDiscount, currency);

	const badgesCount = [
		finalDiscount > 0,
		hasVinistoPlusDiscount,
		volumeDiscountVolume,
		totalCouponsDiscount,
	].filter(Boolean).length;

	const { component: bundleFlag } = getFlagSpecification(
		item.bundle?.specificationDetails ?? []
	);

	const isBasketLockedForEdit = useIsBasketLockedForEdit();

	const isAdminIframe = getIsInAdminIframe();

	return (
		<div className={styles.itemWrap}>
			<div
				className={cx(styles.item, {
					[styles.userDefinedBasketItem]: isUserDefinedBasketItem,
					[styles.manyBadges]: badgesCount >= 2,
				})}
			>
				<Link
					className={styles.imageWrap}
					href={isAdminIframe ? '' : bundlleDetailLink}
				>
					<img
						src={bundleImageSrc}
						className={styles.image}
						alt={bundleName}
						title={bundleName}
						width={64}
						height={80}
					/>
				</Link>
				<div className={styles.infoWrap}>
					<Link
						className={cx(styles.name, {
							[styles.smallMarginBottom]: isB2b && warehouseId,
						})}
						href={isAdminIframe ? '' : bundlleDetailLink}
					>
						{bundleName}
					</Link>
					{isB2b && warehouseId && (
						<div className={styles.warehouseId}>
							{t(
								{ id: 'warehouseId' },
								{ id: <strong key="warehouseId">{warehouseId}</strong> }
							)}
						</div>
					)}
					{(producerNames ?? supplierName) && (
						<div className={styles.info}>
							<div className={styles.flagWrap}>{bundleFlag}</div>
							{producerNames && (
								<span className={styles.producerName}>
									{producerNames}
									{producerNames && supplierName && (
										<span className={styles.sellerSeparator}> | </span>
									)}
								</span>
							)}

							{supplierName && (
								<span className={styles.sellerName}>
									{t(
										{ id: 'bundle.supplier.name' },
										{
											name: supplierName,
										}
									)}
								</span>
							)}
						</div>
					)}
				</div>
				<div className={styles.unitPrices}>
					<PriceInfo
						originalPrice={originalPrice}
						priceWithoutVat={(isB2b ? priceWithVat : priceWithoutVat) ?? 0}
						priceWithVat={(isB2b ? priceWithoutVat : priceWithVat) ?? 0}
						currency={basketCurrency ?? currency}
					/>
				</div>
				{isBasketLockedForEdit ? (
					<div className={cx(styles.quantityWrap, 'mb-2 pb-1')}>
						{t({ id: 'amount.pcs' }, { count: quantity })}
					</div>
				) : (
					<div
						className={cx(styles.quantityWrap, {
							invisible: isBasketLockedForEdit,
						})}
					>
						<DirectQuantityBox
							bundle={item.bundle}
							isBasket={true}
							userOrSystemBasketId={userOrSystemBasketId}
						/>
						{
							<AvailabilityFomo
								stock={getQuantity(item?.bundle?.id ?? '') ?? 0}
							/>
						}
					</div>
				)}
				<div className={styles.totalPrices}>
					<PriceInfo
						originalPrice={originalPrice}
						priceWithoutVat={(isB2b ? priceWithVat : priceWithoutVat) ?? 0}
						priceWithVat={(isB2b ? priceWithoutVat : priceWithVat) ?? 0}
						currency={basketCurrency ?? currency}
						quantity={standaloneQuantityInBasket ?? 1}
					/>
					<DiscountBadge
						isVinistoPlusDiscount={hasVinistoPlusDiscount}
						volumeDiscountVolume={volumeDiscountVolume ?? 0}
						totalCouponsDiscount={totalCouponsDiscount}
						finalDiscount={finalRoundedDiscount}
						currency={basketCurrency ?? currency}
						badgesCount={badgesCount}
					/>
				</div>
				{isUserDefinedBasketItem && (
					<Button
						className={styles.addToBasketButton}
						variant={buttonVariants.GREEN_OUTLINE}
						onClick={() =>
							handleOnChangeItemQuantity({
								quantity:
									(item.quantity ?? 1) + (itemInPrimaryBasket?.quantity ?? 0),
								bundleId,
								bundleMetaForAnalytics,
							})
						}
					>
						{t({ id: 'basket.lists.addToPrimaryBasket' })}
					</Button>
				)}

				<div
					className={cx(styles.actionsWrap, {
						invisible: isBasketLockedForEdit,
					})}
					ref={actionsListRef}
				>
					<button
						className={cx(styles.actionToggle, isActionsOpen && styles.opened)}
						onClick={() => setIsActionsOpen((prev) => !prev)}
					>
						<Suspense fallback={<Loader blank />}>
							<FilterDropdownArrowIcon />
						</Suspense>
					</button>
					<ActionsList
						isActionsOpen={isActionsOpen}
						closeActions={() => setIsActionsOpen(false)}
						bundle={item.bundle ?? null}
						item={item}
						userOrSystemBasketId={userOrSystemBasketId}
					/>
				</div>
			</div>
			{isB2b && !isUserCompany && (
				<AdditionalPercentageDiscountSelect item={item} />
			)}
			{!isB2b && !userOrSystemBasketId && <Upsells item={item} />}
		</div>
	);
};
export default BasketItem;
