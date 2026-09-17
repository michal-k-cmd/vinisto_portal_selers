import { Dayjs } from 'dayjs';
import { dayjsInstance } from 'vinisto_shared';

import isValidUnixTimestamp from './is-valid-unix-timestamp';

/**
 * Converts Unix timestamp to Dayjs
 * If date is undefined or null, returns null. Dayjs does not have a value to represent null value.
 * @param date - Unix timestamp to convert
 * @returns Extended Dayjs object
 * @throws Error if date is not a valid Unix timestamp
 */
const convertDateToDayjs = (date: number | undefined | null): Dayjs | null => {
	
	if (date === undefined || date === null || date == 0) return null;

	if (!isValidUnixTimestamp(date))
		throw new Error(`Invalid Unix timestamp: ${date}`);

	return dayjsInstance.unix(date);
};

export default convertDateToDayjs;
