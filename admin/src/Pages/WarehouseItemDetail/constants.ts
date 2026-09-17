import { VinistoHelperDllEnumsWarehouseChangeReasonType } from 'vinisto_api_client/src/api-types/warehouse-api/';

export enum WAREHOUSE_ITEM_TYPE {
	PRODUCT = 'PRODUCT',
	BUNDLE = 'BUNDLE',
}

const WarehouseItemDetailTableKeys = {
	ID: 'id',
	CREATED_AT: 'createdAt',
	QUANTITY: 'quantity',
	USER_ID: 'userId',
	ORDER_NUMBER: 'documentNumber',
	CHANGE_REASON: 'changeReason',
};

const DEFAULT_SORT = [
	{
		id: WarehouseItemDetailTableKeys.CREATED_AT,
		desc: true,
	},
];

const WarehouseItemDetailTableColumnProperties = {
	[WarehouseItemDetailTableKeys.ID]: {
		filter: '',
		sorting: '',
	},
	[WarehouseItemDetailTableKeys.CREATED_AT]: {
		filter: '',
		sorting: 'CREATED_AT',
	},
	[WarehouseItemDetailTableKeys.QUANTITY]: {
		filter: '',
		sorting: '',
	},
	[WarehouseItemDetailTableKeys.USER_ID]: {
		filter: '',
		sorting: '',
	},
	[WarehouseItemDetailTableKeys.ORDER_NUMBER]: {
		filter: 'SearchDocumentNumber',
		sorting: '',
	},
	[WarehouseItemDetailTableKeys.CHANGE_REASON]: {
		filter: 'SearchChangeReason',
		sorting: 'CHANGE_REASON',
	},
};

const WarehouseItemDetailTableFilterColumnMap = Object.fromEntries(
	Object.entries(WarehouseItemDetailTableColumnProperties).map(
		([key, value]) => [key, value.filter]
	)
);

const WarehouseItemDetailTableSortingColumnMap = Object.fromEntries(
	Object.entries(WarehouseItemDetailTableColumnProperties).map(
		([key, value]) => [key, value.sorting]
	)
);

const AddQuantityReasons = [
	{
		value: VinistoHelperDllEnumsWarehouseChangeReasonType.R_STOCK_TAKING,
		label: 'admin.warehouseItemDetail.changeReason.R_STOCK_TAKING',
	},
	{
		value:
			VinistoHelperDllEnumsWarehouseChangeReasonType.R_STOCKING_FROM_SELLER,
		label: 'admin.warehouseItemDetail.changeReason.R_STOCKING_FROM_SELLER',
	},
	{
		value: VinistoHelperDllEnumsWarehouseChangeReasonType.R_ORDER_CANCELLATION,
		label: 'admin.warehouseItemDetail.changeReason.R_ORDER_CANCELLATION',
	},
	{
		value: VinistoHelperDllEnumsWarehouseChangeReasonType.R_RETURNING_GOODS,
		label: 'admin.warehouseItemDetail.changeReason.R_RETURNING_GOODS',
	},
	{
		value: VinistoHelperDllEnumsWarehouseChangeReasonType.R_IMPORT_CORRECTION,
		label: 'admin.warehouseItemDetail.changeReason.R_IMPORT_CORRECTION',
	},
	{
		value:
			VinistoHelperDllEnumsWarehouseChangeReasonType.FROM_CORRECTION_POSITION,
		label: 'admin.warehouseItemDetail.changeReason.FROM_CORRECTION_POSITION',
	},
];

const RemoveQuantityReasons = [
	{
		value: VinistoHelperDllEnumsWarehouseChangeReasonType.R_STOCK_TAKING,
		label: 'admin.warehouseItemDetail.changeReason.R_STOCK_TAKING',
	},
	{
		value: VinistoHelperDllEnumsWarehouseChangeReasonType.R_IMPORT_CORRECTION,
		label: 'admin.warehouseItemDetail.changeReason.R_IMPORT_CORRECTION',
	},
	{
		value: VinistoHelperDllEnumsWarehouseChangeReasonType.R_COMPLAINT,
		label: 'admin.warehouseItemDetail.changeReason.R_COMPLAINT',
	},
	{
		value: VinistoHelperDllEnumsWarehouseChangeReasonType.R_RETURNED_SELLER,
		label: 'admin.warehouseItemDetail.changeReason.R_RETURNED_SELLER',
	},
	{
		value:
			VinistoHelperDllEnumsWarehouseChangeReasonType.ON_CORRECTION_POSITION,
		label: 'admin.warehouseItemDetail.changeReason.ON_CORRECTION_POSITION',
	},
];

export {
	WarehouseItemDetailTableKeys,
	WarehouseItemDetailTableFilterColumnMap,
	WarehouseItemDetailTableSortingColumnMap,
	AddQuantityReasons,
	RemoveQuantityReasons,
	DEFAULT_SORT,
};
