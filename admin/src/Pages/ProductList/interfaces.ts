import { IPageListTableRow } from 'Hooks/useAdminTable/interfaces';
import { VinistoProductDllModelsApiProductProduct } from 'vinisto_api_client/src/api-types/product-api/';

interface ProductListTableRow
	extends IPageListTableRow,
		Omit<VinistoProductDllModelsApiProductProduct, 'id'> {}

export type { ProductListTableRow };
