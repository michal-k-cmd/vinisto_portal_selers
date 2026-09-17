import api from '@/api';
import {
	AdminProductsDetailParams,
	SuppliersListParams,
	SuppliersUpdateSupplierUpdatePayload,
	VinistoSupplierApiModelsWarehouseOverviewSupplierProductsReturn,
	VinistoSupplierApiModelsWarehouseOverviewSupplierStatisticsReturn,
	VinistoSupplierDllModelsApiSupplierSupplierReturn,
	VinistoSupplierDllModelsApiSupplierSuppliersReturn,
} from '@/api-types/supplier-api';

const getById = async (id: string, userLoginHash: string) => {
	const response =
		await api.get<VinistoSupplierDllModelsApiSupplierSupplierReturn>(
			`supplier-api/suppliers/${id}`,
			{ userLoginHash }
		);

	if (response.supplier === null || response.supplier === undefined) {
		throw new Error('No orders data in response');
	}

	return response.supplier;
};

const getAll = async (params: SuppliersListParams) => {
	const response =
		await api.get<VinistoSupplierDllModelsApiSupplierSuppliersReturn>(
			`supplier-api/suppliers`,
			params
		);

	if (response.suppliers === null || response.suppliers === undefined) {
		throw new Error('No orders data in response');
	}

	return response.suppliers;
};

const updateSupplier = async (
	id: string,
	request: SuppliersUpdateSupplierUpdatePayload
) => {
	const response =
		await api.put<VinistoSupplierDllModelsApiSupplierSupplierReturn>(
			`supplier-api/suppliers/${id}/UpdateSupplier`,
			undefined,
			request
		);

	if (response.supplier === null || response.supplier === undefined) {
		throw new Error('No updated supplier data in response');
	}
	return response.supplier;
};

const getSupplierStatistics = async (supplierId: string) => {
	const response =
		await api.get<VinistoSupplierApiModelsWarehouseOverviewSupplierStatisticsReturn>(
			`supplier-api/admin/statistics/${supplierId}`
		);

	if (response.isError) {
		throw new Error('Error fetching supplier statistics');
	}

	return response;
};

const getSupplierProducts = async (params: AdminProductsDetailParams) => {
	const response =
		await api.get<VinistoSupplierApiModelsWarehouseOverviewSupplierProductsReturn>(
			`supplier-api/admin/products/${params.supplierId}`,
			params
		);

	if (response.isError) {
		throw new Error('Error fetching supplier products');
	}

	return response;
};

const SupplierService = {
	getById,
	getAll,
	updateSupplier,
	getSupplierStatistics,
	getSupplierProducts,
};

export default SupplierService;
