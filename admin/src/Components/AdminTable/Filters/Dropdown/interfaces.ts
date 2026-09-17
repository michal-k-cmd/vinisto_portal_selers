export interface DropdownFilterProps {
	value: string;
	onChange: (value: string) => void;
	onClick?: (event: React.MouseEvent<HTMLSelectElement>) => void;
	options: [value: string, label: string][];
}
