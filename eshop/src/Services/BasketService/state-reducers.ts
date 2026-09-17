import { BasketItem } from '@/api-types/basket-api';
/*
 * This file should serve for a current basket -> next basket state transformer functions
 * In Basket context, big part of the logic is being repeated in mutation functions and onMutate handlers
 * Extracting them to this file would be a good start to clean up and dedupe the handlers
 */
export const updateRelatedProductItem = ({
	item,
	updatedItemInBasket,
	relatedOnProductItems,
}: {
	item: BasketItem;
	updatedItemInBasket: BasketItem | undefined;
	relatedOnProductItems: {
		itemId: string;
		quantity: number;
	};
}) => {
	const updatedItemInBasketQuantity = updatedItemInBasket?.quantity ?? 0;

	const updatedItemInBasketRelatedItemQuantity =
		(item.relatedOnProductItems ?? []).find(
			(item) => item.itemId === relatedOnProductItems.itemId
		)?.quantity ?? 0;

	const newOverallQuantity =
		updatedItemInBasketQuantity -
		updatedItemInBasketRelatedItemQuantity +
		relatedOnProductItems.quantity;

	const itemAlreadyInRelatedProductItems = (
		item.relatedOnProductItems ?? []
	).find((item) => item.itemId === relatedOnProductItems.itemId);

	const updatedRelatedOnProductItems = [
		...(item.relatedOnProductItems ?? []).map((item) => ({
			...item,
			quantity:
				item.itemId === relatedOnProductItems.itemId
					? relatedOnProductItems.quantity
					: item.quantity,
		})),
		...(itemAlreadyInRelatedProductItems ? [] : [relatedOnProductItems]),
	];

	return {
		...item,
		quantity: newOverallQuantity,
		relatedOnProductItems: updatedRelatedOnProductItems,
	};
};
