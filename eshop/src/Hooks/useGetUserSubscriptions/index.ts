import { useQuery, UseQueryOptions } from '@tanstack/react-query';

import { subscriptionReadOnlyApi } from '@/subscription-service';
import {
	SubscriptionsListParams,
	SubscriptionsResponse,
} from '@/api-types/subscription-api';

const useGetUserSubscriptions = (
	{
		options = {},
		params,
	}: {
		options?: Omit<
			| UseQueryOptions<SubscriptionsResponse, Error, SubscriptionsResponse>
			| undefined,
			'queryKey' | 'queryFn'
		>;
		params: Omit<SubscriptionsListParams, 'UserId'> & { UserId: string };
	} = { params: { UserId: '' } }
) => {
	const { UserId, ...restParams } = params;

	return useQuery({
		...options,
		enabled: !!UserId,
		queryKey: ['userSubscriptionsQuery', { UserId, ...restParams }],
		queryFn: () =>
			subscriptionReadOnlyApi
				.subscriptionsList({ UserId, ...restParams })
				.then((res) => res.data),
	});
};

export default useGetUserSubscriptions;
