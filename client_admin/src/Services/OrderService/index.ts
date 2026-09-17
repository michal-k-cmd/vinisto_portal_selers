import { apiServiceInstance } from '../ApiService';

import { IAIPRequestQueryOptions, IAPIOrderDetailResponse } from './interfaces';

export const fetchOrderDetail = async (
	id: string,
	options: IAIPRequestQueryOptions = []
): Promise<IAPIOrderDetailResponse> => {
	return (await apiServiceInstance.getCollection(
		`order-api/orders/${id}`,
		options,
		false
	)) as unknown as Promise<IAPIOrderDetailResponse>;
};
