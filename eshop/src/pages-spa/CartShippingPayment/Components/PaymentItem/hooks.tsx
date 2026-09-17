import { useContext } from 'react';
import useFormatMessage from 'Hooks/useFormatMessage';
import { LangValuePair } from 'Hooks/useLocalizedValue/interfaces';
import { VinistoOrderDllModelsApiPaymentPayment } from 'vinisto_api_client/src/api-types/order-api';
import { OrderContext } from 'Services/OrderService/context';
import useLocalizedValue from 'Hooks/useLocalizedValue';
import { getLocalizedPrice } from 'vinisto_shared/src/price/get-localized-price';

import { ShippingItemProps } from '../ShippingItem/interfaces';

export const usePaymentItem = (
	payment: VinistoOrderDllModelsApiPaymentPayment
) => {
	const { paymentMethod, setPaymentMethod } = useContext(OrderContext);
	const t = useFormatMessage();
	const getLocalizedValue = useLocalizedValue();
	const price = payment?.prices?.[0];

	if (!price || !price.currency) return null;

	const handleOnClick = () => {
		if (!payment?.id) return;
		setPaymentMethod({ id: payment?.id, paymentType: payment?.paymentType });
	};

	const titleContent = getLocalizedValue(
		(payment?.name as LangValuePair[]) ?? []
	);

	const deliveryNote = getLocalizedValue(payment?.note ?? []);

	const priceText =
		price?.valueWithVat === 0
			? t({ id: 'basket.summary.free' })
			: !price?.valueWithVat
			? ''
			: getLocalizedPrice({
					price: price.valueWithVat,
					currency: price.currency,
			  });

	const value: ShippingItemProps = {
		onClick: handleOnClick,
		isLoading: payment === undefined,
		isSelected:
			!!paymentMethod?.id && !!payment?.id && paymentMethod?.id === payment?.id,
		titleContent,
		priceContent: priceText,
		selectable: true,
		note: deliveryNote,
	};

	return value;
};
