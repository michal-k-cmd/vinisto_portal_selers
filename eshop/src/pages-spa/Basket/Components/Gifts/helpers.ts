import { AddonGift } from '@/domain/addons';

export const sortGiftsByorderPriceLimitFrom = (a: AddonGift, b: AddonGift) => {
	const priceA = a?.orderPriceLimitFrom ?? 0;
	const priceB = b?.orderPriceLimitFrom ?? 0;

	const orderPriceLimitFromDiff = priceA - priceB;

	if (orderPriceLimitFromDiff === 0) {
		const nameA = a?.name ?? '';
		const nameB = b?.name ?? '';
		return nameA.localeCompare(nameB);
	}

	return orderPriceLimitFromDiff;
};

export const isOrderPriceGiftRule = (
	gift: AddonGift | null
): gift is Exclude<typeof gift, null> => {
	return gift !== null && 'orderPriceLimitFrom' in gift;
};
