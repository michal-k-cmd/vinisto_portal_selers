import {
	VinistoOrderDllModelsApiOrderBundle,
	VinistoOrderDllModelsApiOrderOrderItem,
} from 'vinisto_api_client/src/api-types/order-api';

type AssignedGift = {
	bundle: VinistoOrderDllModelsApiOrderBundle | null | undefined;
	quantity: number | undefined;
};

export interface IOrderItemDataProps {
	orderItemData: VinistoOrderDllModelsApiOrderOrderItem | AssignedGift;

	isGift?: boolean;
}
