import {
	VinistoSupplierDllModelsApiSupplierSupplierAddUserParameters,
	VinistoSupplierDllModelsApiSupplierSupplierCreateAuthParameters,
	VinistoSupplierDllModelsApiSupplierSupplierRemoveUserParameters,
	VinistoSupplierDllModelsApiSupplierSupplierReturn,
	VinistoSupplierDllModelsApiSupplierSuppliersReturn,
} from 'vinisto_api_client/src/api-types/supplier-api';
import { apiServiceInstance } from 'Services/ApiService';
import { IQueryArgument } from 'Services/ApiService/interfaces';

import {
	CREATE_SUPPLIER_URI,
	GET_SUPPLIERS_URI,
	SUPPLIER_SERVICE_BASE_URI,
} from '../constants';

const get = async (req: IQueryArgument[]) =>
	await apiServiceInstance.getCollection<VinistoSupplierDllModelsApiSupplierSuppliersReturn>(
		GET_SUPPLIERS_URI,
		req
	);

const create = async (
	req: VinistoSupplierDllModelsApiSupplierSupplierCreateAuthParameters
) =>
	await apiServiceInstance.post<VinistoSupplierDllModelsApiSupplierSupplierReturn>(
		CREATE_SUPPLIER_URI,
		req
	);

const addSupplierToUser = async (
	supplierId: string,
	request: VinistoSupplierDllModelsApiSupplierSupplierAddUserParameters
) => {
	const res =
		await apiServiceInstance.put<VinistoSupplierDllModelsApiSupplierSupplierAddUserParameters>(
			`${SUPPLIER_SERVICE_BASE_URI}/suppliers/${supplierId}/AddUserToSupplier`,
			request
		);

	return res;
};

const removeSupplierFromUser = async (
	supplierId: string,
	request: VinistoSupplierDllModelsApiSupplierSupplierRemoveUserParameters
) => {
	const res =
		await apiServiceInstance.put<VinistoSupplierDllModelsApiSupplierSupplierRemoveUserParameters>(
			`${SUPPLIER_SERVICE_BASE_URI}/suppliers/${supplierId}/RemoveUserFromSupplier`,
			request
		);

	return res;
};

const getAutocompleteSuppliers = async (
	userLoginHash: string,
	searchingNameString: string,
	params: Record<string, string | number | boolean> = {}
) => {
	const paramToArray = Object.entries(params).map(([key, value]) => ({
		key,
		value,
	}));
	const response =
		await apiServiceInstance.get<VinistoSupplierDllModelsApiSupplierSuppliersReturn>(
			`${SUPPLIER_SERVICE_BASE_URI}/suppliers/GetAutocompleteNames`,
			undefined,
			undefined,
			[
				{
					key: 'userLoginHash',
					value: userLoginHash,
				},
				{ key: 'searchingNameString', value: searchingNameString },
				...paramToArray,
			]
		);

	return response;
};

const getById = async (id: string, userLoginHash: string) => {
	const response =
		await apiServiceInstance.get<VinistoSupplierDllModelsApiSupplierSupplierReturn>(
			`${SUPPLIER_SERVICE_BASE_URI}/suppliers/${id}`,
			undefined,
			undefined,
			[
				{
					key: 'userLoginHash',
					value: userLoginHash,
				},
			]
		);
	return response.supplier;
};

const SupplierService = {
	get,
	create,
	addSupplierToUser,
	removeSupplierFromUser,
	getAutocompleteSuppliers,
	getById,
};

export default SupplierService;
