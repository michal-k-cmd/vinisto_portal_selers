import { useContext, useEffect, useState } from 'react';
import { get } from 'lodash-es';
import { NotificationsContext } from 'Services/NotificationService';
import { LocalizationContext } from 'Services/LocalizationService';
import api from 'vinisto_api_client/src/api';

import { IOrderPaymentData } from './interfaces';

const usePaymentDetail = (paymentId: string) => {
	const [paymentDetail, setPaymentDetail] = useState<IOrderPaymentData>({
		isLoaded: false,
		data: {},
	});

	const notificationsContext = useContext(NotificationsContext);
	const localizationContext = useContext(LocalizationContext);
	const { currency } = localizationContext.activeCurrency;

	useEffect(() => {
		if (!paymentId) {
			setPaymentDetail({
				isLoaded: true,
				data: {},
			});
			return;
		}
		setPaymentDetail({
			isLoaded: false,
			data: {},
		});
		if (!paymentId) return;
		api
			.get(`order-api/payments/${paymentId}/GetPayment`, { currency })
			.then((response: Record<any, any>) => {
				setPaymentDetail({
					isLoaded: true,
					data: get(response, 'payment', {}),
				});
			})
			.catch(() => {
				notificationsContext.handleShowErrorNotification(
					'notification.message.orderOverview.paymentLoadError'
				);
				setPaymentDetail({
					isLoaded: true,
					data: {},
				});
			});
	}, [paymentId, notificationsContext, currency]);

	return paymentDetail;
};

export default usePaymentDetail;
