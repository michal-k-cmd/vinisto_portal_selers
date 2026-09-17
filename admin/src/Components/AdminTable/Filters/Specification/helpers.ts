import { SpecificationType } from 'Services/Specification/constants';

import { C_SHARP_MAX_INT, C_SHARP_MIN_INT } from './constants';

export const parseSpecificationFiltersSearchParamsUrlToPostRequest = () => {
	const specificationDefinitionIds =
		new URLSearchParams(window.location.search).getAll(
			'specificationDefinitionId'
		) || [];
	const specificationTypes =
		new URLSearchParams(window.location.search).getAll('specificationType') ??
		[];
	const selectedValues =
		new URLSearchParams(window.location.search).getAll('selectedValues') ?? [];

	const filters = [];
	let i = 0;
	while (i <= specificationDefinitionIds.length) {
		const specificationDefinitionId = specificationDefinitionIds[i];
		const specificationType = specificationTypes[i];
		const specificationValue = selectedValues[i];

		if (
			!specificationDefinitionId ||
			!specificationType ||
			specificationValue == null ||
			specificationValue === ''
		)
			return filters;

		if (
			specificationType === SpecificationType.COMBO_BOX ||
			specificationType === SpecificationType.MULTI_COMBO_BOX
		) {
			filters.push({
				specificationDefinitionId,
				selectedValues: specificationValue.split(','),
			});
		}
		if (
			specificationType === SpecificationType.NUMBER ||
			specificationType === SpecificationType.NUMBER_IMPERIAL ||
			specificationType === SpecificationType.DECIMAL_NUMBER ||
			specificationType === SpecificationType.DECIMAL_NUMBER_IMPERIAL ||
			specificationType === 'PRICE'
		) {
			const [min, max] = specificationValue.split(',');
			filters.push({
				specificationDefinitionId,
				min: [undefined, null, ''].includes(min)
					? C_SHARP_MIN_INT
					: Number(min),
				max: [undefined, null, ''].includes(max)
					? C_SHARP_MAX_INT
					: Number(max),
				isImperial: false,
				...(specificationType === 'PRICE' && {
					currency: 1,
				}),
			});
		}
		if (specificationType === SpecificationType.TEXT) {
			filters.push({
				specificationDefinitionId,
				searchedText: specificationValue,
			});
		}
		if (specificationType === SpecificationType.CHECK_BOX) {
			filters.push({
				specificationDefinitionId,
				isChecked: Boolean(specificationValue),
			});
		}
		i++;
	}
	return filters;
};
