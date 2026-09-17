import { MouseEvent } from 'react';

export interface DropdownFilterProps {
	options: [value: string, label: string][];
	value: string;
	onChange: (value: string) => void;
	onClick?: (event: MouseEvent<HTMLSelectElement>) => void;
}
