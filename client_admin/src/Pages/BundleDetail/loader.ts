import { defer, LoaderFunction } from 'react-router-dom';
import BundleService from 'Services/BundleService';

import { BundleDetailLoaderReturnValue } from './interfaces';

import api from '@/api';
import {
	VinistoHelperDllEnumsPriceLevel,
	VinistoProductDllModelsApiBundleBundleReturn,
} from '@/api-types/product-api';

export const loadBundleDiscounts = async (
	bundleId: string,
	userLoginHash: string
) => {
	return BundleService.getDiscounts(bundleId, userLoginHash);
};

export const bundleDetailLoader: (userLoginHash: string) => LoaderFunction =
	() =>
	async ({ params }) => {
		const data: BundleDetailLoaderReturnValue = {
			bundlePromise:
				params.id === undefined
					? Promise.reject(new Error('Bundle ID is required'))
					: api
							.get<VinistoProductDllModelsApiBundleBundleReturn>(
								`product-api/bundles/${params.id}`,
								{
									priceLevels: Object.values(VinistoHelperDllEnumsPriceLevel),
								}
							)
							.then((res) => res.bundle ?? null),
		};
		return defer(data);
	};

export default bundleDetailLoader;
