import { getLocalizedPrice } from 'vinisto_shared/src/price/get-localized-price';

import { VinistoHelperDllEnumsCurrency } from '@/api-types/product-api';

export const getRoundedDiscount = (
	price: number,
	currency: VinistoHelperDllEnumsCurrency
) => {
	const finalRoundedDiscountString = getLocalizedPrice({
		price,
		currency,
		displayCurrency: false,
	})
		.replace(/\s/g, '')
		.replace(/,/g, '.');

	const finalRoundedDiscountNumber = parseFloat(finalRoundedDiscountString);
	const finalRoundedDiscount = Number.isNaN(finalRoundedDiscountNumber)
		? 0
		: finalRoundedDiscountNumber;

	return finalRoundedDiscount;
};
