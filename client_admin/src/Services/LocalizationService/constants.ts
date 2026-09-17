import { ICountry, ICurrency } from './interfaces';

import { VinistoHelperDllEnumsCurrency } from '@/api-types/product-api';

export const countries: ICountry[] = [
	{ code: 'cs', title: 'Čeština', lang: 'cs' },
	{ code: 'gb', title: 'English', lang: 'en' },
	{ code: 'sk', title: 'Slovenstina', lang: 'sk' },
	{ code: 'de', title: 'Nemcina', lang: 'de' },
];

export const currencies: ICurrency[] = [
	{ lang: 'cs', currency: VinistoHelperDllEnumsCurrency.CZK, title: 'Kč' },
	{ lang: 'en', currency: VinistoHelperDllEnumsCurrency.EUR, title: '€' },
	{ lang: 'sk', currency: VinistoHelperDllEnumsCurrency.EUR, title: '€' },
	{ lang: 'de', currency: VinistoHelperDllEnumsCurrency.EUR, title: '€' },
];

export const DATE_TIME_FORMAT = 'dd.MM.yyyy HH:mm';
export const DATE_FORMAT = 'dd.MM.yyyy';
