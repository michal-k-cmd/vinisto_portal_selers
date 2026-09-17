export function truncateToDecimalPlaces(number: number, decimalPlaces: number) {
	const factor = Math.pow(10, decimalPlaces);
	return Math.trunc(number * factor) / factor;
}
