import dayjs from '../date';

import { DEFAULT_ORDER_TRESHOLD_HOURS } from './constants';

const getDateLabelKey = (
	deliveryDateStr: string | Date,
	monthName?: boolean,
	now = dayjs(),
	orderTresholdHours: number = DEFAULT_ORDER_TRESHOLD_HOURS
) => {
	const deliveryDate = dayjs(deliveryDateStr, 'YYYY-MM-DDTHH:mm:ssZ').utc();
	if (!deliveryDate.isValid()) return null;

	const today = now.clone().startOf('day').utc();
	const dateDiff = deliveryDate.diff(today, 'days');
	const isAfterTreshold = now.hour() >= orderTresholdHours;

	if (dateDiff === 0) {
		return isAfterTreshold ? 'calendar.tomorrow' : 'calendar.today';
	} else if (dateDiff === 1) {
		return 'calendar.tomorrow';
	} else {
		return monthName
			? 'calendar.format.dayNameDayMonthName'
			: 'calendar.format.dayNameDayMonth';
	}
};

export default getDateLabelKey;
