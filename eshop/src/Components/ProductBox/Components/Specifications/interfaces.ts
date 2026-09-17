import { LangValuePair } from 'Hooks/useLocalizedValue/interfaces';

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
	specifications: ProductSpecification[];
	isLoading?: boolean;
}
