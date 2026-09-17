import {
	ColumnDef,
	ColumnFiltersState,
	RowData,
	RowSelectionState,
	SortingState,
} from '@tanstack/react-table';
import { PageListTableRow } from 'Hooks/useAdminTable/interfaces';

import { AdminTableAction, AdminTableFilterType } from './constants';
import { DropdownFilterProps } from './Filters/Dropdown/interfaces';

declare module '@tanstack/react-table' {
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	interface ColumnMeta<TData extends RowData, TValue> {
		className?: string;
		cellClassName?: string;
		/* not possible to rewrite ColumnMeta interface into union type with "options" required
        for Dropdown filter only - would have to rewrite ColumnDefBase that extends interface
        that is not exported, thus not possible to overwrite ColumnDefBase definition */
		filterType?: AdminTableFilterType;
		filterOptions?: DropdownFilterProps['options'];
	}
}

type AllowsSorting =
	| {
			sorting: SortingState;
			onSortingChange: (value: SortingState) => void;
	  }
	| {
			sorting?: never;
			onSortingChange?: never;
	  };

type AllowsFiltering =
	| {
			filters: ColumnFiltersState;
			onColumnFiltersChange: (value: ColumnFiltersState) => void;
	  }
	| {
			filters?: never;
			onColumnFiltersChange?: never;
	  };

type AllowsSelecting =
	| {
			selection: RowSelectionState;
			onRowSelectionChange: (value: RowSelectionState) => void;
			isAllSelected: boolean;
			onToggleSelectAllRows: () => void;
	  }
	| {
			selection?: never;
			onRowSelectionChange?: never;
			isAllSelected?: never;
			onToggleSelectAllRows?: never;
	  };

export type AdminTableProps<T extends PageListTableRow> = {
	className?: string;
	columns: ColumnDef<T>[];
	data: AdminTableState<T>['tableData'] | Promise<T[]>;
	loading?: boolean;
	errorMessage?: string;
	onRowClick?: (entity: T) => void; // ignored if data items contain `expandedContent` key
} & AllowsSorting &
	AllowsFiltering &
	AllowsSelecting;

export type ColumnFilters = {
	[k: string]: string;
};

export interface AdminTableState<T extends PageListTableRow> {
	isLoading: boolean;
	isError: boolean;
	tableData: T[];
}

export type SetErrorAction<T extends PageListTableRow> = [
	AdminTableAction.setIsError,
	AdminTableState<T>['isError']
];

export type SetIsLoadingAction<T extends PageListTableRow> = [
	AdminTableAction.setIsLoading,
	AdminTableState<T>['isLoading']
];

export type SetTableDataAction<T extends PageListTableRow> = [
	AdminTableAction.setTableData,
	AdminTableState<T>['tableData']
];

export type SetAllAction<T extends PageListTableRow> = [
	AdminTableAction.setAll,
	Partial<AdminTableState<T>>
];

export type AdminTableReducerAction<T extends PageListTableRow> =
	| SetErrorAction<T>
	| SetIsLoadingAction<T>
	| SetTableDataAction<T>
	| SetAllAction<T>;

export type AdminTableReducer<T extends PageListTableRow> = (
	prevState: AdminTableState<T>,
	action: AdminTableReducerAction<T>
) => AdminTableState<T>;
