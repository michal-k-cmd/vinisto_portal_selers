import { VinistoProductDllModelsApiCategoryCategory } from '@/api-types/product-api';

export interface IBundleBreadcrumbProps {
	categories: VinistoProductDllModelsApiCategoryCategory[] | undefined;
	bundleName: string;
	className?: string;
}
