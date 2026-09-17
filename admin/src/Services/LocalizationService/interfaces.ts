import * as React from 'react';
import useFormatMessage from 'Hooks/useFormatMessage';

import { getLangugeKey } from '.';

import { VinistoHelperDllEnumsCurrency } from '@/api-types/product-api';

export interface ILocalizationServiceProps {
	children: React.ReactNode;
}

export type LanguageUnion = ReturnType<typeof getLangugeKey>;

export interface ILocalizationContextValue {
	activeLanguage: string;
	activeLanguageKey: LanguageUnion;
	activeCurrency: ICurrency;
	changeLanguage: (nextLanguage: string) => void;
	useFormatMessage: typeof useFormatMessage;
	countries: ICountry[];
	currencies: ICurrency[];
}

export interface ICountry {
	code: string;
	title: string;
	lang: string;
}

export interface ICurrency {
	lang: string;
	currency: VinistoHelperDllEnumsCurrency;
	title: string;
}
