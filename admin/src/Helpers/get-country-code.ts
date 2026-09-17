import {
	VinistoHelperDllEnumsCountryCode,
	VinistoHelperDllEnumsLanguage,
} from '@/api-types/product-api';

export const getCountryCodeFromLanguageKey = (
	langKey: VinistoHelperDllEnumsLanguage
): VinistoHelperDllEnumsCountryCode => {
	if (langKey === VinistoHelperDllEnumsLanguage.ENGLISH) {
		return VinistoHelperDllEnumsCountryCode.UK;
	}
	if (langKey === VinistoHelperDllEnumsLanguage.SLOVAK) {
		return VinistoHelperDllEnumsCountryCode.SK;
	}
	if (langKey === VinistoHelperDllEnumsLanguage.GERMAN) {
		return VinistoHelperDllEnumsCountryCode.DE;
	}

	return VinistoHelperDllEnumsCountryCode.CZ;
};
