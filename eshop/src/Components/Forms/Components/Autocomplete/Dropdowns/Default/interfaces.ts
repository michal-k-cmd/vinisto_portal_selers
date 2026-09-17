export interface DropdownItem {
	text: string;
	// TODO: add support for generic type
	value: any;
}

export interface DefaultDropdownProps {
	items: DropdownItem[];
	search: string;
}
