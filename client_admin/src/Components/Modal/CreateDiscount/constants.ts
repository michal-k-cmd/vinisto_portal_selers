import { VinistoHelperDllEnumsVatRate } from 'vinisto_api_client/src/api-types/product-api/';

import { ICurrency, IVat } from './interfaces';

// TODO - move to vinisto_api_client or to some shared place with constants

export enum DISCOUNT_TYPE {
	NUMBER = 'NUMBER',
	PERCENT = 'PERCENT',
}

export const PERCENTAGE_DISCOUNT_MIN = 2;
export const PERCENTAGE_DISCOUNT_MAX = 55;

export const currencies: ICurrency[] = [
	{ value: 'CZK', label: 'CZK' },
	{ value: 'EUR', label: 'EUR' },
	{ value: 'USD', label: 'USD' },
];

export const vats: IVat[] = [
	{ value: VinistoHelperDllEnumsVatRate.BaseVat, label: 'BaseVat' },
	{
		value: VinistoHelperDllEnumsVatRate.FirstReducedVat,
		label: 'FirstReducedVat',
	},
	{
		value: VinistoHelperDllEnumsVatRate.SecondReducedVat,
		label: 'SecondReducedVat',
	},
	{ value: VinistoHelperDllEnumsVatRate.NoVat, label: 'NoVat' },
];

export enum VAT_VALUE {
	BASE_VAT = 21,
	FIRST_REDUCED_VAT = 15,
	SECOND_REDUCED_VAT = 10,
	NO_VAT = 0,
}

export const FALLBACK_CURRENCY = 'CZK';

export enum PRICE_TYPES {
	STANDARD = 'STANDARD',
	VINISTO_DISCOUNT = 'VINISTO_DISCOUNT',
	SUPPLIER_DISCOUNT = 'SUPPLIER_DISCOUNT',
}

export enum VAT {
	BaseVat = 'BaseVat',
	FirstReducedVat = 'FirstReducedVat',
	SecondReducedVat = 'SecondReducedVat',
	NoVat = 'NoVat',
}

export const BASE_VAT_PERCENTAGE_VALUE = 21;
