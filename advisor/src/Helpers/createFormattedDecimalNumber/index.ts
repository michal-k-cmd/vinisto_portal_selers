const defaultConfig = {
	decimalNotation: ',',
};

/**
 * Creates formatted decimal number
 * @param value Decimal Number
 * @returns Formatted price value
 */
export default function createFormattedDecimalNumber(
	value: number,
	toFixed?: number
): string {
	let number: number | string = Number.parseFloat(`${value}`);
	if (toFixed) {
		number = number?.toFixed(toFixed);
	}
	return number.toString().replace('.', defaultConfig.decimalNotation || ',');
}
