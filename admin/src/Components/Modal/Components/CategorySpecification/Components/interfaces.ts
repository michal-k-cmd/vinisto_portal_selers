import { SpecificationValue } from 'Services/Specification/interfaces';

export interface SpecificationFormProps {
	setSelectedValues: (value: string[] | number[] | boolean[]) => void;
	initialValue?: SpecificationValue['allowedValues'];
}
