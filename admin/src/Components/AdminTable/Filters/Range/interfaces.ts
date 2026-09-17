import { Column } from '@tanstack/react-table';
import { IPageListTableRow } from 'Hooks/useAdminTable/interfaces';

export interface FilterProps<T extends IPageListTableRow> {
	column: Column<T>;
	value: string;
	onChange: (value: string) => void;
	onClick?: (event: React.MouseEvent<HTMLInputElement>) => void;
}

export interface RangeFilterValues {
	min: number | null;
	max: number | null;
}
