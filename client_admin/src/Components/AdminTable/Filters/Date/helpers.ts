import { dayjsInstance as dayjs } from 'Services/Date';

const MILISECONDS = 1000; // API wants seconds

export const getSecondsString = (date: Date | null): string => {
	return date === null ? '' : String(Math.round(date.getTime() / MILISECONDS));
};

export const getSecondsStringOfTomorrow = (date: Date | null): string => {
	if (date === null) return '';
	const tomorrow = dayjs(date).add(1, 'day').toDate();
	return String(tomorrow?.getTime() / MILISECONDS);
};

export const getDateValue = (value: string): Date | null => {
	if (value === '') return null;
	const date = dayjs(Number(value) * MILISECONDS).toDate();
	return isNaN(date.getTime()) ? null : date;
};
