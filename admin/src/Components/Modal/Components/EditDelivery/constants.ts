import { VinistoHelperDllEnumsOrderDeliveryType } from 'vinisto_api_client/src/api-types/order-api/';

export const deliveryTypes = [
	{
		value: VinistoHelperDllEnumsOrderDeliveryType.PICKUP,
		label: 'PICKUP',
	},
	{
		value: VinistoHelperDllEnumsOrderDeliveryType.PICKUP_POINT,
		label: 'PICKUP_POINT',
	},
	{
		value: VinistoHelperDllEnumsOrderDeliveryType.ADDRESS_SHIPPING,
		label: 'ADDRESS_SHIPPING',
	},
];
