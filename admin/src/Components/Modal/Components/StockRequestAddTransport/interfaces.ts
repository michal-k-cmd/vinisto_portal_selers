import {
	VinistoHelperDllEnumsOrderDeliveryBaseType,
	VinistoOrderDllModelsApiDeliveryDelivery,
} from 'vinisto_api_client/src/api-types/supplier-api/';

interface StockRequestAddTransportFormValues {
	transportType?: {
		label: string;
		value: string;
		deliveryBaseType: VinistoHelperDllEnumsOrderDeliveryBaseType;
	}[];
	deliveryId: string;
	trackingNumber: string;
}

interface StockRequestAddTransportModalData {
	stockRequestId: string;
	setRefetchKey: React.Dispatch<React.SetStateAction<number>>;
	trackingNumber?: string;
	delivery?: VinistoOrderDllModelsApiDeliveryDelivery;
}

export type {
	StockRequestAddTransportFormValues,
	StockRequestAddTransportModalData,
};
