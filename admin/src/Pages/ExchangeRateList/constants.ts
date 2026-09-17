import { VinistoHelperDllEnumsCountryCode } from '@/api-types/order-api';

export const CoutryCodes = [
	{
		value: VinistoHelperDllEnumsCountryCode.CZ,
		label: VinistoHelperDllEnumsCountryCode.CZ,
	},
	{
		value: VinistoHelperDllEnumsCountryCode.SK,
		label: VinistoHelperDllEnumsCountryCode.SK,
	},
];

export const exchangeRateListTableKeys = {
	DATE: 'date',
	CURRENCY: 'currency',
	VALUE: 'value',
	VALUE_GOODS: 'valueGoods',
	VALUE_DISCOUNT_COUPONS: 'valueDiscountCoupons',
	COEFFICIENT: 'coefficient',
};
