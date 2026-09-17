import { SpecificationDefinitionString } from 'Services/Specification/interfaces';

import { SpecificationFormProps } from '../interfaces';

export interface TextFormProps extends SpecificationFormProps {
	specification: SpecificationDefinitionString;
	initialValue: string[];
}

export interface TextSpecificationOption {
	value: string;
	label: string;
}
