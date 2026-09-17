const formatPrice = (
	price: number | undefined | null,
	decimal = ','
): string => {
	if (price === undefined || price === null) return '';

	const integerPart = Math.round(price);
	const decimalPart = (price - integerPart)
		.toFixed(2)
		.substring(2)
		.replace('.', ''); // remove dot

	if (decimalPart === '00') {
		return integerPart.toString();
	} else {
		return price.toFixed(2).replace('.', decimal);
	}
};

export default formatPrice;
