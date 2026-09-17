import { VinistoHelperDllEnumsWarehouseChangeReasonType } from '@/api-types/warehouse-api';

const ChangeReasonLocaleMap: {
	value: VinistoHelperDllEnumsWarehouseChangeReasonType;
	label: string;
}[] = [
	{
		value: VinistoHelperDllEnumsWarehouseChangeReasonType.NONE,
		label: 'admin.warehouseItemDetail.changeReason.NONE',
	},
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
	{
		value:
			VinistoHelperDllEnumsWarehouseChangeReasonType.FROM_CORRECTION_POSITION,
		label: 'admin.warehouseItemDetail.changeReason.FROM_CORRECTION_POSITION',
	},
	{
		value: VinistoHelperDllEnumsWarehouseChangeReasonType.A_WAREHOUSE_IMPORT,
		label: 'admin.warehouseItemDetail.changeReason.A_WAREHOUSE_IMPORT',
	},
	{
		value: VinistoHelperDllEnumsWarehouseChangeReasonType.A_PRODUCT_IMPORT,
		label: 'admin.warehouseItemDetail.changeReason.A_PRODUCT_IMPORT',
	},
	{
		value: VinistoHelperDllEnumsWarehouseChangeReasonType.A_ORDER_CREATION,
		label: 'admin.warehouseItemDetail.changeReason.A_ORDER_CREATION',
	},
	{
		value:
			VinistoHelperDllEnumsWarehouseChangeReasonType.A_ORDER_CANCELLATION_CUSTOMER,
		label:
			'admin.warehouseItemDetail.changeReason.A_ORDER_CANCELLATION_CUSTOMER',
	},
	{
		value:
			VinistoHelperDllEnumsWarehouseChangeReasonType.A_ORDER_CANCELLATION_VINISTO,
		label:
			'admin.warehouseItemDetail.changeReason.A_ORDER_CANCELLATION_VINISTO',
	},
	{
		value: VinistoHelperDllEnumsWarehouseChangeReasonType.A_ADD_TO_STOCK_SELLER,
		label: 'admin.warehouseItemDetail.changeReason.A_ADD_TO_STOCK_SELLER',
	},
	{
		value: VinistoHelperDllEnumsWarehouseChangeReasonType.B2B_STORNO_PARTNER,
		label: 'admin.warehouseItemDetail.changeReason.B2B_STORNO_PARTNER',
	},
	{
		value: VinistoHelperDllEnumsWarehouseChangeReasonType.B2B_PRODEJ_PARTNER,
		label: 'admin.warehouseItemDetail.changeReason.B2B_PRODEJ_PARTNER',
	},
	{
		value: VinistoHelperDllEnumsWarehouseChangeReasonType.B2C_PRODEJ_PARTNER,
		label: 'admin.warehouseItemDetail.changeReason.B2C_PRODEJ_PARTNER',
	},
	{
		value: VinistoHelperDllEnumsWarehouseChangeReasonType.B2C_STORNO_PARTNER,
		label: 'admin.warehouseItemDetail.changeReason.B2C_STORNO_PARTNER',
	},
];

export { ChangeReasonLocaleMap };
