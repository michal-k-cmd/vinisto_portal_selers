import { VinistoProductDllModelsApiSpecificationComboSpecificationAllowedValue } from 'vinisto_api_client/src/api-types/product-api';

export const getFirstLetters = (
	values: VinistoProductDllModelsApiSpecificationComboSpecificationAllowedValue[]
) => {
	const letters = new Set<string>();
	values?.forEach((value) => {
		const letter = value.value[0].toUpperCase() ?? null;
		if (letter) {
			letters.add(letter);
		}
	});
	return Array.from(letters).sort((a, b) => a?.localeCompare(b));
};
