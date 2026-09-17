import api from '@/api';
import {
	BundlesGetSupplierSetsListParams,
	VinistoHelperDllBaseBaseReturn,
	VinistoProductDllModelsApiBundleBundleReturn,
	VinistoProductDllModelsApiBundleBundleSupplierSetChangeStateParameters,
	VinistoProductDllModelsApiBundleBundleSupplierSetManipulationParameters,
	VinistoProductDllModelsApiBundleSetSupplierBundleReturn,
	VinistoProductDllModelsApiBundleSetsSupplierBundleReturn,
} from '../api-types/product-api';

const getSupplierSets = async (params: BundlesGetSupplierSetsListParams) => {
	const response =
		await api.get<VinistoProductDllModelsApiBundleSetsSupplierBundleReturn>(
			'product-api/bundles/get-supplier-sets',
			params
		);
	return response;
};

const getSupplierSetBundle = async (bundleId: string) => {
  const response = await	api.get<VinistoProductDllModelsApiBundleSetSupplierBundleReturn>(
    `product-api/bundles/${bundleId}/get-set-bundle`
  )
  return response;
}

const createSupplierSet = async (
	data: VinistoProductDllModelsApiBundleBundleSupplierSetManipulationParameters
) => {
	const response = await api.post<VinistoHelperDllBaseBaseReturn>(
		'product-api/bundles/CreateSupplierSetBundle',
		undefined,
		data
	);
	return response;
};

const editSupplierSet = async (
	id: string,
	data: VinistoProductDllModelsApiBundleBundleSupplierSetManipulationParameters
) => {
	const response = await api.put<VinistoProductDllModelsApiBundleBundleReturn>(
		`product-api/bundles/${id}/edit-supplier-set-bundle`,
		undefined,
		data
	);
	return response;
};

const updateSupplierBundleState = async (
	bundleId: string,
	params: VinistoProductDllModelsApiBundleBundleSupplierSetChangeStateParameters
) => {
	const response = await api.put<VinistoProductDllModelsApiBundleBundleReturn>(
		`product-api/bundles/${bundleId}/bundle-supplier-set-change-state`,
		undefined,
		params
	);
	return response;
};

const deleteSupplierSetConcept = async ({
	bundleId,
	userLoginHash,
}: {
	bundleId: string;
	userLoginHash: string;
}) => {
	const response = await api.delete<VinistoHelperDllBaseBaseReturn>(
		`product-api/bundles/${bundleId}/delete-supplier-set`,
		{
			userLoginHash,
		}
	);
	return response;
};

const supplierSetService = {
	getSupplierSets,
  getSupplierSetBundle,
	createSupplierSet,
	editSupplierSet,
	updateSupplierBundleState,
	deleteSupplierSetConcept,
};

export default supplierSetService;
