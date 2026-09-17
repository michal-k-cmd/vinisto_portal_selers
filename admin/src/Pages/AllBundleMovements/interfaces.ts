import { IPageListTableRow } from 'Hooks/useAdminTable/interfaces';
import { VinistoApplicationLogDllModelsApiApplicationLogBundleApplicationLog } from 'vinisto_api_client/src/api-types/product-api/';

export interface LogTableRow
	extends IPageListTableRow,
		Omit<
			VinistoApplicationLogDllModelsApiApplicationLogBundleApplicationLog,
			'itemId'
		> {
	bundleName?: string;
	itemId?: string;
}
