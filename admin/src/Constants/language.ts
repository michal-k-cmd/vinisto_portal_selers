const LANGUAGES = {
	CZECH: 'CZECH',
	SLOVAK: 'SLOVAK',
	ENGLISH: 'ENGLISH',
	GERMAN: 'GERMAN',
} as const;

type LanguageOption = {
	value: keyof typeof LANGUAGES;
	text: (typeof LANGUAGES)[keyof typeof LANGUAGES];
};

const languageOptions: LanguageOption[] = Object.entries(LANGUAGES).map(
	([key, value]) => ({
		value: key as keyof typeof LANGUAGES,
		text: value,
	})
);

export { LANGUAGES, languageOptions };
export type { LanguageOption };
