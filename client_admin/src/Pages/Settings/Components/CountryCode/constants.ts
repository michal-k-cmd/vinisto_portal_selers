import { VinistoHelperDllEnumsCountryCode } from 'vinisto_api_client/src/api-types/supplier-api';

export const FIELD_NAME = 'addressCountryCode';

export const COUNTRIES = [
	{
		text: 'settings.address.countryCode.options.cz',
		value: VinistoHelperDllEnumsCountryCode.CZ,
	},
	{
		text: 'settings.address.countryCode.options.sk',
		value: VinistoHelperDllEnumsCountryCode.SK,
	},
	{
		text: 'settings.address.countryCode.options.de',
		value: VinistoHelperDllEnumsCountryCode.DE,
	},
	{
		text: 'settings.address.countryCode.options.uk',
		value: VinistoHelperDllEnumsCountryCode.UK,
	},
];

export const COUNTRY_CODES_MAP = {
	[String(VinistoHelperDllEnumsCountryCode.CZ)]:
		VinistoHelperDllEnumsCountryCode.CZ,
	[String(VinistoHelperDllEnumsCountryCode.SK)]:
		VinistoHelperDllEnumsCountryCode.SK,
	[String(VinistoHelperDllEnumsCountryCode.DE)]:
		VinistoHelperDllEnumsCountryCode.DE,
	[String(VinistoHelperDllEnumsCountryCode.UK)]:
		VinistoHelperDllEnumsCountryCode.UK,
};
