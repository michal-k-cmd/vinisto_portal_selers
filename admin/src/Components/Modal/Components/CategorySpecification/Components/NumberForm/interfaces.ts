import { SpecificationDefinitionNumeric } from 'Services/Specification/interfaces';

import { SpecificationFormProps } from '../interfaces';

export interface NumberFormProps extends SpecificationFormProps {
	specification: SpecificationDefinitionNumeric;
	initialValue: number[];
}

export interface NumberSpecificationOption {
	value: string;
	label: string;
}
