import { ZodError } from 'zod';

import { AbstractAdapter } from '../abstract-adapter';

import { Specification, specificationSchema } from './schema';

class SpecificationAdapter extends AbstractAdapter<Specification, unknown> {
	fromApi(apiData: unknown): Specification {
		try {
			this.isValid(apiData);
			return apiData as Specification;
		} catch (error: unknown) {
			if (error instanceof ZodError) {
				throw new Error(
					`SpecificationAdapter.fromApi: Invalid input: ${error.errors}`
				);
			} else {
				throw error;
			}
		}
	}

	isValid(item: unknown): item is Specification {
		try {
			specificationSchema.parse(item);
			return true;
		} catch {
			return false;
		}
	}
}

export default SpecificationAdapter;
