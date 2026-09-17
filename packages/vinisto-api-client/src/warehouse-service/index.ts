import api from '@/api';
import {
	ChangeLogSupplierDetailParams,
	VinistoHelperDllBaseBaseReturn,
	VinistoWarehouseDllModelsApiWarehouseChangeLogWarehouseChangeLogReturn,
	VinistoWarehouseDllModelsApiWarehouseItemWarehouseItemQuantityReturn,
	VinistoWarehouseDllModelsApiWarehouseItemWarehouseItemReturn,
	VinistoWarehouseDllModelsApiWarehouseItemWarehouseItemsReturn,
	WarehouseBundlesGetWarehouseItemListParams,
	WarehouseBundlesGetWarehouseItemsListParams,
	WmsSynchronizeCreateParams,
} from '@/api-types/warehouse-api';

const getWarehouseItems = async (
	params: WarehouseBundlesGetWarehouseItemsListParams
) => {
	const res =
		await api.get<VinistoWarehouseDllModelsApiWarehouseItemWarehouseItemsReturn>(
			`warehouse-api/warehouse/bundles/GetWarehouseItems`,
			params
		);

	if (res.isError) {
		throw new Error(res.error ? res.error.toString() : 'Unknown error');
	}

	return res;
};

const getWarehouseItem = async (
	params: WarehouseBundlesGetWarehouseItemListParams
) => {
	const { bundleId } = params;

	const res =
		await api.get<VinistoWarehouseDllModelsApiWarehouseItemWarehouseItemReturn>(
			`warehouse-api/warehouse/bundles/${bundleId}/GetWarehouseItem`,
			params
		);

	if (res.isError) {
		throw new Error(res.error ? res.error.toString() : 'Unknown error');
	}

	return res;
};

const getWarehouseItemQuantities = (bundleIds: string[]) =>
	api.get<VinistoWarehouseDllModelsApiWarehouseItemWarehouseItemQuantityReturn>(
		'warehouse-api/warehouse/bundles/GetWarehouseItemsQuantities',
		{ bundleIds: bundleIds }
	);

/** Warehouse synchronize - add or update all products to WMS. */
const synchronizeWarehouse = async (params: WmsSynchronizeCreateParams) => {
	const res = await api.post<VinistoHelperDllBaseBaseReturn>(
		`warehouse-api/wms/synchronize`,
		params
	);

	if (res.isError) {
		throw new Error('Error synchronizing warehouse');
	}

	return res;
};

const getSupplierChangeLog = async (params: ChangeLogSupplierDetailParams) => {
	const { supplierId } = params;

	const res =
		await api.get<VinistoWarehouseDllModelsApiWarehouseChangeLogWarehouseChangeLogReturn>(
			`warehouse-api/change-log/supplier/${supplierId}`,
			params
		);

	if (res.isError) {
		throw new Error(res.error ? res.error.toString() : 'Unknown error');
	}

	return res;
};

const WarehouseService = {
	getWarehouseItems,
	getWarehouseItem,
	getWarehouseItemQuantities,
	synchronizeWarehouse,
	getSupplierChangeLog,
};

export default WarehouseService;
