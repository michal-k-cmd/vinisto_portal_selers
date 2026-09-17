import { describe, expect, it } from 'vitest';

import { truncateToDecimalPlaces } from './index'; // Assuming the function is in index.js

describe('truncateToDecimalPlaces', () => {
	it('should truncate to 2 decimal places without rounding', () => {
		expect(truncateToDecimalPlaces(5.66666, 2)).toBe(5.66);
	});

	it('should handle numbers with fewer decimal places than specified', () => {
		expect(truncateToDecimalPlaces(5.6, 2)).toBe(5.6);
	});

	it('should handle whole numbers', () => {
		expect(truncateToDecimalPlaces(5, 2)).toBe(5);
	});

	it('should truncate to 3 decimal places', () => {
		expect(truncateToDecimalPlaces(3.14159, 3)).toBe(3.141);
	});

	it('should handle negative numbers', () => {
		expect(truncateToDecimalPlaces(-5.66666, 2)).toBe(-5.66);
	});

	it('should handle zero', () => {
		expect(truncateToDecimalPlaces(0, 2)).toBe(0);
	});

	it('should handle very small numbers', () => {
		expect(truncateToDecimalPlaces(0.000001, 4)).toBe(0);
	});

	it('should handle very large numbers', () => {
		expect(truncateToDecimalPlaces(1234567.89, 1)).toBe(1234567.8);
	});
});
