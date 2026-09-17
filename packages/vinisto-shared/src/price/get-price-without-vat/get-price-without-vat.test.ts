import { describe, expect, it } from 'vitest';
import { VinistoHelperDllEnumsVatRate } from 'vinisto_api_client/src/api-types/product-api';

import { getPriceWithoutVAT } from './index';

// All these tests are failing now because of floating point precision issues :(
describe('getPriceWithoutVAT', () => {
	it('should return the correct price without base VAT', () => {
		expect(getPriceWithoutVAT(121, VinistoHelperDllEnumsVatRate.BaseVat)).toBe(
			100
		);
	});

	it('should return the correct price without first reduced VAT', () => {
		expect(
			getPriceWithoutVAT(112, VinistoHelperDllEnumsVatRate.FirstReducedVat)
		).toBe(100);
	});

	it('should return the correct price without second reduced VAT', () => {
		expect(
			getPriceWithoutVAT(112, VinistoHelperDllEnumsVatRate.SecondReducedVat)
		).toBe(100);
	});

	it('should return the correct price without any VAT', () => {
		expect(getPriceWithoutVAT(100, VinistoHelperDllEnumsVatRate.NoVat)).toBe(
			100
		);
	});
});
