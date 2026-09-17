import { dayjsInstance as dayjs } from 'Services/Date';

export const getTimeRange = (timeFrom: Date, timeTo: Date) => {
	const from = dayjs(timeFrom);
	const to = dayjs(timeTo);
	return `${from.format('D.')} - ${to.format('D.')} ${to.format('M. YYYY')}`;
};
