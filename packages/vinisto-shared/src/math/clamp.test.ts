import { describe, expect, it } from 'vitest';

import clamp from './clamp';

describe('clamp', () => {
	it('should clamp number between min and max', () => {
		expect(clamp(0, 1, 10)).toBe(1);
		expect(clamp(5, 1, 10)).toBe(5);
		expect(clamp(15, 1, 10)).toBe(10);

		expect(clamp(0, -10, -1)).toBe(-1);
		expect(clamp(-5, -10, -1)).toBe(-5);
		expect(clamp(-15, -10, -1)).toBe(-10);

		expect(clamp(NaN, 1, 10)).toBe(NaN);
		expect(clamp(5, NaN, 10)).toBe(NaN);
		expect(clamp(5, 1, NaN)).toBe(NaN);

		expect(clamp(Infinity, 1, 10)).toBe(10);
		expect(clamp(5, -Infinity, 10)).toBe(5);
		expect(clamp(5, 1, Infinity)).toBe(5);
	});
});
