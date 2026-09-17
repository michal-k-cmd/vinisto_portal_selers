import { split, trim } from 'Helpers/lodash';

import { IAvailableCountFilter } from './interfaces';
import { AMOUNT_FILTER, AMOUNT_FILTER_DELIMITER } from './constants';

export const getAmountFilter = (filterRaw: string): IAvailableCountFilter => {
	const [type, value] = split(filterRaw, AMOUNT_FILTER_DELIMITER);
	const filter: IAvailableCountFilter = {};
	if (Object.keys(AMOUNT_FILTER).includes(type)) {
		filter.comparingNumberType = type as AMOUNT_FILTER;
	}
	if (value !== undefined && trim(value) !== '') {
		filter.value = Number(value);
	}
	return filter;
};
