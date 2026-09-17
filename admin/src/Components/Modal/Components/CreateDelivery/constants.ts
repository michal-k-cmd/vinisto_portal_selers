import { VinistoHelperDllEnumsOrderDeliveryBaseType } from 'vinisto_api_client/src/api-types/supplier-api/';

export enum DELIVERY_TYPES {
	PICKUP = 'PICKUP',
	PICKUP_POINT = 'PICKUP_POINT',
	ADDRESS_SHIPPING = 'ADDRESS_SHIPPING',
}

export enum PICKUP_POINT_TYPES {
	ZASILKOVNA = 'ZASILKOVNA',
	PPL = 'PPL',
	DPD = 'DPD',
}

export const deliveryTypes = [
	{
		value: DELIVERY_TYPES.PICKUP,
		label: DELIVERY_TYPES.PICKUP,
	},
	{
		value: DELIVERY_TYPES.PICKUP_POINT,
		label: DELIVERY_TYPES.PICKUP_POINT,
	},
	{
		value: DELIVERY_TYPES.ADDRESS_SHIPPING,
		label: DELIVERY_TYPES.ADDRESS_SHIPPING,
	},
];

export const deliveryBaseTypes = [
	{
		value: VinistoHelperDllEnumsOrderDeliveryBaseType.OWN_DELIVERY,
		label: VinistoHelperDllEnumsOrderDeliveryBaseType.OWN_DELIVERY,
	},
	{
		value: VinistoHelperDllEnumsOrderDeliveryBaseType.TRANSPORT_COMPANY,
		label: VinistoHelperDllEnumsOrderDeliveryBaseType.TRANSPORT_COMPANY,
	},
];

export const pickupPointTypes = [
	{
		value: PICKUP_POINT_TYPES.ZASILKOVNA,
		label: PICKUP_POINT_TYPES.ZASILKOVNA,
	},
	{
		value: PICKUP_POINT_TYPES.PPL,
		label: PICKUP_POINT_TYPES.PPL,
	},
	{
		value: PICKUP_POINT_TYPES.DPD,
		label: PICKUP_POINT_TYPES.DPD,
	},
];
