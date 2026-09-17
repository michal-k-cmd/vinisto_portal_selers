import { BUNDLES_URI } from '../constants';

import api from '@/api';
import {
	VinistoProductDllModelsApiBundleBundleIsApprovedParameters,
	VinistoProductDllModelsApiBundleBundleReturn,
	VinistoProductDllModelsApiBundleBundleSupplierSetChangeStateParameters,
} from '../../api-types/product-api';

const bundleSupplierSetChangeState = async (
	bundleId: string,
	req: VinistoProductDllModelsApiBundleBundleSupplierSetChangeStateParameters
) => {
	const res = await api.put<VinistoProductDllModelsApiBundleBundleReturn>(
		`${BUNDLES_URI}/${bundleId}/bundle-supplier-set-change-state`,
		undefined,
		req
	);

	return res;
};

const setIsApproved = async (
	bundleId: string,
	req: VinistoProductDllModelsApiBundleBundleIsApprovedParameters
) => {
	const res = await api.put<VinistoProductDllModelsApiBundleBundleReturn>(
		`${BUNDLES_URI}/${bundleId}/set-is-approved`,
		undefined,
		req
	);

	return res;
};

const BundleEditService = {
	bundleSupplierSetChangeState,
	setIsApproved,
};

export default BundleEditService;
