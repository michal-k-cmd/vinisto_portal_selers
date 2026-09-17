import { FormApi } from 'final-form';
import { Mutators } from 'final-form-arrays';

import { Bundle } from '@/domain/bundle';
import { VinistoHelperDllEnumsBundleSetType } from '@/api-types/product-api';

export interface CreateOrUpdateSetFormValues {
	name: string;
	shortDescription: string;
	description: string;
	setType: VinistoHelperDllEnumsBundleSetType;
	paidBundles: Array<Bundle | null>;
	freeBundles: Array<Bundle | null>;
	action: 'saveAsConcept' | 'saveAsPublished';
}

// Define the shape of the mutators
type FormArrayMutators = {
	[K in keyof Mutators]: Mutators[K];
};

// Extend the FormApi type to include the array mutators
export interface FormApiWithArrayMutators<FormValues = Record<string, any>>
	extends FormApi<FormValues> {
	mutators: FormArrayMutators;
}
