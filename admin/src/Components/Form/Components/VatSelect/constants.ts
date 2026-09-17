import { VinistoHelperDllEnumsVatRate } from 'vinisto_api_client/src/api-types/product-api/';

export const VATS = [
	{
		label: 'BaseVat',
		value: VinistoHelperDllEnumsVatRate.BaseVat,
	},
	{
		label: 'ReducedVat',
		value: VinistoHelperDllEnumsVatRate.SecondReducedVat,
	},
	{
		label: 'NoVat',
		value: VinistoHelperDllEnumsVatRate.NoVat,
	},
];
