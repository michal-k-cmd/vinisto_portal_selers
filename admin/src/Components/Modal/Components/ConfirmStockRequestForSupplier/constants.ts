import { VinistoHelperDllEnumsStockingRequestDeliveryTime } from 'vinisto_api_client/src/api-types/supplier-api/';

const TIME_SLOT_OPTIONS = [
	{
		label: '8:00 - 10:00',
		value: String(VinistoHelperDllEnumsStockingRequestDeliveryTime.D_8_10),
	},
	{
		label: '10:00 - 12:00',
		value: String(VinistoHelperDllEnumsStockingRequestDeliveryTime.D_10_12),
	},
	{
		label: '12:00 - 14:00',
		value: String(VinistoHelperDllEnumsStockingRequestDeliveryTime.D_12_14),
	},
	{
		label: '14:00 - 16:00',
		value: String(VinistoHelperDllEnumsStockingRequestDeliveryTime.D_14_16),
	},
];

export { TIME_SLOT_OPTIONS };
