import { VinistoOrderDllModelsApiDeliveryDelivery } from 'vinisto_api_client/src/api-types/order-api';

export interface IOrderDeliveryData {
	isLoaded: boolean;
	data: VinistoOrderDllModelsApiDeliveryDelivery;
	deliveryPrice: any;
}
