import { IPageListTableRow } from 'Hooks/useAdminTable/interfaces';

export interface LinkWidgetListTableRow extends IPageListTableRow {
	pathId: string;
	/** Raw section key (part after `|` in pathId), e.g. CATEGORY */
	section: string;
	/** Translated section label, used for display and sorting */
	sectionLabel: string;
	/** Locator (part before `|` in pathId) */
	identifier: string;
}
