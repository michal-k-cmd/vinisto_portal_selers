import getLocalizedValue from 'Helpers/getLocalizedValue';

import { PRODUCERS_SPECIFICATION_UNIVERSAL_ID } from './constants';

import { Bundle } from '@/domain/bundle';

export const getBundleProducerNames = (bundle: Bundle | null) => {
	if (!bundle || !bundle.specificationDetails) {
		return [];
	}
	const producers = bundle?.specificationDetails?.find(
		(specification) =>
			specification.definition.id === PRODUCERS_SPECIFICATION_UNIVERSAL_ID
	);
	const producerNames =
		/* prettier-ignore */
		// @ts-expect-error Wrong typing
		Object.values(producers?.definition.allowedValues ?? {})?.map((value) =>
					// @ts-expect-error Wrong typing
					getLocalizedValue(value.name)
				) ?? [];

	return producerNames;
};
