import {
	MenuLink,
} from '@/api-types/linkwidgets-api';

export const withoutExcluded = (menu: MenuLink[] | null) => {
	if (!menu) return null;

	const filterExcluded = (links: MenuLink[]): MenuLink[] => {
		return links
			.filter((link) => link.flags && !link.flags.includes('ExcludedFromMenu'))
			.map((link) => ({
				...link,
				childLinks: link.childLinks ? filterExcluded(link.childLinks) : [],
			}));
	};

	return filterExcluded(menu);
};
