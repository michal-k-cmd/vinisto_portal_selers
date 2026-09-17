import { z } from 'zod';

import { BundleSpecificationDetails } from '.';

import { AbstractAdapter } from '../../../domain/abstract-adapter';
import {
	specificationTypeAllowedValuesSchema,
	specificationTypeSchema,
} from '@/domain/specification/schema';
import { VinistoProductDllModelsApiSpecificationSpecificationDetail } from '../../../api-types/product-api';
import { specificationAdapter } from '../../../index';

// TODO
// it turns out "value" has different schemas based on the "specificationType" value like Specification itself.
const valueSchemaAvailableValue = z.object({
	definitionId: z.string(),
	value: z.string() || z.number(),
	specificationType: specificationTypeSchema,
});

const valueSchemaAllowedValue = z.object({
	definitionId: z.string(),
	selectedValueName: z.string(),
	specificationType: specificationTypeAllowedValuesSchema,
});

const valueSchemaPrice = z.object({
	definitionId: z.string(),
	selectedValueName: z.string(),
	specificationType: z.number(),
});

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const valueSchema = z.union([
	valueSchemaAvailableValue,
	valueSchemaAllowedValue,
	valueSchemaPrice,
]);

class BundleSpecificationDetailsAdapter extends AbstractAdapter<
	BundleSpecificationDetails,
	VinistoProductDllModelsApiSpecificationSpecificationDetail
> {
	fromApi(
		apiData: VinistoProductDllModelsApiSpecificationSpecificationDetail
	): BundleSpecificationDetails {
		// const validate = valueSchema.safeParse(apiData.value);
		// if (!validate.success) {
		// 	throw new Error(
		// 		`BundleSpecificationDetailsAdapter.fromApi: Invalid input: ${validate.error}`
		// 	);
		// }

		return {
			definition: specificationAdapter.fromApi(apiData.definition),
			value: apiData.value,
		};
	}
}

export default BundleSpecificationDetailsAdapter;
