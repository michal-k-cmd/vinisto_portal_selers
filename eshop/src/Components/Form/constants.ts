import { escapeRegExp } from 'lodash-es';

export enum PHONE_CODES {
	CZ = 420,
	SK = 421,
}

export const PHONE_CODE_PREFIX_CHAR = '+';
export const PHONE_CODE_SEPARATOR = ' ';
export const DEFAULT_PHONE_CODE = PHONE_CODES.CZ;

export const PHONE_FORMAT = {
	[PHONE_CODES.CZ]: `^${escapeRegExp(PHONE_CODE_PREFIX_CHAR)}${escapeRegExp(
		String(PHONE_CODES.CZ)
	)}${escapeRegExp(PHONE_CODE_SEPARATOR)}[2-9]\\s*(?:\\d\\s*){8}$`,
	[PHONE_CODES.SK]: `^${escapeRegExp(PHONE_CODE_PREFIX_CHAR)}${escapeRegExp(
		String(PHONE_CODES.SK)
	)}${escapeRegExp(PHONE_CODE_SEPARATOR)}[2-9]\\s*(?:\\d\\s*){8}$`,
};

export const memoize = (fn: (arg: string) => any) => {
	const cache = new Map();
	return (key: string) => {
		if (cache.has(key)) {
			return cache.get(key);
		}
		const result = fn(key);
		cache.set(key, result);
		return result;
	};
};
