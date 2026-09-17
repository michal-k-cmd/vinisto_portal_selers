import React, { useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import useLocalizedValue from 'Hooks/useLocalizedValue';

import { SetGiftActionResponse } from '@/api-types/addons-api';
import api from '@/api';
import { OrderApi } from '@/api-types/order-api';

type Props = {
	action: SetGiftActionResponse;
};

const SetDeliveryRow = ({ action }: Props) => {
	const getLocalizedValue = useLocalizedValue();

	const { data: delivery } = useQuery({
		queryKey: ['delivery', action.itemId],
		queryFn: () => {
			return api.get<
				OrderApi.DeliveriesGetDeliveryList.ResponseBody,
				OrderApi.DeliveriesGetDeliveryList.RequestQuery
			>(`order-api/deliveries/${action.itemId}/GetDelivery`, {
				IsCache: true,
			});
		},
		enabled: !!action.itemId,
	});

	const quantity = useMemo(() => {
		if (typeof action.quantity === 'number') {
			return `${action.quantity}ks`;
		}
		return null;
	}, [action.quantity]);

	return (
		<div>
			Doprava: {`${getLocalizedValue(delivery?.delivery?.name)} ${quantity}`}
		</div>
	);
};

export default SetDeliveryRow;
