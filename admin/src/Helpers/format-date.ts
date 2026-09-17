import { Dayjs } from 'dayjs';

export const formatDate = (date: Dayjs) => {
	return date.format('DD. MM. YYYY');
};
