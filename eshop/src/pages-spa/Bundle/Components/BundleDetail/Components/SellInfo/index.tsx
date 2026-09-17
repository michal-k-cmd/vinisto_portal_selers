'use client';

import { useContext } from 'react';
import { LocalizationContext } from 'Services/LocalizationService';
import useTodayTomorrowDate from 'Hooks/useTodayTomorrowDate/useTodayTomorrowDate';
import cx from 'classnames';
import { DiscountPercentage } from 'vinisto_ui';
import ImageLocal from 'Components/View/ImageLocal';
import { ModalContext } from 'Components/Modal/context';
import { JOIN_VINISTO_PLUS_MODAL } from 'Components/Modal/constants';
import {
	useDiscountCoupons,
	useFindBundleInBasket,
} from 'pages-spa/Bundle/hooks';
import getBundleLimitPerOrder from 'Helpers/getBundleLimitPerOrder';
import useShowVinistoPlusPrice from 'Hooks/use-show-vinisto-plus-price';
import { useIsB2b } from 'Services/PlatformService';
import { getLocalizedPrice } from 'vinisto_shared/src/price/get-localized-price';

import { useBargainPriceBadge } from '../../helpers';
import PriceGuarantee from '../ShopControls/Components/BundleItem/PriceGuarantee';

import { SellInfoProps } from './interfaces';
import styles from './styles.module.css';

const SellInfo = ({
	supplierName,
	deliveryDate,
	availableQuantity,
	bundle,
	discountCoupon,
	isLoading,
	unavailableReason,
}: SellInfoProps) => {
	const isB2b = useIsB2b();
	const {
		activeCurrency: { currency },
	} = useContext(LocalizationContext);
	const t = useContext(LocalizationContext).useFormatMessage();
	const { handleOpenModal } = useContext(ModalContext);
	const getDateLabel = useTodayTomorrowDate();

	const {
		isDiscounted,
		basePrice,
		discountedPrice,
		vinistoPlusPriceOrDiscount,
	} = bundle?.bundlePrices ?? {};

	const { isCouponAvailable, priceWhenCouponApplied } = useDiscountCoupons({
		bundle: bundle ?? null,
	});
	const itemInBasket = useFindBundleInBasket({ bundleId: bundle?.id });
	const bundleLimitPerOrder = getBundleLimitPerOrder(bundle?.orderLimitation);
	const wouldApplyingExceedOrderLimitation =
		typeof bundleLimitPerOrder === 'number' &&
		bundleLimitPerOrder <= (itemInBasket?.quantity ?? 0);
	const isGift = bundle?.flags.isGift ?? false;
	const isSaleOver = bundle?.flags.isSaleOver ?? false;
	const isTemporaryUnavailable = bundle?.flags.isTemporaryUnavailable ?? false;

	const bargainPriceBadge = useBargainPriceBadge(bundle);

	const { showPossibleVinistoPlusPrice, canBuyForVinistoPlusPrice } =
		useShowVinistoPlusPrice({
			vinistoPlusPriceOrDiscount,
			priceWhenCouponApplied,
			canBeCouponApplied:
				isCouponAvailable && !wouldApplyingExceedOrderLimitation,
		});

	if (isGift) return;
	if (
		unavailableReason !== undefined ||
		isSaleOver ||
		isTemporaryUnavailable ||
		(!isLoading && availableQuantity < 1)
	)
		return (
			<div className={styles.unavailableStatus}>
				{t({
					id:
						unavailableReason === 'saleOver' || isSaleOver
							? 'bundle.isSaleOver.productDetail.title'
							: 'bundle.temporaryUnavailable.productDetail.title',
				})}
			</div>
		);

	if (isGift) return;

	return (
		<div className={styles.wrapper}>
			<div className={styles.mobileShopInfo}>
				{canBuyForVinistoPlusPrice ? (
					<>
						<div className="d-flex align-items-start justify-content-between">
							<div
								className={cx(
									styles.priceWithVat,
									styles.yourVinistoPlusOriginalPrice
								)}
							>
								{!!basePrice &&
									getLocalizedPrice({
										price: isB2b ? basePrice.value : basePrice.valueWithVat,
										currency,
									})}
							</div>
							<div className="position-relative">{bargainPriceBadge}</div>
						</div>
						{discountCoupon}
						<div className={cx(styles.pricesWrap, styles.vinistoPlusPrice)}>
							<div className={styles.priceWithVat}>
								{!!vinistoPlusPriceOrDiscount &&
									getLocalizedPrice({
										price: isB2b
											? vinistoPlusPriceOrDiscount.value
											: vinistoPlusPriceOrDiscount.valueWithVat,
										currency,
									})}
							</div>
							<ImageLocal
								fileName={'plus.svg'}
								className={styles.plusImg}
							/>
							<div className={styles.priceWithoutVatValue}>
								{t(
									{ id: isB2b ? 'price.withVAT' : 'price.withoutVAT' },
									{
										priceWithCurrency: (
											<span key="bd-price.withoutVAT">
												{!!vinistoPlusPriceOrDiscount &&
													getLocalizedPrice({
														price: isB2b
															? vinistoPlusPriceOrDiscount.valueWithVat
															: vinistoPlusPriceOrDiscount.value,
														currency,
													})}
											</span>
										),
									}
								)}
							</div>
						</div>
					</>
				) : (
					<div className="d-flex align-items-start justify-content-between">
						<div className={styles.pricesWrap}>
							{isDiscounted && (
								<div
									className={cx(styles.priceBeforeDiscount, styles.lineThrough)}
								>
									{!!basePrice &&
										getLocalizedPrice({
											price: isB2b ? basePrice.value : basePrice.valueWithVat,
											currency,
										})}
								</div>
							)}

							<div className={styles.mainPriceWrapper}>
								<div className={styles.priceWithVat}>
									{isDiscounted
										? getLocalizedPrice({
												price:
													(isB2b
														? discountedPrice?.value
														: discountedPrice?.valueWithVat) ?? 0,
												currency,
										  })
										: getLocalizedPrice({
												price: isB2b
													? basePrice?.value
													: basePrice?.valueWithVat,
												currency,
										  })}
								</div>

								{isDiscounted && (
									<DiscountPercentage
										discountedPriceWithVat={discountedPrice?.valueWithVat ?? 0}
										standardPriceWithVat={basePrice?.valueWithVat ?? 0}
									/>
								)}
							</div>

							<div className={styles.priceWithoutVatValue}>
								{t(
									{ id: isB2b ? 'price.withVAT' : 'price.withoutVAT' },
									{
										priceWithCurrency: (
											<span key="bd-price.withoutVAT">
												{isDiscounted
													? getLocalizedPrice({
															price:
																(isB2b
																	? discountedPrice?.valueWithVat
																	: discountedPrice?.value) ?? 0,
															currency,
													  })
													: getLocalizedPrice({
															price: isB2b
																? basePrice?.valueWithVat
																: basePrice?.value,
															currency,
													  })}
											</span>
										),
									}
								)}
							</div>
						</div>
						{bargainPriceBadge}
					</div>
				)}

				{!canBuyForVinistoPlusPrice && discountCoupon}

				{showPossibleVinistoPlusPrice && (
					<button
						className={styles.vinistoPlusInactivePriceWrap}
						onClick={() => handleOpenModal(JOIN_VINISTO_PLUS_MODAL)}
					>
						<div className={styles.vinistoPlusInactivePriceImgWrap}>
							<ImageLocal
								fileName="plus.svg"
								className={styles.vinistoPlusInactivePriceImg}
							/>
						</div>
						<span className={styles.onlyForMembers}>
							{t({ id: 'price.vinistoPlus.priceForMembers' })}
						</span>
						<span>
							<span className={styles.becomeMember}>
								{t({ id: 'price.vinistoPlus.becomeMember' })}
							</span>
						</span>
						<div className={styles.vinistoPlusInactivePriceWithVat}>
							{vinistoPlusPriceOrDiscount &&
								getLocalizedPrice({
									price: isB2b
										? vinistoPlusPriceOrDiscount.value
										: vinistoPlusPriceOrDiscount.valueWithVat,
									currency,
								})}
						</div>
					</button>
				)}

				<div className={styles.sellerSenderWrap}>
					<div className={styles.seller}>
						<span className={styles.sellerTitle}>{`${t({
							id: 'productDetail.seller.name',
						})}: `}</span>
						<span className={styles.sellerName}>
							{supplierName.length > 0
								? supplierName
								: t({
										id: 'productDetail.seller.name.others',
								  })}
						</span>
					</div>

					<div className={styles.mobileSender}>
						{t(
							{
								id: 'bundle.warehouse.from',
							},
							{
								value: (
									<span
										key="bd-bundle.warehouse.from.vinisto"
										className={styles.senderName}
									>
										{t({
											id: 'bundle.warehouse.from.vinisto',
										})}
									</span>
								),
							}
						)}
					</div>

					<PriceGuarantee
						bundle={bundle}
						isLoading={isLoading}
					/>
				</div>

				{availableQuantity < 1 ? (
					<div className={styles.deliveryDate}>
						{t({ id: 'bundleAvailability.outOfStock' })}
					</div>
				) : (
					<>
						<div className={styles.availableCount}>
							{t(
								{
									id: 'bundle.supplier.avaibility.available.inThumbnail',
								},
								{
									value: (
										<span
											key="bd-bundle.supplier.avaibility.centralWarehouse"
											className={`${styles.textGreen}`}
										>
											{t({
												id: 'bundle.supplier.avaibility.centralWarehouse',
											})}
										</span>
									),
								}
							)}
						</div>

						<div className={styles.deliveryDate}>
							{t(
								{ id: 'bundle.supplier.deliveryDate' },
								{
									date: (
										<span
											key="bd-bundle.supplier.deliveryDate"
											className={`${styles.deliveryDateValue} ${styles.textGreen}`}
										>
											{getDateLabel(deliveryDate ?? '')}
										</span>
									),
								}
							)}
						</div>
					</>
				)}
			</div>
		</div>
	);
};
export default SellInfo;
