import { BatchAction } from 'Components/AdminListPage/Components/BatchActions/interfaces';
import {
	AdminTableVars,
	PageListTableRow,
} from 'Hooks/useAdminTable/interfaces';
import { TableSchema } from 'Hooks/useTableSchema/interfaces';
import { NotPresent, OmitConstrained } from 'types';

type AllowsCreateModal =
	| {
			handleOpenCreateModal: () => void;
			btnCreateLabel: string;
	  }
	| {
			handleOpenCreateModal?: never;
			btnCreateLabel?: never;
	  };

type AllowsPagination<T extends PageListTableRow> =
	| Pick<AdminTableVars<T>, 'pageCount' | 'pageNumber'>
	| NotPresent<Pick<AdminTableVars<T>, 'pageCount' | 'pageNumber'>>;

export type AdminListPageProps<T extends PageListTableRow> = OmitConstrained<
	AdminTableVars<T>,
	'fetchData' | 'dispatch' | 'pageCount' | 'pageNumber' | 'setPageNumber'
> &
	AllowsPagination<T> &
	AllowsCreateModal & {
		tableClassName?: string;
		adminTableSchema: TableSchema<T>;
		handleOnTableRowClick?: (entity: T) => void;
		batchActions?: BatchAction[];
		headerContent?: JSX.Element;
	};
