import { useCallback, useContext } from 'react';
import { LocalizationContext } from 'Services/LocalizationService';

import { LangValuePair } from './interfaces';
import { FALLBACK_LANGUAGE } from './constants';

const useLocalizedValue = () => {
	const { activeLanguageKey = FALLBACK_LANGUAGE } =
		useContext(LocalizationContext);

	return useCallback(
		(list: LangValuePair[] = [], language: string = activeLanguageKey) => {
			// This should not happen, but it unfortunately does sometimes
			if (typeof list === 'string') return list;
			if (Array.isArray(list)) {
				const item = list.find((it) => it.language === language);

				if (!item) return list[0]?.value ?? '-';

				if ('value' in item && typeof item.value === 'string') {
					return item.value;
				}

				if ('values' in item && Array.isArray(item.values)) {
					return item.values.join(', ');
				}
				return item ? item.value ?? '' : '';
			}
			return '-';
		},
		[activeLanguageKey]
	);
};

export default useLocalizedValue;
