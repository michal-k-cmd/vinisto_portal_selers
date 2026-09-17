type AnyRecord = Record<string, any>;

const pathParts = (path: string | (string | number)[]) =>
	Array.isArray(path)
		? path.map(String)
		: String(path)
				.replace(/\[(\w+)\]/g, '.$1')
				.split('.')
				.filter(Boolean);
export const get = (
	object: any,
	path: string | (string | number)[],
	defaultValue?: any
) => {
	let value = object;
	for (const part of pathParts(path)) {
		if (value == null) return defaultValue;
		value = value[part];
	}
	return value === undefined ? defaultValue : value;
};
export const set = (
	object: AnyRecord,
	path: string | (string | number)[],
	value: any
) => {
	const parts = pathParts(path);
	let target: any = object;
	parts.forEach((part, i) => {
		if (i === parts.length - 1) target[part] = value;
		else
			target =
				target[part] ?? (target[part] = /^\d+$/.test(parts[i + 1]) ? [] : {});
	});
	return object;
};
export const unset = (
	object: AnyRecord,
	path: string | (string | number)[]
) => {
	const parts = pathParts(path);
	const last = parts.pop();
	const target = get(object, parts);
	if (target && last) delete target[last];
	return object;
};
export const map = <T, R = T>(
	collection: T[] | Record<string, T> | null | undefined,
	iteratee: ((value: T, key?: string | number, collection?: any) => R) | string
): R[] => {
	const callback =
		typeof iteratee === 'function'
			? iteratee
			: (value: T) => get(value, iteratee) as R;
	return Array.isArray(collection)
		? collection.map(callback)
		: Object.keys(collection ?? {}).map((key) =>
				callback((collection as Record<string, T>)[key], key, collection)
		  );
};
export const filter = <T>(
	collection: T[] | Record<string, T> | null | undefined,
	predicate: ((value: T) => boolean) | string | Partial<T> = Boolean
): T[] =>
	(Array.isArray(collection)
		? collection
		: Object.values(collection ?? {})
	).filter(
		typeof predicate === 'function'
			? predicate
			: typeof predicate === 'string'
			? (value) => Boolean(get(value, predicate))
			: (value) =>
					Object.entries(predicate).every(([key, expected]) =>
						isEqual(get(value, key), expected)
					)
	);
export const find = (collection: any, predicate: any) =>
	filter(collection, predicate)[0];
export const forEach = (collection: any, iteratee: any) => {
	map(collection, iteratee);
	return collection;
};
export const reduce = (collection: any, iteratee: any, initial: any) =>
	(Array.isArray(collection)
		? collection
		: Object.values(collection ?? {})
	).reduce(iteratee, initial);
export const flatMap = <T, R>(
	collection: T[] | Record<string, T> | null | undefined,
	iteratee: (
		value: T,
		key?: string | number,
		collection?: T[] | Record<string, T>
	) => R | R[]
): R[] => map<T, R | R[]>(collection, iteratee).flat() as R[];
export const head = <T>(value?: T[]) => value?.[0];
export const last = <T>(value?: T[]) => value?.[value.length - 1];
export const size = (value: any) =>
	value == null ? 0 : value.length ?? Object.keys(value).length;
export const isEmpty = (value: any) => size(value) === 0;
export const isArray = Array.isArray;
export const includes = (value: any, target: any) =>
	value != null &&
	(typeof value === 'string'
		? value.includes(target)
		: Object.values(value).includes(target));
export const join = (value: any[], separator = ',') => value?.join(separator);
export const split = (value: string, separator: string | RegExp) =>
	value?.split(separator);
export const trim = (value: string, chars?: string | number, guard?: unknown) =>
	typeof chars === 'string' && chars && guard === undefined
		? value.replace(new RegExp(`^[${chars}]+|[${chars}]+$`, 'g'), '')
		: value?.trim();
export const padStart = (value: string, length: number, chars?: string) =>
	value?.padStart(length, chars);
export const toNumber = (value: any) => Number(value);
export const isNaN = (value: any) => Number.isNaN(value);
export const some = (collection: any, predicate: any) =>
	filter(collection, predicate).length > 0;
export const isEqual = (a: any, b: any): boolean =>
	Object.is(a, b) ||
	(a &&
		b &&
		typeof a === 'object' &&
		typeof b === 'object' &&
		JSON.stringify(a) === JSON.stringify(b));
export const isPlainObject = (value: any) =>
	value !== null &&
	typeof value === 'object' &&
	(Object.getPrototypeOf(value) === Object.prototype ||
		Object.getPrototypeOf(value) === null);
export const defaultTo = (value: any, defaultValue: any) =>
	value == null || Number.isNaN(value) ? defaultValue : value;
export const noop = () => undefined;
export const omit = (object: AnyRecord, keys: string | string[]) => {
	const result = { ...object };
	(Array.isArray(keys) ? keys : [keys]).forEach((key) => delete result[key]);
	return result;
};
export const invoke = (object: any, path: string, ...args: any[]) => {
	const fn = get(object, path);
	return typeof fn === 'function' ? fn.apply(object, args) : undefined;
};
export const uniqueId = (() => {
	let id = 0;
	return (prefix = '') => `${prefix}${++id}`;
})();
export const upperFirst = (value: string) =>
	value ? value[0].toUpperCase() + value.slice(1) : value;
export const capitalize = (value: string) =>
	value ? value[0].toUpperCase() + value.slice(1).toLowerCase() : value;
export const sortBy = (collection: any[], iteratee: any) =>
	[...collection].sort((a, b) => {
		const av = typeof iteratee === 'function' ? iteratee(a) : get(a, iteratee);
		const bv = typeof iteratee === 'function' ? iteratee(b) : get(b, iteratee);
		return av < bv ? -1 : av > bv ? 1 : 0;
	});
export const union = (...arrays: any[][]) => [...new Set(arrays.flat())];
export const difference = (array: any[], ...others: any[][]) =>
	array.filter((value) => !others.flat().includes(value));
export const fill = (array: any[], value: any) => array.fill(value);
export const zipObject = (keys: any[], values: any[]) =>
	Object.fromEntries(keys.map((key, index) => [key, values[index]]));
export const entriesIn = (object: any) => {
	const entries: [string, any][] = [];
	for (const key in object ?? {}) entries.push([key, object[key]]);
	return entries;
};
export const round = (value: number, precision = 0) => {
	const factor = 10 ** precision;
	return Math.round((value + Number.EPSILON) * factor) / factor;
};
export const divide = (a: number, b: number) => a / b;
export const ceil = Math.ceil;
export const debounce = <T extends (...args: any[]) => any>(
	fn: T,
	wait: number
): T & { cancel: () => void } => {
	let timer: ReturnType<typeof setTimeout>;
	const wrapped = ((...args: Parameters<T>) => {
		clearTimeout(timer);
		timer = setTimeout(() => fn(...args), wait);
	}) as T & { cancel: () => void };
	wrapped.cancel = () => clearTimeout(timer);
	return wrapped;
};
