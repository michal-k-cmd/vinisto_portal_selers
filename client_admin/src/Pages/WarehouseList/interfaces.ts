import { PageListTableRow } from 'Hooks/useAdminTable/interfaces';

import { VinistoSupplierApiModelsWarehouseOverviewSupplierProductItem } from '@/api-types/supplier-api';

export interface BundleListTableRow
	extends PageListTableRow,
		VinistoSupplierApiModelsWarehouseOverviewSupplierProductItem {}
