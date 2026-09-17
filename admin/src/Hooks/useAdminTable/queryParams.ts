import { flatMap, isArray, isEmpty, size } from 'Helpers/lodash';
import {
	ColumnFilter,
	ColumnFiltersState,
	SortingState,
} from '@tanstack/react-table';
import {
	decodeDelimitedArray,
	encodeDelimitedArray,
	QueryParamConfig,
} from 'Helpers/query-params';

import { PARAM_ARRAY_DELIMITER, PARAM_SORTING_DIRECTION } from './constants';

export const SortingParam: QueryParamConfig<SortingState | undefined> = {
	encode: (state: SortingState | undefined) => {
		if (!state || isEmpty(state)) {
			return;
		}
		const { id, desc } = state[0];
		const arr = [
			id,
			desc ? PARAM_SORTING_DIRECTION.DESC : PARAM_SORTING_DIRECTION.ASC,
		];
		return encodeDelimitedArray(arr, PARAM_ARRAY_DELIMITER);
	},
	decode: (param: string | (string | null)[] | null | undefined) => {
		const decoded = decodeDelimitedArray(
			typeof param === 'string' || param == null
				? param
				: param.filter((item): item is string => item !== null),
			PARAM_ARRAY_DELIMITER
		);
		if (isArray(decoded) && size(decoded) === 2) {
			const [id, desc] = decoded;
			return [
				{
					id: String(id),
					desc: desc === PARAM_SORTING_DIRECTION.DESC,
				},
			];
		}
	},
};

export const FilterParam: QueryParamConfig<ColumnFiltersState | undefined> = {
	encode: (state: ColumnFiltersState | undefined) => {
		if (!state || isEmpty(state)) {
			return;
		}
		const arr = flatMap(state, (filter: ColumnFilter) => [
			filter.id,
			String(filter.value),
		]);
		return encodeDelimitedArray(arr, PARAM_ARRAY_DELIMITER);
	},
	decode: (param: string | (string | null)[] | null | undefined) => {
		const decoded = decodeDelimitedArray(
			typeof param === 'string' || param == null
				? param
				: param.filter((item): item is string => item !== null),
			PARAM_ARRAY_DELIMITER
		);

		if (isArray(decoded)) {
			const filters: ColumnFilter[] = [];
			const remaining = [...decoded];

			while (remaining.length >= 2 && remaining[0] !== 'flags') {
				const filter = {
					id: String(remaining.shift()),
					value: String(remaining.shift()),
				};
				filters.push(filter);
			}

			if (remaining[0] === 'flags') {
				remaining.shift();
				const flagValues: string[] = [];

				while (remaining.length > 0) {
					flagValues.push(String(remaining.shift()));
				}

				if (flagValues.length > 0) {
					const flagFilter = {
						id: 'flags',
						value: flagValues.join(','),
					};
					filters.push(flagFilter);
				}
			}

			return filters;
		}
	},
};
