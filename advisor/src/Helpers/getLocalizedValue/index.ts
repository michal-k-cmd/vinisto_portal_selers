import { LangValuePair } from './interfaces';
import { FALLBACK_LANGUAGE } from './constants';

export const getLocalizedValue = (
	list: LangValuePair[] = [],
	language: string = FALLBACK_LANGUAGE
) => {
	// This should not happen, but it unfortunately does sometimes
	if (typeof list === 'string') return list;
	if (Array.isArray(list)) {
		const item = list.find((it) => it.language === language);

		if (!item) return '';

		if ('value' in item && typeof item.value === 'string') {
			return item.value;
		}

		if ('values' in item && Array.isArray(item.values)) {
			return item.values.join(', ');
		}
		return item ? item.value ?? '' : '';
	}
	return '';
};

export default getLocalizedValue;
