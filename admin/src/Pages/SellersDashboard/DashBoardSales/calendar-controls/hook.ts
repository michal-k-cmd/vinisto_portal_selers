import { NumberParam, useQueryParam } from 'Helpers/query-params';
import { dayjsInstance } from 'Services/Date';

interface DateRange {
	timeFrom: number;
	timeTo: number;
}

const useUrlQueryParams = (): {
	dateRange: DateRange;
	setDateRange: (newTimeFrom?: number, newTimeTo?: number) => void;
	daysCount: number;
} => {
	const defaultTimeFrom = dayjsInstance().startOf('month').unix();
	const defaultTimeTo = dayjsInstance().endOf('month').unix();

	const [timeFrom, setTimeFrom] = useQueryParam('timeFrom', NumberParam);
	const [timeTo, setTimeTo] = useQueryParam('timeTo', NumberParam);

	const setDateRange = (newTimeFrom?: number, newTimeTo?: number) => {
		setTimeFrom(newTimeFrom ?? defaultTimeFrom);
		setTimeTo(newTimeTo ?? defaultTimeTo);
	};

	const daysCount = dayjsInstance
		.unix(timeTo ?? defaultTimeTo)
		.diff(dayjsInstance.unix(timeFrom ?? defaultTimeFrom), 'day');

	return {
		dateRange: {
			timeFrom: timeFrom ?? defaultTimeFrom,
			timeTo: timeTo ?? defaultTimeTo,
		},
		setDateRange,
		daysCount,
	};
};

export default useUrlQueryParams;
