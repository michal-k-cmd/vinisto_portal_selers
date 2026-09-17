import {
	defaultTo,
	endsWith,
	entriesIn,
	every,
	filter,
	forEach,
	get,
	groupBy,
	isArray,
	isNull,
	isNumber,
	isUndefined,
	join,
	map,
	replace,
	set,
	size,
	slice,
	split,
	toNumber,
} from 'lodash-es';

export const isRangeParam = (val: string) =>
	/^[+-]?([0-9]+\.?[0-9]*|\.[0-9]+)-[+-]?([0-9]+\.?[0-9]*|\.[0-9]+)$/g.test(
		val
	);

export const decodeValues = (val: Record<any, any>[]) => {
	const groupedValues = groupBy(val, 'key');

	const values = {};
	forEach(entriesIn(groupedValues), ([key, filters]) => {
		if (isArray(filters) && size(filters) > 1) {
			set(
				values,
				key,
				map(filters, (filter) => {
					const filterValue = get(filter, 'value');
					if (toNumber(filterValue)) {
						return toNumber(filterValue);
					}
					return filterValue;
				})
			);
		} else if (isRangeParam(get(filters, '[0].value', ''))) {
			const numbers = split(get(filters, '[0].value'), '-');
			set(values, key, [
				toNumber(get(numbers, '[0]')),
				toNumber(get(numbers, '[1]')),
			]);
		} else {
			const filterValue = get(filters, '[0].value');
			if (toNumber(filterValue) || toNumber(filterValue) === 0) {
				set(values, key, toNumber(filterValue));
			} else {
				set(values, key, filterValue);
			}
		}
	});

	return values;
};

export const encodeValues = (val: Record<any, any>): string => {
	let urlString = '';
	forEach(entriesIn(val), ([key, filters]) => {
		if (!(isUndefined(filters) || isNull(filters)))
			if (isArray(filters) && size(filters) > 1) {
				if (size(filters) === 2 && every(filters, isNumber)) {
					urlString += `/${key}/${get(filters, '[0]')}-${get(filters, '[1]')}`;
				} else {
					forEach(filters, (filter) => {
						urlString += `/${key}/${filter}`;
					});
				}
			} else {
				urlString += `/${key}/${filters}`;
			}
	});
	return urlString;
};

export const convertParamsToQuery = (params: string) => {
	const splittedParams = filter(
		split(replace(defaultTo(params, ''), /[+]/g, ' '), '/')
	);
	const base: { key: string; value: string }[] = [];
	for (let i = 0; i < size(splittedParams); i += 2) {
		if (get(splittedParams, `[${i + 1}]`)) {
			base.push({
				key: get(splittedParams, `[${i}]`, ''),
				value: get(splittedParams, `[${i + 1}]`, ''),
			});
		}
	}
	const newQuery = decodeValues(base);
	return newQuery;
};

export const convertQueryToUrl = (
	query: Record<string, any>,
	pathname: string
) => {
	// Extract the base path (e.g., /kategorie/sumiva-vina)
	const pathParts = pathname.split('/').filter(Boolean);
	const basePath =
		pathParts.length >= 2 ? `/${pathParts[0]}/${pathParts[1]}` : pathname;

	// Add filter parameters
	let urlPathname = `${basePath}${encodeValues(query)}`;

	// Remove trailing slash if present
	if (endsWith(urlPathname, '/')) {
		urlPathname = join(slice(urlPathname, 0, -1), '');
	}

	return replace(encodeURI(urlPathname), /%20/g, '+');
};
