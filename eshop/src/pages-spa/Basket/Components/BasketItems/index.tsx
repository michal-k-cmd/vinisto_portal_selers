import { useContext, useEffect, useMemo } from 'react';
import { BasketContext } from 'Services/BasketService';
import { LocalizationContext } from 'Services/LocalizationService';
import { PACKAGING_BUNDLE_ID } from 'pages-spa/Basket/Components/Packaging/hooks';
import { useIsClient } from '@uidotdev/usehooks';
import useAnalytics from 'Hooks/useAnalytics';
import { GA_EVENT } from 'Hooks/useAnalytics/constants';
import { TrackBasket } from 'Services/Ecomail';
import { AuthenticationContext } from 'Services/AuthenticationService/context';
import { hashString } from 'Services/AuthenticationService/helpers';
import { useIsB2b } from 'Services/PlatformService';
import { useIsBasketLockedForEdit } from 'pages-spa/Bundle/hooks';

import BasketItem from '../BasketItem';
import BasketSubscription from '../BasketSubscription';
import BasketLoading from '../BasketLoading';
import B2bAutocomplete from '../B2bAutocomplete';

import EmptyBasket from './EmptyBasket';
import styles from './styles.module.css';

import { AddonType } from '@/api-types/addons-api';
import { BasketType } from '@/api-types/basket-api';

const BasketItems = () => {
	const isB2b = useIsB2b();
	const { basketState, basketBundles, isBasketFetched, isBasketQueryEnabled } =
		useContext(BasketContext);

	const { vinistoUser, isLoggedIn } = useContext(AuthenticationContext);

	const { sendEvent: sendAnalyticsEvent } = useAnalytics();

	const basketItems = basketState?.items?.filter(
		(item) => item.itemId !== PACKAGING_BUNDLE_ID
	);

	const isClient = useIsClient();

	const {
		activeCurrency: { currency },
	} = useContext(LocalizationContext);

	const subscriptionAddon = basketState?.addons?.find(
		(addon) =>
			addon.type === AddonType.SubscriptionMonth ||
			addon.type === AddonType.SubscriptionYear
	);

	// Send Google Analytics view cart event
	const basketBundlesToGA = useMemo(
		() =>
			basketBundles
				?.filter(
					(item) => item.itemId !== PACKAGING_BUNDLE_ID && item.bundle != null
				)
				.map((item) => {
					return {
						item_id: item.itemId ?? '',
						item_name: item.bundle?.name[0].value ?? '',
						price: item.price ?? 0,
						quantity: item.quantity ?? 1,
					};
				}) ?? [],
		[basketBundles]
	);

	useEffect(() => {
		if (basketBundlesToGA.length === 0) return;

		sendAnalyticsEvent(GA_EVENT.VIEW_CART, {
			currency: currency,
			value: basketState?.totalPrice ?? 0,
			items: basketBundlesToGA,
		});
	}, [
		basketBundlesToGA,
		basketState?.totalPrice,
		currency,
		sendAnalyticsEvent,
	]);

	// Send Ecomail Basket State
	useEffect(() => {
		if (!isLoggedIn || !basketBundles || !vinistoUser.email) return;

		const basketSignature = hashString(
			JSON.stringify({
				email: vinistoUser.email,
				items: basketBundles
					.filter((item) => item.itemId !== PACKAGING_BUNDLE_ID)
					.map((item) => ({
						itemId: item.itemId ?? '',
						quantity: item.quantity ?? 1,
					}))
					.sort((a, b) => a.itemId.localeCompare(b.itemId)),
			})
		);

		const storageKey = `lastBasket_${vinistoUser.email}`;

		try {
			const storedSignature = localStorage.getItem(storageKey);

			if (storedSignature === basketSignature) return;

			localStorage.setItem(storageKey, basketSignature);
		} catch (error) {
			return;
		}

		TrackBasket(vinistoUser.email, basketBundles);
	}, [basketBundles, isLoggedIn, vinistoUser.email]);

	const isBasketLockedForEdit = useIsBasketLockedForEdit();

	//const isAllBundleQueriesFetched = basketBundlesQuery.every(
	//	(q) => q.isFetched
	//);

	if (
		(isBasketQueryEnabled && !isBasketFetched) ||
		// !isAllBundleQueriesFetched ||
		!isClient
	) {
		return <BasketLoading />;
	}

	// This needs to wait for the complete bundles to load
	// Checking if it is empty is causing flash of <EmptyBasket />
	const basketBundlesExceptPackagingAndRelatedOnlyProducts =
		basketBundles?.filter((item) => {
			const parentProductsRelationsOverallQuantity =
				item.relatedOnProductItems?.reduce(
					(acc, item) => acc + (item.quantity ?? 0),
					0
				) ?? 0;
			const isOnlyRelatedItem =
				(item.quantity ?? 0) <= parentProductsRelationsOverallQuantity;
			return (
				item.itemId !== PACKAGING_BUNDLE_ID &&
				!isOnlyRelatedItem &&
				item.bundle != null
			);
		}) ?? [];

	const basketItemsExceptPackagingAndRelatedProducts =
		basketItems?.filter((item) => {
			const parentProductsRelationsOverallQuantity =
				item.relatedOnProductItems?.reduce(
					(acc, item) => acc + (item.quantity ?? 0),
					0
				) ?? 0;
			const isOnlyRelatedItem =
				(item.quantity ?? 0) <= parentProductsRelationsOverallQuantity;
			return item.itemId !== PACKAGING_BUNDLE_ID && !isOnlyRelatedItem;
		}) ?? [];

	if (isB2b && !isBasketLockedForEdit) {
		return (
			<>
				<B2bAutocomplete />
				<div className={styles.items}>
					{subscriptionAddon && <BasketSubscription item={subscriptionAddon} />}
					{!basketItemsExceptPackagingAndRelatedProducts.length && (
						<EmptyBasket />
					)}
					{basketBundlesExceptPackagingAndRelatedOnlyProducts.map((item) => (
						<BasketItem
							key={item.itemId}
							item={item}
							currency={currency}
							basketType={BasketType.Primary}
						/>
					))}
				</div>
			</>
		);
	}

	if (!basketItems || basketItems.length === 0) {
		return <EmptyBasket />;
	}

	return (
		<div className={styles.items}>
			{subscriptionAddon && <BasketSubscription item={subscriptionAddon} />}
			{basketBundlesExceptPackagingAndRelatedOnlyProducts.map((item) => (
				<BasketItem
					key={item.itemId}
					item={item}
					currency={currency}
					basketType={BasketType.Primary}
				/>
			))}
		</div>
	);
};
export default BasketItems;
