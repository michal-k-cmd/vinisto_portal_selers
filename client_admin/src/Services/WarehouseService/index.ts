import { apiServiceInstance } from 'Services/ApiService';

import {
	WarehouseQuantityApiParam,
	WarehouseQuantityApiParams,
} from './interfaces';
import { WAREHOUSE_API_QUANTITY } from './constants';

import { VinistoWarehouseDllModelsApiWarehouseItemWarehouseItemQuantityReturn } from '@/api-types/warehouse-api';

export class WarehouseService {
	private makeApiCall<T>(endpoint: string, params: WarehouseQuantityApiParams) {
		return apiServiceInstance.get<T>(endpoint, true, undefined, params);
	}

	async getBundleQuantities(bundleIds: string[]) {
		const params = bundleIds.map(
			(id) => ({ key: 'bundleIds', value: id } as WarehouseQuantityApiParam)
		);

		const result =
			await this.makeApiCall<VinistoWarehouseDllModelsApiWarehouseItemWarehouseItemQuantityReturn>(
				WAREHOUSE_API_QUANTITY,
				params
			).then((response) => response.warehouseItemQuantities);
		return result;
	}
}

export const warehouseServiceInstance = new WarehouseService();
export default warehouseServiceInstance;
