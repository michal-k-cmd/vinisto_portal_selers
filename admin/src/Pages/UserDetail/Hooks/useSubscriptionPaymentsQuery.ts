import { useQuery } from '@tanstack/react-query';

import { subscriptionReadOnlyApi } from '@/subscription-service';

const REQUEST_LIMIT = 100;

const useSubscriptionPaymentsQuery = (subscriptionId?: string) => {
	const query = useQuery({
		queryKey: ['subscriptionPayments', subscriptionId],
		queryFn: async () =>
			await subscriptionReadOnlyApi.subscriptionPaymentsInvoicesList({
				SubscriptionId: subscriptionId ?? '',
				Limit: REQUEST_LIMIT,
			}),
		enabled: Boolean(subscriptionId),
	});

	return query;
};

export default useSubscriptionPaymentsQuery;
