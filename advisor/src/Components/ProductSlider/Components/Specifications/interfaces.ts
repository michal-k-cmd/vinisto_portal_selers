import { VinistoProductDllModelsApiSpecificationSpecificationDetail } from 'vinisto_api_client/src/api-types/product-api';

export type LangValuePair = {
	language?: string | null;
	value?: string | null;
};

export interface ProductSpecificationDefinition {
	id: string;
	isDetail: boolean;
	name: LangValuePair[];
	order: number;
}

export interface ProductSpecificationValue {
	selectedValueName?: string;
	selectedValuesName?: string[];
	value?: number;
}

export interface ProductSpecification {
	definition: ProductSpecificationDefinition;
	value: ProductSpecificationValue;
}

export interface ProductSpecificationsProps {
	specifications: VinistoProductDllModelsApiSpecificationSpecificationDetail[];
	isLoading?: boolean;
}
