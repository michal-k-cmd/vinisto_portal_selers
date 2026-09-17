import { VinistoHelperDllEnumsCountryCode } from '@/api-types/user-api';

export const JANUARY_FIRST_2038_IN_SECONDS = 2145916800;
export const CLEARANCE_SALE_TAG_ID = '655270d8d276cfb77aaa2557';

export const countryCodeToCountryNameMap = {
	[VinistoHelperDllEnumsCountryCode.CZ]: 'country.CZ',
	[VinistoHelperDllEnumsCountryCode.SK]: 'country.SK',
	[VinistoHelperDllEnumsCountryCode.DE]: 'country.DE',
	[VinistoHelperDllEnumsCountryCode.UK]: 'country.UK',
	[VinistoHelperDllEnumsCountryCode.PL]: 'country.PL',
} as const;
