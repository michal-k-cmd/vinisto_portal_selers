import {
	VinistoOrderDllModelsApiDeliveryDelivery,
	VinistoOrderDllModelsApiDeliveryDeliveryCreateParameters,
	VinistoOrderDllModelsApiReturnDataDeliveriesReturn,
} from 'vinisto_api_client/src/api-types/order-api';
import { apiServiceInstance } from 'Services/ApiService';

import { DeliveryListQueryArgument } from '../interfaces';
import { DELIVERY_URI } from '../constants';

import DeliveryAdapter from './adapter';

const deliveryAdapter = new DeliveryAdapter();

const getAll = async (params: DeliveryListQueryArgument[]) => {
	const res =
		await apiServiceInstance.getCollection<VinistoOrderDllModelsApiReturnDataDeliveriesReturn>(
			DELIVERY_URI,
			params
		);

	if (res.deliveries) {
		return res.deliveries.map((delivery) => deliveryAdapter.fromApi(delivery));
	} else {
		return [];
	}
};

const create = async (
	delivery: Omit<
		VinistoOrderDllModelsApiDeliveryDeliveryCreateParameters,
		'allowedOnPlatforms'
	>
) => {
	await apiServiceInstance.post<VinistoOrderDllModelsApiDeliveryDelivery>(
		DELIVERY_URI,
		delivery
	);
};

const DeliveryService = {
	getAll,
	create,
};

export default DeliveryService;
