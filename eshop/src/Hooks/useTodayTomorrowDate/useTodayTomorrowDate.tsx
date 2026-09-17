import { useContext } from 'react';
import { upperFirst } from 'lodash-es';
import { dayjsInstance as dayjs } from 'Services/Date';
import { LocalizationContext } from 'Services/LocalizationService';
import { VinistoOrderDllModelsApiDeliveryDelivery } from 'vinisto_api_client/src/api-types/order-api';
import { getDateLabelKey } from 'vinisto_shared';

const useTodayTomorrowDate = (
	delivery: Partial<VinistoOrderDllModelsApiDeliveryDelivery> = {}
) => {
	const { useFormatMessage } = useContext(LocalizationContext);
	const t = useFormatMessage();
	const { orderTresholdTime } = delivery;
	const orderTresholdHours = orderTresholdTime?.split(':')[0]
		? Number(orderTresholdTime?.split(':')[0])
		: undefined;

	return (deliveryDateStr: string | Date, monthName?: boolean) => {
		const key = getDateLabelKey(
			deliveryDateStr,
			monthName,
			undefined,
			orderTresholdHours
		);
		if (!key) return null;

		// If the key is one of the format strings, format the date with it
		if (key.startsWith('calendar.format.')) {
			return upperFirst(
				dayjs(deliveryDateStr).format(t({ id: key })?.toString())
			);
		}

		// Otherwise, just translate the key directly
		return t({ id: key });
	};
};

export default useTodayTomorrowDate;
