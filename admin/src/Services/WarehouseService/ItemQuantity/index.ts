import { VinistoWarehouseDllModelsApiWarehouseItemWarehouseItemQuantityReturn } from 'vinisto_api_client/src/api-types/warehouse-api/';
import { apiServiceInstance } from 'Services/ApiService';

import { WAREHOUSE_SERVICE_BASE_URI } from '../constants';

import ItemQuantityAdapter from './adapter';

const itemQuantityAdapter = new ItemQuantityAdapter();

const getBundleQuantities = async (bundleIds: string[]) => {
	const params = new URLSearchParams();
	bundleIds.forEach((id) => params.append('bundleIds', id));

	const res =
		await apiServiceInstance.getCollection<VinistoWarehouseDllModelsApiWarehouseItemWarehouseItemQuantityReturn>(
			`${WAREHOUSE_SERVICE_BASE_URI}/warehouse/bundles/GetWarehouseItemsQuantities?${params.toString()}`
		);

	return itemQuantityAdapter.fromApi(res);
};

const ItemQuantityService = {
	getBundleQuantities,
};

export default ItemQuantityService;
