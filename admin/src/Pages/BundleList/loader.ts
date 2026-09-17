import { get } from 'Helpers/lodash';
import { LoaderFunction } from 'react-router-dom';
import { apiServiceInstance } from 'Services/ApiService';
import { VinistoSupplierDllModelsApiSupplierSuppliersReturn } from 'vinisto_api_client/src/api-types/supplier-api/';

import {
	SUPPLIER_API_ENDPOINT,
	SUPPLIER_API_LIMIT,
	SUPPLIER_API_USER_LOGIN_HASH,
} from './constants';
import { IBundleListRouteLoader } from './interfaces';

const cache: Record<string, IBundleListRouteLoader> = {};

const getSupplierCount = async (userLoginHash: string) =>
	apiServiceInstance
		.get(SUPPLIER_API_ENDPOINT, true, undefined, [
			{
				key: SUPPLIER_API_LIMIT,
				value: 1,
			},
			{
				key: SUPPLIER_API_USER_LOGIN_HASH,
				value: userLoginHash,
			},
		])
		.then((responseCount) => get(responseCount, 'count', 0));

const getSupplierList = async (
	userLoginHash: string,
	totalSupplierCount: number
) =>
	apiServiceInstance
		.getCollection<VinistoSupplierDllModelsApiSupplierSuppliersReturn>(
			SUPPLIER_API_ENDPOINT,
			[
				{
					key: SUPPLIER_API_LIMIT,
					value: totalSupplierCount,
				},
				{
					key: SUPPLIER_API_USER_LOGIN_HASH,
					value: userLoginHash,
				},
			]
		)
		.then((payload) => {
			const result = payload?.suppliers || [];

			cache[userLoginHash] = {
				...(cache[userLoginHash] || {}),
				suppliers: result,
			};
			return result;
		});

const bundleLoader: (userLoginHash: string) => LoaderFunction =
	(userLoginHash) => async (): Promise<IBundleListRouteLoader> => {
		if (cache[userLoginHash]) return cache[userLoginHash];

		try {
			const totalSupplierCount = await getSupplierCount(userLoginHash);
			if (!totalSupplierCount) return {};

			return {
				suppliers: await getSupplierList(userLoginHash, totalSupplierCount),
			};
		} catch {
			return {};
		}
	};

export default bundleLoader;
