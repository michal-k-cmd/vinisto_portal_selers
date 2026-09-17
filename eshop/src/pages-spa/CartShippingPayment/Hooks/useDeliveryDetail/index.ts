import { useContext, useEffect, useState } from 'react';
import { NotificationsContext } from 'Services/NotificationService';
import { LocalizationContext } from 'Services/LocalizationService';
import { OrderContext } from 'Services/OrderService/context';
import {
	VinistoOrderDllModelsApiDeliveryDeliveryGetByConditionsParameters,
	VinistoOrderDllModelsApiReturnDataDeliveriesReturn,
} from 'vinisto_api_client/src/api-types/order-api';
import api from 'vinisto_api_client/src/api';
import { useRouter } from 'next/navigation';
import { BasketContext } from 'Services/BasketService';

import { ERRORS } from './constants';
import { IOrderDeliveryData } from './interfaces';

const useDeliveryDetail = (deliveryId: string) => {
	const router = useRouter();
	const t = useContext(LocalizationContext).useFormatMessage();
	const [deliveryDetail, setDeliveryDetail] = useState<IOrderDeliveryData>({
		isLoaded: false,
		// @ts-expect-error refactor to react-query
		data: {},
		deliveryPrice: null,
	});

	const { basketState } = useContext(BasketContext);
	const { activeCurrency, countryOfSale, activeLanguageKey } =
		useContext(LocalizationContext);
	const { handleShowErrorNotification } = useContext(NotificationsContext);
	const { clearDeliveryPayment } = useContext(OrderContext);

	useEffect(() => {
		if (!deliveryId) {
			setDeliveryDetail({
				isLoaded: true,
				// @ts-expect-error refactor to react-query
				data: {},
				deliveryPrice: null,
			});
			return;
		}
		setDeliveryDetail({
			isLoaded: false,
			// @ts-expect-error refactor to react-query
			data: {},
			deliveryPrice: null,
		});
		if (!deliveryId) return;

		api
			.post<VinistoOrderDllModelsApiReturnDataDeliveriesReturn>(
				`order-api/deliveries/GetDeliveriesByBasket`,
				undefined,
				{
					language: activeLanguageKey,
					currency: activeCurrency?.currency,
					allowedCountry: countryOfSale,
					// NOTE: It is important to pass BE-synchronized basketState.id here instead of basketId from client state
					// to avoid issues with delivery selection when basket is not yet fully loaded.
					basketId: basketState?.id,
				} satisfies VinistoOrderDllModelsApiDeliveryDeliveryGetByConditionsParameters
			)
			.then((response) => {
				const ActivateDeliveries = response?.deliveries?.filter(
					({ isActive }) => isActive
				);
				const selectedDelivery = ActivateDeliveries?.find(
					(delivery) => delivery.id === deliveryId
				);

				const deliveryPrice = selectedDelivery?.prices?.[0] ?? null;

				if (!selectedDelivery || !deliveryPrice) {
					throw new Error(ERRORS.DELIVERY_NO_LONGER_AVAILABLE);
				}

				setDeliveryDetail({
					isLoaded: true,
					data: selectedDelivery,
					deliveryPrice,
				});
			})
			.catch((err) => {
				clearDeliveryPayment();
				if (err?.message === ERRORS.DELIVERY_NO_LONGER_AVAILABLE) {
					//handleShowErrorNotification(
					//	'notification.message.orderOverview.deliveryNoLongerAvailable'
					//);
				} else {
					handleShowErrorNotification(
						'notification.message.orderOverview.deliveryLoadError'
					);
				}
				setDeliveryDetail({
					isLoaded: true,
					// @ts-expect-error refactor to react-query
					data: {},
					deliveryPrice: null,
				});
			});
	}, [
		activeCurrency?.currency,
		basketState?.id,
		countryOfSale,
		deliveryId,
		clearDeliveryPayment,
		handleShowErrorNotification,
		activeLanguageKey,
		router,
		t,
	]);

	return deliveryDetail;
};

export default useDeliveryDetail;
