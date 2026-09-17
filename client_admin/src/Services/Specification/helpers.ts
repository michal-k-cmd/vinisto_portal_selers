import { SpecificationDetail } from './interfaces';

export const getSpecificationByName = (
	specifications: SpecificationDetail[],
	name: string
) =>
	specifications.reduce<SpecificationDetail | null>(
		(acc, spec) =>
			spec.definition.name.find((specName) => specName.value === name)
				? spec
				: acc,
		null
	);

export const getSpecificationById = (
	specifications: SpecificationDetail[],
	id: string
) => specifications.find((spec) => spec.definition.id === id) ?? null;
