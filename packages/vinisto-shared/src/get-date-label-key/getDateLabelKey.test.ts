import { describe, expect, it } from 'vitest';

import getDateLabelKey from '.';

import { default as dayjs } from '@/date';

describe('getDateLabelKey', () => {
	it('returns "calendar.today" before 2pm of the current day if no treshold is specified', () => {
		const deliveryDateStr = '2023-10-05T02:00:00Z';
		const testNow = dayjs.utc('2023-10-05T13:59:59Z');
		expect(getDateLabelKey(deliveryDateStr, false, testNow)).toBe(
			'calendar.today'
		);
	});

	it('returns "calendar.tomorrow" after 2pm of the current day if no treshold is specified', () => {
		const deliveryDateStr = '2023-10-05T02:00:00Z';
		const testNow = dayjs.utc('2023-10-05T14:00:00Z');
		expect(getDateLabelKey(deliveryDateStr, false, testNow)).toBe(
			'calendar.tomorrow'
		);
	});

	it('returns "calendar.today" before 5pm of the current day if treshold is 17', () => {
		const deliveryDateStr = '2023-10-05T02:00:00Z';
		const testNow = dayjs.utc('2023-10-05T16:59:59Z');
		expect(getDateLabelKey(deliveryDateStr, false, testNow, 17)).toBe(
			'calendar.today'
		);
	});

	it('returns "calendar.tomorrow" after 9am of the current day if treshold is 9', () => {
		const deliveryDateStr = '2023-10-05T02:00:00Z';
		const testNow = dayjs.utc('2023-10-05T09:01:00Z');
		expect(getDateLabelKey(deliveryDateStr, false, testNow, 9)).toBe(
			'calendar.tomorrow'
		);
	});

	it('returns "calendar.tomorrow" if delivery is on the next day', () => {
		const deliveryDateStr = '2023-10-06T02:00:00Z';
		const testNow = dayjs.utc('2023-10-05T14:00:00Z');
		expect(getDateLabelKey(deliveryDateStr, false, testNow)).toBe(
			'calendar.tomorrow'
		);
	});

	it('returns "calendar.format.dayNameDayMonth" when delivery is 2 days away', () => {
		const deliveryDateStr = '2023-10-06T02:00:00Z';
		const testNow = dayjs.utc('2023-10-04T20:00:00Z');
		expect(getDateLabelKey(deliveryDateStr, false, testNow)).toBe(
			'calendar.format.dayNameDayMonth'
		);
	});

	it('returns null for an invalid date', () => {
		expect(getDateLabelKey('invalid-date')).toBeNull();
	});
});
