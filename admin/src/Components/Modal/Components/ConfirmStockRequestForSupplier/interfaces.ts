import { VinistoHelperDllEnumsStockingRequestDeliveryTime } from 'vinisto_api_client/src/api-types/supplier-api/';

interface ConfirmStockRequestForSupplierFormValues {
	deliveryDate: Date;
	deliveryTime: VinistoHelperDllEnumsStockingRequestDeliveryTime;
}

interface ConfirmStockRequestForSupplierModalData {
	stockRequestId: string;
	setRefetchKey: React.Dispatch<React.SetStateAction<number>>;
}

export type {
	ConfirmStockRequestForSupplierFormValues,
	ConfirmStockRequestForSupplierModalData,
};
