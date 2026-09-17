import { Table } from '@tanstack/react-table';

export interface ColumnFilterProps {
	isColumnFilterOpen: boolean;
	table: Table<any>;
	onClickOutsideRef?: React.RefObject<HTMLDivElement>;
}
