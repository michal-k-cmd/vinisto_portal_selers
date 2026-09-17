import { useGetBundlesByIdsQueries } from 'Hooks/Queries/useGetBundlesByIds';
import { useCallback, useContext, useMemo } from 'react';
import { BasketContext } from 'Services/BasketService';
import { LocalizationContext } from 'Services/LocalizationService';
import { Button, buttonVariants } from 'vinisto_ui';
import { getLocalizedPrice } from 'vinisto_shared/src/price/get-localized-price';
import { getBundleMetaForAnalytics } from 'Services/BasketService/helpers';

import EmptyBasket from '../BasketItems/EmptyBasket';
import BasketItem from '../BasketItem';
import GobackToShoppingButton from '../GoBackToShoppingButton';

import styles from './styles.module.css';

import {
	BasketItem as ApiBasketItem,
	BasketType,
} from '@/api-types/basket-api';
import { VinistoHelperDllEnumsCurrency } from '@/api-types/product-api';

const UserBasket = ({
	userOrSystemBasketId,
	setSelectedTabId,
}: {
	userOrSystemBasketId: string;
	setSelectedTabId: (id: string | null) => void;
}) => {
	const { basketState, userBaskets, bulkUpdate } = useContext(BasketContext);
	const userBasket = userBaskets?.find(
		(userBasket) => userBasket.id === userOrSystemBasketId
	);

	const userBasketItems = useMemo(
		() =>
			(userBasket?.items ?? []).filter(
				(item): item is ApiBasketItem & { itemId: string } => !!item.itemId
			),
		[userBasket?.items]
	);

	const {
		useFormatMessage,
		countryOfSale,
		activeCurrency: { currency },
	} = useContext(LocalizationContext);
	const t = useFormatMessage();

	const userBasketBundlesQuery = useGetBundlesByIdsQueries({
		bundleIds: userBasketItems.map((item) => item.itemId) ?? [],
		requestParams: {
			countryOfSale,
		},
		options: {
			keepPreviousData: true,
		},
	});

	const mergedUserBasketItems = useMemo(() => {
		const basketBundles = new Map(
			userBasketBundlesQuery.map((query) => [query.data?.id, query.data])
		);

		return userBasketItems.map((item) => {
			const bundle = basketBundles.get(item.itemId);
			return {
				...item,
				bundle: bundle,
			};
		});
	}, [userBasketItems, userBasketBundlesQuery]);

	const handleAddAllItemsToPrimaryBasket = useCallback(async () => {
		await bulkUpdate(
			mergedUserBasketItems.map((item) => ({
				bundleId: item.itemId,
				quantity:
					(item.quantity ?? 1) +
					(basketState?.items?.find(
						(primaryBasketItem) => primaryBasketItem.itemId === item.itemId
					)?.quantity ?? 0),
				bundleMetaForAnalytics: getBundleMetaForAnalytics(item.bundle ?? null),
			}))
		);
		setSelectedTabId(null);
	}, [basketState?.items, bulkUpdate, mergedUserBasketItems, setSelectedTabId]);

	if (!userBasket) return null;

	if (userBasketItems.length === 0) {
		return <EmptyBasket />;
	}

	return (
		<div className={styles.items}>
			{/* Should subscriptions be in user baskets? I would disable that, edge cases... */}
			{/*subscriptionAddon && <BasketSubscription item={subscriptionAddon} />*/}
			{mergedUserBasketItems.map((item) => (
				<BasketItem
					key={item.itemId}
					item={item}
					currency={currency}
					basketType={BasketType.UserDefined}
					userOrSystemBasketId={userOrSystemBasketId}
				/>
			))}
			<div className={styles.footer}>
				<div className={styles.footerMainContent}>
					<div className={styles.pricesContainer}>
						<div className={styles.priceContainer}>
							<span className={styles.priceWithVatTitle}>
								{t({ id: 'basket.totalPriceWithVATVerbose' })}
							</span>{' '}
							<span className={styles.priceWithVat}>
								{getLocalizedPrice({
									price: userBasket.totalPriceWithVat ?? 0,
									currency:
										userBasket.currency ?? VinistoHelperDllEnumsCurrency.CZK,
								})}
							</span>
						</div>
						<div className={styles.priceContainer}>
							<span>{t({ id: 'basket.totalPriceWithoutVAT' })}</span>{' '}
							<span>
								{getLocalizedPrice({
									price: userBasket.totalPrice ?? 0,
									currency:
										userBasket.currency ?? VinistoHelperDllEnumsCurrency.CZK,
								})}
							</span>
						</div>
					</div>
					{!!userBasket.items?.length && (
						<Button
							variant={buttonVariants.CTA}
							onClick={handleAddAllItemsToPrimaryBasket}
							className={styles.ctaButton}
						>
							Přidat vše do košíku
						</Button>
					)}
				</div>
				<GobackToShoppingButton className={styles.backToShoppingButton} />
			</div>
		</div>
	);
};

export default UserBasket;
