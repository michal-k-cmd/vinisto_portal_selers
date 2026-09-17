import { forwardRef, useContext } from 'react';
import cx from 'classnames';
import { LocalizationContext } from 'Services/LocalizationService';
import { BasketContext } from 'Services/BasketService';
import CartIcon from 'Components/Icons/Cart';
import { TestIdType } from 'Constants/test-ids';
import { getLocalizedPrice } from 'vinisto_shared/src/price/get-localized-price';
import { ClientOnly } from 'Components/ClientOnly';
import { useIsB2b } from 'Services/PlatformService';

import styles from './styles.module.css';

export type BasketSize = 'xs' | 'sm' | 'md';

export type BasketUIProps = {
	price: string | null;
	count?: number;
	showCount?: boolean;
	showPrice?: boolean;
	className?: string;
	size?: BasketSize;
	inverted?: boolean;
	onClick?: () => void;
	isNavBottom?: boolean;
	dataTestid?: TestIdType;
};

export const BasketUI = forwardRef<HTMLDivElement, BasketUIProps>(
	(
		{
			showCount = true,
			showPrice = false,
			count = 0,
			price = null,
			onClick,
			className,
			size,
			inverted = false,
			dataTestid,
		},
		forwardedRef
	) => {
		const localizationContext = useContext(LocalizationContext);
		const t = localizationContext.useFormatMessage();

		return (
			<div
				className={cx(
					styles.wrapper,
					{ [styles.inverted]: inverted },
					className
				)}
				onClick={onClick}
				role="presentation"
				ref={forwardedRef}
				data-testid={dataTestid}
			>
				<div
					className={cx(styles.iconWrapper, {
						[styles.sizeXs]: size === 'xs',
						[styles.sizeSm]: size === 'sm',
						[styles.sizeMd]: size === 'md',
					})}
				>
					<CartIcon
						className={styles.icon}
						fill={inverted ? null : undefined}
					/>

					<ClientOnly>
						{showCount && count > 0 && (
							<span className={cx(styles.count, styles.countBgGreen)}>
								{count}
							</span>
						)}
					</ClientOnly>
				</div>
				{showPrice && (
					<ClientOnly>
						<span
							className={styles.price}
							key={`price`}
						>
							{price ?? t({ id: 'basket' })}
						</span>
					</ClientOnly>
				)}
			</div>
		);
	}
);

BasketUI.displayName = 'BasketUI';

type BasketProps = Omit<BasketUIProps, 'price' | 'count'>;

const Basket = forwardRef<HTMLDivElement, BasketProps>(
	(props, forwardedRef) => {
		const isB2b = useIsB2b();
		const { itemsQuantity, basketState } = useContext(BasketContext);
		const count = itemsQuantity ?? 0;

		const currency = basketState?.currency;

		const price =
			basketState?.totalDiscountedPrice && currency !== undefined
				? getLocalizedPrice({
						price: basketState.totalDiscountedPrice,
						currency: currency,
				  }).replace('-0', '0')
				: null;

		const priceWithVat =
			basketState?.totalDiscountedPriceWithVat && currency !== undefined
				? getLocalizedPrice({
						price: basketState.totalDiscountedPriceWithVat,
						currency: currency,
				  }).replace('-0', '0')
				: null;

		return (
			<BasketUI
				{...props}
				count={count}
				price={isB2b ? price : priceWithVat}
				ref={forwardedRef}
			/>
		);
	}
);

Basket.displayName = 'Basket';

export default Basket;
