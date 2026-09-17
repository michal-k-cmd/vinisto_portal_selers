import { isInteger, replace, round, toString } from 'lodash-es';

const defaultConfig = {
	decimalNotation: ',',
	round: 0,
};

/**
 * Creates formatted price value that is rounded and with commas instead of dots
 * @param value Price
 * @param quantity Quantity of the price
 * @returns Formatted price value
 */
export default function createCurrencyValue(
	value: number,
	quantity = 1
): string {
	const roundedValue = round(value * quantity, defaultConfig.round);
	return replace(
		isInteger(roundedValue)
			? toString(roundedValue)
			: roundedValue.toFixed(defaultConfig.round),
		'.',
		defaultConfig.decimalNotation
	);
}
