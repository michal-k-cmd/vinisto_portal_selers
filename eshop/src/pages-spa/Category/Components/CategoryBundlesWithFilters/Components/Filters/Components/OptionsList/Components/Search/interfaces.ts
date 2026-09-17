export interface ISearchOptions {
	search: string;
	onSearchChange: (search: string) => void;
	placeholderValue?: string;
}
