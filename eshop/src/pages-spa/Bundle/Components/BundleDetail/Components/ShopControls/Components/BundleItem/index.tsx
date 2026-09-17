'use client';

import React, { useContext } from 'react';
import cx from 'classnames';
import Skeleton from 'react-loading-skeleton';
import {
	PopoverTypes,
	QuantityBoxPlusBtnTypes,
} from 'Components/QuantityBox/constants';
import useTodayTomorrowDate from 'Hooks/useTodayTomorrowDate/useTodayTomorrowDate';
import { WarehouseContext } from 'Services/WarehouseService';
import { LocalizationContext } from 'Services/LocalizationService';
import { DirectQuantityBox, StandardQuantityBox } from 'Components/QuantityBox';
import quantityBoxStyles from 'Components/QuantityBox/styles.module.css';
import { DiscountPercentage } from 'vinisto_ui';
import { useDiscountCoupons } from 'pages-spa/Bundle/hooks';
import { AuthenticationContext } from 'Services/AuthenticationService/context';
import useCanSeePrices from 'Hooks/use-can-see-prices';
import getBundleLimitPerOrder from 'Helpers/getBundleLimitPerOrder';
import { useFindBundleInBasket } from 'pages-spa/Bundle/hooks/use-find-bundle-in-basket';
import { useBargainPriceBadge } from 'pages-spa/Bundle/Components/BundleDetail/helpers';
import ImageLocal from 'Components/View/ImageLocal';
import { ModalContext } from 'Components/Modal/context';
import { JOIN_VINISTO_PLUS_MODAL } from 'Components/Modal/constants';
import useShowVinistoPlusPrice from 'Hooks/use-show-vinisto-plus-price';
import { useIsB2b } from 'Services/PlatformService';
import { getLocalizedPrice } from 'vinisto_shared/src/price/get-localized-price';

import DisabledShopControlsInfo from '../TemporaryUnavailableInfo';
import IsGiftInfo from '../IsGiftInfo';
import DiscountCoupon from '../../../DiscountCoupon';
import BundleBasketShortcut from '../BundleBasketShortcut';

import {
	BundleItemQuantityBoxStyleVariants,
	BundleItemVariants,
	QuantityBoxVariants,
	SHOW_EXACT_UNDER_COUNT,
} from './constants';
import { BundleItemProps } from './interfaces';
import bundleItemStyles from './styles.module.css';
import PriceGuarantee from './PriceGuarantee';

const styles: { [key: string]: string } = {
	...quantityBoxStyles,
	...bundleItemStyles,
};

const BundleItem = ({
	bundle,
	variant = BundleItemVariants.STANDARD,
	quantityBox,
	isQuantityLoading,
	standardQuantityBoxMethods,
	displayBargainPriceBadge = true,
	hideSeller = false,
	className,
	showBasketShortcut = false,
	quantityBoxStyleVariant = BundleItemQuantityBoxStyleVariants.DEFAULT,
	countInputLabel,
	unavailableReason,
}: BundleItemProps) => {
	const isB2b = useIsB2b();
	const canSeePrices = useCanSeePrices();
	const {
		activeCurrency: { currency },
	} = useContext(LocalizationContext);
	const t = useContext(LocalizationContext).useFormatMessage();
	const { getQuantity, deliveryDate } = useContext(WarehouseContext);
	const { isLoggedIn } = useContext(AuthenticationContext);
	const { handleOpenModal } = useContext(ModalContext);

	const getDateLabel = useTodayTomorrowDate();

	const bargainPriceBadge = useBargainPriceBadge(
		bundle,
		displayBargainPriceBadge
	);

	const {
		isCouponAvailable,
		priceWhenCouponApplied,
		priceWhenCouponAppliedWithoutVat,
		mostValuableDiscountCouponCode,
		mostValuableDiscountCoupon,
		handleOnAddToBasketWithDiscountCoupon,
	} = useDiscountCoupons({
		bundle: bundle ?? null,
		showCouponsForRegisterdUsersIfUserIsNotLoggedIn: true,
	});
	const itemInBasket = useFindBundleInBasket({ bundleId: bundle?.id });

	const bundlePrices = bundle?.bundlePrices;

	const {
		isDiscounted,
		basePrice,
		discountedPrice,
		vinistoPlusPriceOrDiscount,
	} = bundlePrices ?? {};

	const warehouseQuantity = getQuantity(bundle?.id ?? '');
	const availableQuantity = warehouseQuantity ?? 0;
	const isAvailable = availableQuantity > 0;
	const isOutOfStock = warehouseQuantity !== undefined && !isAvailable;
	const isDeleted = bundle?.flags.isDeleted;
	const isTemporaryUnavailable = bundle?.flags.isTemporaryUnavailable ?? false;
	const isGift = bundle?.flags.isGift ?? false;
	const isSaleOver = bundle?.flags.isSaleOver;
	const isIntangible = bundle?.flags.isIntangible ?? false;
	const detailDeliveryDateLabel = isIntangible
		? t({ id: 'bundleAvailability.immediately' })
		: deliveryDate !== undefined
		? getDateLabel(deliveryDate, true)
		: null;
	const bundleLimitPerOrder = getBundleLimitPerOrder(bundle?.orderLimitation);
	const wouldApplyingExceedOrderLimitation =
		typeof bundleLimitPerOrder === 'number' &&
		bundleLimitPerOrder <= (itemInBasket?.quantity ?? 0);

	const isMostValuableCouponForRegisteredUsers = !!(
		mostValuableDiscountCoupon &&
		'isForRegisteredUsers' in mostValuableDiscountCoupon &&
		mostValuableDiscountCoupon.isForRegisteredUsers
	);

	const hasToLoginToBeAbleToPurchase =
		isMostValuableCouponForRegisteredUsers && !isLoggedIn;

	const supplier =
		bundle?.supplier?.nameWeb ??
		t({
			id: 'productDetail.seller.name.others',
		});

	const { showPossibleVinistoPlusPrice, canBuyForVinistoPlusPrice } =
		useShowVinistoPlusPrice({
			vinistoPlusPriceOrDiscount,
			priceWhenCouponApplied,
			canBeCouponApplied:
				isCouponAvailable && !wouldApplyingExceedOrderLimitation,
		});

	const isProductDetailQuantityBox =
		quantityBoxStyleVariant ===
		BundleItemQuantityBoxStyleVariants.PRODUCT_DETAIL;
	const shouldUseProductDetailQuantityLayout =
		isProductDetailQuantityBox || showBasketShortcut;
	const unavailablePrice = isDiscounted ? discountedPrice : basePrice;
	const unavailablePriceWithVat = getLocalizedPrice({
		price: isB2b ? unavailablePrice?.value : unavailablePrice?.valueWithVat,
		currency,
	});
	const unavailablePriceWithoutVat = getLocalizedPrice({
		price: isB2b ? unavailablePrice?.valueWithVat : unavailablePrice?.value,
		currency,
	});
	const unavailableOriginalPrice = isDiscounted
		? getLocalizedPrice({
				price: isB2b ? basePrice?.value : basePrice?.valueWithVat,
				currency,
		  })
		: undefined;
	const unavailableDiscountBadge = isDiscounted ? (
		<DiscountPercentage
			discountedPriceWithVat={discountedPrice?.valueWithVat ?? 0}
			standardPriceWithVat={basePrice?.valueWithVat ?? 0}
		/>
	) : undefined;
	const shouldShowSaleOver =
		unavailableReason === 'saleOver' ||
		(unavailableReason === undefined && isSaleOver);
	const shouldShowTemporaryUnavailable =
		unavailableReason === 'temporary' ||
		(unavailableReason === undefined &&
			(isTemporaryUnavailable || isOutOfStock));

	if (shouldShowSaleOver)
		return (
			<DisabledShopControlsInfo
				translations={{
					cta:
						t({
							id: 'bundle.isSaleOver.productDetail.cta',
						})?.toString() ?? '',
					title:
						t({
							id: 'bundle.isSaleOver.productDetail.title',
						})?.toString() ?? '',
					seller:
						t({
							id: 'productDetail.seller.name',
						})?.toString() ?? '',
					withoutVat:
						t({
							id: 'basket.priceWithoutVAT',
						})?.toString() ?? '',
				}}
				price={unavailablePriceWithVat}
				priceNoVat={unavailablePriceWithoutVat}
				originalPrice={unavailableOriginalPrice}
				discountBadge={unavailableDiscountBadge}
				supplier={hideSeller ? undefined : supplier}
				className={className}
				isCompact={variant === BundleItemVariants.COMPACT}
			/>
		);

	if (shouldShowTemporaryUnavailable)
		return (
			<DisabledShopControlsInfo
				translations={{
					cta:
						t({
							id: 'bundle.temporaryUnavailable.productDetail.cta',
						})?.toString() ?? '',
					title:
						t({
							id: 'bundle.temporaryUnavailable.productDetail.title',
						})?.toString() ?? '',
					seller:
						t({
							id: 'productDetail.seller.name',
						})?.toString() ?? '',
					withoutVat:
						t({
							id: 'basket.priceWithoutVAT',
						})?.toString() ?? '',
				}}
				price={unavailablePriceWithVat}
				priceNoVat={unavailablePriceWithoutVat}
				originalPrice={unavailableOriginalPrice}
				discountBadge={unavailableDiscountBadge}
				supplier={`${supplier}`}
				className={className}
				isCompact={variant === BundleItemVariants.COMPACT}
			/>
		);

	if (isGift) return <IsGiftInfo />;

	if (variant === BundleItemVariants.COMPACT) {
		return (
			<div className={cx(styles.wrapper, styles.compact, className)}>
				<div className={styles.wrapperInfo}>
					<span className={styles.availableCount}>
						{availableQuantity === undefined || isQuantityLoading ? (
							<Skeleton width="120px" />
						) : availableQuantity > SHOW_EXACT_UNDER_COUNT ? (
							t(
								{ id: 'bundleAvailability.inStock.moreThanCount2' },
								{
									valueWrap: (
										<span
											key="bd-availableCountValue"
											className={cx(styles.availableCountValue, {
												[styles.textGreen]: availableQuantity > 0,
											})}
										>
											{t(
												{
													id: 'bundleAvailability.inStock.moreThanCount2.valueWrap',
												},
												{
													value: (
														<React.Fragment key="bd-availabilityFragment">
															{t(
																{
																	id: 'bundleAvailability.inStock.moreThanCount.info',
																},
																{
																	count: SHOW_EXACT_UNDER_COUNT,
																}
															)}
														</React.Fragment>
													),
												}
											)}
										</span>
									),
								}
							)
						) : (
							<span className={styles.availableCountName}>
								{availableQuantity < 1 && (
									<span className={styles.stockNotAvaible}>
										{t({
											id: 'bundleAvailability.outOfStock',
										})}{' '}
										|{' '}
									</span>
								)}
								{t(
									{ id: 'bundle.warehouse.info.stock' },
									{
										value: (
											<span
												key="bdq-bundle.warehouse.quantity"
												className={cx(styles.availableCountValue, {
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
								)}
							</span>
						)}
					</span>
					{isAvailable && (isIntangible || deliveryDate !== undefined) && (
						<>
							{' '}
							|{' '}
							<span className={styles.deliveryDate}>
								{isIntangible ? (
									<span
										className={`${styles.deliveryDateValue} ${styles.textGreen}`}
									>
										{t({ id: 'bundleAvailability.immediately' })}
									</span>
								) : deliveryDate !== undefined ? (
									t(
										{ id: 'bundle.supplier.deliveryShortDate' },
										{
											date: (
												<span
													key="bddv-deliveryDateValue"
													className={`${styles.deliveryDateValue} ${styles.textGreen}`}
												>
													{getDateLabel(deliveryDate)}
												</span>
											),
										}
									)
								) : null}
							</span>
						</>
					)}
				</div>
				<div
					className={cx(
						styles.shopWrap,
						'd-flex align-items-center justify-content-between gap-3',
						canBuyForVinistoPlusPrice && styles.shopWrapVinistoPlus
					)}
				>
					<div className="d-flex align-items-center gap-3">
						<div className={styles.pricesWrap}>
							{canBuyForVinistoPlusPrice ? (
								<div
									className={cx(styles.priceBeforeDiscount, styles.lineThrough)}
								>
									{getLocalizedPrice({
										price: isB2b ? basePrice?.value : basePrice?.valueWithVat,
										currency,
									})}
								</div>
							) : (
								isDiscounted && (
									<div
										className={cx(
											styles.priceBeforeDiscount,
											styles.lineThrough
										)}
									>
										{getLocalizedPrice({
											price: isB2b ? basePrice?.value : basePrice?.valueWithVat,
											currency,
										})}
									</div>
								)
							)}
							<div className={styles.priceWithVat}>
								{(() => {
									if (canBuyForVinistoPlusPrice)
										return getLocalizedPrice({
											price: isB2b
												? vinistoPlusPriceOrDiscount?.value
												: vinistoPlusPriceOrDiscount?.valueWithVat,
											currency,
										});
									if (isDiscounted)
										return getLocalizedPrice({
											price: isB2b
												? discountedPrice?.value
												: discountedPrice?.valueWithVat,
											currency,
										});
									return getLocalizedPrice({
										price: isB2b ? basePrice?.value : basePrice?.valueWithVat,
										currency,
									});
								})()}
							</div>
							<div className={styles.priceWithoutVatValue}>
								{t(
									{ id: isB2b ? 'price.withVAT' : 'price.withoutVAT' },
									{
										priceWithCurrency: (
											<span key="bdpwV-price.withoutVAT">
												{isDiscounted
													? getLocalizedPrice({
															price: isB2b
																? discountedPrice?.valueWithVat
																: discountedPrice?.value,
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
						{isDiscounted && !canBuyForVinistoPlusPrice && (
							<DiscountPercentage
								discountedPriceWithVat={discountedPrice?.valueWithVat ?? 0}
								standardPriceWithVat={basePrice?.valueWithVat ?? 0}
							/>
						)}
					</div>
					{canBuyForVinistoPlusPrice && (
						<ImageLocal
							fileName="plus.svg"
							className={styles.vinistoPlusImg}
						/>
					)}

					{isAvailable && !isDeleted && (
						<div className={styles.addToBasketWrap}>
							{quantityBox === QuantityBoxVariants.STANDARD &&
							standardQuantityBoxMethods ? (
								<StandardQuantityBox
									className={cx(
										styles.quantityBox,
										styles.productDetail,
										isProductDetailQuantityBox &&
											styles.productDetailQuantityBox
									)}
									bundle={bundle}
									isLoading={
										availableQuantity === undefined || isQuantityLoading
									}
									orderLimitation={bundle?.orderLimitation}
									afterAddToBasket={() =>
										window.scrollTo({ top: 0, behavior: 'smooth' })
									}
									methods={standardQuantityBoxMethods}
								/>
							) : shouldUseProductDetailQuantityLayout ? (
								<div
									className={cx(
										styles.quantityControlsWithShortcut,
										isProductDetailQuantityBox &&
											styles.productDetailQuantityControls
									)}
								>
									<DirectQuantityBox
										className={cx(
											styles.quantityBox,
											styles.productDetail,
											isProductDetailQuantityBox && styles.fullWidth,
											isProductDetailQuantityBox && styles.stretchCountWrapper,
											isProductDetailQuantityBox &&
												styles.productDetailQuantityBox,
											countInputLabel && styles.productDetailWidePlusButton
										)}
										plusBtnType={QuantityBoxPlusBtnTypes.EXTENDED}
										bundle={bundle}
										isLoading={
											availableQuantity === undefined || isQuantityLoading
										}
										orderLimitation={bundle?.orderLimitation}
										countPopover={true}
										popoverType={PopoverTypes.WINDOW}
										afterAddToBasket={() =>
											window.scrollTo({ top: 0, behavior: 'smooth' })
										}
										shouldOpenCrossSellModal={showBasketShortcut}
										countInputLabel={countInputLabel}
									/>
									{showBasketShortcut && (
										<BundleBasketShortcut
											bundleId={bundle?.id}
											className={styles.basketShortcut}
											size="sm"
										/>
									)}
								</div>
							) : (
								<DirectQuantityBox
									className={cx(styles.quantityBox, styles.productDetail)}
									plusBtnType={QuantityBoxPlusBtnTypes.EXTENDED}
									bundle={bundle}
									isLoading={
										availableQuantity === undefined || isQuantityLoading
									}
									orderLimitation={bundle?.orderLimitation}
									countPopover={true}
									popoverType={PopoverTypes.WINDOW}
									afterAddToBasket={() =>
										window.scrollTo({ top: 0, behavior: 'smooth' })
									}
									countInputLabel={countInputLabel}
								/>
							)}
						</div>
					)}
				</div>
			</div>
		);
	}

	return (
		<>
			<div className={cx(styles.wrapper, styles.standard, className)}>
				{canBuyForVinistoPlusPrice ? (
					<>
						{bargainPriceBadge}
						<div className={styles.vinistoPlusOriginalPrice}>
							{getLocalizedPrice({
								price: isB2b ? basePrice?.value : basePrice?.valueWithVat,
								currency,
							})}
						</div>
						{isCouponAvailable && !wouldApplyingExceedOrderLimitation && (
							<DiscountCoupon
								basePrice={basePrice ?? null}
								discountedPrice={discountedPrice ?? null}
								priceWhenCouponApplied={priceWhenCouponApplied}
								priceWhenCouponAppliedWithoutVat={
									priceWhenCouponAppliedWithoutVat
								}
								isDiscounted={isDiscounted ?? false}
								hasToLoginToBeAbleToPurchase={!!hasToLoginToBeAbleToPurchase}
								mostValuableDiscountCoupon={mostValuableDiscountCoupon}
								mostValuableDiscountCouponCode={mostValuableDiscountCouponCode}
								handleOnAddToBasketWithDiscountCoupon={
									handleOnAddToBasketWithDiscountCoupon
								}
								availableQuantity={availableQuantity}
							/>
						)}
						<div
							className={cx(styles.mainPriceWrap, styles.vinistoPlusPriceWrap)}
						>
							<div className={styles.priceWithVat}>
								{getLocalizedPrice({
									price: isB2b
										? vinistoPlusPriceOrDiscount?.value
										: vinistoPlusPriceOrDiscount?.valueWithVat,
									currency,
								})}
							</div>
							<div className={styles.vinistoPlusImgWrap}>
								<ImageLocal
									fileName="plus.svg"
									className={styles.vinistoPlusImg}
								/>
							</div>
							<div className={styles.priceWithoutVatValue}>
								{t(
									{ id: isB2b ? 'price.withVAT' : 'price.withoutVAT' },
									{
										priceWithCurrency: (
											<span key="bdsc-doNotRemoveThisKey">
												{getLocalizedPrice({
													price: isB2b
														? vinistoPlusPriceOrDiscount?.valueWithVat
														: vinistoPlusPriceOrDiscount?.value,
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
					<div
						className={cx(
							styles.priceWithBadgeWrap,
							'price-with-badge-wrapper'
						)}
					>
						{canSeePrices && (
							<div className={styles.mainPriceWrap}>
								<div className={styles.priceWithVat}>
									{isDiscounted && (
										<span
											className={cx(
												styles.priceBeforeDiscount,
												styles.lineThrough
											)}
										>
											{getLocalizedPrice({
												price: isB2b
													? basePrice?.value
													: basePrice?.valueWithVat,
												currency,
											})}
										</span>
									)}

									<div className="d-flex align-items-center gap-3 mt-2 mt-xl-0">
										<div>
											{isDiscounted
												? getLocalizedPrice({
														price: isB2b
															? discountedPrice?.value
															: discountedPrice?.valueWithVat,
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
												discountedPriceWithVat={
													discountedPrice?.valueWithVat ?? 0
												}
												standardPriceWithVat={basePrice?.valueWithVat ?? 0}
											/>
										)}
									</div>
								</div>
								<div className={styles.priceWithoutVatValue}>
									{t(
										{ id: isB2b ? 'price.withVAT' : 'price.withoutVAT' },
										{
											priceWithCurrency: (
												<span key="bdsc-doNotRemoveThisKey">
													{isDiscounted
														? getLocalizedPrice({
																price: isB2b
																	? discountedPrice?.valueWithVat
																	: discountedPrice?.value,
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
						)}
						{bargainPriceBadge}
					</div>
				)}
				{isCouponAvailable &&
					!wouldApplyingExceedOrderLimitation &&
					!canBuyForVinistoPlusPrice && (
						<DiscountCoupon
							basePrice={basePrice ?? null}
							discountedPrice={discountedPrice ?? null}
							priceWhenCouponApplied={priceWhenCouponApplied}
							priceWhenCouponAppliedWithoutVat={
								priceWhenCouponAppliedWithoutVat
							}
							isDiscounted={isDiscounted ?? false}
							hasToLoginToBeAbleToPurchase={!!hasToLoginToBeAbleToPurchase}
							mostValuableDiscountCoupon={mostValuableDiscountCoupon}
							mostValuableDiscountCouponCode={mostValuableDiscountCouponCode}
							handleOnAddToBasketWithDiscountCoupon={
								handleOnAddToBasketWithDiscountCoupon
							}
							availableQuantity={availableQuantity}
						/>
					)}
				<div
					className={cx(
						styles.avaibilityDeliveryWrapper,
						'availability-delivery-wrapper'
					)}
				>
					<span className={styles.availableCount}>
						{availableQuantity === undefined || isQuantityLoading ? (
							<Skeleton width="200px" />
						) : availableQuantity > SHOW_EXACT_UNDER_COUNT ? (
							t(
								{ id: 'bundleAvailability.inStock.moreThanCount2' },
								{
									valueWrap: (
										<span
											key="bdac2-availableCountValue"
											className={cx(styles.availableCountValue, {
												[styles.textGreen]: availableQuantity > 0,
											})}
										>
											{t(
												{
													id: 'bundleAvailability.inStock.moreThanCount2.valueWrap',
												},
												{
													value: (
														<React.Fragment key="bdsc2af-availabilityFragment">
															{t(
																{
																	id: 'bundleAvailability.inStock.moreThanCount.info',
																},
																{
																	count: SHOW_EXACT_UNDER_COUNT,
																}
															)}
														</React.Fragment>
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
											key="bdsc3-availableCountValue"
											className={cx(styles.availableCountValue, {
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
						{!(availableQuantity === undefined || isQuantityLoading) && (
							<span
								className={cx(styles.availableCountValue, {
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
						)}
					</span>
					{availableQuantity === undefined || isQuantityLoading ? (
						<Skeleton
							width="100px"
							count={1.6}
							inline
							className="ms-0 me-0"
						/>
					) : (
						isAvailable && (
							<div className={styles.avaibilityDelivery}>
								{detailDeliveryDateLabel !== null && (
									<div className={styles.deliveryDate}>
										{t(
											{ id: 'bundle.supplier.deliveryDate' },
											{
												date: (
													<span
														key="bdscdv2-deliveryDateValue"
														className={`${styles.deliveryDateValue} ${styles.textGreen}`}
													>
														{detailDeliveryDateLabel}
													</span>
												),
											}
										)}
									</div>
								)}
							</div>
						)
					)}
					{!isAvailable && (
						<span className={styles.isTemporaryUnavailable}>
							{', '}
							{t({
								id: 'bundleAvailability.outOfStock',
							})}
						</span>
					)}
				</div>

				<PriceGuarantee
					bundle={bundle}
					isLoading={isQuantityLoading}
				/>

				{isAvailable &&
					(quantityBox === QuantityBoxVariants.STANDARD &&
					standardQuantityBoxMethods ? (
						<StandardQuantityBox
							className={cx(
								styles.quantityBox,
								styles.productDetail,
								'other-sellers',
								isProductDetailQuantityBox && styles.productDetailQuantityBox
							)}
							bundle={bundle}
							isLoading={isQuantityLoading}
							orderLimitation={bundle?.orderLimitation}
							methods={standardQuantityBoxMethods}
						/>
					) : shouldUseProductDetailQuantityLayout ? (
						<div
							className={cx(
								styles.quantityControlsWithShortcut,
								isProductDetailQuantityBox &&
									styles.productDetailQuantityControls
							)}
						>
							<DirectQuantityBox
								className={cx(
									styles.quantityBox,
									styles.productDetail,
									!isProductDetailQuantityBox && 'other-sellers',
									isProductDetailQuantityBox && styles.fullWidth,
									isProductDetailQuantityBox && styles.stretchCountWrapper,
									isProductDetailQuantityBox && styles.productDetailQuantityBox,
									countInputLabel && styles.productDetailWidePlusButton
								)}
								plusBtnType={QuantityBoxPlusBtnTypes.EXTENDED}
								bundle={bundle}
								isLoading={isQuantityLoading}
								orderLimitation={bundle?.orderLimitation}
								shouldOpenCrossSellModal={showBasketShortcut}
								countInputLabel={countInputLabel}
							/>
							{showBasketShortcut && (
								<BundleBasketShortcut
									bundleId={bundle?.id}
									className={styles.basketShortcut}
									size="md"
								/>
							)}
						</div>
					) : (
						<DirectQuantityBox
							className={cx(
								styles.quantityBox,
								styles.productDetail,
								'other-sellers'
							)}
							plusBtnType={QuantityBoxPlusBtnTypes.EXTENDED}
							bundle={bundle}
							isLoading={isQuantityLoading}
							orderLimitation={bundle?.orderLimitation}
							countInputLabel={countInputLabel}
						/>
					))}
				{!hideSeller && (
					<div className={styles.seller}>
						<span className={styles.sellerTitle}>{`${t({
							id: 'productDetail.seller.name',
						})}: `}</span>
						<span className={styles.sellerName}>{supplier}</span>
						{', '}
						{t(
							{
								id: 'bundle.warehouse.from',
							},
							{
								value: (
									<span
										className={styles.bolder}
										key="bdsc2-doNotRemoveThisKey"
									>
										{t({
											id: 'bundle.warehouse.from.vinisto',
										})}
									</span>
								),
							}
						)}
					</div>
				)}
			</div>
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
						{getLocalizedPrice({
							price: isB2b
								? vinistoPlusPriceOrDiscount?.value
								: vinistoPlusPriceOrDiscount?.valueWithVat,
							currency,
						})}
					</div>
				</button>
			)}
		</>
	);
};

export default BundleItem;
