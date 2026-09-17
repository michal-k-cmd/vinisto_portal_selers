export const API_ENDPOINT = 'order-api/orders-xml/GetXmlOrders';

import { VinistoHelperDllEnumsCountryCode } from '@/api-types/order-api';

export const countryCodesOptions = [
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
