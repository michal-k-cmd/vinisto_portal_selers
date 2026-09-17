'use client';
import {
	createContext,
	// createRef,
	useCallback,
	useContext,
	useEffect,
	// useEffect,
	// useRef,
	useState,
} from 'react';
import { entriesIn, forEach, get, map, set, uniq, valuesIn } from 'lodash-es';
import { dayjsInstance as dayjs } from 'Services/Date';
import {
	createIntl,
	IntlShape,
	MessageDescriptor,
	MessageFormatElement,
} from 'react-intl';
import { IntlProvider } from 'react-intl';
import { useQuery } from '@tanstack/react-query';
import {
	VinistoHelperDllEnumsCountryCode,
	VinistoHelperDllEnumsCurrency,
} from 'vinisto_api_client/src/api-types/product-api';
import ExchangeRateService from 'vinisto_api_client/src/exchange-rate-service';
import { prefix } from 'Services/StorageService/helpers';
import { LocalStorageKeys } from 'Services/StorageService/constants';
import { StorageContext } from 'Services/StorageService/context';
import useBroadcastChannel from 'Hooks/useBroadcastChannel';
import {
	BROADCAST_CHANNELS,
	LOCALIZATION_BROADCAST_MESSAGE_TYPES,
	LocalizationBroadcastMessage,
} from 'Hooks/useBroadcastChannel/constants';

import {
	AvailableLocale,
	// Country,
	Currency,
	LocalizationContextValue,
	LocalizationServiceProps,
	Rate,
	// Message,
} from './interfaces';
import { availableLanguage, DEFAULT_LANGUAGE } from './constants';
import locale_cs from './translations/cs.json';

// import locale_de from './translations/de.json';
// import locale_en from './translations/en.json';
// import locale_sk from './translations/sk.json';
import 'dayjs/locale/cs';

dayjs.locale(DEFAULT_LANGUAGE);

const translations = {
	cs: locale_cs,
	// en: locale_en,
	// de: locale_de,
	// sk: locale_sk,
};

//const countries: Array<Country> = [
//	{ code: 'cs', title: 'Čeština', lang: 'cs' },
//	{ code: 'gb', title: 'English', lang: 'en' },
//	{ code: 'sk', title: 'Slovencina', lang: 'sk' },
//	{ code: 'de', title: 'Nemcina', lang: 'de' },
//];

const currencies: Currency[] = [
	{ currency: VinistoHelperDllEnumsCurrency.CZK, title: 'Kč' },
	{ currency: VinistoHelperDllEnumsCurrency.EUR, title: '€' },
	{ currency: VinistoHelperDllEnumsCurrency.USD, title: '$' },
];

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const getLangugeKey = (currentLang: string) => {
	// if (currentLang === 'cs') {
	return 'CZECH';
	// } else if (currentLang === 'en') {
	// 	return 'ENGLISH';
	// } else if (currentLang === 'sk') {
	// 	return 'SLOVAK';
	// } else if (currentLang === 'de') {
	// 	return 'GERMAN';
	// }
};

const getCountryOfSale = (
	currencyKey: VinistoHelperDllEnumsCurrency
): VinistoHelperDllEnumsCountryCode => {
	switch (currencyKey) {
		case 'CZK':
			return VinistoHelperDllEnumsCountryCode.CZ;
		case 'EUR':
			return VinistoHelperDllEnumsCountryCode.SK;
		default:
			return VinistoHelperDllEnumsCountryCode.CZ;
	}
};

const defaultCurrency = {
	currency: VinistoHelperDllEnumsCurrency.CZK,
	title: 'Kč',
};

const defaultLocalizationContextValue: LocalizationContextValue = {
	activeLanguage: availableLanguage.cs,
	activeLanguageKey: getLangugeKey(availableLanguage.cs),
	// prevLanguage: createRef(),
	// prevLanguageKey: createRef(),
	activeCurrency: { currency: VinistoHelperDllEnumsCurrency.CZK, title: 'Kč' },
	countryOfSale: getCountryOfSale(VinistoHelperDllEnumsCurrency.CZK),
	setCurrency: () => null,
	//changeLanguage: () => null,
	useFormatMessage:
		() =>
		// eslint-disable-next-line react/function-component-definition, react/display-name
		() =>
			null,
	useFormatMessageInstance:
		// eslint-disable-next-line react/function-component-definition, react/display-name
		() => null,
	// useFormatMessageAll: () => () => [],
	useFormatMessageAllStrings: () => () => [],
	useFormatMessageFromLanguage: () => () => '',
	useAllMessagesFromLanguage: () => () => ({}),
	// currencies,
	// countries,
	convertCZKtoEUR: () => 0,
	convertEURtoCZK: () => 0,
	convertToActiveCurrencyIfPriceCurrencyIsDifferent: () => 0,
};

/**
 * Creates object with all locale intls
 */
const loadIntls = (): Record<string, IntlShape> => {
	const intls = {};
	forEach(entriesIn(translations), ([locale, messages]) => {
		set(intls, `[${locale}]`, createIntl({ locale, messages }));
	});
	return intls;
};

const intls = loadIntls();

export const LocalizationContext = createContext(
	defaultLocalizationContextValue
);

/**
 * Localization Service Provider
 * @class LocalizationServiceProvider
 * @return JSX Component
 */
const LocalizationServiceProvider = ({
	children,
	activeCurrencyCookie,
	topLevelDomain,
}: LocalizationServiceProps) => {
	const storageContext = useContext(StorageContext);
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const [activeLanguage] = useState(() => {
		if (topLevelDomain === availableLanguage.sk) return availableLanguage.sk;
		// return defaultLocalizationContextValue.activeLanguage;
		return availableLanguage.cs;
	});
	const [activeCurrency, setActiveCurrency] = useState(() => {
		if (
			activeCurrencyCookie &&
			activeCurrencyCookie in VinistoHelperDllEnumsCurrency
		) {
			const currency = currencies.find(
				(currency) => currency.currency === activeCurrencyCookie
			);
			if (currency) return currency;
		}

		const storedActiveCurrency =
			typeof window === 'undefined'
				? null
				: (storageContext.StorageService.getStorageItem(
						LocalStorageKeys.ACTIVE_CURRENCY
				  ) as VinistoHelperDllEnumsCurrency);
		if (storedActiveCurrency)
			return (
				currencies.find(
					(currency) => currency.currency === storedActiveCurrency
				) ?? defaultCurrency
			);

		const isActiveLanguageSlovak =
			topLevelDomain === availableLanguage.sk ||
			(typeof window !== 'undefined' &&
				((document?.referrer?.length > 0 &&
					(document.referrer.startsWith('https://vinisto.sk') ||
						document.referrer.startsWith('https://www.vinisto.sk'))) ||
					navigator.language === 'sk' ||
					navigator.userLanguage === 'sk'));

		const currencyToStore = isActiveLanguageSlovak
			? currencies.find(
					(currency) => currency.currency === VinistoHelperDllEnumsCurrency.EUR
			  )
			: currencies.find(
					(currency) => currency.currency === VinistoHelperDllEnumsCurrency.CZK
			  );

		if (typeof window !== 'undefined') {
			storageContext.StorageService.setItem(
				LocalStorageKeys.ACTIVE_CURRENCY,
				String(currencyToStore?.currency ?? defaultCurrency.currency)
			);
		}
		return currencyToStore ?? defaultCurrency;
	});

	useEffect(() => {
		document.cookie = `${prefix(LocalStorageKeys.ACTIVE_CURRENCY)}=${
			activeCurrency.currency
		}; path=/ ;max-age=31536000`;
	}, [activeCurrency]);

	// const prevLanguage = useRef(null);
	// const prevLanguageKey = useRef(null);

	// const useFormatMessageAll = () => getAllLangsForMessage;
	const useFormatMessageFromLanguage = () => getMessageForLanguage;
	const useFormatMessageAllStrings = () => getAllLangStringsForMessage;

	const applyCurrency = useCallback(
		(nextCurrency: VinistoHelperDllEnumsCurrency): void => {
			const newCurrency = currencies.find(
				(currency) => currency.currency === nextCurrency
			);
			if (newCurrency && activeCurrency.currency !== newCurrency.currency) {
				setActiveCurrency(newCurrency);
				storageContext.StorageService.setItem(
					LocalStorageKeys.ACTIVE_CURRENCY,
					nextCurrency
				);
			}
		},
		[activeCurrency.currency, storageContext.StorageService]
	);

	const { broadcastMessage: broadcastLocalizationMessage } =
		useBroadcastChannel<LocalizationBroadcastMessage>({
			channelName: BROADCAST_CHANNELS.LOCALIZATION_SYNC,
			onMessage: (event) => {
				if (
					event.data.type ===
					LOCALIZATION_BROADCAST_MESSAGE_TYPES.CURRENCY_CHANGED
				) {
					applyCurrency(event.data.currency);
				}
			},
		});

	const setCurrency = useCallback(
		(nextCurrency: VinistoHelperDllEnumsCurrency): void => {
			if (activeCurrency.currency === nextCurrency) return;

			applyCurrency(nextCurrency);
			broadcastLocalizationMessage({
				type: LOCALIZATION_BROADCAST_MESSAGE_TYPES.CURRENCY_CHANGED,
				currency: nextCurrency,
			});
		},
		[activeCurrency.currency, applyCurrency, broadcastLocalizationMessage]
	);

	// const changeLanguage = useCallback(
	// 	(nextLanguage: string): void => {
	// 		if (activeLanguage !== nextLanguage) {
	// 			set(prevLanguage, 'current', activeLanguage);
	// 			set(prevLanguageKey, 'current', getLangugeKey(activeLanguage));
	// 			setActiveLanguage(nextLanguage);
	// 			storageContext.StorageService.setItem('ACTIVE_LANGUAGE', nextLanguage);
	// 		}
	// 	},
	// 	[activeLanguage, storageContext.StorageService]
	// );

	/**
	 * Get message for all languages
	 */
	//const getAllLangsForMessage = (
	//	props: MessageDescriptor,
	//	values: Record<string, any> = {}
	//): Message[] =>
	//	uniq(
	//		map(entriesIn(intls), ([locale, intl]: [string, IntlShape]) => ({
	//			lang: locale,
	//			message: intl.formatMessage(props, values),
	//		}))
	//	);

	/**
	 * Get message strings from all languages
	 * - Duplicated values are removed
	 */
	const getAllLangStringsForMessage = (
		props: MessageDescriptor,
		values: Record<string, any> = {}
	): string[] =>
		uniq(
			map(valuesIn(intls), (intl: IntlShape) =>
				intl.formatMessage(props, values)
			)
		);

	/**
	 * Get message for certain language
	 * @param {string} lang language code
	 */
	const getMessageForLanguage = (
		lang: string,
		props: MessageDescriptor,
		values: Record<string, string | number | boolean> = {}
	): string => {
		const intl = get(
			intls,
			`[${lang}]`,
			createIntl({ locale: lang, messages: {} })
		);
		return intl.formatMessage(props, values);
	};

	const useAllMessagesFromLanguage = () => getAllMessagesForLanguage;

	const getAllMessagesForLanguage = (
		lang: AvailableLocale
	): Record<string, MessageFormatElement[] | string> => {
		const intl = intls[lang] ?? createIntl({ locale: lang, messages: {} });

		return intl?.messages ?? {};
	};

	/**
	 * Get message for certain language
	 * @param {string} lang language code
	 */
	const getMessageForLanguageInstance = (
		props: MessageDescriptor,
		values: Record<string, string | number | boolean> = {}
	): string => {
		const intl =
			// intls[activeLanguage] ??
			// createIntl({ locale: activeLanguage, messages: {} });
			intls[availableLanguage.cs] ??
			createIntl({ locale: availableLanguage.cs, messages: {} });

		return intl.formatMessage(props, values);
	};

	const { data: exchangeRate } = useQuery(
		['exchange-rate'],
		() => ExchangeRateService.getExchangeRate(),
		{
			// One hour
			staleTime: 1000 * 60 * 60,
		}
	);

	const convertCZKtoEUR = useCallback(
		(valueCZK: number, rate: Rate = 'valueGoods'): number =>
			valueCZK / (exchangeRate?.[rate] ?? 25),
		[exchangeRate]
	);

	const convertEURtoCZK = useCallback(
		(valueEUR: number, rate: Rate = 'valueGoods'): number =>
			valueEUR * (exchangeRate?.[rate] ?? 25),
		[exchangeRate]
	);

	const convertToActiveCurrencyIfPriceCurrencyIsDifferent = useCallback(
		({
			price,
			priceCurrency,
			activeCurrency,
			rate = 'valueGoods',
		}: {
			price: number;
			priceCurrency: VinistoHelperDllEnumsCurrency;
			activeCurrency: VinistoHelperDllEnumsCurrency;
			rate?: Rate | undefined;
		}) => {
			if (
				priceCurrency === VinistoHelperDllEnumsCurrency.EUR &&
				activeCurrency === VinistoHelperDllEnumsCurrency.CZK
			) {
				return convertEURtoCZK(price, rate);
			}
			if (
				priceCurrency === VinistoHelperDllEnumsCurrency.CZK &&
				activeCurrency === VinistoHelperDllEnumsCurrency.EUR
			) {
				return convertCZKtoEUR(price, rate);
			}
			return price;
		},
		[convertCZKtoEUR, convertEURtoCZK]
	);

	const localizationContextValue: LocalizationContextValue = {
		// changeLanguage,
		activeLanguage,
		activeLanguageKey: getLangugeKey(activeLanguage),
		// prevLanguage,
		// prevLanguageKey,
		activeCurrency,
		// TODO rename to just setCurrency (or changeCurrency)
		setCurrency,
		countryOfSale: getCountryOfSale(activeCurrency.currency),
		useFormatMessage: () => getMessageForLanguageInstance,
		useFormatMessageInstance: getMessageForLanguageInstance,
		// useFormatMessageAll,
		useFormatMessageAllStrings,
		useFormatMessageFromLanguage,
		useAllMessagesFromLanguage,
		convertCZKtoEUR,
		convertEURtoCZK,
		convertToActiveCurrencyIfPriceCurrencyIsDifferent,
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

export default LocalizationServiceProvider;
