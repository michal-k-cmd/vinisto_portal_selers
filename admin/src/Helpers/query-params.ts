import {
	createContext,
	createElement,
	useCallback,
	useContext,
	useMemo,
	useRef,
} from 'react';
import type React from 'react';
import { useSearchParams } from 'react-router-dom';

export type QueryParamConfig<T> = {
	encode: (value: T | undefined) => string | string[] | undefined;
	decode: (value: string | string[] | null | undefined) => T | undefined;
};
type DefaultQueryParamConfig<T> = QueryParamConfig<T> & { defaultValue: T };

export const encodeDelimitedArray = (
	value: (string | number | null | undefined)[],
	delimiter = '_'
) => value.map(String).join(delimiter);
export const decodeDelimitedArray = (
	value: string | string[] | null | undefined,
	delimiter = '_'
) => (typeof value === 'string' ? value.split(delimiter) : undefined);

export const StringParam: QueryParamConfig<string> = {
	encode: (value) => value,
	decode: (value) => (Array.isArray(value) ? value[0] : value ?? undefined),
};
export const NumberParam: QueryParamConfig<number> = {
	encode: (value) => (value === undefined ? undefined : String(value)),
	decode: (value) => {
		const parsed = Number(Array.isArray(value) ? value[0] : value);
		return Number.isFinite(parsed) ? parsed : undefined;
	},
};
export const ArrayParam: QueryParamConfig<string[]> = {
	encode: (value) => value,
	decode: (value) =>
		value === undefined || value === null
			? undefined
			: Array.isArray(value)
			? value
			: [value],
};
export const DelimitedArrayParam = (
	delimiter = '_'
): QueryParamConfig<string[]> => ({
	encode: (value) =>
		value ? encodeDelimitedArray(value, delimiter) : undefined,
	decode: (value) =>
		decodeDelimitedArray(Array.isArray(value) ? value[0] : value, delimiter),
});
export const createEnumParam = <T extends string>(
	values: T[]
): QueryParamConfig<T> => ({
	encode: (value) => value,
	decode: (value) => {
		const candidate = Array.isArray(value) ? value[0] : value;
		return values.includes(candidate as T) ? (candidate as T) : undefined;
	},
});
export const withDefault = <T>(
	config: QueryParamConfig<T>,
	defaultValue: T
): QueryParamConfig<T> & { defaultValue: T } => ({ ...config, defaultValue });

const readValue = (params: URLSearchParams, key: string) => {
	const values = params.getAll(key);
	return values.length > 1 ? values : values[0] ?? undefined;
};

type QueryParamContextValue = {
	updateSearchParams: (
		update: (params: URLSearchParams) => void,
		replace: boolean
	) => void;
};

const QueryParamContext = createContext<QueryParamContextValue | undefined>(
	undefined
);

const useQueryParamUpdater = () => {
	const context = useContext(QueryParamContext);
	const [searchParams, setSearchParams] = useSearchParams();
	const searchParamsRef = useRef(searchParams);
	const setSearchParamsRef = useRef(setSearchParams);
	searchParamsRef.current = searchParams;
	setSearchParamsRef.current = setSearchParams;

	const fallbackUpdater = useCallback(
		(update: (params: URLSearchParams) => void, replace: boolean) => {
			const nextParams = new URLSearchParams(searchParamsRef.current);
			update(nextParams);
			searchParamsRef.current = nextParams;
			setSearchParamsRef.current(nextParams, { replace });
		},
		[]
	);

	return context?.updateSearchParams ?? fallbackUpdater;
};

/* The base ESLint rule does not understand TypeScript overload signatures. */
/* eslint-disable no-redeclare */
export function useQueryParam<T>(
	key: string,
	config: DefaultQueryParamConfig<T>
): readonly [T, (next: T | null | undefined, updateType?: string) => void];
export function useQueryParam<T = string>(
	key: string,
	config?: QueryParamConfig<T>
): readonly [
	T | undefined,
	(next: T | null | undefined, updateType?: string) => void
];
export function useQueryParam<T = string>(
	key: string,
	config: QueryParamConfig<T> = StringParam as unknown as QueryParamConfig<T>
) {
	const [searchParams] = useSearchParams();
	const updateSearchParams = useQueryParamUpdater();
	const keyRef = useRef(key);
	const configRef = useRef(config);
	keyRef.current = key;
	configRef.current = config;
	const value =
		config.decode(readValue(searchParams, key)) ??
		(config as QueryParamConfig<T> & { defaultValue?: T }).defaultValue;
	const setter = useCallback(
		(next: T | null | undefined, updateType?: string) => {
			updateSearchParams((nextParams) => {
				const currentKey = keyRef.current;
				nextParams.delete(currentKey);
				const encoded = configRef.current.encode(
					next === null ? undefined : (next as T)
				);
				if (Array.isArray(encoded))
					encoded.forEach((item) => nextParams.append(currentKey, item));
				else if (encoded !== undefined) nextParams.set(currentKey, encoded);
			}, updateType === 'replaceIn');
		},
		[updateSearchParams]
	);
	return [value, setter] as const;
}
/* eslint-enable no-redeclare */

export const useQueryParams = <T extends Record<string, QueryParamConfig<any>>>(
	configs: T
) => {
	const [searchParams] = useSearchParams();
	const updateSearchParams = useQueryParamUpdater();
	const configsRef = useRef(configs);
	configsRef.current = configs;
	const values = useMemo(
		() =>
			Object.fromEntries(
				Object.entries(configs).map(([key, config]) => [
					key,
					config.decode(readValue(searchParams, key)) ??
						(config as any).defaultValue,
				])
			),
		[configs, searchParams]
	);
	const setter = useCallback(
		(
			next:
				| Partial<{ [K in keyof T]: any }>
				| ((current: typeof values) => Partial<{ [K in keyof T]: any }>),
			updateType?: string
		) => {
			updateSearchParams((nextParams) => {
				const currentConfigs = configsRef.current;
				const currentValues = Object.fromEntries(
					Object.entries(currentConfigs).map(([key, config]) => [
						key,
						config.decode(readValue(nextParams, key)) ??
							(config as any).defaultValue,
					])
				) as typeof values;
				const updates = typeof next === 'function' ? next(currentValues) : next;
				Object.entries(updates).forEach(([key, value]) => {
					nextParams.delete(key);
					const encoded = currentConfigs[key].encode(value);
					if (Array.isArray(encoded))
						encoded.forEach((item) => nextParams.append(key, item));
					else if (encoded !== undefined) nextParams.set(key, encoded);
				});
			}, updateType === 'replaceIn');
		},
		[updateSearchParams]
	);
	return [values, setter] as const;
};

export const QueryParamProvider = ({
	children,
}: {
	children: React.ReactNode;
}) => {
	const [searchParams, setSearchParams] = useSearchParams();
	const searchParamsRef = useRef(searchParams);
	const setSearchParamsRef = useRef(setSearchParams);
	searchParamsRef.current = searchParams;
	setSearchParamsRef.current = setSearchParams;

	const updateSearchParams = useCallback(
		(update: (params: URLSearchParams) => void, replace: boolean) => {
			const nextParams = new URLSearchParams(searchParamsRef.current);
			update(nextParams);
			searchParamsRef.current = nextParams;
			setSearchParamsRef.current(nextParams, { replace });
		},
		[]
	);
	const value = useMemo(() => ({ updateSearchParams }), [updateSearchParams]);

	return createElement(QueryParamContext.Provider, { value }, children);
};
