import { describe, expect, it } from 'vitest';
import { VinistoHelperDllEnumsCurrency } from 'vinisto_api_client/src/api-types/product-api';

import { getLocalizedPrice } from './index';

describe('getLocalizedPrice', () => {
	it('should return empty string if price or currency is not provided', () => {
		// @ts-expect-error for testing purposes
		expect(getLocalizedPrice({ price: 0, currency: undefined })).toBe('');
		expect(
			getLocalizedPrice({
				// @ts-expect-error dtto
				price: undefined,
				currency: VinistoHelperDllEnumsCurrency.USD,
			})
		).toBe('');
	});

	it('should return formatted price for CZK currency', () => {
		expect(
			getLocalizedPrice({
				price: 1000.123,
				currency: VinistoHelperDllEnumsCurrency.CZK,
			})
		).toBe('1 000 CZK');
		expect(
			getLocalizedPrice({
				price: 1000,
				currency: VinistoHelperDllEnumsCurrency.CZK,
				decimalPlaces: 2,
			})
		).toBe('1 000,00 CZK');
		expect(
			getLocalizedPrice({
				price: 1000,
				currency: VinistoHelperDllEnumsCurrency.CZK,
				displayCurrency: false,
			})
		).toBe('1 000');
	});

	it('should return formatted price for EUR currency', () => {
		expect(
			getLocalizedPrice({
				price: 1000,
				currency: VinistoHelperDllEnumsCurrency.EUR,
			})
		).toBe('1.000 €');
		expect(
			getLocalizedPrice({
				price: 1000,
				currency: VinistoHelperDllEnumsCurrency.EUR,
				decimalPlaces: 2,
			})
		).toBe('1.000,00 €');
		expect(
			getLocalizedPrice({
				price: 1000,
				currency: VinistoHelperDllEnumsCurrency.EUR,
				displayCurrency: false,
			})
		).toBe('1.000');
	});

	it('should return formatted price for USD currency', () => {
		expect(
			getLocalizedPrice({
				price: 1000,
				currency: VinistoHelperDllEnumsCurrency.USD,
			})
		).toBe('$1,000');
		expect(
			getLocalizedPrice({
				price: 1000,
				currency: VinistoHelperDllEnumsCurrency.USD,
				decimalPlaces: 2,
			})
		).toBe('$1,000.00');
		expect(
			getLocalizedPrice({
				price: 1000,
				currency: VinistoHelperDllEnumsCurrency.USD,
				displayCurrency: false,
			})
		).toBe('1,000');
	});

	it('should return rounded price if Intl is not supported', () => {
		const originalIntl = global.Intl;
		// @ts-expect-error dtto
		global.Intl = undefined;
		expect(
			getLocalizedPrice({
				price: 1000,
				currency: VinistoHelperDllEnumsCurrency.USD,
			})
		).toBe('1000 USD');
		global.Intl = originalIntl;
	});
});
