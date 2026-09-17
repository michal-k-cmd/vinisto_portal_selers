import { VinistoHelperDllEnumsWarehouseChangeReasonType } from 'vinisto_api_client/src/api-types/warehouse-api/';
import { IPageListTableRow } from 'Hooks/useAdminTable/interfaces';

interface ChangelogListProps {
	itemState: ItemState;
}

interface ChangelogItem {
	id: string;
	changeDateTime: string;
	quantity: number;
	userId: string;
	orderId: string;
	changeReason: VinistoHelperDllEnumsWarehouseChangeReasonType;
}

interface ItemState {
	loading: boolean;
	loaded: boolean;
	warehouseItem: any;
	error: any;
}

interface ChangelogListTableRow extends IPageListTableRow, ChangelogItem {}

export type {
	ChangelogListProps,
	ChangelogItem,
	ChangelogListTableRow,
	ItemState,
};
