import { split, trim } from 'lodash-es';

import { AvailableCountFilter } from './interfaces';
import { AMOUNT_FILTER, AMOUNT_FILTER_DELIMITER } from './constants';

export const getAmountFilter = (filterRaw: string): AvailableCountFilter => {
	const [type, value] = split(filterRaw, AMOUNT_FILTER_DELIMITER);
	const filter: AvailableCountFilter = {};
	if (Object.keys(AMOUNT_FILTER).includes(type)) {
		filter.type = type as AMOUNT_FILTER;
	}
	if (value !== undefined && trim(value) !== '') {
		filter.value = Number(value);
	}
	return filter;
};
