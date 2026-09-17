import { VinistoHelperDllEnumsTagTagType } from '@/api-types/product-api';

export const tagTypeTranslationMap: Record<
	VinistoHelperDllEnumsTagTagType,
	string
> = {
	[VinistoHelperDllEnumsTagTagType.Personalized]: 'tag.type.personalized',
	[VinistoHelperDllEnumsTagTagType.System]: 'tag.type.system',
	[VinistoHelperDllEnumsTagTagType.User]: 'tag.type.user',
};

export const tagModalModes = {
	CREATE: 'CREATE',
	EDIT: 'EDIT',
	ADD_COUNTRY_OF_SALE: 'ADD_COUNTRY_OF_SALE',
} as const;

export type TagModalMode = (typeof tagModalModes)[keyof typeof tagModalModes];
