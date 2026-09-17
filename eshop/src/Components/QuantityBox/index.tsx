import { ChangeEvent, CSSProperties, lazy, Suspense, useContext } from 'react';
import cx from 'classnames';
import useFormatMessage from 'Hooks/useFormatMessage';
import Skeleton from 'react-loading-skeleton';
import { AuthenticationContext } from 'Services/AuthenticationService/context';
import { ProductBoxContext } from 'Components/ProductBox/context';
import Loader from 'Components/View/Loader';
import { ModalContext } from 'Components/Modal/context';
import { LOGIN_MODAL } from 'Components/Modal/constants';
import getBundleLimitPerOrder from 'Helpers/getBundleLimitPerOrder';
import useCanSeePrices from 'Hooks/use-can-see-prices';
import { TEST_IDS } from 'Constants/test-ids';
import { usePlatformContext } from 'Services/PlatformService';
import { Popover } from 'vinisto_ui';
import { PopoverVariants } from 'vinisto_ui/src/components/popover/types';
import { DeviceServiceContext } from 'Services/DeviceService';

import { usePopover } from './hooks';
import ProductNotAvailablePopover from './Components/ProductNotAvailablePopover';
import MaximumQuantityReachedPopover from './Components/MaximumQuantityReachedPopover';
import OrderLimitReachedPopover from './Components/OrderLimitReachedPopover';
const AddToCartButtonMinus = lazy(
	() => import('Components/Icons/AddToCartButtonMinus')
);
const AddToCartButtonPlusWhite = lazy(
	() => import('Components/Icons/AddToCartButtonPlusWhite')
);
import {
	Popovers,
	PopoverTypes,
	QuantityBoxPlusBtnTypes,
	QuantityBoxPlusBtnVariants,
	QuantityBoxTypes,
	ShoppingIssues,
} from './constants';
import { QuantityBoxProps } from './interfaces';
import styles from './styles.module.css';

const QuantityBox = ({
	productId,
	type,
	plusBtnVariant,
	plusBtnType = QuantityBoxPlusBtnTypes.STANDARD,
	popoverType = PopoverTypes.COMPONENT,
	quantityInBasket,
	availableCount,
	count,
	onIncrement,
	onDecrement,
	onCountChange,
	onAddToBasket,
	afterAddToBasket,
	onBlur,
	className,
	isLoading,
	isForLogged,
	orderLimitation,
	carouselType,
	popoverClassname,
	isBasket,
	countInputLabel,
}: QuantityBoxProps) => {
	const { isB2b, getIsInAdminIframe } = usePlatformContext();
	const { isMobile, isTablet } = useContext(DeviceServiceContext);
	const isDirect = type === QuantityBoxTypes.DIRECT;
	const { isLoggedIn } = useContext(AuthenticationContext);
	const canSeePrices = useCanSeePrices();
	const modalContext = useContext(ModalContext);
	const productBoxContext = useContext(ProductBoxContext);

	const t = useFormatMessage();

	const popover = usePopover({
		[Popovers.PRODUCT_NOT_AVAILABLE]: {
			content: <ProductNotAvailablePopover key={'bundlena' + productId} />,
			variant: PopoverVariants.ERROR,
			withCloseButton: isMobile || isTablet,
		},
		[Popovers.MAXIMUM_QUANTITY_REACHED]: {
			content: (
				<MaximumQuantityReachedPopover availableCount={availableCount ?? 0} />
			),
			variant: PopoverVariants.ERROR,
			withCloseButton: isMobile || isTablet,
		},
		[Popovers.ORDER_LIMIT_REACHED]: {
			content: <OrderLimitReachedPopover orderLimitation={orderLimitation} />,
			variant: PopoverVariants.ERROR,
			withCloseButton: isMobile || isTablet,
		},
	});

	const isAvailableCount = typeof availableCount === 'number';
	const isUnavailable = !isAvailableCount || availableCount < 1;

	const bundleLimitPerOrder = getBundleLimitPerOrder(orderLimitation);
	const isBundleLimitPerOrder = typeof bundleLimitPerOrder === 'number';

	const isInBasket =
		typeof quantityInBasket === 'number' && quantityInBasket > 0;

	const getShoppingIssue = () => {
		if (isLoading) return null;
		if (!isDirect) {
			if (
				isBundleLimitPerOrder &&
				quantityInBasket + count > bundleLimitPerOrder
			) {
				return ShoppingIssues.ORDER_LIMIT_REACHED;
			}

			if (isAvailableCount && count + quantityInBasket > availableCount) {
				return ShoppingIssues.MAXIMUM_QUANTITY_REACHED;
			}
		}
		if (isDirect) {
			if (isBundleLimitPerOrder && count >= bundleLimitPerOrder) {
				return ShoppingIssues.ORDER_LIMIT_REACHED;
			}

			if (availableCount === 0) {
				return ShoppingIssues.PRODUCT_NOT_AVAILABLE;
			}

			if (isAvailableCount && count >= availableCount) {
				return ShoppingIssues.MAXIMUM_QUANTITY_REACHED;
			}
		}
		return null;
	};

	const shoppingIssue = getShoppingIssue();

	const isStandardOutOfStock =
		!isDirect && count >= (availableCount ?? 0) - (quantityInBasket ?? 0);

	const isDirectOutOfStock = isDirect && count >= (availableCount ?? 0);

	const isOutOfStock = isStandardOutOfStock || isDirectOutOfStock;

	const handleShoppingIssue = (issue: ShoppingIssues) => {
		if (issue === ShoppingIssues.ORDER_LIMIT_REACHED) {
			return popover.open(Popovers.ORDER_LIMIT_REACHED);
		}

		if (issue === ShoppingIssues.PRODUCT_NOT_AVAILABLE) {
			return popover.open(Popovers.PRODUCT_NOT_AVAILABLE);
		}

		if (issue === ShoppingIssues.MAXIMUM_QUANTITY_REACHED) {
			return popover.open(Popovers.MAXIMUM_QUANTITY_REACHED);
		}
	};

	const handleOnMouseEnter = () => {
		if (!isLoading && isUnavailable) {
			popover.open(Popovers.PRODUCT_NOT_AVAILABLE);
		}
	};

	const handleOnMouseLeave = () => {
		if (!isLoading) {
			popover.close();
		}
	};

	const handleOnDecrement = () => {
		if (isDirect && isAvailableCount && availableCount < quantityInBasket) {
			onCountChange(`${isAvailableCount ? availableCount : 0}`);
		} else {
			onDecrement();
		}
		popover.close();
	};

	const handleOnIncrement = () => {
		if (isPlusButtonDisabled && isOutOfStock) {
			popover.open(Popovers.MAXIMUM_QUANTITY_REACHED);
			return;
		}

		if (
			isBundleLimitPerOrder &&
			((isDirect && count >= bundleLimitPerOrder) ||
				(!isDirect && quantityInBasket + count >= bundleLimitPerOrder))
		) {
			return handleShoppingIssue(ShoppingIssues.ORDER_LIMIT_REACHED);
		}
		onIncrement();
	};

	const handleOnCountChange = (e: ChangeEvent<HTMLInputElement>) => {
		const userInput = e?.target?.value;
		if (
			!Number.isNaN(parseInt(userInput)) &&
			isAvailableCount &&
			parseInt(userInput) > availableCount
		) {
			popover.open(Popovers.MAXIMUM_QUANTITY_REACHED);
			onCountChange(e?.target?.value);
			popover.close();
			return;
		}
		if (
			!Number.isNaN(parseInt(userInput)) &&
			isBundleLimitPerOrder &&
			(parseInt(userInput) > bundleLimitPerOrder ||
				(isDirect && parseInt(userInput) > bundleLimitPerOrder))
		) {
			popover.open(Popovers.ORDER_LIMIT_REACHED);
			onCountChange(String(bundleLimitPerOrder));
			popover.close();
			return;
		}
		onCountChange(userInput);
		popover.close();
	};

	const handleOnAddToBasket = () => {
		if (!shoppingIssue) {
			onAddToBasket().then(() => {
				if (productBoxContext === undefined) return;
				productBoxContext.addToBasketCallback();
			});
		} else {
			handleShoppingIssue(shoppingIssue);
		}
		afterAddToBasket && afterAddToBasket();
	};

	const isShopingIssue = Boolean(shoppingIssue);

	const isMinusButtonDisabled =
		(isDirect && quantityInBasket === 0) || (!isDirect && count === 1);

	const isStandardPlusButtonDisabled =
		!isDirect &&
		(isStandardOutOfStock ||
			(typeof bundleLimitPerOrder === 'number' &&
				bundleLimitPerOrder !== 0 &&
				count >= bundleLimitPerOrder - (quantityInBasket ?? 0)));

	const isDirectPlusButtonDisabled =
		isDirect &&
		(isDirectOutOfStock ||
			(typeof bundleLimitPerOrder === 'number' &&
				bundleLimitPerOrder !== 0 &&
				count >= bundleLimitPerOrder));

	const isPlusButtonDisabled =
		isDirectPlusButtonDisabled || isStandardPlusButtonDisabled;

	const isCustomPopoverPosition = popoverType === PopoverTypes.WINDOW;

	const isOnBundleDetailPage = carouselType === undefined;
	const anchorName = `--qb-anchor-${productId}`;

	const renderPopover = () => (
		<Popover
			isOpen={popover.methods.isOpen}
			onClose={popover.methods.onClose}
			variant={popover.methods.variant}
			withCloseButton={popover.methods.withCloseButton}
			className={cx(
				popoverClassname,
				isCustomPopoverPosition && styles.customPopoverPosition
			)}
			style={
				{
					positionAnchor: anchorName,
					positionArea: 'top',
					margin: 4,
				} as CSSProperties
			}
		>
			{popover.methods.content || null}
		</Popover>
	);

	const isOnlyForLoggedInAndUserIsNotLogged = !isLoggedIn && isForLogged;
	const isAdminIframe = getIsInAdminIframe();

	if (
		isOnlyForLoggedInAndUserIsNotLogged ||
		(!canSeePrices && !isAdminIframe)
	) {
		return (
			<>
				<div
					className={cx(
						'quantity-box-wrapper',
						styles.wrapper,
						{
							[styles.disabled]: isShopingIssue,
						},
						className
					)}
					onMouseEnter={handleOnMouseEnter}
					onMouseLeave={handleOnMouseLeave}
					style={{ anchorName } as CSSProperties}
				>
					<button
						type="button"
						className={cx(
							'w-100',
							'addToBasketButton',
							styles.addToBasketButton,
							{
								[styles.disabled]: isShopingIssue,
								[styles.isForLogged]: !isLoggedIn && isForLogged,
							}
						)}
						onClick={() => modalContext.handleOpenModal(LOGIN_MODAL, {})}
						data-testid={`${TEST_IDS.PRODUCT_BOX_LOGIN_AND_SHOP}${
							carouselType !== undefined ? '_' + carouselType : ''
						}_${productId}`}
					>
						{t({
							id:
								productBoxContext?.addToBasketButtonLabel ??
								'carousel.button.loginAndShop',
						})}
					</button>
				</div>
				{renderPopover()}
			</>
		);
	}

	return (
		<>
			<div
				className={cx(
					'quantity-box-wrapper',
					styles.wrapper,
					{
						[styles.disabled]: isShopingIssue,
					},
					className
				)}
				onMouseEnter={handleOnMouseEnter}
				onMouseLeave={handleOnMouseLeave}
				style={{ anchorName } as CSSProperties}
			>
				{(!isDirect || (isDirect && isInBasket) || isBasket) &&
					(isLoading ? (
						<Skeleton
							width="135px"
							height={isOnBundleDetailPage ? '3rem' : '1.78125rem'}
						/>
					) : (
						<div className={styles.countWrapper}>
							<button
								type="button"
								className={cx(styles.minusButton, {
									[styles.disabled]: isMinusButtonDisabled,
									[styles.detailMinusButton]: !isDirect,
									[styles.basketMinusButton]: isBasket,
								})}
								onClick={handleOnDecrement}
							>
								<Suspense fallback={<Loader blank />}>
									<AddToCartButtonMinus
										alt={t({ id: 'alt.less' })}
										className={styles.minusButtonIcon}
										stroke="#4D4D4E"
									/>
								</Suspense>
							</button>
							{/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
							<label
								className={cx(
									styles.wineCountLabel,
									isBasket && styles.basketLabel,
									countInputLabel && styles.wineCountLabelWithText
								)}
							>
								{countInputLabel && (
									<span className={styles.countInputLabel}>
										{countInputLabel}
									</span>
								)}
								<input
									className={cx(styles.countInput, 'inputCartDetailButton', {
										[styles.detailCountInput]: !isDirect,
										[styles.basketCountInput]: isBasket,
										[styles.isB2b]: isB2b,
									})}
									type="text"
									value={count === -1 ? '' : count}
									onChange={handleOnCountChange}
									onKeyDown={(e) => {
										e.stopPropagation();
									}}
									onBlur={() => onBlur()}
									inputMode="numeric"
								/>
							</label>
							<div
								className={cx(styles.plusButtonWrapper, {
									[styles.detailPlusButton]: !isDirect,
								})}
							>
								<button
									type="button"
									className={cx(styles.plusButton, {
										[styles.success]:
											plusBtnVariant === QuantityBoxPlusBtnVariants.SUCCESS,
										[styles.extended]:
											plusBtnType === QuantityBoxPlusBtnTypes.EXTENDED,
										[styles.detailPlusButton]: !isDirect,
										[styles.basketPlusButton]: isBasket,
									})}
									aria-disabled={isPlusButtonDisabled}
									onClick={handleOnIncrement}
								>
									<Suspense fallback={<Loader blank />}>
										<AddToCartButtonPlusWhite
											alt={t({ id: 'alt.more' })}
											className={cx(styles.plusButtonIcon)}
										/>
									</Suspense>
								</button>
							</div>
						</div>
					))}
				{(!isDirect || (isDirect && !isInBasket && !isBasket)) &&
					(isLoading ? (
						<Skeleton
							height={isOnBundleDetailPage ? '3rem' : '1.78125rem'}
							width="100%"
							containerClassName="d-flex flex-grow-1"
						/>
					) : (
						<button
							type="button"
							className={cx(
								'w-100',
								'addToCartDetailButton',
								styles.addToBasketButton,
								{
									[styles.disabled]: isShopingIssue,
									[styles.detailAddToBasketButton]: !isDirect,
									[styles.isForLogged]: !isLoggedIn && isForLogged,
								}
							)}
							onClick={handleOnAddToBasket}
							data-testid={`${TEST_IDS.PRODUCT_BOX_ADD_TO_BASKET}${
								carouselType !== undefined ? '_' + carouselType : ''
							}_${productId}`}
						>
							{t({
								id:
									productBoxContext?.addToBasketButtonLabel ??
									'cart.outOfStockItem.alternative.addToBasketBtnLabel',
							})}
						</button>
					))}
			</div>
			{renderPopover()}
		</>
	);
};

export default QuantityBox;

export { default as StandardQuantityBox } from './Variants/StandardQuantityBox';
export { default as DirectQuantityBox } from './Variants/DirectQuantityBox';
