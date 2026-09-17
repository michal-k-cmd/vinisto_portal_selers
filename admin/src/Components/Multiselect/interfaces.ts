interface Option {
	value: string;
	label: string;
}

interface MultiselectProps {
	options: Option[];
	initialSelected?: Option[];
	onSelectionChange?: (selected: Option[]) => void;
	onSearchChange?: (search: string) => void;
	onAddNewItem?: (item: Option) => void;
	onSelectItem?: (item: Option) => void;
	onDeselectItem?: (item: Option) => void;
	newItem?: Option;
	maxWidth?: string;
	disabled?: boolean;
	placeholder?: string;
}

export type { Option, MultiselectProps };
