import { NotPresent, OmitConstrained } from 'types';
import {
	AdminTableVars,
	IPageListTableRow,
} from 'Hooks/useAdminTable/interfaces';
import { TableSchema } from 'Hooks/useTableSchema/interfaces';
import { IBatchAction } from 'Components/AdminListPage/Components/BatchActions/interfaces';
import { AdminTableVariants } from 'Components/AdminTable/interfaces';

type AllowsCreateModal =
	| {
			handleOpenCreateModal: () => void;
			btnCreateLabel: string;
	  }
	| {
			handleOpenCreateModal?: never;
			btnCreateLabel?: never;
	  };

type AllowsPagination<T extends IPageListTableRow> =
	| Pick<AdminTableVars<T>, 'pageCount' | 'pageNumber'>
	| NotPresent<Pick<AdminTableVars<T>, 'pageCount' | 'pageNumber'>>;

export type IAdminListPageProps<T extends IPageListTableRow> = OmitConstrained<
	AdminTableVars<T>,
	'fetchData' | 'dispatch' | 'pageCount' | 'pageNumber'
> &
	AllowsPagination<T> &
	AllowsCreateModal & {
		adminTableSchema: TableSchema<T>;
		handleOnTableRowClick: (entity: T, event: React.MouseEvent) => void;
		batchActions?: IBatchAction[];
		headerContent?: JSX.Element;
		className?: string;
		rowsHighlight?: any | string[];
		onMouseEnter?: () => void;
		adminTableVariant?: AdminTableVariants;
		defaultColumnsExcluded?: string[];
		columnOrder?: string[];
	};
