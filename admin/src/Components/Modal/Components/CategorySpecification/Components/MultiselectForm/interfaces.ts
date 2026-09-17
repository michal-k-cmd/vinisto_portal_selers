import { SpecificationDefinition } from 'Services/Specification/interfaces';

import { SpecificationFormProps } from '../interfaces';

export interface MultiselectFormProps extends SpecificationFormProps {
	specification: SpecificationDefinition;
	initialValue: string[];
}
