import {
	Specification,
	SpecificationType,
} from '@/domain/specification/schema';

interface SpecificationValue {
	definitionId: string;
	selectedValueName: string;
	specificationType: SpecificationType;
}

interface BundleSpecificationDetails {
	definition: Specification;
	value: SpecificationValue;
}

export type { BundleSpecificationDetails };
