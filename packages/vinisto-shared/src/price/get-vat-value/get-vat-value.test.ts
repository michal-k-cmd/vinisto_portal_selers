import { describe, expect, it } from 'vitest';
import { VinistoHelperDllEnumsVatRate } from 'vinisto_api_client/src/api-types/product-api';

import { getVatValue } from './index';

describe('getVatValue', () => {
	it('should return the correct VAT value for base VAT', () => {
		expect(getVatValue(VinistoHelperDllEnumsVatRate.BaseVat)).toBe(21);
	});

	it('should return the correct VAT value for first reduced VAT', () => {
		expect(getVatValue(VinistoHelperDllEnumsVatRate.FirstReducedVat)).toBe(12);
	});

	it('should return the correct VAT value for second reduced VAT', () => {
		expect(getVatValue(VinistoHelperDllEnumsVatRate.SecondReducedVat)).toBe(12);
	});

	it('should return the correct VAT value for no VAT', () => {
		expect(getVatValue(VinistoHelperDllEnumsVatRate.NoVat)).toBe(0);
	});

	it('should return the correct VAT value for undefined VAT', () => {
		expect(getVatValue(undefined)).toBe(21);
	});

	it('should return the correct VAT value for null VAT', () => {
		expect(getVatValue(null)).toBe(21);
	});
});
