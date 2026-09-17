import { cookies, headers } from 'next/headers';
import {
	VinistoHelperDllEnumsCountryCode,
	VinistoHelperDllEnumsCurrency,
} from 'vinisto_api_client/src/api-types/product-api';
import { LocalStorageKeys } from 'Services/StorageService/constants';
import { prefix } from 'Services/StorageService/helpers';
import { availableLanguage } from 'Services/LocalizationService/constants';

import { VinistoHelperDllEnumsPriceLevel } from '@/api-types/order-api';

const getTopLevelDomain = (host?: string | null) =>
	host?.split(':')[0].split('.').pop();

const isSupportedCurrency = (
	value?: string
): value is VinistoHelperDllEnumsCurrency =>
	!!value && value in VinistoHelperDllEnumsCurrency;

const getCurrencyForHost = (host?: string | null) =>
	getTopLevelDomain(host) === availableLanguage.sk
		? VinistoHelperDllEnumsCurrency.EUR
		: VinistoHelperDllEnumsCurrency.CZK;

const isSupportedCustomerPriceLevel = (
	value?: string
): value is VinistoHelperDllEnumsPriceLevel =>
	!!value && value in VinistoHelperDllEnumsPriceLevel;

export const getUserPreferences = async () => {
	const [cookieStore, headerStore] = await Promise.all([cookies(), headers()]);

	const currencyCookie = cookieStore.get(
		prefix(LocalStorageKeys.ACTIVE_CURRENCY)
	)?.value;

	const currency = isSupportedCurrency(currencyCookie)
		? currencyCookie
		: getCurrencyForHost(headerStore.get('host'));

	const countryOfSale =
		currency === VinistoHelperDllEnumsCurrency.EUR
			? VinistoHelperDllEnumsCountryCode.SK
			: VinistoHelperDllEnumsCountryCode.CZ;

	const customerPriceLevelCookie = cookieStore.get(
		prefix(LocalStorageKeys.USER_PRICE_LEVEL)
	)?.value;

	const customerPriceLevel = isSupportedCustomerPriceLevel(
		customerPriceLevelCookie
	)
		? customerPriceLevelCookie
		: VinistoHelperDllEnumsPriceLevel.Level1;

	return { currency, countryOfSale, customerPriceLevel };
};
