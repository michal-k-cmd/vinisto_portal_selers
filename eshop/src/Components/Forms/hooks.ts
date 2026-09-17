import { VinistoHelperDllEnumsCountryCode } from '@/api-types/product-api';

export function validatePostalCode(
	postalCode: string,
	countryOfSale: VinistoHelperDllEnumsCountryCode
): boolean {
	const cleaned = postalCode.replace(/\s+/g, '').trim();

	if (cleaned.length !== 5) {
		return false;
	}

	switch (countryOfSale) {
		case VinistoHelperDllEnumsCountryCode.CZ:
			return /^[1-7][0-9]{4}$/.test(cleaned);

		case VinistoHelperDllEnumsCountryCode.SK:
			return /^[0-9]{5}$/.test(cleaned);

		default:
			return true;
	}
}
