import { isInteger, replace, round, toString } from 'lodash-es';

const defaultConfig = {
	decimalNotation: ',',
	round: 0,
};

/**
 * Creates formatted price value that is rounded and with commas instead of dots
 * @param value Price
 * @param quantity Quantity of the price
 * @param roundPrecision Number of decimal places to be rounded
 * @returns Formatted price value
 * @deprecated Use `getLocalizedPrice` from `vinisto_shared` instead
 */
export default function createCurrencyValue(
	value: number,
	quantity = 1,
	roundPrecision = defaultConfig.round
): string {
	const roundedValue = round(value * quantity, roundPrecision);
	return replace(
		isInteger(roundedValue)
			? toString(roundedValue).replace('-0', '0')
			: roundedValue.toFixed(roundPrecision).replace('-0', '0'),
		'.',
		defaultConfig.decimalNotation
	);
}
