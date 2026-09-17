import { dayjsInstance as dayjs } from 'Services/Date';
import { useContext } from 'react';
import { NotificationsContext } from 'Services/NotificationService';
import { useEffect } from 'react';
import { OrderContext } from 'Services/OrderService/context';

import { BASKET_REFRESH_INTERVAL_IN_MINUTES } from './constants';

import { BasketResponse } from '@/api-types/basket-api';
import api from '@/api';

const useBasketRefresh = (params: {
	basketState: BasketResponse | null | undefined;
	websocketId: string | null;
	callback?: () => void;
}) => {
	const { handleShowErrorNotification } = useContext(NotificationsContext);
	const { orderId, getOrderRequestStatus } = useContext(OrderContext);
	const { basketState, websocketId, callback } = params;

	const orderRequestStatus = getOrderRequestStatus(orderId);

	useEffect(() => {
		let timeoutId: ReturnType<typeof setTimeout>;

		const checkAndRefresh = () => {
			if (
				basketState == null ||
				basketState.createdAt == null ||
				['sent', 'recieved'].includes(orderRequestStatus)
			)
				return;
			const createdAt = dayjs(basketState.createdAt);
			const now = dayjs();

			if (now.diff(createdAt, 'minute') > BASKET_REFRESH_INTERVAL_IN_MINUTES) {
				api
					.post(
						`basket-api/Basket/${basketState.id}/refresh`,
						undefined,
						{ websocketId },
						{ responseType: 'text' }
					)
					.then(() => {
						callback?.();
					})
					.catch((error) => {
						if (error.response?.status === 404) {
							// Basket not found, might be deleted because order has been already sent
							return;
						}
					});
			}

			timeoutId = setTimeout(checkAndRefresh, 30000);
		};

		timeoutId = setTimeout(checkAndRefresh, 30000);

		return () => {
			clearTimeout(timeoutId);
		};
	}, [basketState, websocketId, callback, handleShowErrorNotification]);
};

export default useBasketRefresh;
