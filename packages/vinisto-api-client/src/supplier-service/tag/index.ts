import api from '@/api';
import {
	VinistoSupplierDllModelsApiSupplierTagCreateSupplierTagRequestContract,
	VinistoSupplierDllModelsApiSupplierTagCreateSupplierTagResponseContract,
	VinistoSupplierDllModelsApiSupplierTagGetFilteredSupplierTagsResponseContract,
	VinistoSupplierDllModelsApiSupplierTagGetSupplierTagResponseContract,
	VinistoSupplierDllModelsApiSupplierTagUpdateSupplierTagRequestContract,
	VinistoSupplierDllModelsApiSupplierTagUpdateSupplierTagResponseContract,
} from '@/api-types/supplier-api';

const get = (id: string, loginHash: string) =>
	api.get<VinistoSupplierDllModelsApiSupplierTagGetSupplierTagResponseContract>(
		`supplier-api/supplier-tag/${id}`,
		{ userLoginHash: loginHash }
	);

const create = (
	requestBody: VinistoSupplierDllModelsApiSupplierTagCreateSupplierTagRequestContract
) =>
	api.post<VinistoSupplierDllModelsApiSupplierTagCreateSupplierTagResponseContract>(
		'supplier-api/supplier-tag',
		undefined,
		requestBody
	);

const update = (
	id: string,
	requestBody: VinistoSupplierDllModelsApiSupplierTagUpdateSupplierTagRequestContract
) =>
	api.put<VinistoSupplierDllModelsApiSupplierTagUpdateSupplierTagResponseContract>(
		`supplier-api/supplier-tag/${id}`,
		undefined,
		{
			requestBody,
		}
	);

const remove = (id: string, loginHash: string) =>
	api.patch(`supplier-api/supplier-tag/${id}`, { userLoginHash: loginHash });

const attachTagToSupplier = ({
	supplierTagIds,
	supplierId,
	userLoginHash,
}: {
	supplierTagIds: string[];
	supplierId: string;
	userLoginHash: string;
}) =>
	api.patch(`supplier-api/supplier-tags/assign`, undefined, {
		supplierTagIds,
		supplierId,
		userLoginHash,
	});

const detachTagFromSupplier = ({
	supplierTagIds,
	supplierId,
	userLoginHash,
}: {
	supplierTagIds: string[];
	supplierId: string;
	userLoginHash: string;
}) =>
	api.patch(`supplier-api/supplier-tags/unassign`, undefined, {
		supplierTagIds,
		supplierId,
		userLoginHash,
	});

const getAll = (
	// Should be this type, but I don't have it in types yet :(
	// VinistoSupplierDllModelsApiSupplierTagGetSupplierTagGetFilteredSupplierTagsRequestContract
	params: Record<string, any> & { userLoginHash: string }
) =>
	api.get<VinistoSupplierDllModelsApiSupplierTagGetFilteredSupplierTagsResponseContract>(
		`supplier-api/supplier-tags/filtered`,
		params
	);

const supplierTagService = {
	get,
	create,
	update,
	remove,
	attachTagToSupplier,
	detachTagFromSupplier,
	getAll,
};

export default supplierTagService;
