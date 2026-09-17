// @ts-nocheck
// @ts-expect-error nobody tells us what shape specifications are

import { SpecificationDetail } from 'Services/Specification/interfaces';

const getSpecificationValue = (
	specifications: SpecificationDetail[] = [],
	id: string
) => {
	const specification = specifications.find(
		(spec: SpecificationDetail) => spec.definition.id.trim() === id.trim()
	);

	if (specification) {
		if (
			specification.value.value !== undefined &&
			specification.value.value !== null
		) {
			return specification.value.value;
		}

		if (
			specification.value.selectedValueName !== undefined &&
			specification.value.selectedValueName !== null
		) {
			return specification.value.selectedValueName;
		}

		if (
			specification.value.selectedValuesName &&
			Array.isArray(specification.value.selectedValuesName) &&
			specification.value.selectedValuesName.length > 0
		) {
			return specification.value.selectedValuesName[0];
		}
	}

	return '';
};

export default getSpecificationValue;
