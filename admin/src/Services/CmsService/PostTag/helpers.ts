import { isPlainObject } from 'Helpers/lodash';
import {
	VinistoCmsDllModelsApiCmsTagCmsTag,
	VinistoHelperDllEnumsLanguage,
} from 'vinisto_api_client/src/api-types/cms-api/';
import {
	PostTagData,
	PostTagTranslation,
} from 'Services/CmsService/interfaces';

const sortKeyFirst =
	(key: string) =>
	([keyA]: [string, PostTagTranslation]) =>
		keyA === key ? -1 : 0;

export const sortTranslations = (
	translations: PostTagData['translations'],
	activeLanguage: VinistoHelperDllEnumsLanguage
) =>
	Object.entries(translations)
		.sort(sortKeyFirst(activeLanguage))
		.reduce(
			(acc, [key, value]) => ({ ...acc, [key]: value }),
			{} as PostTagData['translations']
		);

const postTagProps = [
	'name',
	'url',
	'description',
	'metaDescription',
	'metaTitle',
] as const;

function transform(postTag: VinistoCmsDllModelsApiCmsTagCmsTag) {
	const result = {} as PostTagData['translations'];
	for (const field of postTagProps) {
		if (!Array.isArray(postTag[field])) continue;
		postTag[field]?.forEach((i) => {
			if (i.language === undefined || i.value === undefined || i.value === null)
				return;

			if (!result[i.language]) {
				result[i.language] = {} as PostTagTranslation;
			}
			// Hotfix to prevent showing 'undefined' string; to be fixed on CREATE method
			result[i.language][field] = i.value === 'undefined' ? '' : i.value;
		});
	}
	return result;
}

export const mapApiToEntity = (
	postTag?: VinistoCmsDllModelsApiCmsTagCmsTag,
	activeLanguage?: VinistoHelperDllEnumsLanguage
): PostTagData | undefined => {
	if (!postTag || !isPlainObject(postTag) || !postTag.id) {
		return;
	}
	return {
		id: postTag.id,
		createTime: postTag.createdAt ?? 0,
		articleNumber: postTag.articleNumber ?? 0,
		translations: sortTranslations(
			transform(postTag ?? {}),
			activeLanguage ?? VinistoHelperDllEnumsLanguage.CZECH
		),
	};
};
