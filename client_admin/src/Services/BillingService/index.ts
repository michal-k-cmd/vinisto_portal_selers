import { apiServiceInstance } from '../ApiService';

import {
	IAIPRequestQueryOptions,
	IAPIBillingsDetailResponse,
} from './interfaces';

export const fetchBillingDetail = async (
	id: string,
	options: IAIPRequestQueryOptions = []
): Promise<IAPIBillingsDetailResponse> => {
	return (await apiServiceInstance.getCollection(
		`order-api/billings/${id}`,
		options,
		false
	)) as unknown as Promise<IAPIBillingsDetailResponse>;
};
