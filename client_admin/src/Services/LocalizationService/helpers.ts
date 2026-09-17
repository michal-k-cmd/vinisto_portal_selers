import { get, head, includes, split } from 'lodash-es';

const supporedBrowserLanguages: string[] = ['en', 'cs', 'de']; // 30.9 deleted sk language

export const getBrowserLanguage = (): string => {
	const browserLanguage = head(
		split(get(navigator, 'language', 'en_EN'), /[-_]/)
	);
	if (
		!browserLanguage ||
		!includes(supporedBrowserLanguages, browserLanguage)
	) {
		return 'cs';
	}

	// return browserLanguage;
	return 'cs';
};
