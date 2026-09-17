import { useContext, useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { OrderService } from 'vinisto_api_client';
import { AuthenticationContext } from 'Services/AuthenticationService/context';

import OrderError from './OrderError';
import OrderSuccess from './OrderSuccess';
import OrderLoadError from './OrderLoadError';
import OrderLoading from './OrderLoading';

import { VinistoHelperDllEnumsOrderOrderState } from '@/api-types/order-api';
import { VinistoHelperDllEnumsGoPayGoPaySessionState } from '@/api-types/services-api';

interface OrderInfoProps {
	orderId: string;
	goPayState?: VinistoHelperDllEnumsGoPayGoPaySessionState;
	refetchSubscriptions: () => void;
}

const OrderInfo = ({
	orderId,
	goPayState,
	refetchSubscriptions,
}: OrderInfoProps) => {
	const authenticationContext = useContext(AuthenticationContext);
	const { vinistoUser } = authenticationContext;
	const { loginHash: userLoginHash } = vinistoUser;

	const [startTime] = useState(Date.now());

	const getRefetchInterval = () => {
		const elapsed = (Date.now() - startTime) / 1000;
		if (elapsed < 20) {
			return 2000;
		} else if (elapsed < 120) {
			return 5000;
		} else {
			return false;
		}
	};

	const {
		data: order,
		isLoading,
		isFetched,
		isError,
	} = useQuery([orderId], {
		queryFn: async () => OrderService.getOrderById(orderId, userLoginHash),
		enabled: !!orderId,
		refetchInterval: getRefetchInterval(),
	});

	const isPaidOrder =
		order?.state === VinistoHelperDllEnumsOrderOrderState.PAID ||
		// Repeated payment for some reason gets DELIVERED state
		order?.state === VinistoHelperDllEnumsOrderOrderState.DELIVERED;
	const isPaidGoPay =
		goPayState === VinistoHelperDllEnumsGoPayGoPaySessionState.PAID;
	const isPaid = isPaidGoPay || isPaidOrder;

	// Unfortunately, this seemed to be the only sensible way to update subscription data
	useEffect(() => {
		return () => {
			refetchSubscriptions();
		};
	}, [refetchSubscriptions]);

	if (isLoading && !isFetched) {
		return <OrderLoading />;
	}

	if (isError || !order) {
		return <OrderLoadError />;
	}

	return isPaid ? <OrderSuccess order={order} /> : <OrderError order={order} />;
};

export default OrderInfo;
