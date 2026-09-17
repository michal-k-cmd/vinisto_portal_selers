import { useContext, useEffect, useRef } from 'react';
import { LocalizationContext } from 'Services/LocalizationService';

import { URL_PARAM_LIMIT, URL_PARAM_PAGE } from '../../../constants';

const PERSISTED_QUERY_PARAM_KEYS = [URL_PARAM_LIMIT, URL_PARAM_PAGE];
const PERSISTED_QUERY_PARAM_TRANSLATION_KEYS = ['category.sorting.urlParam'];

interface UseResetFilterOnCountryChangeProps {
	query: Record<string, any>;
	setQuery: (query: Record<string, any>) => void;
}

/**
 * Hook that handles resetting filters when country changes in the application.
 *
 * When user switches country (through language switcher), some filters might become invalid
 * because they are country-specific (e.g., tags are bound to specific countries).
 * This hook ensures that all filters are reset to prevent showing invalid or empty results.
 *
 * The hook preserves pagination and sorting parameters while clearing all filter-related URL parameters.
 */
export const useResetFilterOnCountryChange = ({
	query,
	setQuery,
}: UseResetFilterOnCountryChangeProps) => {
	const { countryOfSale, useFormatMessage } = useContext(LocalizationContext);
	const t = useFormatMessage();
	const prevCountryRef = useRef(countryOfSale);

	useEffect(() => {
		if (prevCountryRef.current !== countryOfSale) {
			prevCountryRef.current = countryOfSale;

			// Get translated keys
			const translatedKeys = PERSISTED_QUERY_PARAM_TRANSLATION_KEYS.map(
				(key) => `${t({ id: key })}`
			);

			// Reset all filters by setting all query parameters to undefined
			const resetQuery: Record<string, undefined> = {};
			Object.keys(query).forEach((key) => {
				if (
					!PERSISTED_QUERY_PARAM_KEYS.includes(key) &&
					!translatedKeys.includes(key)
				) {
					resetQuery[key] = undefined;
				}
			});
			setQuery(resetQuery);
		}
	}, [countryOfSale, query, setQuery, t]);
};
