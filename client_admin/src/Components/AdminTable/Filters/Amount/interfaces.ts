import { Column } from '@tanstack/react-table';
import { ColumnFilters } from 'Components/AdminTable/interfaces';
import { PageListTableRow } from 'Hooks/useAdminTable/interfaces';

import { AMOUNT_FILTER } from './constants';

export interface AmountFilterProps<T extends PageListTableRow> {
	column: Column<T>;
	value: string;
	onClick?: (
		event: React.MouseEvent<HTMLSelectElement | HTMLInputElement>
	) => void;
	setColumnFilters: React.Dispatch<React.SetStateAction<ColumnFilters>>;
	setDataFilter: (column: Column<T>, value: string) => void;
}

export interface AvailableCountFilter {
	type?: AMOUNT_FILTER;
	value?: number | '';
}
