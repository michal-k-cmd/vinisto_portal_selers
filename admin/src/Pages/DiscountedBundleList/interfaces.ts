import { VinistoProductDllModelsApiCategoryCategory } from '@/api-types/product-api';
import { VinistoSupplierDllModelsApiSupplierSupplier } from '@/api-types/supplier-api';

interface IBundleListRouteLoader {
	suppliers?: VinistoSupplierDllModelsApiSupplierSupplier[];
	categories?: VinistoProductDllModelsApiCategoryCategory[];
}

export type { IBundleListRouteLoader };
