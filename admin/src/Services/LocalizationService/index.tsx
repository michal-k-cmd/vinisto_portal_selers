import * as React from 'react';
import { get } from 'Helpers/lodash';
import { IntlProvider } from 'react-intl';
import { toast } from 'react-toastify';
import { VinistoHelperDllEnumsLanguage } from 'vinisto_api_client/src/api-types/user-api/';
import useFormatMessage from 'Hooks/useFormatMessage';
import { LocalStorageKeys } from 'Services/StorageService/constants';

import { StorageContext } from '../StorageService/context';

import {
	ICountry,
	ICurrency,
	ILocalizationContextValue,
	ILocalizationServiceProps,
} from './interfaces';
import locale_en from './translations/en.json';
import locale_cs from './translations/cs.json';
import locale_sk from './translations/sk.json';
import locale_de from './translations/de.json';

import { VinistoHelperDllEnumsCurrency } from '@/api-types/product-api';

const translations = {
	cs: locale_cs,
	en: locale_en,
	sk: locale_sk,
	de: locale_de,
};

const countries: Array<ICountry> = [
	{ code: 'cs', title: 'Čeština', lang: 'cs' },
	{ code: 'gb', title: 'English', lang: 'en' },
	{ code: 'sk', title: 'Slovenstina', lang: 'sk' },
	{ code: 'de', title: 'Nemcina', lang: 'de' },
];

const currencies: ICurrency[] = [
	{ lang: 'cs', currency: VinistoHelperDllEnumsCurrency.CZK, title: 'Kč' },
	{ lang: 'en', currency: VinistoHelperDllEnumsCurrency.USD, title: '$' },
	{ lang: 'sk', currency: VinistoHelperDllEnumsCurrency.EUR, title: '€' },
	{ lang: 'de', currency: VinistoHelperDllEnumsCurrency.EUR, title: '€' },
];

// const browserLanguage = getBrowserLanguage();
const FIXED_LANGUAGE = 'cs';
const browserLanguage = FIXED_LANGUAGE;

export const getLangugeKey = (currentLang: string) => {
	if (currentLang === 'en') {
		return VinistoHelperDllEnumsLanguage.ENGLISH;
	} else if (currentLang === 'sk') {
		return VinistoHelperDllEnumsLanguage.SLOVAK;
	} else if (currentLang === 'de') {
		return VinistoHelperDllEnumsLanguage.GERMAN;
	}

	return VinistoHelperDllEnumsLanguage.CZECH;
};

const defaultLocalizationContextValue: ILocalizationContextValue = {
	activeLanguage: browserLanguage,
	activeLanguageKey: getLangugeKey(browserLanguage),
	activeCurrency: currencies.find(
		(currency) => currency.lang === browserLanguage
	) ?? { lang: 'cs', currency: VinistoHelperDllEnumsCurrency.CZK, title: 'Kč' },
	changeLanguage: () => {},
	useFormatMessage,
	countries,
	currencies,
};

export const LocalizationContext = React.createContext(
	defaultLocalizationContextValue
);

/**
 *  Localization Service
 * @class LocalizationService
 */
const LocalizationService: React.FC<ILocalizationServiceProps> = (
	props
): JSX.Element => {
	const storageContext = React.useContext(StorageContext);

	const { children } = props;
	const [activeLanguage, setActiveLanguage] = React.useState(
		defaultLocalizationContextValue.activeLanguage
	);

	React.useEffect(() => {
		const storedActiveLanguage = storageContext.StorageService.getStorageItem(
			LocalStorageKeys.ACTIVE_LANGUAGE
		);
		if (!storedActiveLanguage) {
			storageContext.StorageService.setItem(
				LocalStorageKeys.ACTIVE_LANGUAGE,
				activeLanguage
			);
		} else if (
			storedActiveLanguage &&
			storedActiveLanguage !== activeLanguage
		) {
			// changeLanguage(`${storedActiveLanguage}`, true);
			changeLanguage(FIXED_LANGUAGE, true);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const changeLanguage = React.useCallback(
		(nextLanguage: string, forceUpdate = false): void => {
			if (activeLanguage !== nextLanguage) {
				setActiveLanguage(nextLanguage);
				storageContext.StorageService.setItem(
					LocalStorageKeys.ACTIVE_LANGUAGE,
					nextLanguage
				);
				if (!forceUpdate) {
					const czTranslate = `Jazyk byl úspěšně změněn.`;
					const enTranslate = `The language has been successfully changed.`;
					const skTranslate = `Jazyk bol úspešne zmenený.`;
					const deTranslate = `Die Sprache wurde erfolgreich geändert.`;

					if (nextLanguage === 'cs') {
						toast.success(czTranslate);
					}
					if (nextLanguage === 'en') {
						toast.success(enTranslate);
					}
					if (nextLanguage === 'sk') {
						toast.success(skTranslate);
					}
					if (nextLanguage === 'de') {
						toast.success(deTranslate);
					}
				}
			}
		},
		[activeLanguage, storageContext.StorageService]
	);

	const activeCurrency = React.useMemo(() => {
		return (
			currencies.find((currency) => currency.lang === activeLanguage) ?? {
				lang: 'cs',
				currency: VinistoHelperDllEnumsCurrency.CZK,
				title: 'Kč',
			}
		);
	}, [activeLanguage]);

	const localizationContextValue: ILocalizationContextValue = {
		changeLanguage,
		activeLanguage,
		activeLanguageKey: getLangugeKey(activeLanguage),
		activeCurrency,
		useFormatMessage,
		countries,
		currencies,
	};

	return (
		<LocalizationContext.Provider value={localizationContextValue}>
			<IntlProvider
				locale={activeLanguage}
				messages={get(translations, activeLanguage, locale_cs)}
				defaultLocale={activeLanguage}
			>
				{children}
			</IntlProvider>
		</LocalizationContext.Provider>
	);
};

export default LocalizationService;
