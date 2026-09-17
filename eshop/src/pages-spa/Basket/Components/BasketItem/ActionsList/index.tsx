import cx from 'classnames';
import useFavoriteItem from 'Components/ProductBox/Components/ButtonAddToFavorites/hook';
import { getLocalizedValue } from 'Hooks/useLocalizedValue';
import { useContext, useState } from 'react';
import { LocalizationContext } from 'Services/LocalizationService';
import { BasketContext } from 'Services/BasketService';
import { FavoritesContext } from 'Services/FavoritesService';
import ListItemDelete from 'Components/Icons/ListItemDelete';
import HeartEmptyIcon from 'Components/Icons/HeartEmpty';
import HeartIcon from 'Components/Icons/Heart';
import { useFindBundleInBasket } from 'pages-spa/Bundle/hooks';
import { getBundleMetaForAnalytics } from 'Services/BasketService/helpers';
import CartIcon from 'Components/Icons/Cart';
import { FOR_LATER_BASKET_NAME } from 'Services/BasketService/constants';
import { useIsB2b } from 'Services/PlatformService';

import {
	getUserOrSystemBasketIconPath,
	getUserOrSystemBasketName,
} from '../../helpers';

import styles from './styles.module.css';

import { Bundle } from '@/domain/bundle';
import { BasketItem, BasketType } from '@/api-types/basket-api';

interface actionsListProps {
	isActionsOpen: boolean;
	closeActions: () => void;
	bundle: Bundle | null;
	item: BasketItem;
	userOrSystemBasketId?: string;
}

const ActionsList = ({
	isActionsOpen,
	closeActions,
	bundle,
	item,
	userOrSystemBasketId,
}: actionsListProps) => {
	const isB2b = useIsB2b();
	const t = useContext(LocalizationContext).useFormatMessage();
	const [isHeartFull, setIsHeartFull] = useState(false);

	const { isAlreadyInFavorites } = useContext(FavoritesContext);

	const { activeCurrency } = useContext(LocalizationContext);
	const { id: bundleId = '', bundlePrices, name } = bundle ?? {};
	const { basePrice, discountedPrice, isDiscounted } = bundlePrices ?? {};

	const {
		userBaskets,
		handleOnRemoveFromBasket,
		handleOnAddToBasket,
		handleOnChangeItemQuantity,
	} = useContext(BasketContext);

	const bundleInBasket = useFindBundleInBasket({
		bundleId,
	});

	const bundleMetaForAnalytics = getBundleMetaForAnalytics(bundle ?? null);

	const quantity = bundleInBasket?.quantity ?? 1;

	const { handleAddItemToFavorites, handleRemoveItemFromFavorites } =
		useFavoriteItem(bundleId, {
			price:
				(isDiscounted
					? discountedPrice?.valueWithVat
					: basePrice?.valueWithVat) ?? 0,
			currency: activeCurrency?.title,
			item_name: getLocalizedValue(name),
		});

	const isBundleAlreadyInFavorites = isAlreadyInFavorites(bundleId);

	const itemInPrimaryBasket = useFindBundleInBasket({ bundleId });

	return isActionsOpen ? (
		<div className={styles.actionsList}>
			{!!userOrSystemBasketId && (
				<button
					className={cx(styles.actionItem, 'mobile-only')}
					onClick={() => {
						handleOnChangeItemQuantity({
							quantity:
								(item.quantity ?? 1) + (itemInPrimaryBasket?.quantity ?? 0),
							bundleId,
							bundleMetaForAnalytics,
						});
					}}
				>
					<div className={styles.iconWrap}>
						<CartIcon className={styles.icon} />
					</div>
					{t({
						id: 'basket.lists.addToPrimaryBasketVerbose',
					})}
				</button>
			)}
			{!isB2b && (
				<button
					className={styles.actionItem}
					onClick={(e) => {
						isBundleAlreadyInFavorites
							? handleRemoveItemFromFavorites(e)
							: handleAddItemToFavorites(e);
						closeActions();
					}}
					onMouseEnter={() => setIsHeartFull(true)}
					onMouseLeave={() => setIsHeartFull(false)}
				>
					<div className={styles.iconWrap}>
						{isHeartFull ? (
							<HeartIcon className={styles.icon} />
						) : (
							<HeartEmptyIcon className={styles.icon} />
						)}
					</div>
					{t({
						id: isBundleAlreadyInFavorites
							? 'productDetail.btn.removeFromFavourites'
							: 'productDetail.btn.addToFavourites',
					})}
				</button>
			)}
			{(userBaskets ?? [])
				.filter(
					(userBasket) =>
						!userBasket.items?.find(
							(userBasketItem) => userBasketItem.itemId === item.itemId
						)
				)
				.map((userBasket) => (
					<button
						className={styles.actionItem}
						key={userBasket.id}
						onClick={() =>
							handleOnAddToBasket({
								quantity,
								bundleId,
								userOrSystemBasketId: userBasket.id ?? undefined,
								bundleMetaForAnalytics,
							})
						}
					>
						<div className={styles.iconWrap}>
							<img
								src={getUserOrSystemBasketIconPath(userBasket)}
								alt={`${getUserOrSystemBasketName(userBasket, t)}`}
								className={styles.icon}
							/>
						</div>
						<span className={styles.action}>
							{userBasket.type === BasketType.SystemDefined &&
							userBasket.name === FOR_LATER_BASKET_NAME
								? t(
										{ id: 'basketItem.actions.saveForLater' },
										{ listName: userBasket.name }
								  )
								: t(
										{ id: 'basketItem.actions.addToList' },
										{
											listName: (
												<strong key={userBasket.id}>{userBasket.name}</strong>
											),
										}
								  )}
						</span>
					</button>
				))}
			<button
				className={styles.actionItem}
				onClick={() => {
					handleOnRemoveFromBasket({
						bundleId,
						quantity,
						bundleMetaForAnalytics,
						userOrSystemBasketId,
					});
					closeActions();
				}}
			>
				<div className={styles.iconWrap}>
					<ListItemDelete className={styles.delete} />
				</div>
				{t({ id: 'basketItem.actions.removeItem' })}
			</button>
		</div>
	) : null;
};

export default ActionsList;
