import React, {
	FC,
	lazy,
	Suspense,
	useCallback,
	useContext,
	useEffect,
	useMemo,
} from 'react';
import { get, invoke, replace, uniqueId } from 'lodash-es';
import cx from 'classnames';
import { BasketContext } from 'Services/BasketService';
import { LocalizationContext } from 'Services/LocalizationService';
import Skeleton from 'react-loading-skeleton';
import Loader from 'Components/View/Loader';

import { ARROW_DOWN_KEY, ARROW_UP_KEY, MIN_QUANTITY } from './constants';
import { IQuantityBoxProps } from './interfaces';

const AddToCartButtonMinus = lazy(
	() => import('Components/Icons/AddToCartButtonMinus')
);
const AddToCartButtonPlus = lazy(
	() => import('Components/Icons/AddToCartButtonPlus')
);
const BottleTimesIcon = lazy(() => import('Components/Icons/BottleTimes'));

const QuantityBox: FC<IQuantityBoxProps> = (
	props: IQuantityBoxProps
): JSX.Element => {
	const basketContext = useContext(BasketContext);
	const localizationContext = useContext(LocalizationContext);

	const t = localizationContext.useFormatMessage();

	const isLoading = get(props, 'isLoading', false);
	const isUniqueBundle = get(props, 'isUniqueBundle', false);
	const availableQuantity = get(props, 'availableQuantity', 0);
	const className = get(props, 'className');

	const icoIdSuffix = useMemo(() => uniqueId(), []);

	const minAllowedQuantity = Math.min(availableQuantity, MIN_QUANTITY);
	const maxAllowedQuantity = availableQuantity;
	const isAvailableToBuy = availableQuantity > 0;

	const quantity = get(props, 'quantity', minAllowedQuantity);
	const setQuantity = get(props, 'setQuantity', () => {});
	const inputValue = quantity === null ? '' : String(quantity); // to avoid leading zeros

	useEffect(() => {
		setQuantity(minAllowedQuantity);
	}, [setQuantity, minAllowedQuantity]);

	// reset quantity after basket changes (i.e. item gets added to the basket) - CrossSell does not need to refresh carousel items
	useEffect(() => {
		setQuantity(minAllowedQuantity);
	}, [setQuantity, basketContext.itemsQuantity, minAllowedQuantity]);

	const stopPropagation = useCallback(
		(event: React.UIEvent<HTMLDivElement>) => {
			event.stopPropagation();
		},
		[]
	);

	const increaseQuantity = useCallback(() => {
		setQuantity((oldQuantity) =>
			oldQuantity === null
				? minAllowedQuantity
				: Math.min(maxAllowedQuantity, oldQuantity + 1)
		);
	}, [setQuantity, minAllowedQuantity, maxAllowedQuantity]);

	const decreaseQuantity = useCallback(() => {
		setQuantity((oldQuantity) =>
			oldQuantity === null
				? minAllowedQuantity
				: Math.max(minAllowedQuantity, oldQuantity - 1)
		);
	}, [setQuantity, minAllowedQuantity]);

	const handleOnIncreaseQuantity = useCallback(
		(event: React.MouseEvent<HTMLElement>) => {
			event.preventDefault();
			event.stopPropagation();
			increaseQuantity();
		},
		[increaseQuantity]
	);

	const handleOnDecreaseQuantity = useCallback(
		(event: React.MouseEvent<HTMLElement>) => {
			event.preventDefault();
			event.stopPropagation();
			decreaseQuantity();
		},
		[decreaseQuantity]
	);

	const handleOnClickQuantity = useCallback(
		(event: React.MouseEvent<HTMLElement>) => {
			if (event) {
				event.preventDefault();
				event.stopPropagation();
				invoke(event, 'target.focus');
			}
		},
		[]
	);

	const handleOnChangeQuantity = useCallback(
		(event: React.ChangeEvent<HTMLInputElement>) => {
			const value = replace(get(event, 'target.value'), /[^\d]/, '');
			const numericValue = parseInt(value);
			setQuantity(
				isNaN(numericValue)
					? null
					: Math.min(
							Math.max(minAllowedQuantity, numericValue),
							maxAllowedQuantity
					  )
			);
		},
		[setQuantity, minAllowedQuantity, maxAllowedQuantity]
	);

	const handleOnBlurQuantity = useCallback(
		(event: React.ChangeEvent<HTMLInputElement>) => {
			const value = parseInt(
				get(event, 'target.value', String(minAllowedQuantity))
			);
			if (isNaN(value) || value < minAllowedQuantity) {
				setQuantity(minAllowedQuantity);
			} else if (value > maxAllowedQuantity) {
				setQuantity(maxAllowedQuantity);
			}
		},
		[setQuantity, minAllowedQuantity, maxAllowedQuantity]
	);

	const handleOnKeyDownQuantity = useCallback(
		(event: React.KeyboardEvent<HTMLInputElement>) => {
			if (event.key === ARROW_UP_KEY) {
				increaseQuantity();
				event.preventDefault(); // prevent cursor going to front
			} else if (event.key === ARROW_DOWN_KEY) {
				decreaseQuantity();
			}
		},
		[increaseQuantity, decreaseQuantity]
	);

	return (
		<div
			className={cx('vinisto-wine__count', className)}
			onMouseDown={stopPropagation}
			onClick={stopPropagation}
			onTouchMove={stopPropagation}
		>
			{isLoading ? (
				<Skeleton
					width="30px"
					height="30px"
				/>
			) : (
				isUniqueBundle && (
					<button
						className="vinisto-wine__count__minus btn-plus-minus"
						onClick={handleOnDecreaseQuantity}
						disabled={!isAvailableToBuy}
					>
						<Suspense fallback={<Loader blank />}>
							<AddToCartButtonMinus
								id={`product-box-qty-${icoIdSuffix}-minus-ico`}
								alt={t({ id: 'alt.less' })}
								title=""
								className={`AddToCartButtonMinus`}
							/>
						</Suspense>
					</button>
				)
			)}
			{isLoading ? (
				<Skeleton
					width="68px"
					height="30px"
					style={{ margin: '0 .25rem' }}
				/>
			) : (
				isUniqueBundle && (
					<label className="vinisto-wine__count__amount-label">
						<Suspense fallback={<Loader blank />}>
							<BottleTimesIcon
								id={`product-box-qty-${icoIdSuffix}-bottle-ico`}
								alt={t({ id: 'alt.numberOfBottles' })}
								title=""
								className={`BottleTimesIcon`}
							/>
						</Suspense>
						<input
							/* cannot use `type=number` as it would not provide actual value
                                (including  allowed non-numerical characters such as "."", "-" or
                                "e") in input to onChange handler - supplying its behavior with
                                three following params */
							type="text"
							inputMode="numeric"
							onKeyDown={handleOnKeyDownQuantity}
							onChange={handleOnChangeQuantity}
							onClick={handleOnClickQuantity}
							onBlur={handleOnBlurQuantity}
							value={inputValue}
							autoComplete="off"
							className="vinisto-wine__count__amount"
							disabled={!isAvailableToBuy}
						/>
					</label>
				)
			)}
			{isLoading ? (
				<Skeleton
					width="30px"
					height="30px"
				/>
			) : (
				isUniqueBundle && (
					<button
						className="vinisto-wine__count__plus btn-plus-minus"
						onClick={handleOnIncreaseQuantity}
						disabled={!isAvailableToBuy}
					>
						<Suspense fallback={<Loader blank />}>
							<AddToCartButtonPlus
								id={`product-box-qty-${icoIdSuffix}-plus-ico`}
								alt={t({ id: 'alt.more' })}
								title=""
								className={`AddToCartButtonPlus`}
							/>
						</Suspense>
					</button>
				)
			)}
		</div>
	);
};

export default QuantityBox;
