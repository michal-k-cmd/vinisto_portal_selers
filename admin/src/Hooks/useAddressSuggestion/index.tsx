import { useQuery } from '@tanstack/react-query';
import { SmartformListParams } from 'vinisto_api_client/src/api-types/services-api/';
import { OmitConstrained } from 'types';
import SmartFormService from 'Services/SmartForm';

import { ADDRESS_MIN_LENGTH, CACHE_TIME, STALE_TIME } from './constants';

export const useAddressSuggestion =
	(
		params?: OmitConstrained<SmartformListParams, 'SearchAddress'>,
		minLength = ADDRESS_MIN_LENGTH
	) =>
	(address: string) =>
		useQuery(
			['address-suggestions', address],
			() =>
				SmartFormService.getAddress({
					...params,
					SearchAddress: address,
				}),
			{
				cacheTime: CACHE_TIME,
				staleTime: STALE_TIME,
				enabled: address.length > minLength,
			}
		);
