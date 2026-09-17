import { DeliveryDetailState } from 'Pages/DeliveryDetail/interfaces';

export interface DeliveryState {
	deliveryDetailState: DeliveryDetailState;
	setDeliveryDetailState: () => void;
}
