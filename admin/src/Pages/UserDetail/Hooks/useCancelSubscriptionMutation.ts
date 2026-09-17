import { useMutation, useQueryClient } from '@tanstack/react-query';

import { subscriptionWriteApi } from '@/subscription-service';

const useCancelSubscriptionMutation = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (params: { subscriptionId: string; userLoginHash: string }) =>
			subscriptionWriteApi.subscriptionsDeactivatePartialUpdate(
				params.subscriptionId,
				params.userLoginHash
			),
		onSuccess: () => {
			queryClient.invalidateQueries(['userSubscriptions']);
		},
	});
};

export default useCancelSubscriptionMutation;
