'server only';

import { unescape } from 'lodash-es';

import { VinistoCommonDllModelsApiMultiLangValues } from '@/api-types/product-api';

// NOTE this is the same implementation as the one used in adapters
// But as it is a protected property on an abstract class, it cannot be used as a standalone function
export const convertMultiLangValues = (
	multiLangValues: VinistoCommonDllModelsApiMultiLangValues[] | null | undefined
) => {
	if (!Array.isArray(multiLangValues)) {
		return [];
	}

	return multiLangValues?.map((item) => ({
		language: item.language || '',
		values:
			item.values?.filter((e) => e !== '').map((e) => unescape(e || '')) ?? [],
	}));
};
