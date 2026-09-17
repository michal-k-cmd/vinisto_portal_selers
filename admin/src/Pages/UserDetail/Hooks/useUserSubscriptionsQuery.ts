import { useQuery } from '@tanstack/react-query';

import { subscriptionReadOnlyApi } from '@/subscription-service';

const useUserSubscriptionsQuery = (userId: string) => {
	const query = useQuery({
		queryKey: ['userSubscriptions', userId],
		queryFn: () =>
			subscriptionReadOnlyApi.subscriptionsList({ UserId: userId }),
	});

	return query;
};

export default useUserSubscriptionsQuery;
