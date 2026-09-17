import { useCallback, useContext, useMemo, useRef, useState } from 'react';
import type { MouseEvent } from 'react';
import cx from 'classnames';
import Skeleton from 'react-loading-skeleton';
import Link from 'next/link';
import { useInViewport } from 'react-in-viewport';
import { QuantityBoxTypes } from 'Components/QuantityBox/constants';
import getFlagSpecification from 'Helpers/getFlagSpecification';
import usePreventDragRedirect from 'Hooks/use-prevent-drag-redirect';
import { LocalizationContext } from 'Services/LocalizationService';
import { WarehouseContext } from 'Services/WarehouseService';
import { DirectQuantityBox, StandardQuantityBox } from 'Components/QuantityBox';
import StockAvailability from 'Components/StockAvailability';
import quantityBoxStyles from 'Components/QuantityBox/styles.module.css';
import { useProductBasketCount } from 'Components/ProductBox/hooks';
import { useBundleMeta } from 'pages-spa/Bundle/hooks/use-bundle-detail';
import {
	useDiscountCoupons,
	useFindBundleInBasket,
} from 'pages-spa/Bundle/hooks';
import getBundleLimitPerOrder from 'Helpers/getBundleLimitPerOrder';
import { useDirectQuantityBox } from 'Components/QuantityBox/Variants/DirectQuantityBox/hooks';
import { useStandardQuantityBox } from 'Components/QuantityBox/Variants/StandardQuantityBox/hooks';
import { AuthenticationContext } from 'Services/AuthenticationService/context';
import useAnalytics from 'Hooks/useAnalytics';
import { GA_EVENT } from 'Hooks/useAnalytics/constants';
import type { GaItem } from 'Hooks/useAnalytics/types';
import useShowVinistoPlusPrice from 'Hooks/use-show-vinisto-plus-price';
import { useIsB2b } from 'Services/PlatformService';
import useCanSeePrices from 'Hooks/use-can-see-prices';
import CustomHighlighter from 'Components/CustomHighlighter';

import ProductBasketCount from './Components/ProductBasketCount';
import BundleProducer from './Components/BundleProducer';
import BundleTag from './Components/BundleTag';
import ButtonAddToFavorites from './Components/ButtonAddToFavorites';
import ProductSpecifications from './Components/Specifications';
import ProductTitleAndImage from './Components/TitleAndImage';
import { CARD_TYPE, IProductBoxProps } from './interfaces';
import styles from './styles.module.css';
import useFavoriteItem from './Components/ButtonAddToFavorites/hook';
import ProductBoxPrices from './Components/ProductBoxPrices';

const ProductBox = (props: IProductBoxProps) => {
	const isB2b = useIsB2b();
	const canSeePrices = useCanSeePrices();
	const localizationContext = useContext(LocalizationContext);
	const warehouseContext = useContext(WarehouseContext);
	const { isLoggedIn } = useContext(AuthenticationContext);
	const { sendEvent } = useAnalytics();

	const t = localizationContext.useFormatMessage();
	const { title: currencyTitle } = localizationContext.activeCurrency;

	const bundle = props.bundleData ?? null;

	const isCrossSell = props.isCrossSell ?? false;

	const {
		isCouponAvailable,
		priceWhenCouponApplied,
		mostValuableDiscountCoupon,
		handleOnAddToBasketWithDiscountCoupon,
	} = useDiscountCoupons({ bundle: bundle ?? null });
	const itemInBasket = useFindBundleInBasket({ bundleId: bundle?.id });

	const bundleLimitPerOrder = getBundleLimitPerOrder(bundle?.orderLimitation);
	const wouldApplyingExceedOrderLimitation =
		typeof bundleLimitPerOrder === 'number' &&
		bundleLimitPerOrder <= (itemInBasket?.quantity ?? 0);

	const { bundleName, bundleUrl } = useBundleMeta(bundle);
	const bundleId = bundle?.id ?? '';
	const isTemporaryUnavailable = bundle?.flags.isTemporaryUnavailable ?? false;
	const isSaleOver = bundle?.flags.isSaleOver ?? false;
	const isGift = bundle?.flags.isGift ?? false;
	const isForLogged = bundle?.flags.isForLogged ?? false;

	const showAddToBasketBtn = props.showAddToBasketBtn ?? true;
	const showSpecifications = props.showSpecifications ?? true;
	const showProducer = props.showProducer ?? true;
	const showAddToFavoritesBtn =
		(props?.showAddToFavoritesBtn ?? true) &&
		!isTemporaryUnavailable &&
		!isGift;

	const specificationDetails = bundle?.specificationDetails ?? [];

	const { shortVariety: producerName, component: flag } =
		getFlagSpecification(specificationDetails);

	const isLoading = props?.isLoading ?? false;

	const openCrossSellModal = props?.openCrossSellModal ?? true;

	const bundlePrices = bundle?.bundlePrices ?? null;

	const {
		basePrice,
		discountedPrice,
		isDiscounted,
		vinistoPlusPriceOrDiscount,
	} = bundlePrices ?? {};

	const availableQuantity = [warehouseContext.getQuantity(bundleId)].filter(
		(x): x is number => x !== undefined
	);

	const position = props.position ?? 0;
	const page = props.page ? (props.page - 1) * 30 : 0;
	const itemIndex = page + position;
	const itemListId = props.itemListId ?? props.carouselType ?? 'product_list';
	const itemListName =
		props.itemListName ?? props.carouselType ?? 'Product list';

	const { basketQuantityPopover } = useProductBasketCount(bundle);
	const { quantityInBasket } = useDirectQuantityBox({ bundle });

	const { handleAddItemToFavorites, handleRemoveItemFromFavorites } =
		useFavoriteItem(bundleId, {
			price: (isDiscounted ? discountedPrice?.value : basePrice?.value) ?? 0,
			currency: currencyTitle,
			item_name: bundleName,
		});

	const { handleClick, handleMouseDown, preventDefaultEvent } =
		usePreventDragRedirect();

	const getProductAnalyticsItem = useCallback((): GaItem | null => {
		if (!bundle) return null;

		return {
			item_id: bundle.id,
			item_name: bundleName,
			item_brand: producerName,
			item_list_id: itemListId,
			item_list_name: itemListName,
			index: itemIndex + 1,
			price: (isDiscounted ? discountedPrice?.value : basePrice?.value) ?? 0,
			quantity: 1,
		};
	}, [
		basePrice?.value,
		bundle,
		bundleName,
		discountedPrice?.value,
		isDiscounted,
		itemIndex,
		itemListId,
		itemListName,
		producerName,
	]);

	const handleProductClick = useCallback(
		(event: MouseEvent<HTMLAnchorElement>) => {
			if (!handleClick(event)) return;

			const item = getProductAnalyticsItem();
			if (!item) return;

			sendEvent(GA_EVENT.SELECT_ITEM, {
				item_list_id: itemListId,
				item_list_name: itemListName,
				items: [item],
			});
		},
		[getProductAnalyticsItem, handleClick, itemListId, itemListName, sendEvent]
	);

	const handleScrollToView = useCallback(
		(element: Element | null) =>
			isCrossSell
				? () => null
				: () => {
						if (element) {
							element.scrollIntoView({ behavior: 'smooth', block: 'center' });
						}
				  },
		[isCrossSell]
	);

	const standardQuantityBoxMethods = useStandardQuantityBox(
		bundle,
		openCrossSellModal
	);

	const productBoxRef = useRef<HTMLDivElement>(null);

	const [enteredViewPort, setEnteredViewPort] = useState(false);

	const { inViewport } = useInViewport(
		productBoxRef,
		{
			root: typeof document !== 'undefined' ? document.body : null,
			rootMargin: '0px',
		},
		undefined,
		{
			onEnterViewport: () => {
				setEnteredViewPort(true);
			},
		}
	);

	const hasToLoginToBeAbleToApplyCoupon =
		mostValuableDiscountCoupon &&
		'isForRegisteredUsers' in mostValuableDiscountCoupon &&
		mostValuableDiscountCoupon.isForRegisteredUsers &&
		!isLoggedIn;

	const isDisabled = !availableQuantity.some((count) => count > 0);

	const isAvailableQuantityLoading = availableQuantity.length === 0;

	const { canBuyForVinistoPlusPrice } = useShowVinistoPlusPrice({
		vinistoPlusPriceOrDiscount,
		priceWhenCouponApplied,
		canBeCouponApplied:
			isCouponAvailable && !wouldApplyingExceedOrderLimitation,
	});

	const warehouseId = bundle?.warehouseId.join(', ');

	const searchString = props.searchString;

	const search = useMemo(
		() => (searchString ? [searchString] : []),
		[searchString]
	);

	return (
		<div
			className={cx('vinisto-wine__item', {
				loading: isLoading,
				[styles.cardMargin]: props.cardType === CARD_TYPE.SINGLE,
			})}
			id={`bundle-link-key-${itemIndex}`}
			ref={productBoxRef}
		>
			{isLoading ? (
				<ProductTitleAndImage
					bundle={null}
					search={search}
					isLoading
					isInViewport={enteredViewPort || inViewport}
				/>
			) : (
				<>
					<Link
						className="vinisto-wine__item-overlay"
						href={`/${t({
							id: 'routes.product.route',
						})}/${bundleUrl}`}
						rel="nofollow"
						onDragStart={preventDefaultEvent}
						onMouseDown={handleMouseDown}
						onMouseUp={preventDefaultEvent}
						onClick={handleProductClick}
					/>
					<ProductBasketCount text={basketQuantityPopover} />
					<div className="vinisto-wine__img-labels">
						{(bundle?.tags ?? []).map((tagDetail, index) => {
							return (
								<BundleTag
									tagDetail={tagDetail}
									key={`bundle-${bundleId}-tag-${
										tagDetail?.id ?? 'bndl' + index
									}`}
									isLink={false}
								/>
							);
						})}
					</div>
					<Link
						href={`/${t({
							id: 'routes.product.route',
						})}/${bundleUrl}`}
						tabIndex={-1}
						onDragStart={preventDefaultEvent}
						onMouseDown={handleMouseDown}
						onMouseUp={preventDefaultEvent}
						onClick={handleProductClick}
					>
						<ProductTitleAndImage
							bundle={bundle}
							search={search}
							isInViewport={enteredViewPort || inViewport}
						/>
						{isB2b && warehouseId && (
							<div className={styles.warehouseId}>
								{t(
									{ id: 'warehouseId' },
									{
										id: (
											<strong key="warehouseId">
												<CustomHighlighter
													searchWords={search}
													textToHighlight={warehouseId}
													autoEscape
												/>
											</strong>
										),
									}
								)}
							</div>
						)}
					</Link>
					{showAddToFavoritesBtn && (
						<ButtonAddToFavorites
							itemId={bundle?.id ?? ''}
							addToFavorites={handleAddItemToFavorites}
							removeItemFromFavorites={handleRemoveItemFromFavorites}
							carouselType={props?.carouselType ?? ''}
						/>
					)}
				</>
			)}
			{showProducer && (
				<BundleProducer
					flag={flag}
					name={producerName}
					isLoading={isLoading}
					isLink={false}
					searchString={searchString}
				/>
			)}
			{showSpecifications && (
				<div className={styles.specificationsWrapper}>
					<ProductSpecifications
						specifications={specificationDetails}
						isLoading={isLoading}
					/>
				</div>
			)}
			<div className={styles.bottomInfo}>
				{canSeePrices && (
					<ProductBoxPrices
						bundleData={bundle}
						isLoading={isLoading}
					/>
				)}
				<div className="vinisto-wine__stock">
					<StockAvailability
						availableQuantity={availableQuantity}
						deliveryDate={warehouseContext.deliveryDate}
						isTemporaryUnavailable={isTemporaryUnavailable}
						isSaleOver={isSaleOver}
						isIntangible={bundle?.flags.isIntangible ?? false}
						fallback={<Skeleton width="80px" />}
					/>
				</div>
				{showAddToBasketBtn && !isTemporaryUnavailable && !isSaleOver && (
					<div
						className={cx(
							styles.aboveProductLink,
							styles.cta,
							'vinisto-wine__qunatity-box-wrapper'
						)}
						onClick={(e) => e.stopPropagation()}
						role="button"
						tabIndex={0}
					>
						{!canBuyForVinistoPlusPrice &&
						isCouponAvailable &&
						!wouldApplyingExceedOrderLimitation &&
						quantityInBasket === 0 &&
						!(isForLogged && !isLoggedIn) &&
						!hasToLoginToBeAbleToApplyCoupon ? (
							<button
								className={cx(quantityBoxStyles.addToBasketButton, 'w-100', {
									invisible: isAvailableQuantityLoading,
								})}
								onClick={() => {
									handleOnAddToBasketWithDiscountCoupon({
										openCrossSellModal: false,
									});
									handleScrollToView(productBoxRef.current)();
								}}
								disabled={isDisabled}
							>
								{t({
									id: 'productbox.buyWithCoupon',
								})}
							</button>
						) : props?.quantityBoxType === QuantityBoxTypes.STANDARD ? (
							<StandardQuantityBox
								bundle={bundle}
								shouldOpenCrossSellModal={openCrossSellModal}
								isLoading={isLoading}
								className={cx(quantityBoxStyles.fullWidth, {
									invisible: isAvailableQuantityLoading,
								})}
								orderLimitation={bundle?.orderLimitation}
								carouselType={props?.carouselType ?? ''}
								afterAddToBasket={handleScrollToView(productBoxRef.current)}
								methods={standardQuantityBoxMethods}
							/>
						) : (
							<DirectQuantityBox
								bundle={bundle}
								isLoading={isLoading}
								className={cx(quantityBoxStyles.fullWidth, {
									invisible: isAvailableQuantityLoading,
								})}
								orderLimitation={bundle?.orderLimitation}
								carouselType={props?.carouselType ?? ''}
								afterAddToBasket={handleScrollToView(productBoxRef.current)}
							/>
						)}
					</div>
				)}
			</div>
		</div>
	);
};

export default ProductBox;
