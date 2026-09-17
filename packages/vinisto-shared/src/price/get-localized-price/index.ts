import { VinistoHelperDllEnumsCurrency } from 'vinisto_api_client/src/api-types/product-api';

interface LocalizeCurrencyParams {
	price: number | null | undefined;
	currency:
		| VinistoHelperDllEnumsCurrency
		| keyof typeof VinistoHelperDllEnumsCurrency
		| undefined;
	displayCurrency?: boolean;
	decimalPlaces?: number;
	disableFormatting?: boolean;
}

// TODO Decimal places should specified in a default config based on currency
export const getLocalizedPrice = ({
	price,
	currency,
	displayCurrency = true,
	decimalPlaces = 0,
}: LocalizeCurrencyParams) => {
	if (
		price === null ||
		price === undefined ||
		Number.isNaN(price) ||
		!currency ||
		!(currency in VinistoHelperDllEnumsCurrency)
	) {
		return '';
	}

	if (currency === VinistoHelperDllEnumsCurrency.CZK) {
		return new Intl.NumberFormat('cs-CZ', {
			...(displayCurrency && { style: 'currency', currency: 'CZK' }),
			minimumFractionDigits: decimalPlaces,
			maximumFractionDigits: decimalPlaces,
		}).format(price);
	}

	if (currency === VinistoHelperDllEnumsCurrency.EUR) {
		return new Intl.NumberFormat('sk-SK', {
			...(displayCurrency && { style: 'currency', currency: 'EUR' }),
			minimumFractionDigits: 2,
			maximumFractionDigits: 2,
		}).format(price);
	}

	if (currency === VinistoHelperDllEnumsCurrency.USD) {
		return new Intl.NumberFormat('en-US', {
			...(displayCurrency && { style: 'currency', currency: 'USD' }),
			minimumFractionDigits: decimalPlaces,
			maximumFractionDigits: decimalPlaces,
		}).format(price);
	}
	return '';
};
