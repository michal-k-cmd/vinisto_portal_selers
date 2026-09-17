import removeDiacritics from 'Helpers/removeDiacritics';

import { DropdownItem } from './interfaces';

export const getDefaultDropdownPlaceholderAutocomplete = ({
	search,
	activeIndex,
	items,
	open,
	defaultPlaceholder,
}: {
	search: string;
	activeIndex: number | null;
	items: DropdownItem[];
	open: boolean;
	defaultPlaceholder: string;
}) => {
	if (!search.length) return defaultPlaceholder;
	if (!items.length || (!open && search.length)) return '';
	if (
		typeof activeIndex !== 'number' &&
		removeDiacritics(items[0].text?.toLowerCase()).startsWith(
			removeDiacritics(search?.toLowerCase())
		)
	) {
		return `${search}${items[0].text.slice(search.length)}`;
	}
	if (
		typeof activeIndex === 'number' &&
		removeDiacritics(items[activeIndex]?.text?.toLowerCase() ?? '').startsWith(
			removeDiacritics(search?.toLowerCase())
		)
	) {
		return `${search}${items[activeIndex]?.text.slice(search.length) ?? ''}`;
	}
	return '';
};
