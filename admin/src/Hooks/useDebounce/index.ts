import { useEffect, useState } from 'react';

import { DEFAULT_DEBOUNCE_DELAY } from './constants';

const useDebounce = <T>(value: T, delay = DEFAULT_DEBOUNCE_DELAY) => {
	const [debouncedValue, setDebouncedValue] = useState<T>(value);

	useEffect(() => {
		const timer = setTimeout(() => setDebouncedValue(value), delay);

		return () => {
			clearTimeout(timer);
		};
	}, [value, delay]);

	return debouncedValue;
};

export default useDebounce;
