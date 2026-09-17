'use client';

import { useQueryClient } from '@tanstack/react-query';
import { useContext, useEffect, useRef } from 'react';
import { AuthenticationContext } from 'Services/AuthenticationService/context';
import { BasketContext } from 'Services/BasketService';
import { BundleIdAndQuantity } from 'Services/BasketService/interfaces';
import { LocalizationContext } from 'Services/LocalizationService';

export const useBasketShare = ({
	sharedItems,
	isBasketFetched,
}: {
	sharedItems?: BundleIdAndQuantity[];
	isBasketFetched?: boolean;
}) => {
	const t = useContext(LocalizationContext).useFormatMessage();
	const queryClient = useQueryClient();
	const { basketId } = useContext(AuthenticationContext);
	const { bulkUpdate, basketState, refetchBasket, isBasketQueryEnabled } =
		useContext(BasketContext);
	const basketItems = basketState?.items;
	const basketWasRefetchedRefCount = useRef(0);

	useEffect(() => {
		const handler = async (itemsToShare: BundleIdAndQuantity[]) => {
			await bulkUpdate(itemsToShare);
			window.history.replaceState({}, '', `${t({ id: 'routes.cart.route' })}`);
		};
		if (!sharedItems || (isBasketQueryEnabled && !isBasketFetched)) return;
		handler(sharedItems);
	}, [
		basketId,
		bulkUpdate,
		isBasketFetched,
		isBasketQueryEnabled,
		queryClient,
		refetchBasket,
		sharedItems,
		t,
	]);

	// This is a hack for a scenario where websocket fail to recieve update
	// This effect will try to refetch 3 times
	useEffect(() => {
		if (
			isBasketFetched &&
			basketItems?.every(
				(item) => item.price === undefined && item.discountPrice === undefined
			) &&
			basketWasRefetchedRefCount.current < 3
		) {
			basketWasRefetchedRefCount.current++;
			refetchBasket();
		}
	}, [basketItems, isBasketFetched, refetchBasket, sharedItems]);
};
