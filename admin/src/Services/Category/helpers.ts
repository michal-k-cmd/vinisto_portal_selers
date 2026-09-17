import {
	CategoryTranslation,
	CategoryType,
} from 'Services/Category/interfaces';

const sortKeyFirst =
	(key: string) =>
	([keyA]: [string, CategoryTranslation]) =>
		keyA === key ? -1 : 0;

export const sortTranslations = (translations: CategoryType['translations']) =>
	Object.entries(translations)
		.sort(sortKeyFirst('CZECH'))
		.reduce(
			(acc, [key, value]) => ({ ...acc, [key]: value }),
			{} as CategoryType['translations']
		);
