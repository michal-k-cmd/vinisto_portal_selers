import { dayjsInstance as dayjs } from 'vinisto_shared';
import { LocalizationContext } from 'Services/LocalizationService';
import { useContext } from 'react';
import { getLocalizedPrice } from 'vinisto_shared/src/price/get-localized-price';
import { VinistoOrderDllModelsApiDeliveryDelivery } from 'vinisto_api_client/src/api-types/order-api';

import useTodayTomorrowDate from './useTodayTomorrowDate/useTodayTomorrowDate';

const useGetFastestAndCheapestDelivery = ({
	deliveries,
	monthName = true,
}: {
	deliveries: VinistoOrderDllModelsApiDeliveryDelivery[];
	monthName?: boolean;
}) => {
	const localizationContext = useContext(LocalizationContext);
	const t = localizationContext.useFormatMessage();

	const pickupsSortedByPickupTime = deliveries.slice().sort((a, b) => {
		const aPickupDate = +dayjs(
			`${a.deliveryTimeRange?.deliveryDate} ${a.deliveryTimeRange?.timeFrom}`,
			'YYYY-MM-DD HH:mm:ss'
		);
		const bPickupDate = +dayjs(
			`${b.deliveryTimeRange?.deliveryDate} ${b.deliveryTimeRange?.timeFrom}`,
			'YYYY-MM-DD HH:mm:ss'
		);

		return aPickupDate - bPickupDate;
	});

	const pickupsSortedByPickupPrice = deliveries.sort((a, b) => {
		const aPickupPrice = a.prices[0].valueWithVat ?? 0;
		const bPickupPrice = b.prices[0].valueWithVat ?? 0;

		return aPickupPrice - bPickupPrice;
	});

	const soonestAvailablePickup = pickupsSortedByPickupTime[0];

	const cheapestPickupPrice = pickupsSortedByPickupPrice[0]?.prices[0];

	const cheapestPickupPriceAsString =
		Math.round(cheapestPickupPrice?.valueWithVat ?? 0) === 0
			? t({ id: 'basket.price.free' })
			: !cheapestPickupPrice?.valueWithVat
			? ''
			: getLocalizedPrice({
					price: cheapestPickupPrice.valueWithVat,
					currency: cheapestPickupPrice.currency,
			  });

	const getDateLabel = useTodayTomorrowDate(soonestAvailablePickup);

	const soonestPickupDateAsString = getDateLabel(
		soonestAvailablePickup?.deliveryTimeRange?.deliveryDate ?? '',
		monthName
	);

	return {
		soonestAvailablePickup,
		cheapestPickupPrice,
		soonestPickupDateAsString,
		cheapestPickupPriceAsString,
	};
};

export default useGetFastestAndCheapestDelivery;
