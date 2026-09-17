'use client';

import { useContext, useRef } from 'react';
import cx from 'classnames';
import NextLink from 'next/link';
import Skeleton from 'react-loading-skeleton';
import { LocalizationContext } from 'Services/LocalizationService';
import { BasketContext } from 'Services/BasketService';
import usePreventOverScroll from 'Hooks/usePreventOverScroll';
import FreeDeliveryProgressBar from 'Components/FreeDeliveryProgressBar';
import { useMainHeaderHeight } from 'Hooks/useMainHeaderHeight';
import { getLocalizedPrice } from 'vinisto_shared/src/price/get-localized-price';
import { PACKAGING_BUNDLE_ID } from 'pages-spa/Basket/Components/Packaging/hooks';
import { useIsB2b } from 'Services/PlatformService';

import BundleItem from './Components/BundleItem';
import SideBasketContextProvider from './context';
import styles from './styles.module.css';

const SideBasketUI = () => {
	const isB2b = useIsB2b();
	const { useFormatMessage } = useContext(LocalizationContext);
	const t = useFormatMessage();
	const {
		basketState,
		itemsQuantity,
		minimalPriceForFreeDelivery,
		isSideBasketVisible,
		basketBundles,
	} = useContext(BasketContext);

	const currency = basketState?.currency;

	const isLoading = !basketState?.items;
	const itemsRef = useRef<HTMLDivElement>(null);

	usePreventOverScroll(itemsRef);

	const headerOffset = useMainHeaderHeight();
	const headerWidgets =
		typeof document == 'undefined'
			? null
			: document.getElementById('header-widgets');
	const headerWidgetsHeight = headerWidgets?.clientHeight || 0;

	if (!basketState || !isSideBasketVisible) {
		return null;
	}

	return (
		<div
			className={styles.sideBasket}
			onClick={(e) => e.stopPropagation()}
			style={{ cursor: 'auto', top: '-' + headerWidgetsHeight + 'px' }}
			onKeyDown={() => null}
			tabIndex={0}
			role="button"
		>
			<NextLink
				href={`/${t({ id: 'routes.cart.route' })}`}
				className={styles.prices}
				style={{ flexBasis: headerOffset + headerWidgetsHeight + 'px' }}
			>
				<div
					className={styles.pricesWrap}
					style={{ paddingTop: headerWidgetsHeight + 'px' }}
				>
					<span className="fw-bolder">
						{isLoading ? (
							<Skeleton
								width="49px"
								height="12px"
							/>
						) : (
							<div>
								{getLocalizedPrice({
									price:
										(isB2b
											? basketState.totalDiscountedPriceWithVat
											: basketState.totalDiscountedPrice) ?? 0,
									currency,
								}).replace(/\s/, '')}
							</div>
						)}
						<span className={styles.pricesSmall}>
							{isLoading ? (
								<Skeleton
									width="49px"
									height="12px"
								/>
							) : (
								t({
									id: isB2b ? 'basket.priceWithVAT' : 'basket.priceWithoutVAT',
								})
							)}
						</span>
					</span>
					{isLoading ? (
						<Skeleton
							width="49px"
							height="12px"
							count={1.7}
						/>
					) : (
						<span className="fw-bolder">
							<span className={styles.pricesTotal}>
								{getLocalizedPrice({
									price:
										(isB2b
											? basketState.totalDiscountedPrice
											: basketState.totalDiscountedPriceWithVat) ?? 0,
									currency,
								}).replace(/\s/, '')}
							</span>
							<br />
							<span className={styles.pricesSmall}>
								{t({
									id: isB2b ? 'basket.priceWithoutVAT' : 'basket.priceWithVAT',
								})}
							</span>
						</span>
					)}
				</div>
				<span className={styles.count}>
					{isLoading ? (
						<Skeleton
							width="16px"
							height="12px"
						/>
					) : (
						itemsQuantity ?? 0
					)}
				</span>
			</NextLink>
			{minimalPriceForFreeDelivery !== null && (
				<div className={styles.freeDelivery}>
					<div className={styles.freeDeliveryInfo}>
						<span className={styles.freeDeliveryInfoBtn}>i</span>
						<div className={styles.freeDeliveryInfoBtnPopup}>
							<FreeDeliveryProgressBar variant="popup" />
						</div>
					</div>
					<FreeDeliveryProgressBar variant="small-vertical" />
				</div>
			)}
			<div
				ref={itemsRef}
				className={styles.items}
			>
				{isLoading ? (
					<div className={cx(styles.itemWrap, 'skeleton')}>
						<Skeleton
							width="55px"
							height="75px"
							count={10}
							style={{
								marginBottom: '10px',
							}}
						/>
					</div>
				) : (
					basketBundles
						?.filter((item) => item.itemId !== PACKAGING_BUNDLE_ID)
						.map((basketItem) => (
							<BundleItem
								basketItem={basketItem}
								key={basketItem.itemId}
							/>
						))
				)}
			</div>
		</div>
	);
};

const SideBasket = () => {
	const { basketState } = useContext(BasketContext);

	if (basketState?.items?.length === 0) {
		return null;
	}

	return (
		<SideBasketContextProvider>
			<SideBasketUI />
		</SideBasketContextProvider>
	);
};

export default SideBasket;
