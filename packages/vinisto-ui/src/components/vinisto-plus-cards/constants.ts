import { Currency } from 'vinisto_api_client/src/api-types/addons-api';

export const monthlyPriceSaveAmountHardcoded: Record<Currency, number> = {
	[Currency.CZK]: 20,
	[Currency.EUR]: 0,
	[Currency.USD]: 0,
};
export const yearlyPriceSaveAmountHardcoded: Record<Currency, number> = {
	[Currency.CZK]: 633,
	[Currency.EUR]: 0,
	[Currency.USD]: 0,
};

export const originalMonthlyPrice: Record<Currency, number> = {
	[Currency.CZK]: 69,
	[Currency.EUR]: 0,
	[Currency.USD]: 0,
};
export const originalYearlyPrice: Record<Currency, number> = {
	[Currency.CZK]: 45,
	[Currency.EUR]: 0,
	[Currency.USD]: 0,
};
