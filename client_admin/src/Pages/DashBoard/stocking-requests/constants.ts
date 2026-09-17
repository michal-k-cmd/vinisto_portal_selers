import { VinistoHelperDllEnumsStockingRequestStockingState } from 'vinisto_api_client/src/api-types/supplier-api';

const stateTranslationKeys = {
	[VinistoHelperDllEnumsStockingRequestStockingState.CANCELLED]:
		'stockRequestList.state.cancelled',
	[VinistoHelperDllEnumsStockingRequestStockingState.CONFIRMED]:
		'stockRequestList.state.confirmed',
	[VinistoHelperDllEnumsStockingRequestStockingState.CREATED]:
		'stockRequestList.state.created',
	[VinistoHelperDllEnumsStockingRequestStockingState.DELIVERY_ORDERED]:
		'stockRequestList.state.deliveryOrdered',
	[VinistoHelperDllEnumsStockingRequestStockingState.SENT]:
		'stockRequestList.state.sent',
	[VinistoHelperDllEnumsStockingRequestStockingState.SENT_WMS]:
		'stockRequestList.state.sentWms',
	[VinistoHelperDllEnumsStockingRequestStockingState.WMS_DELIVERED]:
		'stockRequestList.state.wmsDelivered',
	[VinistoHelperDllEnumsStockingRequestStockingState.WMS_STOCKED]:
		'stockRequestList.state.wmsStocked',
};

export { stateTranslationKeys };
