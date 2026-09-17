import { useQuery } from '@tanstack/react-query';

import {
	VinistoHelperDllEnumsCurrency,
	VinistoProductDllModelsApiBundlePricesReturn,
} from '@/api-types/product-api';
import api from '@/api';

interface Params {
	bundleId?: string | null;
	userLoginHash?: string | null;
	currency: VinistoHelperDllEnumsCurrency;
}

const useGetBundlePrices = (params: Params) => {
	const { bundleId, userLoginHash, currency } = params;

	return useQuery({
		queryKey: ['getBundlePrices', { bundleId, userLoginHash, currency }],
		queryFn: () =>
			api.get<VinistoProductDllModelsApiBundlePricesReturn>(
				`product-api/bundles/${bundleId}/GetPrices`,
				{
					userLoginHash,
					currency,
				}
			),
		enabled: !!bundleId,
	});
};

export default useGetBundlePrices;
