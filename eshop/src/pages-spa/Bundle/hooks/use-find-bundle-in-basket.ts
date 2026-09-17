import { BasketContext } from 'Services/BasketService';
import { useContext, useMemo } from 'react';

export const useFindBundleInBasket = ({
	bundleId,
	basketId,
}: {
	bundleId: string | undefined;
	basketId?: string;
}) => {
	const { basketState, userBaskets } = useContext(BasketContext);

	const itemInBasket = useMemo(() => {
		// We are searching for a primary basket item
		if (!basketId || basketId === basketState?.id) {
			return basketState?.items?.find((item) => item?.itemId === bundleId);
		}
		// We are searching for another basket type (e.g., user defined one)
		const userBasket = (userBaskets ?? []).find(
			(userBasket) => basketId === userBasket.id
		);
		if (!userBasket) return undefined;
		return userBasket.items?.find((item) => item?.itemId === bundleId);
	}, [basketState?.items, basketState?.id, basketId, userBaskets, bundleId]);

	return itemInBasket;
};
