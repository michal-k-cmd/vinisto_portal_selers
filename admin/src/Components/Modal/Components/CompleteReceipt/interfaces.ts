import {
	VinistoProductDllModelsApiBundleBundle,
	VinistoStockingRequestDllModelsApiStockingRequestBundleStockingRequest,
} from 'vinisto_api_client/src/api-types/supplier-api/';

interface CompleteReceiptModalData {
	stockRequestId: string;
	setRefetchKey: React.Dispatch<React.SetStateAction<number>>;
	assignedBundles:
		| VinistoStockingRequestDllModelsApiStockingRequestBundleStockingRequest[]
		| null
		| undefined;
	bundleDetails: VinistoProductDllModelsApiBundleBundle[] | null | undefined;
}

export type { CompleteReceiptModalData };
