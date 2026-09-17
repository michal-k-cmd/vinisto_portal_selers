import { ColumnDef } from '@tanstack/react-table';
import { IPageListTableRow } from 'Hooks/useAdminTable/interfaces';

export type TableSchema<T extends IPageListTableRow = IPageListTableRow> =
	ColumnDef<T>[];
