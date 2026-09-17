import { DeliveryListType } from 'Pages/DeliveryList/interfaces';
import { VinistoHelperDllEnumsLanguage } from 'vinisto_api_client/src/api-types/product-api/';
import {
	VinistoHelperDllEnumsOrderDeliveryBaseType,
	VinistoHelperDllEnumsOrderDeliveryType,
	VinistoHelperDllEnumsOrderPickupPointType,
} from 'vinisto_api_client/src/api-types/supplier-api/';

interface CreateDeliveryModalData {
	resetDeliveryList: () => void;
	transportBaseType: DeliveryListType;
}

interface CreateDeliveryFormValues {
	language: VinistoHelperDllEnumsLanguage;
	name: string;
	description: string;
	deliveryTime: number;
	minAllowedWeight: number;
	maxAllowedWeight: number;
	costs?: number | null;
	isForStocking?: boolean | null;
	isForCustomerDelivery?: boolean | null;
	deliveryBaseType: VinistoHelperDllEnumsOrderDeliveryBaseType;
	deliveryType: VinistoHelperDllEnumsOrderDeliveryType;
	pickupPointType?: VinistoHelperDllEnumsOrderPickupPointType;
	deliveryCode: string;
	order: number;
	orderTresholdTime: string;
}

export type { CreateDeliveryModalData, CreateDeliveryFormValues };
