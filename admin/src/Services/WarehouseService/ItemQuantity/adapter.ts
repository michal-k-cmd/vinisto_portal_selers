import {
	VinistoWarehouseDllModelsApiWarehouseItemWarehouseItemQuantity,
	VinistoWarehouseDllModelsApiWarehouseItemWarehouseItemQuantityReturn,
} from 'vinisto_api_client/src/api-types/warehouse-api/';
import { AbstractAdapter } from 'Services/ApiService/Adapters/Adapter';

import { WarehouseItemQuantity } from '../interfaces';

class ItemQuantityAdapter extends AbstractAdapter<
	WarehouseItemQuantity[],
	VinistoWarehouseDllModelsApiWarehouseItemWarehouseItemQuantityReturn
> {
	fromApi(
		apiData: VinistoWarehouseDllModelsApiWarehouseItemWarehouseItemQuantityReturn
	): WarehouseItemQuantity[] {
		return (
			apiData.warehouseItemQuantities?.map(
				(
					item: VinistoWarehouseDllModelsApiWarehouseItemWarehouseItemQuantity
				) => ({
					id: item.itemId ?? '',
					quantity: item.quantity ?? 0,
				})
			) ?? []
		);
	}

	/**
	 * Not implemented
	 */
	toApi(
		/* eslint-disable-next-line @typescript-eslint/no-unused-vars */
		domainData: WarehouseItemQuantity[]
	): VinistoWarehouseDllModelsApiWarehouseItemWarehouseItemQuantityReturn {
		throw new Error('Method not implemented.');
	}

	isValid(
		item: unknown
	): item is VinistoWarehouseDllModelsApiWarehouseItemWarehouseItemQuantityReturn {
		return (
			typeof item === 'object' &&
			item !== null &&
			Array.isArray(
				(
					item as VinistoWarehouseDllModelsApiWarehouseItemWarehouseItemQuantityReturn
				).warehouseItemQuantities
			)
		);
	}
}

export default ItemQuantityAdapter;
