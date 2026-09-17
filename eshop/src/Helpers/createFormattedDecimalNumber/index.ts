import { get, replace, toString } from 'lodash-es';

const defaultConfig = {
	decimalNotation: ',',
};

/**
 * @deprecated - Use some util from /common instead
 */
export default function createFormattedDecimalNumber(
	value: number,
	toFixed?: number
): string {
	let number: number | string = Number.parseFloat(`${value}`);
	if (toFixed) {
		number = number?.toFixed(toFixed);
	}
	return replace(
		toString(number),
		'.',
		get(defaultConfig, 'decimalNotation', ',')
	);
}
