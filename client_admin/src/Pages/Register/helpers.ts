import { get, includes, isObject, some } from 'lodash-es';

export const getKeys = (obj: Record<any, any>, prefix?: string) => {
	const keys = Object.keys(obj);
	prefix = prefix ? prefix + '.' : '';
	return keys.reduce(function (result: string[], key) {
		if (isObject(obj[key])) {
			result = result.concat(getKeys(obj[key], prefix + key));
		} else {
			result.push(`${prefix}${key}`);
		}
		return result;
	}, []);
};

export const hasErrors = (obj: Record<any, any>): boolean => {
	const keys = getKeys(obj);
	return some(keys, (key) => {
		if (!includes(get(obj, key), 'warning')) {
			return true;
		}
	});
};
