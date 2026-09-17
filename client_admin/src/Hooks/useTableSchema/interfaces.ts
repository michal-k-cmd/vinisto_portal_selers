import { ColumnDef } from '@tanstack/react-table';
import { PageListTableRow } from 'Hooks/useAdminTable/interfaces';
import { Device } from 'Services/DeviceService/constants';

export type TableSchema<T extends PageListTableRow = PageListTableRow> =
	(ColumnDef<T> & { devices: Device[] })[];
