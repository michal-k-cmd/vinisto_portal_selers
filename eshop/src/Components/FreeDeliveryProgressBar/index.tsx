'use client';

import { lazy, Suspense, useContext } from 'react';
import cx from 'classnames';
import createCurrencyValue from 'Helpers/createCurrencyValue';
import { BasketContext } from 'Services/BasketService';
import { LocalizationContext } from 'Services/LocalizationService';
import { useIsB2b } from 'Services/PlatformService';
const DeliveryIcon = lazy(() => import('Components/Icons/Delivery'));
import Loader from 'Components/View/Loader';

import styles from './styles.module.css';

type TVariant =
	| 'box'
	| 'small-vertical'
	| 'small-horizontal'
	| 'horizontal'
	| 'popup'
	| 'banner'
	| 'wide-horizontal'
	| 'basket-horizontal';

type TFreeDeliveryProgressBarPropsUI = {
	variant: TVariant;
	basketPrice: number;
	freeDeliveryMinPrice: number | null;
	currency: string;
	isPriceWithoutVat?: boolean;
};

type TConfigProps = {
	showFullText?: boolean;
	showTextLeftIcon?: boolean;
	showTextRightIcon?: boolean;
	showMediumProgressText?: boolean;
	showShortText?: boolean;
	showShortProgressText?: boolean;
	showFullProgressText?: boolean;
	showInfoProgressText?: boolean;
	showProgressTextLeftIcon?: boolean;
	showProgressTextRightIcon?: boolean;
};

const configProps: TConfigProps = {
	showFullText: undefined,
	showTextLeftIcon: undefined,
	showTextRightIcon: undefined,
	showMediumProgressText: undefined,
	showShortText: undefined,
	showShortProgressText: undefined,
	showFullProgressText: undefined,
	showInfoProgressText: undefined,
	showProgressTextLeftIcon: undefined,
	showProgressTextRightIcon: undefined,
};

const getVariantConfig = (variant: TVariant): TConfigProps => {
	switch (variant) {
		default:
		case 'box':
			return {
				...configProps,
				showFullText: true,
				showTextLeftIcon: true,
				showTextRightIcon: true,
				showMediumProgressText: true,
			};
		case 'small-vertical':
			return {
				...configProps,
				showShortText: true,
				showTextLeftIcon: true,
				showShortProgressText: true,
			};
		case 'horizontal':
		case 'small-horizontal':
		case 'wide-horizontal':
			return {
				...configProps,
				showFullProgressText: true,
				showProgressTextLeftIcon: true,
				showProgressTextRightIcon: true,
			};
		case 'basket-horizontal':
			return {
				...configProps,
				showFullProgressText: true,
				showProgressTextLeftIcon: true,
				showProgressTextRightIcon: true,
			};
		case 'popup':
			return {
				...configProps,
				showFullText: true,
				showTextLeftIcon: true,
				showTextRightIcon: true,
				showMediumProgressText: true,
			};
		case 'banner':
			return {
				...configProps,
				showProgressTextLeftIcon: true,
				showProgressTextRightIcon: true,
				showInfoProgressText: true,
			};
	}
};

export const FreeDeliveryProgressBarUI = ({
	variant = 'box',
	basketPrice,
	freeDeliveryMinPrice,
	currency,
	isPriceWithoutVat = false,
}: TFreeDeliveryProgressBarPropsUI) => {
	const t = useContext(LocalizationContext).useFormatMessage();
	const currencyLabel = isPriceWithoutVat
		? `${currency} ${t({ id: 'basket.priceWithoutVAT' })}`
		: currency;

	const {
		showShortText,
		showFullText,
		showTextLeftIcon,
		showTextRightIcon,
		showShortProgressText,
		showMediumProgressText,
		showFullProgressText,
		showInfoProgressText,
		showProgressTextLeftIcon,
		showProgressTextRightIcon,
	} = getVariantConfig(variant);

	if (
		typeof basketPrice !== 'number' ||
		typeof freeDeliveryMinPrice !== 'number'
	) {
		return <></>;
	}

	const deliveryFree = freeDeliveryMinPrice === 0;
	const isCompleted = deliveryFree || basketPrice > freeDeliveryMinPrice;
	const isInProgress = basketPrice > 0 && basketPrice < freeDeliveryMinPrice;
	const price = createCurrencyValue(basketPrice);
	const minPrice = createCurrencyValue(freeDeliveryMinPrice);

	const shortText = t({ id: 'freeDeliveryBar.shortText' });
	const longText = isCompleted
		? t(
				{ id: 'freeDeliveryBar.longText.completed' },
				{
					free: (
						<span
							key="freeDeliveryBar.free"
							className={styles.bolder}
						>
							{t({ id: 'freeDeliveryBar.free' })}
						</span>
					),
				}
		  )
		: t(
				{ id: 'freeDeliveryBar.longText' },
				{
					priceLeft: (
						<span
							key="freeDeliveryBar.priceLeft"
							className={styles.bolder}
						>
							{`${createCurrencyValue(
								freeDeliveryMinPrice - basketPrice
							)} ${currencyLabel}`}
						</span>
					),
				}
		  );
	const shortProgressText = minPrice;
	const mediumProgressText = isCompleted
		? `${price} ${currencyLabel}`
		: t(
				{ id: 'freeDeliveryBar.progress.mediumText' },
				{
					basketPrice: price,
					freeDeliveryMinPrice: minPrice,
					currency: currencyLabel,
				}
		  );
	const longProgressText = isCompleted
		? t(
				{ id: 'freeDeliveryBar.progress.longText.completed' },
				{
					free: (
						<span
							className={cx(styles.bolder, styles.freeFull)}
							key="freeDeliveryBar.progress.longText.completed"
						>
							{t({ id: 'freeDeliveryBar.free' })}
						</span>
					),
				}
		  )
		: t(
				{ id: 'freeDeliveryBar.progress.longText' },
				{
					basketPrice: (
						<span
							className={styles.light}
							key="freeDeliveryBar.progress.longText"
						>
							{price}
						</span>
					),
					freeDeliveryMinPrice: minPrice,
					currency: currencyLabel,
				}
		  );
	const infoProgressText = t(
		{ id: 'freeDeliveryBar.progress.infoText' },
		{
			price: (
				<span
					key="freeDeliveryBar.progress.infoText"
					className={styles.bolder}
				>{`${freeDeliveryMinPrice} ${currencyLabel}`}</span>
			),
		}
	);

	return (
		<div
			className={cx(styles.wrapper, {
				[styles.wrapperBox]: variant === 'box',
				[styles.wrapperSmallVertical]: variant === 'small-vertical',
				[styles.wrapperSmallHorizontal]: variant === 'small-horizontal',
				[styles.wrapperHorizontal]: variant === 'horizontal',
				[styles.wrapperWideHorizontal]: variant === 'wide-horizontal',
				[styles.wrapperBasketHorizontal]: variant === 'basket-horizontal',
				[styles.wrapperPopup]: variant === 'popup',
				[styles.wrapperBanner]: variant === 'banner',
				[styles.wrapperSuccess]: isCompleted,
				[styles.wrapperEmpty]: basketPrice === 0 && freeDeliveryMinPrice !== 0,
			})}
		>
			{!(
				!showTextLeftIcon &&
				!showTextRightIcon &&
				!showFullText &&
				!showShortText
			) && (
				<div
					className={cx(styles.textWrapper, {
						['pb-2']: variant === 'small-vertical' && isCompleted,
					})}
				>
					{showTextLeftIcon && (
						<Suspense fallback={<Loader blank />}>
							<DeliveryIcon
								className={cx(styles.textIcon, styles.textIconGreen)}
							/>
						</Suspense>
					)}
					{showShortText && (
						<span className={cx(styles.text, styles.textShort)}>
							{shortText}
						</span>
					)}
					{showFullText && (
						<span className={cx(styles.text, styles.textFull)}>{longText}</span>
					)}
					{showTextRightIcon && (
						<Suspense fallback={<Loader blank />}>
							<DeliveryIcon
								className={cx(styles.textIcon, styles.textIconGreen)}
							/>
						</Suspense>
					)}
				</div>
			)}
			{((variant === 'small-vertical' && !isCompleted) ||
				variant !== 'small-vertical') && (
				<div
					className={cx(styles.progressBar, {
						[styles.progressBarInProgress]: isInProgress,
					})}
				>
					<div
						className={styles.progressBarCompleted}
						style={{
							width: `${(basketPrice / freeDeliveryMinPrice) * 100}%`,
						}}
					></div>
					{showProgressTextLeftIcon && (
						<Suspense fallback={<Loader blank />}>
							<DeliveryIcon
								className={cx(styles.textIcon, {
									[styles.progressIcon]: isInProgress,
									[styles.textIconGreen]: deliveryFree || isCompleted,
								})}
							/>
						</Suspense>
					)}
					{showShortProgressText && (
						<span className={styles.progressTextShort}>
							{shortProgressText}
						</span>
					)}
					{showMediumProgressText && variant !== 'popup' && (
						<span className={styles.progressTextMedium}>
							{mediumProgressText}
						</span>
					)}
					{showFullProgressText && (
						<div
							className={cx('d-inline-flex align-items-center', {
								[styles.bolder]: !isCompleted,
							})}
						>
							<span
								className={cx({
									[styles.progressTextFull]: isCompleted,
								})}
							>
								{longProgressText}
							</span>
						</div>
					)}
					{showInfoProgressText && (
						<span className={styles.progressTextInfo}>{infoProgressText}</span>
					)}
					{showProgressTextRightIcon && (
						<Suspense fallback={<Loader blank />}>
							<DeliveryIcon
								className={cx(styles.textIcon, {
									[styles.progressIcon]: isInProgress,
									[styles.textIconGreen]: deliveryFree || isCompleted,
								})}
							/>
						</Suspense>
					)}
				</div>
			)}
		</div>
	);
};

type TFreeDeliveryProgressBarProps = {
	variant: TVariant;
};

const FreeDeliveryProgressBar = ({
	variant = 'box',
}: TFreeDeliveryProgressBarProps) => {
	const isB2b = useIsB2b();
	const { basketState, minimalPriceForFreeDelivery } =
		useContext(BasketContext);
	const { activeCurrency } = useContext(LocalizationContext);

	const basketPriceForDelivery = isB2b
		? basketState?.basketPriceForDelivery ?? 0
		: basketState?.basketPriceWithVatForDelivery ?? 0;

	return (
		<FreeDeliveryProgressBarUI
			variant={variant}
			basketPrice={basketPriceForDelivery}
			freeDeliveryMinPrice={minimalPriceForFreeDelivery}
			currency={activeCurrency?.title}
			isPriceWithoutVat={isB2b}
		/>
	);
};

export default FreeDeliveryProgressBar;
