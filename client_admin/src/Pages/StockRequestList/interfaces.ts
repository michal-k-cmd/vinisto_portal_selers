import { PageListTableRow } from 'Hooks/useAdminTable/interfaces';
import { StockRequestType } from 'Services/StockRequest/interfaces';

export interface StockRequestListTableRow
	extends PageListTableRow,
		StockRequestType {}
