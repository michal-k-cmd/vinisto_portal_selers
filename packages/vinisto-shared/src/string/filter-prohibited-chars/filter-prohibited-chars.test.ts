import { describe, expect, it } from 'vitest';

import { filterProhibitedChars } from './index';

describe('filterProhibitedChars', () => {
	it('should remove spaces from a string', () => {
		const input = 'hello world';
		const result = filterProhibitedChars(input, [' ']);
		expect(result).toBe('helloworld');
	});

	it('should remove multiple prohibited characters', () => {
		const input = 'hello-world_123';
		const result = filterProhibitedChars(input, ['-', '_']);
		expect(result).toBe('helloworld123');
	});

	it('should handle empty input string', () => {
		const input = '';
		const result = filterProhibitedChars(input, [' ', '-', '_']);
		expect(result).toBe('');
	});

	it('should handle input with no prohibited characters', () => {
		const input = 'helloworld123';
		const result = filterProhibitedChars(input, [' ', '-', '_']);
		expect(result).toBe('helloworld123');
	});

	it('should handle empty array of prohibited characters', () => {
		const input = 'hello-world_123';
		const result = filterProhibitedChars(input, []);
		expect(result).toBe('hello-world_123');
	});

	it('should handle special characters as prohibited characters', () => {
		const input = 'hello$world%123^';
		const result = filterProhibitedChars(input, ['$', '%', '^']);
		expect(result).toBe('helloworld123');
	});

	it('should handle case sensitivity', () => {
		const input = 'HeLLo WoRLD';
		const result = filterProhibitedChars(input, ['L', 'O', ' ']);
		expect(result).toBe('Heo WRD');
	});

	it('should handle unicode characters', () => {
		const input = 'hello世界123';
		const result = filterProhibitedChars(input, ['世', '界']);
		expect(result).toBe('hello123');
	});

	it('should handle multiple consecutive prohibited characters', () => {
		const input = 'hello   world___123';
		const result = filterProhibitedChars(input, [' ', '_']);
		expect(result).toBe('helloworld123');
	});
});
