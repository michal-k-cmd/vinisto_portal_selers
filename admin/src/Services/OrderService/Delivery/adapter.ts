import { VinistoOrderDllModelsApiDeliveryDelivery } from 'vinisto_api_client/src/api-types/order-api/';
import { AbstractAdapter } from 'Services/ApiService/Adapters/Adapter';

import { Delivery } from '../interfaces';

class DeliveryAdapter extends AbstractAdapter<
	Delivery,
	VinistoOrderDllModelsApiDeliveryDelivery
> {
	fromApi(apiData: VinistoOrderDllModelsApiDeliveryDelivery): Delivery {
		return {
			id: apiData.id ?? '',
			name: this.convertMultiLangValue(apiData.name ?? undefined),
			description: this.convertMultiLangValue(apiData.description ?? undefined),
			isActive: apiData.isActive,
			deliveryTime: apiData.deliveryTime,
			minAllowedWeight: apiData.minAllowedWeight,
			maxAllowedWeight: apiData.maxAllowedWeight,
			deliveryType: apiData.deliveryType,
			deliveryCode: apiData.deliveryCode,
			trackingUrl: apiData.trackingUrl,
			order: apiData.order,
			costs: apiData.costs,
			isForStocking: apiData.isForStocking,
			isForCustomerDelivery: apiData.isForCustomerDelivery,
			deliveryBaseType: apiData.deliveryBaseType,
		};
	}

	/**
	 * Not implemented
	 */
	toApi(domainData: Delivery): VinistoOrderDllModelsApiDeliveryDelivery {
		return domainData as VinistoOrderDllModelsApiDeliveryDelivery;
	}

	isValid(item: unknown): item is VinistoOrderDllModelsApiDeliveryDelivery {
		return (
			typeof item === 'object' &&
			item !== null &&
			typeof (item as VinistoOrderDllModelsApiDeliveryDelivery).id === 'string'
		);
	}
}

export default DeliveryAdapter;
