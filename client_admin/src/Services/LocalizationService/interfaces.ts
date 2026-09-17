import * as React from 'react';
import useFormatMessage from 'Hooks/useFormatMessage';

import { VinistoHelperDllEnumsCurrency } from '@/api-types/product-api';

export interface ILocalizationServiceProps {
	children: React.ReactNode;
}

export interface ILocalizationContextValue {
	activeLanguage: string;
	activeLanguageKey: string;
	changeLanguage: (nextLanguage: string) => void;
	useFormatMessage: typeof useFormatMessage;
	countries: ICountry[];
	activeCurrency: ICurrency;
	currencies: ICurrency[];
}

export interface ICurrency {
	lang: string;
	currency: VinistoHelperDllEnumsCurrency;
	title: string;
}

export interface ICountry {
	code: string;
	title: string;
	lang: string;
}
