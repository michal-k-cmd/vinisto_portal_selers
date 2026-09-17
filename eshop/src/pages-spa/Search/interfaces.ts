export type SearchSection = 'produkty' | 'clanky';
export type SearchPageRange = [number] | [number, number];

export interface SearchProps {
	searchTerm: string;
	section?: SearchSection;
	page?: SearchPageRange;
}
