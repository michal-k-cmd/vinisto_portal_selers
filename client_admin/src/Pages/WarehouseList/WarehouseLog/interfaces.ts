import { PageListTableRow } from 'Hooks/useAdminTable/interfaces';

import { VinistoWarehouseDllModelsApiWarehouseChangeLogWarehouseChangeLogReturn } from '@/api-types/warehouse-api';

export interface BundleListTableRow
	extends PageListTableRow,
		VinistoWarehouseDllModelsApiWarehouseChangeLogWarehouseChangeLogReturn {}
