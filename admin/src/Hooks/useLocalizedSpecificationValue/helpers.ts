import { SpecificationDetail } from './interfaces';

export const getSpecificationById = (
	specifications: SpecificationDetail[],
	id: string
) => specifications.find((spec) => spec.definition.id === id) ?? null;
