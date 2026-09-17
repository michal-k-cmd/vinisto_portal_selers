export const API_ENDPOINT = 'order-api/statistics';

import { VinistoHelperDllEnumsCountryCode } from '@/api-types/order-api';

export const countryOfSaleOptions = [
	{
		value: 'all',
		label: 'Všechny',
	},
	{
		value: VinistoHelperDllEnumsCountryCode.CZ,
		label: VinistoHelperDllEnumsCountryCode.CZ,
	},
	{
		value: VinistoHelperDllEnumsCountryCode.SK,
		label: VinistoHelperDllEnumsCountryCode.SK,
	},
];
