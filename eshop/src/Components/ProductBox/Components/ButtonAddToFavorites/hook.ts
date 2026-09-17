import { MouseEvent, useContext } from 'react';
import useAnalytics from 'Hooks/useAnalytics';
import { FavoritesContext } from 'Services/FavoritesService';
import { GA_EVENT } from 'Hooks/useAnalytics/constants';
import { GaItem } from 'Hooks/useAnalytics/types';

type FavoriteData = Omit<GaItem, 'item_id'> & {
	price: number;
	currency: string;
};

const useFavoriteItem = (id: string, data: FavoriteData) => {
	const { sendEvent } = useAnalytics();
	const { handleOnAddToFavorites, handleOnRemoveItemFromFavorites } =
		useContext(FavoritesContext);
	const { price, currency, ...gaData } = data;

	const handleAddItemToFavorites = (event: MouseEvent<HTMLElement>) => {
		if (event) {
			event.stopPropagation();
			event.preventDefault();
		}

		handleOnAddToFavorites(id);

		if (!data) return;

		sendEvent(GA_EVENT.ADD_TO_WISHLIST, {
			currency: currency,
			value: price,
			items: [
				{
					item_id: id,
					price,
					quantity: 1,
					...gaData,
				},
			],
		});
	};

	const handleRemoveItemFromFavorites = (event: MouseEvent<HTMLElement>) => {
		if (event) {
			event.stopPropagation();
			event.preventDefault();
		}

		handleOnRemoveItemFromFavorites(id);
	};

	return { handleAddItemToFavorites, handleRemoveItemFromFavorites };
};

export default useFavoriteItem;
