import { beforeEach, describe, expect, it, vi } from 'vitest';

import isExternalLink from './is-external-link';

describe('isExternalLink', () => {
	beforeEach(() => {
		vi.stubGlobal('location', { href: 'https://www.vinisto.cz' });
	});

	it('should return true for an external link', () => {
		expect(isExternalLink('https://external.com')).toBe(true);
	});

	it('should return false for an internal link', () => {
		expect(isExternalLink('https://www.vinisto.cz/page')).toBe(false);
	});

	it('should return true for a different subdomain', () => {
		expect(isExternalLink('https://poptavka.vinisto.cz')).toBe(true);
	});

	it('should return false for the same domain with different protocol', () => {
		vi.stubGlobal('location', { href: 'http://www.vinisto.cz' });
		expect(isExternalLink('https://www.vinisto.cz')).toBe(false);
	});

	it('should return true for a completely different URL', () => {
		expect(isExternalLink('https://anotherdomain.com')).toBe(true);
	});

	it('should return false for a relative URL', () => {
		expect(isExternalLink('/relative/path')).toBe(false);
	});
});
