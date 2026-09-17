import { useCallback } from 'react';
import { dayjsInstance as dayjs } from 'Services/Date';

const DEFAULT_FORMAT = 'D. M. YYYY'; // Month numeral, day of month, year

const useLocalizedDateTime = () => {
	return useCallback(
		(date: number | null, format: string = DEFAULT_FORMAT) =>
			dayjs(date).format(format),
		[]
	);
};

export default useLocalizedDateTime;
