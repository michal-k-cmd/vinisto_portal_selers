import { useQuery } from '@tanstack/react-query';
import { SmartformListParams } from 'vinisto_api_client/src/api-types/services-api';

import { AddressSuggestionsApi } from '.';

export const AddressSuggestionsApiHooks = {
	useGet: (params: SmartformListParams) =>
		useQuery(
			['address-suggestions', { ...params }],
			() => AddressSuggestionsApi.get(params),
			{
				cacheTime: 600_000,
				staleTime: 600_000,
				enabled: params.SearchAddress.length > 2,
			}
		),
};
