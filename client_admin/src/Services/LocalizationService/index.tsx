import {
	createContext,
	FC,
	useCallback,
	useEffect,
	useMemo,
	useState,
} from 'react';
import { find, get } from 'lodash-es';
import { IntlProvider } from 'react-intl';
import { toast } from 'react-toastify';
import { storageServiceInstance } from 'Services/StorageService';
import useFormatMessage from 'Hooks/useFormatMessage';
import { LocalStorageKeys } from 'Services/StorageService/constants';

import {
	ILocalizationContextValue,
	ILocalizationServiceProps,
} from './interfaces';
import { countries, currencies } from './constants';
import { getBrowserLanguage } from './helpers';
import locale_cs from './translations/cs.json';
import locale_de from './translations/de.json';
import locale_en from './translations/en.json';
import locale_sk from './translations/sk.json';

import { VinistoHelperDllEnumsCurrency } from '@/api-types/product-api';

export const translations = {
	cs: locale_cs,
	en: locale_en,
	sk: locale_sk,
	de: locale_de,
};

const browserLanguage = getBrowserLanguage();

const getLangugeKey = (currentLang: string) => {
	if (currentLang === 'en') {
		return 'ENGLISH';
	} else if (currentLang === 'sk') {
		return 'SLOVAK';
	} else if (currentLang === 'de') {
		return 'GERMAN';
	}

	return 'CZECH';
};

const availableLocales = ['cs', 'en', 'de'];

const defaultLocalizationContextValue: ILocalizationContextValue = {
	activeLanguage: browserLanguage,
	activeLanguageKey: getLangugeKey(browserLanguage),
	changeLanguage: () => {},
	useFormatMessage,
	countries,
	activeCurrency: find(
		currencies,
		(currency) => get(currency, 'code', 'cs') === browserLanguage
	) ?? { lang: 'cs', currency: VinistoHelperDllEnumsCurrency.CZK, title: 'Kč' },
	currencies,
};

export const LocalizationContext = createContext(
	defaultLocalizationContextValue
);

/**
 *  Localization Service
 * @class LocalizationService
 */
const LocalizationService: FC<ILocalizationServiceProps> = ({ children }) => {
	const [activeLanguage, setActiveLanguage] = useState(
		defaultLocalizationContextValue.activeLanguage
	);

	useEffect(() => {
		const storedActiveLanguage = storageServiceInstance.getStorageItem(
			LocalStorageKeys.ACTIVE_LANGUAGE
		);
		if (!storedActiveLanguage) {
			storageServiceInstance.setItem(
				LocalStorageKeys.ACTIVE_LANGUAGE,
				activeLanguage
			);
		} else if (
			storedActiveLanguage &&
			storedActiveLanguage !== activeLanguage &&
			availableLocales.includes(`${storedActiveLanguage}`)
		) {
			changeLanguage(`${storedActiveLanguage}`, true);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const changeLanguage = useCallback(
		(nextLanguage: string, forceUpdate = false): void => {
			if (activeLanguage !== nextLanguage) {
				setActiveLanguage(nextLanguage);
				storageServiceInstance.setItem(
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
		[activeLanguage]
	);

	const activeCurrency = useMemo(() => {
		return (
			find(
				currencies,
				(currency) => get(currency, 'lang', 'cs') === activeLanguage
			) ?? {
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
		useFormatMessage,
		countries,
		activeCurrency,
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
