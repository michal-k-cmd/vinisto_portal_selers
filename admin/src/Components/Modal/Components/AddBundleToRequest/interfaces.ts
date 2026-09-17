import { IPageListTableRow } from 'Hooks/useAdminTable/interfaces';
import { VinistoProductDllModelsApiBundleBundle } from 'vinisto_api_client/src/api-types/product-api';

interface AddBundleToRequestTableRows
	extends IPageListTableRow,
		VinistoProductDllModelsApiBundleBundle {
	stockUp: string | number;
}

interface AddBundleToRequestModalData {
	stockRequestId: string;
	supplierId: string;
	setRefetchKey: React.Dispatch<React.SetStateAction<number>>;
}

export type { AddBundleToRequestTableRows, AddBundleToRequestModalData };
