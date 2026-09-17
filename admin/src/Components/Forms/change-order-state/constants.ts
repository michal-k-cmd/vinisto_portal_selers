import { VinistoHelperDllEnumsOrderOrderState } from 'vinisto_api_client/src/api-types/order-api/';

export const orderStates = [
	{
		value: VinistoHelperDllEnumsOrderOrderState.CREATED,
		label: 'CREATED',
	},
	{
		value: VinistoHelperDllEnumsOrderOrderState.PAID,
		label: 'PAID',
	},
	{
		value: VinistoHelperDllEnumsOrderOrderState.IN_WMS,
		label: 'IN_WMS',
	},
	{
		value: VinistoHelperDllEnumsOrderOrderState.WMS_ACCEPTED,
		label: 'WMS_ACCEPTED',
	},
	{
		value: VinistoHelperDllEnumsOrderOrderState.WMS_INCOMPLETE,
		label: 'WMS_INCOMPLETE',
	},
	{
		value: VinistoHelperDllEnumsOrderOrderState.WMS_READY,
		label: 'WMS_READY',
	},
	{
		value: VinistoHelperDllEnumsOrderOrderState.SENT,
		label: 'SENT',
	},
	{
		value: VinistoHelperDllEnumsOrderOrderState.DELIVERED,
		label: 'DELIVERED',
	},
	{
		value: VinistoHelperDllEnumsOrderOrderState.CANCELLED,
		label: 'CANCELLED',
	},
	{
		value: VinistoHelperDllEnumsOrderOrderState.RETURNED,
		label: 'RETURNED',
	},
	{
		value: VinistoHelperDllEnumsOrderOrderState.REFUNDED,
		label: 'REFUNDED',
	},
	{
		value: VinistoHelperDllEnumsOrderOrderState.LOSS_EVENT,
		label: 'LOSS_EVENT',
	},
];
