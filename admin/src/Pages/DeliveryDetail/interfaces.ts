import { VinistoOrderDllModelsApiDeliveryDelivery } from 'vinisto_api_client/src/api-types/supplier-api/';

export interface ICategoryDetailProps {
	detailSchema: ICategoryDetailProps[];
}

export interface DeliveryDetailState {
	deliveryDetailData: VinistoOrderDllModelsApiDeliveryDelivery | null;
	error: Error | null;
	loaded: boolean;
	loading: boolean;
}
