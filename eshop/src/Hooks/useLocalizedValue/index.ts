import { useCallback, useContext } from 'react';
import { LocalizationContext } from 'Services/LocalizationService';

import { LangValuePair } from './interfaces';
import { FALLBACK_LANGUAGE } from './constants';

import { LangValuesPair } from '@/shared';

export const getLocalizedValue = (
	list: LangValuePair[] | LangValuesPair[] = [],
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

		if ('value' in item) {
			return item.value ?? '';
		}
		if ('values' in item) {
			return Array.isArray(item.values) ? item.values.join(', ') : '';
		}
		return '';
	}
	return '';
};

const useLocalizedValue = () => {
	const { activeLanguageKey = FALLBACK_LANGUAGE } =
		useContext(LocalizationContext);

	return useCallback(getLocalizedValue, [activeLanguageKey]);
};

export default useLocalizedValue;

export function isLangValuePairArray(obj: any): obj is LangValuePair[] {
	return (
		Array.isArray(obj) &&
		obj.every(
			(element) =>
				typeof element === 'object' &&
				typeof element.language === 'string' &&
				typeof element.value === 'string'
		)
	);
}
