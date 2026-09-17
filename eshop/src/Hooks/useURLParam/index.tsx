import { useQueryState } from 'nuqs';

const useURLParam = <T,>(paramName: string, defaultValue?: T) => {
	const [queryValue, setQueryValue] = useQueryState(paramName, {
		defaultValue: defaultValue as T,
		parse: (value) => {
			try {
				return JSON.parse(value) as T;
			} catch (e) {
				return value as unknown as T;
			}
		},
		serialize: (value) => {
			if (typeof value === 'object') {
				return JSON.stringify(value);
			}
			return String(value);
		},
	});

	return [queryValue, setQueryValue] as const;
};

export default useURLParam;
