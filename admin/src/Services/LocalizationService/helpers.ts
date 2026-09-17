import { get, head, includes, split } from 'Helpers/lodash';

const supporedBrowserLanguages: string[] = ['en', 'cs', 'sk', 'de'];

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
