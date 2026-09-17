import { IPageListTableRow } from 'Hooks/useAdminTable/interfaces';
import { VinistoSupplierDllModelsApiSupplierSupplier } from 'vinisto_api_client/src/api-types/supplier-api/';
import { VinistoProductDllModelsApiCategoryCategory } from 'vinisto_api_client/src/api-types/product-api/';

import { VinistoProductDllModelsApiBundleBundle } from '@/api-types/cms-api';

interface IBundleListRouteLoader {
	suppliers?: VinistoSupplierDllModelsApiSupplierSupplier[];
	categories?: VinistoProductDllModelsApiCategoryCategory[];
}

export type { IBundleListRouteLoader };

export interface BundleWithCategories
	extends Omit<VinistoProductDllModelsApiBundleBundle, 'categories'> {
	categories: (VinistoProductDllModelsApiCategoryCategory | undefined)[];
	id: string;
}

export interface BundleListTableRow
	extends IPageListTableRow,
		VinistoProductDllModelsApiBundleBundle {}

export interface BundleListTableRowWithCategories
	extends IPageListTableRow,
		BundleWithCategories {}
