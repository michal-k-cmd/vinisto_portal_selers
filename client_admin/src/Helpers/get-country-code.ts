import { VinistoHelperDllEnumsCountryCode } from '@/api-types/product-api';

export const getCountryCodeFromLanguageKey = (
	langKey: string
): VinistoHelperDllEnumsCountryCode => {
	if (langKey === 'ENGLISH') {
		return VinistoHelperDllEnumsCountryCode.UK;
	}
	if (langKey === 'SLOVAK') {
		return VinistoHelperDllEnumsCountryCode.SK;
	}
	if (langKey === 'GERMAN') {
		return VinistoHelperDllEnumsCountryCode.DE;
	}

	return VinistoHelperDllEnumsCountryCode.CZ;
};
