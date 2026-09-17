import { VinistoHelperDllEnumsCurrency } from 'vinisto_api_client/src/api-types/product-api';

export const getLocalizedCurrency = (
	currencyCode:
		| VinistoHelperDllEnumsCurrency
		| keyof typeof VinistoHelperDllEnumsCurrency
		| null
		| undefined
) => {
	switch (currencyCode) {
		case VinistoHelperDllEnumsCurrency.CZK:
			return 'Kč';
		case VinistoHelperDllEnumsCurrency.EUR:
			return '€';
		case VinistoHelperDllEnumsCurrency.USD:
			return '$';
		default:
			return '';
	}
};
