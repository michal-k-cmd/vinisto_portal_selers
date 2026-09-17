import {
	ColumnDef,
	ColumnFiltersState,
	RowData,
	RowSelectionState,
	SortingState,
} from '@tanstack/react-table';
import { IPageListTableRow } from 'Hooks/useAdminTable/interfaces';

import { DropdownFilterProps } from './Filters/Dropdown/interfaces';
import { AdminTableFilterType } from './constants';

export enum AdminTableVariants {
	DEFAULT = 'DEFAULT',
	DETAIL_STYLE = 'DETAIL_STYLE',
	DYNAMIC_COLUMNS = 'DYNAMIC_COLUMNS',
}

declare module '@tanstack/react-table' {
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	interface ColumnMeta<TData extends RowData, TValue> {
		className?: string;
		cellClassName?: string;
		filterType?: AdminTableFilterType;
		dropDownFilterOptions?: DropdownFilterProps['options'];
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

export type IAdminTableProps<T extends IPageListTableRow> = {
	pageCount?: number;
	columns: ColumnDef<T>[];
	data: T[];
	loading?: boolean;
	variant?: AdminTableVariants;
	defaultColumnsExcluded?: string[];
	columnOrder?: string[];
	onRowClick?: (entity: T, event: React.MouseEvent) => void; // ignored if data items contain `expandedContent` key
	onMouseEnter?: () => void;
	rowsHighlight?: Record<PropertyKey, unknown> | unknown[];
	className?: string;
	tableWrapRef?: React.RefObject<HTMLDivElement>;
	tableRef?: React.RefObject<HTMLTableElement>;
	onTableScroll?: (event: React.UIEvent<HTMLTableElement>) => void;
} & AllowsSorting &
	AllowsFiltering &
	AllowsSelecting;

export type ColumnFilters = {
	[k: string]: string;
};
