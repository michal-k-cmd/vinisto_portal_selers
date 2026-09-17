import { VinistoHelperDllEnumsCountryCode } from '@/api-types/product-api';

export const DPD_WIDGET_BASE_URL =
	'https://api.dpd.cz/widget/latest/index.html';

export const DPD_WIDGET_PICKUP_POINT_DETAIL_BASE_URL = `https://pickup.dpd.cz/api/GetParcelShopById?id=`;

export enum DPDWidgetLanguage {
	Czech = 'cs',
	Slovak = 'sk',
	English = 'en',
	German = 'de',
	Bulgarian = 'bg',
	Spanish = 'es',
	Estonian = 'et',
	French = 'fr',
	Croatian = 'hr',
	Hungarian = 'hu',
	Italian = 'it',
	Lithuanian = 'lt',
	Latvian = 'lv',
	Dutch = 'nl',
	Polish = 'pl',
	Portuguese = 'pt',
	Romanian = 'ro',
	Slovenian = 'sl',
	Finnish = 'fi',
	Swedish = 'sv',
}

export enum DPDWidgetCountry {
	Czech = 'CZ',
	Slovak = 'SK',
	Germany = 'DE',
	Austria = 'AT',
	Poland = 'PL',
	Hungary = 'HU',
	Slovenia = 'SI',
	Croatia = 'HR',
	Estonia = 'EE',
	Latvia = 'LV',
	Lithuania = 'LT',
	Romania = 'RO',
	Bulgaria = 'BG',
	France = 'FR',
	Belgium = 'BE',
	Netherlands = 'NL',
}

export enum DPDWidgetFilter {
	PaymentMethod = 'paymentMethod',
	Place = 'place',
}

export const DPD_WIDGET_DEFAULTS = {
	language: DPDWidgetLanguage.Czech,
	country: DPDWidgetCountry.Czech,
	hideCloseButton: true,
	disableLockers: false,
	hideFeatures: false,
	hideOpeningHours: false,
	hideSubmitButton: false,
} as const;

// Obtainable from https://pickup.dpd.cz/api/getCountries

export const DPDWidgetCountryCodes: Array<{
	id: number;
	country: string;
	countryCode?: VinistoHelperDllEnumsCountryCode;
}> = [
	{
		id: 203,
		country: 'Česká republika',
		countryCode: VinistoHelperDllEnumsCountryCode.CZ,
	},
	{
		id: 276,
		country: 'Německo',
		countryCode: VinistoHelperDllEnumsCountryCode.DE,
	},
	{
		id: 616,
		country: 'Polsko',
		countryCode: VinistoHelperDllEnumsCountryCode.PL,
	},
	{
		id: 703,
		country: 'Slovensko',
		countryCode: VinistoHelperDllEnumsCountryCode.SK,
	},
	// Rest of the countries are currently not supported by Vinisto
	{ id: 56, country: 'Belgie' },
	{ id: 100, country: 'Bulharsko' },
	{ id: 233, country: 'Estonsko' },
	{ id: 250, country: 'Francie' },
	{ id: 191, country: 'Chorvatsko' },
	{ id: 380, country: 'Itálie' },
	{ id: 440, country: 'Litva' },
	{ id: 428, country: 'Lotyšsko' },
	{ id: 442, country: 'Lucembursko' },
	{ id: 348, country: 'Maďarsko' },
	{ id: 528, country: 'Nizozemsko' },
	{ id: 620, country: 'Portugalsko' },
	{ id: 40, country: 'Rakousko' },
	{ id: 642, country: 'Rumunsko' },
	{ id: 705, country: 'Slovinsko' },
	{ id: 724, country: 'Španělsko' },
	{ id: 752, country: 'Švédsko' },
	{ id: 756, country: 'Švýcarsko' },
];
