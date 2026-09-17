/**
 * Converts price to number with given number of decimals and decimal separator
 * If price is undefined or null, returns 0
 * @param price - number to convert
 * @param decimals - number of decimals to round to. Default is 2
 * @param separator - decimal separator. Default is '.'
 * @returns number
 */
const convertPrice = (
	price: number | undefined | null,
	decimals: number = 2,
	separator: string = '.'
): number => {
	if (price === undefined || price === null) return 0;

	return Number(price.toFixed(decimals).replace('.', separator));
};

export default convertPrice;
