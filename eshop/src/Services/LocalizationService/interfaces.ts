import { ReactNode } from 'react';
import { MessageDescriptor, MessageFormatElement } from 'react-intl';
import {
	VinistoHelperDllEnumsCountryCode,
	VinistoHelperDllEnumsCurrency,
} from 'vinisto_api_client/src/api-types/product-api';

import { availableLanguage } from './constants';

export interface LocalizationServiceProps {
	children: ReactNode;
	activeCurrencyCookie: string | undefined;
	topLevelDomain: string | undefined;
}

export interface Currency {
	currency: VinistoHelperDllEnumsCurrency;
	title: string;
}

export type Rate = 'valueGoods' | 'valueDiscountCoupons';

export type AvailableLocale = keyof typeof availableLanguage;

// changeLanguage, useFormatMessageAll, currencies, countries
export interface LocalizationContextValue {
	activeLanguage: AvailableLocale;
	activeLanguageKey: any;
	// prevLanguage: React.RefObject<null | string>;
	// prevLanguageKey: React.RefObject<null | string>;
	activeCurrency: Currency;
	setCurrency: (nextCurrency: VinistoHelperDllEnumsCurrency) => void;
	// changeLanguage: (nextLanguage: string) => void;
	useFormatMessage: () => (props: MessageDescriptor, values?: any) => ReactNode;
	useFormatMessageInstance: (
		props: MessageDescriptor,
		values?: any
	) => ReactNode;
	countryOfSale: VinistoHelperDllEnumsCountryCode;
	//useFormatMessageAll: () => (
	//	props: MessageDescriptor,
	//	values?: Record<string, never>
	//) => Message[];
	useFormatMessageAllStrings: () => (
		props: MessageDescriptor,
		values?: Record<string, never>
	) => string[];
	useFormatMessageFromLanguage: () => (
		lang: string,
		props: MessageDescriptor,
		values?: Record<string, never>
	) => string;
	useAllMessagesFromLanguage: () => (
		lang: AvailableLocale
	) => Record<string, MessageFormatElement[] | string>;
	// currencies: Currency[];
	// countries: Country[];
	convertCZKtoEUR: (value: number) => number;
	convertEURtoCZK: (value: number) => number;
	convertToActiveCurrencyIfPriceCurrencyIsDifferent: (args: {
		price: number;
		priceCurrency: VinistoHelperDllEnumsCurrency;
		activeCurrency: VinistoHelperDllEnumsCurrency;
		rate?: Rate;
	}) => number;
}

//export interface Country {
//	code: string;
//	title: string;
//	lang: string;
//}
