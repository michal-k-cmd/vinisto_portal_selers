import { Allowed_Sections } from '@/domain/link-widget/enums';

export const LOCATOR_DB_COLUMN = 'pathId';
export const SECTION_DB_COLUMN = 'section';

export const SORTING_COLUMN_MAP = {
	[LOCATOR_DB_COLUMN]: 'LOCATOR',
	[SECTION_DB_COLUMN]: 'SECTION',
};

export const SECTION_TRANSLATION_MAP = {
	[Allowed_Sections.HOMEPAGE_DESKTOP]:
		'admin.linkWidget.position.HOMEPAGE_DESKTOP',
	[Allowed_Sections.HOMEPAGE_MOBILE]:
		'admin.linkWidget.position.HOMEPAGE_MOBILE',
	[Allowed_Sections.CATEGORY]: 'admin.header.category.subTtab.list',
	[Allowed_Sections.HEADER_DESKTOP]: 'admin.linkWidget.position.HEADER_DESKTOP',
	[Allowed_Sections.HEADER_MOBILE]: 'admin.linkWidget.position.HEADER_MOBILE',
	[Allowed_Sections.SEARCH]: 'admin.linkWidget.position.SEARCH',
	[Allowed_Sections.MAIN_NAVIGATION_DESKTOP]:
		'admin.linkWidget.position.NAVIGATION_DESKTOP',
	[Allowed_Sections.MAIN_NAVIGATION_MOBILE]:
		'admin.linkWidget.position.NAVIGATION_MOBILE',
} as const;
