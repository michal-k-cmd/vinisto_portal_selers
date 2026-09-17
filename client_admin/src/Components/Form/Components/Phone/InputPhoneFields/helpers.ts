import { defaultTo, get, replace, size, split, toNumber } from 'lodash-es';

import { FALLBACK_PHONE_CODE, PHONE_PREFIX } from '../constants';

export const getPhoneCodeAndNumber = (value: string) => {
	const splitValue = split(value, ' ');
	if (
		size(splitValue) === 2 &&
		get(splitValue, '[0][0]', '' as string) === PHONE_PREFIX
	) {
		return [
			defaultTo(
				toNumber(replace(get(splitValue, '[0]', ''), PHONE_PREFIX, '')),
				FALLBACK_PHONE_CODE
			),
			get(splitValue, '[1]', ''),
		];
	}
	return [null, value] as const;
};
