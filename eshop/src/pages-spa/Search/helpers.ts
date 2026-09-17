import type { SearchPageRange, SearchSection } from './interfaces';

export const isSearchSection = (section: string): section is SearchSection =>
	section === 'produkty' || section === 'clanky';

export const parseSearchPage = (value: string): SearchPageRange | null => {
	if (!/^[1-9]\d*(?:-[1-9]\d*)?$/.test(value)) return null;

	const [first, last] = value.split('-').map(Number);
	if (!Number.isSafeInteger(first)) return null;
	if (last === undefined) return [first];
	if (!Number.isSafeInteger(last) || last < first) return null;

	return [first, last];
};

export const getSearchPageHref = (
	searchTerm: string,
	section: SearchSection,
	page: SearchPageRange
) =>
	`/vyhledavani/${section}/${page.join('-')}?q=${encodeURIComponent(
		searchTerm
	)}`;
