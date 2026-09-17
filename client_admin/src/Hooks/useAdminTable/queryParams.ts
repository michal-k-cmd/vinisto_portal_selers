import { clone, flatMap, isArray, isEmpty, size } from 'lodash-es';
import {
	ColumnFilter,
	ColumnFiltersState,
	SortingState,
} from '@tanstack/react-table';
import {
	decodeDelimitedArray,
	encodeDelimitedArray,
	QueryParamConfig,
} from 'use-query-params';

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
		const decoded = decodeDelimitedArray(param, PARAM_ARRAY_DELIMITER);
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
		const arr = flatMap(state, (filter) => [filter.id, String(filter.value)]);
		return encodeDelimitedArray(arr, PARAM_ARRAY_DELIMITER);
	},
	decode: (param: string | (string | null)[] | null | undefined) => {
		const decoded = decodeDelimitedArray(param, PARAM_ARRAY_DELIMITER);
		if (isArray(decoded)) {
			const filters: ColumnFilter[] = [];
			const remaining = clone(decoded);
			while (size(remaining) >= 2) {
				filters.push({
					id: String(remaining.shift()),
					value: String(remaining.shift()),
				});
			}
			return filters;
		}
	},
};
