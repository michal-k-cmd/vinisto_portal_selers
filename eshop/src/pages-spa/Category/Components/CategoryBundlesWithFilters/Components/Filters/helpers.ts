import { type LangValuePair } from 'vinisto_api_client/src/shared';

import { INITIALLY_SHOWN_FILTERS_NUMBER } from './constants';

export const generateSpecificationsToShow = (
	specificationsWithBundleFilters: Record<string, any>[],
	query: Record<string, any>,
	language: string,
	showAllFilters = true
) => {
	const filtered = specificationsWithBundleFilters
		.filter((specification) => specification?.isHidden === false)
		.sort((a, b) => a.order - b.order);

	if (showAllFilters) return filtered;

	const specificationsToShow: Record<string, any>[] = [];

	filtered.forEach((specification) => {
		const specificationName: string =
			specification.name.find(
				(name: LangValuePair) => name.language === language
			).value ?? '';

		if (
			specificationsToShow.length < INITIALLY_SHOWN_FILTERS_NUMBER ||
			query[specificationName] ||
			query[specificationName] === 0
		)
			return specificationsToShow.push(specification);
	});
	return specificationsToShow;
};
