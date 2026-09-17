import {
	VinistoProductDllModelsApiBundleBundlesGetParameters,
	VinistoProductDllModelsApiBundleBundlesReturn,
} from 'vinisto_api_client/src/api-types/product-api';

import { BUNDLE_URI } from '../constants';

const GetUniqueBundlesByScoring = async (
	req: VinistoProductDllModelsApiBundleBundlesGetParameters
) => {
	const data = (await fetch(`${BUNDLE_URI}/get-unique-bundles-by-scoring`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			'X-Api-Key': import.meta.env.VITE_INTEGRATIONS_API_KEY ?? '',
		},
		body: JSON.stringify(req),
	}).then((response) => {
		return response.json();
	})) as VinistoProductDllModelsApiBundleBundlesReturn;

	return data.bundles;
};

const BundleService = {
	GetUniqueBundlesByScoring,
};

export default BundleService;
